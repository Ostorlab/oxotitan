<template>
  <div>
    <DfConfirmationModal
      v-model="stopDialog"
      title="Are you sure you would like to stop the scan?"
      description="A stopped scan cannot be resumed."
      cancel-button-text="Cancel"
      confirm-button-text="Stop"
      cancel-icon="mdi-close"
      confirm-icon="mdi-check"
      confirm-button-color="secondary"
      card-icon="mdi-stop-circle-outline"
      @confirm="confirmStop"
    />

    <v-card
      variant="outlined"
      class="pa-2"
    >
      <v-card-title class="pa-0">
        <v-chip label>
          {{ scanner.name || scanner.endpoint }}
        </v-chip>
      </v-card-title>
      <v-data-table-server
        v-model:options="options"
        hover
        :headers="headers"
        :items="scans"
        :items-length="service.totalScans"
        :loading="loading"
        :items-per-page-options="[15, 50, 200, -1]"
        :items-per-page="options.itemsPerPage"
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
          <!--          TODO: Adding component to show asset in the next PR -->
          {{ item.assets || '-' }}
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
    key: 'title'
  },
  {
    title: 'Created time (UTC)',
    align: 'left',
    sortable: false,
    key: 'CreatedTime'
  },
  {
    title: 'Progress',
    align: 'left',
    sortable: false,
    key: 'Progress'
  },
  {
    title: 'Actions',
    align: 'left',
    sortable: false,
    key: 'Action'
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
  }
  onActionScan: OxoScanType | null
  stopDialog: boolean
  headers: typeof HEADERS
  currentPage: number

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
      service: new ScanService(this.$axios),
      scans: [],
      loading: true,
      options: {
        itemsPerPage: 15,
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
  computed: {
    ...mapState(useScannersStore, ['scanners']),
    /**
     * Action to be used with the table for the scans
     */
    actions(): Array<ActionsType> {
      return [
        {
          title: 'Stop',
          action: this.stopScan,
          icon: 'mdi-stop',
          disabled(scan: OxoScanType) {
            return !(
              scan.progress === 'IN_PROGRESS' || scan.progress === 'NOT_STARTED'
            )
          }
        },
        {
          divider: true
        },
        {
          title: 'Delete',
          action: this.deleteScan,
          icon: 'mdi-delete'
        }
      ]
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
     * Confirm the stop of the scan
     */
    async confirmStop(): Promise<void> {
      if (this.onActionScan === null || this.onActionScan === undefined) {
        return
      }
      await this.service.stopScan(this.onActionScan)
      this.onActionScan = null
      await this.fetchScans()
    },
    /**
     * Stop the scan
     * @param scan
     */
    stopScan(scan: OxoScanType): void {
      this.onActionScan = scan
      this.stopDialog = true
    },
    /**
     * Delete the scan
     * @param scan
     */
    async deleteScan(scan: OxoScanType): Promise<void> {
      this.loading = true
      try {
        await this.service.deleteScan(this.scanner, parseInt(scan.id))
        this.reportSuccess('Scan deleted successfully')
      } catch (e) {
        this.reportError(`An error occurred while deleting the scan: ${e!.message}`)
      } finally {
        this.loading = false
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
