<template>
  <div>
    <DfBreadcrumbs
      :breadcrumbs="breadcrumbs"
      class="mb-5"
    />
    <v-row justify="center">
      <template v-if="scanners.length>0">
        <v-col
          v-for="scanner in scanners"
          :key="scanner.endpoint"
          cols="12"
        >
          <scan-list :scanner="scanner" />
        </v-col>
      </template>
      <v-col
        v-else-if="scanners.length===0"
        content="center"
        cols="6"
        align-self="center"
      >
        <v-card variant="outlined">
          <v-card-title>No scanners found</v-card-title>
          <v-card-actions>
            <v-btn
              variant="elevated"
              color="primary"
              to="/scanners"
            >
              Add Scanner
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { mapState } from 'pinia'
import ScanList from '~/project/scans/componenets/scanList.vue'
import { DfBreadcrumbs } from '~/dragonfly/components/Sections/DfBreadcrumbs'
import type { VulnerabilityDetailBreadcrumbsType } from '~/dragonfly/components/Sections/DfBreadcrumbs/types'

definePageMeta({
  title: 'Scans',
  layout: 'default'
})

interface Data {
  breadcrumbs: VulnerabilityDetailBreadcrumbsType
}

export default defineComponent({
  components: {
    ScanList,
    DfBreadcrumbs
  },
  data(): Data {
    return {
      breadcrumbs: [
        {
          text: 'Scanning',
          disabled: true,
          exact: true
        },
        {
          text: 'Scans',
          to: '/scan/list',
          exact: true
        }
      ]
    }
  },
  computed: {
    ...mapState(useScannersStore, ['scanners'])
  }
})
</script>
