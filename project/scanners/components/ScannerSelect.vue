<template>
  <v-select
    v-model="selectedScanner"
    :items="scanners"
    :item-props="getScannerDetials"
    hide-details
    variant="outlined"
    item-title="endpoint"
    density="compact"
    clearable
    return-object
    label="Select a scanner"
    placeholder="Select or create a scanner to run the scan on"
    prepend-icon="mdi-shield-search"
  >
    <template #selection="{ item }">
      <p
        v-if="(item.raw.name || '').trim() !== ''"
        class="mb-0"
      >
        {{ item.raw.name }} (<code>{{ item.raw.endpoint }}</code>)
      </p>
      <code
        v-else
        class="mb-0"
      >{{ item.raw.endpoint }}</code>
    </template>
  </v-select>
</template>

<script lang="ts">
import { mapStores } from 'pinia'
import type { Scanner } from '~/project/types'
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
  },
  methods: {
    /**
     * Get the scanner details.
     * @param scanner The scanner whose details to get.
     */
    getScannerDetials(scanner: Scanner): { title: string, subtitle: string } {
      const scannerHasName = (scanner.name || '').trim() !== ''
      return {
        title: scannerHasName === true ? scanner.name : scanner.endpoint,
        subtitle: scannerHasName === true ? scanner.endpoint : ''
      }
    }
  }
})
</script>
