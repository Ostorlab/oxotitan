<template>
  <v-row>
    <v-col cols="12">
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
    </v-col>
    <v-col cols="12">
      <v-card
        variant="outlined"
        class="mt-3"
      >
        <v-data-table-server
          v-model:options="options"
          hover
          :headers="headers"
          :items="scans"
          :items-length="service.totalScans"
          :loading="loading"
          :items-per-page-options="[15, 50, 200, -1]"
          :items-per-page="options.itemsPerPage"
        >
          <template #[`item.Progress`]="{ item }">
            <DfScanProgress :progress="item.progress || 'unknown'" />
          </template>
          <template #[`item.CreatedTime`]="{ item }">
            {{ new Date(item.createdTime).toUTCString() }}
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
                    :prepend-icon="p.icon"
                    @click="p.action && p.action(item)"
                  >
                    <v-list-item-title>{{ p.title }}</v-list-item-title>
                  </v-list-item>
                </template>
              </v-list>
            </v-menu>
          </template>
          <template #[`item.scanner`]="{ item }">
            <DfTag :name="item.scanner" />
          </template>
        </v-data-table-server>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { mapActions } from 'pinia'
import ScanService from './ScanService'
import { DfScanProgress } from '~/dragonfly/components/Tags/DfScanProgress'
import { DfConfirmationModal } from '~/dragonfly/components/Modals/DfConfirmationModal'
import type { OxoScanType } from '~/graphql/types'
import { DfTag } from '~/dragonfly/components/Tags/DfTag'
import { useScannersStore } from '~/stores/scanners'

const HEADERS = [
  {
    title: 'scanner',
    align: 'left',
    sortable: false,
    key: 'scanner'
  },
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

definePageMeta({
  title: 'Scans',
  layout: 'default'
})
export default defineComponent({
  components: {
    DfTag,
    DfScanProgress,
    DfConfirmationModal
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
          action(scan: OxoScanType) {
            this.service.deleteScan(scan)
          },
          icon: 'mdi-delete'
        }
      ]
    }
  },
  mounted() {
    this.addScanner({
      endpoint: 'http://127.0.0.1:3420',
      apiKey: 'string'
    })
    this.addScanner({
      endpoint: 'http://localhost:3420',
      apiKey: 'string'
    })
    this.fetchScans()
  },
  methods: {
    ...mapActions(useScannersStore, ['addScanner']),
    async confirmStop(): Promise<void> {
      if (this.onActionScan === null || this.onActionScan === undefined) {
        return
      }
      await this.service.stopScan(this.onActionScan)
      this.onActionScan = null
      await this.fetchScans()
    },
    stopScan(scan: OxoScanType): void {
      this.onActionScan = scan
      this.stopDialog = true
    },
    async fetchScans() {
      this.loading = true
      this.scans = await this.service.getScans({})
      this.loading = false
    }
  }
})
</script>
