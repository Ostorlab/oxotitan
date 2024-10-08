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
      v-model:loading="vulenrabilityLoading"
      v-model:model-value="vulnDetailsDialog"
      :vuln="selectedVulnerability"
      :scan-id="scanId"
      :scanner="scanner"
      @after-leave="selectedVulnerability = null"
    />

    <DfBreadcrumbs
      :scan-id="scanId"
      :breadcrumbs="breadcrumbs"
      :scanner="scanner"
      class="mb-5"
    />

    <v-card
      class="d-flex pl-3 py-3 mt-3"
      variant="outlined"
    >
      <v-tooltip bottom>
        <template #activator="{ props }">
          <v-btn
            :disabled="progress === 'stopped' || progress === 'done' || loadingDialog === true "
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
      <v-tooltip bottom>
        <template #activator="{ props }">
          <v-btn
            class="mr-2"
            v-bind="props"
            @click="exportScan"
          >
            <v-icon start>
              mdi-file-export-outline
            </v-icon>
            Export
          </v-btn>
        </template>
        <span>Exports scan to a zip file.</span>
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
            <v-list-item>
              <v-list-item-title class="d-flex align-center">
                <p class="mb-0 mr-2">
                  Title:
                </p>
                <p
                  v-if="title !== null && title !== ''"
                  class="mb-0"
                >
                  {{ title }}
                </p>
                <div v-else>
                  <v-chip
                    v-if="loadingDialog === true"
                    variant="tonal"
                    size="small"
                    label
                    style="width: 80px;"
                  />
                  <span v-else>-</span>
                </div>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="d-flex align-center">
                <p class="mb-0 mr-2">
                  Targets:
                </p>
                <v-chip
                  v-if="loadingDialog === true"
                  variant="tonal"
                  label
                  style="width: 90px;"
                />
                <OXOAssets
                  v-else
                  :assets="assets"
                />
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="d-flex align-center">
                <p class="mb-0 mr-2">
                  Progress:
                </p>
                <v-chip
                  v-if="loadingDialog === true"
                  variant="tonal"
                  size="small"
                  label
                  style="width: 60px;"
                />
                <DfScanProgress
                  v-else
                  :progress="progress"
                />
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="d-flex align-center">
                <p class="mb-0 mr-2">
                  Risk Rating:
                </p>
                <v-chip
                  v-if="loadingDialog === true"
                  variant="tonal"
                  size="small"
                  label
                  style="width: 60px;"
                />
                <DfRisk
                  v-else
                  :risk="riskRating"
                />
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="d-flex align-center">
                <p class="mb-0 mr-2">
                  Date:
                </p>
                <p
                  v-if="loadingDialog === false && kb !== null"
                  class="mb-0"
                >
                  {{ $moment(kb.createdTime).format('MMMM Do YYYY, k:mm:ss') }}
                </p>
                <div v-else>
                  <v-chip
                    v-if="loadingDialog === true"
                    variant="tonal"
                    size="x-small"
                    label
                    style="width: 180px;"
                  />
                  <span v-else>-</span>
                </div>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="d-flex align-center">
                <p class="mb-0 mr-2">
                  Scanner:
                </p>
                <div>
                  <p v-if="(scanner.name || '').trim() !== ''">
                    {{ scanner.name }} (<code>{{ scanner.endpoint }}</code>)
                  </p>
                  <code v-else>{{ scanner.endpoint }}</code>
                </div>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-card
      class="mt-12"
      variant="outlined"
    >
      <v-card-title
        class="cursor-pointer"
        @click="show = !show"
      >
        <v-row
          align="center"
          justify="space-between"
          class="w-100"
        >
          <v-col class="d-flex align-center">
            <v-icon start>
              mdi-format-list-group
            </v-icon>
            <span>Agent Group</span>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn
              :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              elevation="0"
            />
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider />
      <v-expand-transition>
        <div v-show="show">
          <v-divider />
          <v-card-text>
            <MonacoEditor
              v-model="AgentGroupYaml"
              :lang="editorLanguage"
              :options="editorOptions"
              style="min-height: 300px;"
            />
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
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
          size="small"
          class="ml-2"
        >
          {{ totalVulnerabilities }}
        </v-chip>
      </v-card-title>
      <v-divider />
      <VulnzTable
        :vulnerability-preview-loading="vulenrabilityLoading"
        :vulnz="vulns"
        :selected-vulnerability-key="selectedVulnerability !== null ? selectedVulnerability.key : null"
        @go-to-detail="goToDetail"
        @go-to-detail-new-tab="goToDetailNewTab"
        @show-vuln-details="showVulnDetails"
      />
    </v-card>
  </div>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'
import crc32 from 'crc32/lib/crc32'
import Yaml from 'yaml'
import VulnerabilityService from '~/project/scans/services/vulnerability.service'
import ScansService from '~/project/scans/services/ScanService'

import { DfConfirmationModal } from '~/dragonfly/components/Modals/DfConfirmationModal'
import VulnzTable from '~/project/scans/components/VulnzTable.vue'
import VunerabilityDetailDialog from '~/project/scans/components/VunerabilityDetailDialog.vue'
import { useNotificationsStore } from '~/stores/notifications'
import { useScannersStore } from '~/stores/scanners'
import { DfScanProgress } from '~/dragonfly/components/Tags/DfScanProgress'
import { DfBreadcrumbs } from '~/dragonfly/components/Sections/DfBreadcrumbs'
import type {
  AgentGroupType,
  Maybe,
  OxoAggregatedKnowledgeBaseVulnerabilityType, OxoAssetType,
  OxoScanType,
  OxoVulnerabilitiesType
} from '~/graphql/types'
import type { FormattedVulnz, Scanner } from '~/project/types'
import type { VulnerabilityDetailBreadcrumbsType } from '~/dragonfly/components/Sections/DfBreadcrumbs/types'
import OXOAssets from '~/project/assets/components/Assets.vue'
import DfRisk from '~/dragonfly/components/Tags/DfRisk/DfRisk.vue'

definePageMeta({
  layout: 'default',
  title: 'scan'
})

const BREADCRUMBS_SCANS_INDEX = 1

interface Data {
  vulnDetailsDialog: boolean
  selectedVulnerability: OxoAggregatedKnowledgeBaseVulnerabilityType | null
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
  riskRating: Maybe<string> | undefined
  vulns: Maybe<OxoVulnerabilitiesType[]>
  loadingDialog: boolean
  stopBtnLoading: boolean
  deleteScanDialog: boolean
  archiveBtnLoading: boolean
  stopScanDialog: boolean
  breadcrumbs: VulnerabilityDetailBreadcrumbsType
  assets: Array<OxoAssetType>
  agentGroup: Maybe<AgentGroupType>
  vulenrabilityLoading: boolean
  show: boolean
  editorLanguage: string
  editorOptions: {
    [key: string]: string | boolean | { [key: string]: boolean }
  }
}
export default defineComponent ({
  name: 'Index',
  components: {
    DfRisk,
    OXOAssets,
    DfScanProgress,
    DfConfirmationModal,
    VulnzTable,
    VunerabilityDetailDialog,
    DfBreadcrumbs
  },
  data(): Data {
    return {
      // This a dummy scanner object, it get replaced with the actual scanner object from the store, if no scanner is found, the user is redirected to the scan list page
      scanner: {
        endpoint: '',
        name: '',
        apiKey: ''
      },
      vulenrabilityLoading: false,
      vulnDetailsDialog: false,
      selectedVulnerability: null,
      options: {
        page: 1,
        itemsPerPage: 15
      },
      vulnerabilityService: new VulnerabilityService(this.$axios),
      scanService: new ScansService(this.$axios),
      kb: null,
      title: '',
      progress: 'UNKNOWN',
      riskRating: 'UNKNOWN',
      vulns: [],
      loadingDialog: true,
      stopBtnLoading: false,
      deleteScanDialog: false,
      archiveBtnLoading: false,
      stopScanDialog: false,
      assets: [],
      agentGroup: null,
      show: false,
      editorLanguage: 'yaml',
      editorOptions: {
        theme: 'vs',
        wordWrap: 'on',
        wordWrapColumn: 'on',
        fontFamily: 'Fira Code',
        automaticLayout: true,
        minimap: { enabled: false },
        readOnly: true
      },
      breadcrumbs: [
        {
          text: 'scans',
          disabled: false,
          to: '/scan/list',
          exact: true
        },
        {
          text: 'Scan',
          disabled: false,
          to: `/scan/${this.$route.params.scan}`,
          exact: true,
          scans: []
        }
      ]
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
     * The YAML representation of the agent group.
     */
    AgentGroupYaml(): string {
      const yamlSource: string | undefined | null = this.agentGroup?.yamlSource

      if (yamlSource === undefined || yamlSource === null) {
        return 'No agent group found'
      }

      return `# Agent Group ID: ${this.agentGroup?.id}\n${Yaml.stringify(Yaml.parse(yamlSource))}`
    },
    /**
     * The total number of vulnerabilities.
     */
    totalVulnerabilities(): number {
      return this.vulns?.length || 0
    }
  },
  async mounted() {
    const scanner = this.scanners.find((_scanner) => crc32(_scanner.endpoint) === this.$route.params.scanner)
    if (scanner === undefined) {
      this.reportError('Scanner not found')
      this.$router.push({
        name: 'scan-list'
      })
    } else {
      this.scanner = scanner
      await Promise.allSettled([
        this.fetchKBVulnerabilities(),
        this.fetchScans()
      ])
      this.updateBreadcrumbs()
    }
  },
  methods: {
    ...mapActions(useNotificationsStore, ['reportError', 'reportInfo', 'reportSuccess']),
    /**
     * Fetches the scan vulnerabilities.
     */
    async fetchKBVulnerabilities(): Promise<void> {
      try {
        this.loadingDialog = true
        const kb = await this.vulnerabilityService.getKBVulnerabilities(
          this.scanner,
          this.scanId
        )
        this.kb = kb
        this.vulns = kb?.kbVulnerabilities || []
        this.title = kb?.title
        this.assets = kb?.assets
        this.progress = kb?.progress?.toLowerCase()
        this.riskRating = kb?.riskRating?.toLowerCase()
        this.agentGroup = kb?.agentGroup
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
    showVulnDetails(vuln: OxoAggregatedKnowledgeBaseVulnerabilityType): void {
      this.selectedVulnerability = vuln
      this.vulnDetailsDialog = true
    },
    /**
     * Go to the vulnerability details page.
     * @param vuln
     */
    goToDetail(vuln: FormattedVulnz): void {
      this.$router.push(
        {
          name: 'scan-scanner-scan-vuln-vuln',
          params: {
            scan: this.scanId,
            scanner: crc32(this.scanner.endpoint),
            vuln: vuln.key ?? vuln.kb.id
          }
        }
      )
    },
    /**
     * Go to the vulnerability details page in a new tab.
     * @param vuln
     */
    goToDetailNewTab(vuln: FormattedVulnz): void {
      const routeData = this.$router.resolve(`/scan/${crc32(this.scanner.endpoint)}/${this.scanId}/vuln/${vuln.key ?? vuln.kb.id}`)
      window.open(routeData.href, '_blank')
    },
    /**
     * Fetch the most recent scans.
     */
    async fetchScans(): Promise<void> {
      this.breadcrumbs[BREADCRUMBS_SCANS_INDEX].scans = await this.scanService.getScans(
        this.scanner,
        {
          page: 1,
          numberElements: 20
        }
      )
    },
    /**
     * Updates the list of scans in the breadcrumbs with the current scan.
     */
    updateBreadcrumbs(): void {
      const currentScanInBreadcrumbs = (this.breadcrumbs[BREADCRUMBS_SCANS_INDEX]?.scans || [])?.find((scan) => scan.id === this.kb?.id)
      if (currentScanInBreadcrumbs === undefined) {
        this.breadcrumbs[BREADCRUMBS_SCANS_INDEX].scans = [...this.breadcrumbs[BREADCRUMBS_SCANS_INDEX]?.scans || [], this.kb]
      }
    },
    /**
     * Stop the scan
     */
    async stopScan(): Promise<void> {
      try {
        this.stopBtnLoading = true
        await this.scanService.stopScans(this.scanner, [this.scanId])
        await this.fetchKBVulnerabilities()
      } catch (e: any) {
        this.reportError(e?.message || 'Error Stopping scan.')
      } finally {
        this.stopBtnLoading = false
      }
    },
    /**
     * Delete the scan
     */
    async deleteScan(): Promise<void> {
      try {
        this.loadingDialog = true
        await this.scanService.deleteScans(this.scanner, [this.scanId])
        this.reportSuccess('Scan deleted successfully')
        this.$router.push('/scan/list')
      } catch (e) {
        this.reportError(`An error occurred while deleting the scan: ${e!.message}`)
      } finally {
        this.loadingDialog = false
      }
    },
    /**
     * Export the scan
     */
    async exportScan(): Promise<void> {
      try {
        this.loadingDialog = true
        this.reportInfo('Scan export in progress, this process may take some time.')
        await this.scanService.exportScan(this.scanner, this.scanId)
        this.reportSuccess('Scan exported successfully')
      } catch (e) {
        this.reportError(e?.message || 'An error occurred while exporting the scan')
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
