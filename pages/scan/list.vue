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
    />
  </v-card>
</template>

<script lang="ts">
const HEADERS = [
  {
    title: 'Target',
    align: 'left',
    sortable: true
  },
  {
    title: 'Title',
    align: 'left',
    sortable: true
  },
  {
    title: 'Platform',
    align: 'left',
    sortable: false,
    key: 'AssetType'
  },
  {
    title: 'Profile',
    align: 'left',
    sortable: true,
    key: 'ScanProfile'
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
    title: 'Risk',
    align: 'left',
    sortable: true,
    key: 'RiskRating'
  },
  {
    title: 'Actions',
    align: 'left',
    sortable: false
  },
  {
    title: 'scanner',
    align: 'left',
    sortable: false
  }
]

definePageMeta({
  title: 'Scans',
  layout: 'default'
})
export default defineComponent({
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
      archiveDialog: false,
      stopDialog: false,
      headers: HEADERS,
      currentPage: 0
    }
  }
})
</script>
