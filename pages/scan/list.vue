<template>
  <v-row>
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
      v-else
      content="center"
    >
      <v-card>
        <v-card-title>No scanners found</v-card-title>
        <v-card-actions>
          <v-btn
            color="primary"
            to="/scanners"
          >
            Add Scanner
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { mapState } from 'pinia'
import { useScannersStore } from '~/stores/scanners'
import ScanList from '~/pages/scan/scanList.vue'

definePageMeta({
  title: 'Scans',
  layout: 'default'
})
export default defineComponent({
  components: {
    ScanList
  },
  computed: {
    ...mapState(useScannersStore, ['scanners'])
  }
})
</script>
