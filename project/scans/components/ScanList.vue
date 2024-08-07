<template>
  <div>
    <DfConfirmationModal
      v-model="stopDialog"
      title="Are you sure you would like to stop the selected scans?"
      description="A stopped scan cannot be resumed."
      cancel-button-text="Cancel"
      confirm-button-text="Stop"
      cancel-icon="mdi-close"
      confirm-icon="mdi-check"
      confirm-button-color="secondary"
      card-icon="mdi-stop-circle-outline"
      @confirm="confirmStopSelectedScans"
    />
    <DfConfirmationModal
      v-model="deleteScanDialog"
      title="Are you sure you would like to archive the selected scans?"
      cancel-button-text="Cancel"
      confirm-button-text="Delete"
      cancel-icon="mdi-close"
      confirm-icon="mdi-check"
      confirm-button-color="secondary"
      card-icon="mdi-archive-arrow-down-outline"
      @confirm="confirmDeleteSelectedScans"
    />
    <v-card variant="outlined" class="mb-5">
      <v-btn :icon="mdi-refresh" @click="stopScans" :disabled="selected.length === 0" class="mx-1 my-1">
        <v-icon start>
          mdi-stop-circle-outline
        </v-icon>Stop
      </v-btn>
      <v-btn @click="deleteScans" :disabled="selected.length === 0" class="mx-1 my-1">
        <v-icon start>
          mdi-trash-can-outline
        </v-icon>Delete
      </v-btn>
    </v-card>
    <v-card
      variant="outlined"
    >
      <v-card-title class="pt-2 pl-2">
        <v-chip label>
          {{ scanner.name || scanner.endpoint }}
        </v-chip>
      </v-card-title>
      <v-data-table-server
        v-model:options="options"
        hover
        show-select
        v-model="selected"
        :headers="headers"
        :items="scans"
        :items-length="service.totalScans"
        :loading="loading"
        :items-per-page-options="[15, 50, 200, -1]"
        :items-per-page="options.itemsPerPage"
        density="comfortable"
        @click:row="goToScan"
      >
        <template #[`item.Progress`]="{ item }">
          <DfScanProgress :progress="item.progress || 'unknown'" />
        </template>
        <template #[`item.CreatedTime`]="{ item }">
          {{ $moment(item.createdTime).format('MMMM Do YYYY, k:mm:ss') }}
        </template>
        <template #[`item.Action`]="{ item }">
          <v-menu
            bottom
            left
            offset-y
          >
            <template #activator="{ props }">
              <v-btn
                icon="mdi-dots-vertical"
                v-bind="props"
                variant="flat"
                size="small"
              />
            </template>

            <v-list density="compact">
              <template v-for="(p, i) in actions">
                <v-divider
                  v-if="p.divider !== undefined"
                  :key="`divider-${i}`"
                  class="mb-2 mt-2"
                />
                <v-list-item
                  v-else
                  :key="`item-${i}`"
                  density="compact"
                  :disabled="p.disabled ? p.disabled(item) : false"
                  @click="p.action && p.action(item)"
                >
                  <div class="d-flex align-center">
                    <v-icon start>
                      {{ p.icon }}
                    </v-icon>
                    <v-list-item-title>{{ p.title }}</v-list-item-title>
                  </div>
                </v-list-item>
              </template>
            </v-list>
          </v-menu>
        </template>
        <template #[`item.asset`]="{ item }">
          <OXOAssets :assets="item.assets || []" />
        </template>
        <template #[`item.title`]="{ item }">
          {{ item.title || '-' }}
        </template>
      </v-data-table-server>
    </v-card>
  </div>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'
import crc32 from 'crc32/lib/crc32.js'
import ScanService from '~/project/scans/services/ScanService'
import { DfScanProgress } from '~/dragonfly/components/Tags/DfScanProgress'
import { DfConfirmationModal } from '~/dragonfly/components/Modals/DfConfirmationModal'
import type { OxoScanType } from '~/graphql/types'
import { useScannersStore } from '~/stores/scanners'
import type { Scanner } from '~/project/types'
import { useNotificationsStore } from '~/stores/notifications'
import OXOAssets from '~/project/assets/components/Assets.vue'

const HEADERS = [
  {
    title: 'Target',
    align: 'left',
    sortable: false,
    key: 'asset'
  },
  {
    title: 'Title',
    align: 'left',
    sortable: false,
    key: 'title',
    width: '24%'
  },
  {
    title: 'Created time (UTC)',
    align: 'left',
    sortable: false,
    key: 'CreatedTime',
    width: '14%'
  },
  {
    title: 'Progress',
    align: 'left',
    sortable: false,
    key: 'Progress',
    width: '8%'
  }
]
interface Data {
  service: ScanService
  scans: Array<OxoScanType>
  loading: boolean
  options: {
    itemsPerPage: number
    sortDesc: boolean[]
    sortBy: Array<{ key: string, order: string }>
    page: number
  }
  onActionScan: OxoScanType | null
  stopDialog: boolean
  headers: typeof HEADERS
  currentPage: number
  deleteScanDialog: boolean
}

type ActionsType = {
  title?: string
  action?: (scan: OxoScanType) => void
  icon?: string
  disabled?: (scan: OxoScanType) => boolean
  divider?: boolean
}

export default defineComponent({
  components: {
    OXOAssets,
    DfScanProgress,
    DfConfirmationModal
  },
  props: {
    scanner: {
      type: Object as PropType<Scanner>,
      required: true
    }
  },
  data(): Data {
    return {
      selected: [],
      service: new ScanService(this.$axios),
      scans: [],
      deleteScanDialog: false,
      loading: true,
      options: {
        itemsPerPage: 15,
        page: 1,
        sortDesc: [true],
        sortBy: [
          {
            key: 'CreatedTime',
            order: 'desc'
          }
        ]
      },
      onActionScan: null,
      stopDialog: false,
      headers: HEADERS,
      currentPage: 0
    }
  },
  watch: {
    options: {
      handler() {
        this.fetchScans()
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(useNotificationsStore, ['reportSuccess', 'reportError']),

    /**
     * Go to the scan page.
     * @param _event
     * @param scan
     */
    goToScan(_event: PointerEvent, scan: { item: OxoScanType }) {
      this.$router.push(
        {
          name: 'scan-scanner-scan',
          params: {
            scan: scan.item.id,
            scanner: crc32(this.scanner.endpoint)
          }
        }
      )
    },
    /**
     * Stop the scan
     * @param scan
     */
    stopScans(scan: OxoScanType): void {
      this.onActionScan = scan
      this.stopDialog = true
    },
    /**
     * Stop the selected scans
     */
    async confirmStopSelectedScans(): Promise<void> {
      try {
        await this.service.stopScan(this.scanner, this.selected)
        await this.fetchScans()
      } catch (e: any) {
        this.reportError(e?.message || 'An error occurred while stopping the scans')
      } finally {
        this.onActionScan = null
        this.selected = []
      }
    },
    /**
     * Delete the scan
     * @param scan
     */
    deleteScans(scan: OxoScanType): void {
      this.onActionScan = scan
      this.deleteScanDialog = true
    },
    /**
     * Confirm deleting the scan.
     */
    async confirmDeleteSelectedScans(): Promise<void> {
      if (this.onActionScan === null || this.onActionScan === undefined) {
        return
      }
      try {
        this.loading = true
        await this.service.deleteScan(this.scanner, this.selected)
        this.reportSuccess('Scans deleted successfully')
      } catch (e: any) {
        this.reportError(`An error occurred while deleting the scan: ${e?.message}`)
      } finally {
        this.onActionScan = null
        this.loading = false
        this.selected = []
      }
      await this.fetchScans()
    },
    /**
     * Fetch the scans
     */
    async fetchScans() {
      this.loading = true
      try {
        if (!this.scanner) {
          return
        }
        this.scans = await this.service.getScans(this.scanner, {
          numberElements: this.options.itemsPerPage,
          page: this.options.page
        })
      } catch (e) {
        this.reportError(`An error occurred while fetching scans from: ${this.scanner.name || this.scanner.endpoint}: ${e!.message}`)
      } finally {
        this.loading = false
      }
    }
  }
})
</script>
