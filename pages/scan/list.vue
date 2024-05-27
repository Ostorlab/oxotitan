<template>
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
        <DfScanProgress :progress="item.progress" />
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
        <v-chip label>
          {{ item.scanner }}
        </v-chip>
      </template>
    </v-data-table-server>
  </v-card>
</template>

<script lang="ts">
import { DfScanProgress } from '~/dragonfly/components/Tags/DfScanProgress'
import { DfRisk } from '~/dragonfly/components/Tags/DfRisk'
import { DfPlatform } from '~/dragonfly/components/Tags/DfPlatform'
import { DfConfirmationModal } from '~/dragonfly/components/Modals/DfConfirmationModal'

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
    sortable: true,
    key: 'asset'
  },
  {
    title: 'Title',
    align: 'left',
    sortable: true,
    key: 'title'
  },
  {
    title: 'Created time (UTC)',
    align: 'left',
    sortable: true,
    key: 'CreatedTime'
  },
  {
    title: 'Progress',
    align: 'left',
    sortable: true,
    key: 'Progress'
  },
  {
    title: 'Actions',
    align: 'left',
    sortable: false,
    key: 'Action'
  }
]

definePageMeta({
  title: 'Scans',
  layout: 'default'
})
export default defineComponent({
  components: {
    DfScanProgress,
    DfRisk,
    DfPlatform,
    DfConfirmationModal
  },
  data() {
    return {
      service: {
        totalScans: 0
      },
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
          disabled(scan: ScanType) {
            return !(
              scan.progress === 'IN_PROGRESS' || scan.progress === 'NOT_STARTED'
            )
          }
        },
        { divider: true },
      ]
    }
  },
  mounted() {
    this.fetchScans()
  },
  methods: {
    stopScan(scan): void {
      this.onActionScan = scan
      this.stopDialog = true
      alert('Stop scan')
    },
    async fetchScans() {
      this.loading = true
      const response = await this.$axios.post('http://localhost:3420/graphql', {
        query: `query scans{
        scans{
          scans{
            id
            title
            asset
            createdTime
            progress
          }
        }
      }`
      })
      this.scans = response.data.data.scans.scans.map((scan) => {
        return {
          ...scan,
          scanner: 'Nessus'
        }
      })
      this.loading = false
    }
  }
})
</script>
