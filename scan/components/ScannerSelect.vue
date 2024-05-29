<template>
  <v-select
    v-model="selectedScanner"
    :items="scanners"
    hide-details
    variant="outlined"
    item-title="endpoint"
    density="compact"
    clearable
    label="Select a scanner"
    placeholder="Select or create a scanner to run the scan on"
  />
</template>

<script lang="ts">
import { mapStores } from 'pinia'
import type { Scanner } from '~/stores/scanners'
import { useScannersStore } from '~/stores/scanners'

interface Data {
  selectedScanner: Scanner | null
  scanners: Array<Scanner>
}
export default defineComponent({
  name: 'ScannerSelect',
  data(): Data {
    return {
      selectedScanner: null,
      scanners: []
    }
  },
  computed: {
    ...mapStores(useScannersStore)
  },
  mounted() {
    this.scanners = this.scannersStore?.scanners || []
  }
})
</script>
