<template>
  <div>
    <DfConfirmationModal
      v-model="deleteScanDialog"
      title="Are you sure you would like to archive this scan?"
      cancel-button-text="Cancel"
      confirm-button-text="Delete"
      cancel-icon="mdi-close"
      confirm-icon="mdi-check"
      confirm-button-color="secondary"
      card-icon="mdi-archive-arrow-down-outline"
      @confirm="deleteScan"
    />
    <DfConfirmationModal
      v-model="stopScanDialog"
      title="Are you sure you would like to stop the scan?"
      description="A stopped scan cannot be resumed."
      cancel-button-text="Cancel"
      confirm-button-text="Stop"
      cancel-icon="mdi-close"
      confirm-icon="mdi-check"
      confirm-button-color="secondary"
      card-icon="mdi-stop-circle-outline"
      @confirm="stopScan"
    />

    <VunerabilityDetailDialog
      v-model:model-value="vulnDetailsDialog"
      :vuln="selectedVulnerability"
      :scan-id="scanId"
    />

    <v-card
      class="d-flex pl-3 py-3 mt-3"
      variant="outlined"
    >
      <v-tooltip bottom>
        <template #activator="{ props }">
          <v-btn
            :disabled="progress === 'STOPPED' || progress === 'DONE' "
            :loading="stopBtnLoading"
            class="mr-2"
            v-bind="props"
            @click="stopScanDialog = true"
          >
            <v-icon start>
              mdi-stop-circle-outline
            </v-icon>
            Stop
          </v-btn>
        </template>
        <span>Stops scan. Stopped scans can't be restarted.</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ props }">
          <v-btn
            :loading="archiveBtnLoading"
            class="mr-2"
            v-bind="props"
            @click="deleteScanDialog = true"
          >
            <v-icon start>
              mdi-delete-outline
            </v-icon>
            Delete
          </v-btn>
        </template>
        <span>Archives scan and removes all findings and artifacts.</span>
      </v-tooltip>
    </v-card>
    <v-row
      class="mt-4 align-stretch"
    >
      <v-col
        cols="12"
        lg="12"
      >
        <v-card
          :loading="loadingDialog"
          height="100%"
          variant="outlined"
        >
          <v-card-title>
            <v-icon start>
              mdi-shield-check-outline
            </v-icon>
            Scan Details
          </v-card-title>
          <v-divider />
          <v-list>
            <v-list-item v-if="title !== null && title !== ''">
              <v-list-item-title>
                Title:
                <span>{{ title }}</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                Target:
                <span>{{ kb?.asset }}</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                Progress: <DfScanProgress :progress="progress" />
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title
                v-if="kb !== null"
              >
                Date:  <span>{{ $moment(kb.createdTime).format('MMMM Do YYYY, k:mm:ss') }}</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-card
      :loading="loadingDialog"
      class="mt-12"
      justify="space-around"
      variant="outlined"
    >
      <v-card-title>
        <v-icon start>
          mdi-bug-outline
        </v-icon>
        Vulnerabilities
        <v-chip
          v-if="totalVulnerabilities !== null"
          small
          class="ml-2"
        >
          {{ totalVulnerabilities || "!" }}
        </v-chip>
      </v-card-title>
      <v-divider />
      <VulnzTable
        :vulnz="vulns"
        @go-to-detail="goToDetail"
        @go-to-detail-new-tab="goToDetailNewTab"
        @show-vuln-details="showVulnDetails"
      />
    </v-card>
  </div>
</template>

<script lang="ts">
import {mapActions, mapState} from 'pinia'
import crc32 from 'crc32/lib/crc32'
import VulnerabilityService from '~/project/scans/services/vulnerability.service'
import ScansService from '~/project/scans/services/ScanService'

import {DfConfirmationModal} from '~/dragonfly/components/Modals/DfConfirmationModal'
import VulnzTable from '~/project/scans/componenets/VulnzTable.vue'
import VunerabilityDetailDialog from '~/project/scans/componenets/VunerabilityDetailDialog.vue'
import {useNotificationsStore} from '~/stores/notifications'
import {useScannersStore} from '~/stores/scanners'
import DfScanProgress from '~/dragonfly/components/Tags/DfScanProgress/DfScanProgress.vue'
import type {
  Maybe,
  OxoAggregatedKnowledgeBaseVulnerabilityType,
  OxoScanType,
  OxoVulnerabilitiesType
} from '~/graphql/types'
import type {Scanner} from '~/project/types'

definePageMeta({
  layout: 'default',
  title: 'scan'
})

interface Data {
  vulnDetailsDialog: boolean
  selectedVulnerability: OxoAggregatedKnowledgeBaseVulnerabilityType | null
  totalIssues: number
  options: {
    page: number
    itemsPerPage: number
  }
  scanner: Scanner
  vulnerabilityService: VulnerabilityService
  scanService: ScansService
  kb: null | OxoScanType
  title: Maybe<string> | undefined
  progress: Maybe<string> | undefined
  vulns: Maybe<OxoVulnerabilitiesType[]>
  loadingDialog: boolean
  stopBtnLoading: boolean
  deleteScanDialog: boolean
  archiveBtnLoading: boolean
  stopScanDialog: boolean
}
export default defineComponent ({
  name: 'Index',
  components: {
    DfScanProgress,
    DfConfirmationModal,
    VulnzTable,
    VunerabilityDetailDialog
  },
  layout: 'dashboard',
  title: 'Scan Details',
  secondContextualMenuItems: ['scan1', 'scan2'],
  data(): Data {
    return {
      // This a dummy scanner object, it get replaced with the actual scanner object from the store, if no scanner is found, the user is redirected to the scan list page
      scanner: {
        endpoint: '',
        name: '',
        apiKey: ''
      },
      vulnDetailsDialog: false,
      selectedVulnerability: null,
      totalIssues: 0,
      options: {
        page: 1,
        itemsPerPage: 15
      },
      vulnerabilityService: new VulnerabilityService(this.$axios),
      scanService: new ScansService(this.$axios),
      kb: null,
      title: '',
      progress: 'UNKNOWN',
      vulns: [],
      loadingDialog: false,
      stopBtnLoading: false,
      deleteScanDialog: false,
      archiveBtnLoading: false,
      stopScanDialog: false
    }
  },
  computed: {
    ...mapState(useScannersStore, ['scanners']),
    scanId(): number {
      if (this.$route.params.scan === undefined || this.$route.params.scan === null) {
        this.reportError('Scan ID not provided')
        return 0
      }
      return parseInt(this.$route.params.scan as string)
    },
    /**
     * The total number of vulnerabilities.
     */
    totalVulnerabilities() {
      return this.vulns?.length || 0
    }
  },
  async created() {
    const scanner = this.scanners.find((_scanner) => crc32(_scanner.endpoint) === this.$route.params.scanner)
    if (scanner === undefined) {
      this.reportError('Scanner not found')
      this.$router.push('/scan/list')
    } else {
      this.scanner = scanner
      await this.fetchKBVulnerabilities()
    }
  },
  methods: {
    ...mapActions(useNotificationsStore, ['reportError', 'reportInfo', 'reportSuccess']),
    async fetchKBVulnerabilities() {
      try {
        this.loadingDialog = true
        const kb = await this.vulnerabilityService.getKBVulnerabilities(
          this.scanner,
          this.scanId
        )
        this.kb = kb
        this.vulns = kb?.kbVulnerabilities || []
        this.title = kb?.title
        this.progress = kb?.progress
      } catch (e) {
        this.reportError(`An error was encountered while fetching the scan: ${e}`)
      } finally {
        this.loadingDialog = false
      }
    },

    /**
     * Shows the details of the selected vulnerability.
     * @param vuln The vulnerability whose details to show.
     */
    showVulnDetails(vuln: OxoAggregatedKnowledgeBaseVulnerabilityType) {
      this.selectedVulnerability = vuln
      this.vulnDetailsDialog = true
    },
    goToDetail(_vuln: OxoAggregatedKnowledgeBaseVulnerabilityType) {
    // TODO: Implement this after the vulnerability details page is created
    },
    goToDetailNewTab(_vuln: OxoAggregatedKnowledgeBaseVulnerabilityType) {
      // TODO: Implement this after the vulnerability details page is created
    },
    async stopScan() {
      this.stopBtnLoading = true
      try {
        await this.scanService.stopScan(this.scanner, this.scanId)
        await this.fetchKBVulnerabilities()
      } catch (e) {
        this.reportError(e?.message || 'Error Stopping scan.')
      } finally {
        this.stopBtnLoading = false
      }
    },
    /**
     * Delete the scan
     */
    async deleteScan(): Promise<void> {
      this.loadingDialog = true
      try {
        await this.scanService.deleteScan(this.scanner, this.scanId)
        this.reportSuccess('Scan deleted successfully')
        this.$router.push('/scan/list')
      } catch (e) {
        this.reportError(`An error occurred while deleting the scan: ${e!.message}`)
      } finally {
        this.loadingDialog = false
      }
    }
  }
})
</script>

<style scoped>
.v-data-table td {
  cursor: pointer;
}
</style>
