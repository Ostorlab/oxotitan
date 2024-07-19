<template>
  <div>
    <v-select
      v-if="scanners.length > 0"
      v-model="scanner"
      :items="scanners"
      :item-props="getScannerDetails"
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
    <div v-else>
      <v-btn
        color="primary"
        @click="showNewScannerForm = true"
      >
        <v-icon start>
          mdi-plus
        </v-icon> New Scanner
      </v-btn>
    </div>
    <v-dialog
      v-model="showNewScannerForm"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Create New Scanner</span>
        </v-card-title>
        <v-card-text>
          <ScannerForm @close-form="showNewScannerForm = false" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { mapStores } from 'pinia'
import type { Scanner } from '~/project/types'
import { useScannersStore } from '~/stores/scanners'
import ScannerForm from '~/project/scanners/components/ScannerForm.vue'

interface Data {
  scanner: Scanner | null
  scanners: Array<Scanner>
  showNewScannerForm: boolean
}

export default defineComponent({
  name: 'ScannerSelect',
  components: {
    ScannerForm
  },
  props: {
    selectedScanner: {
      type: Object as () => Scanner | null,
      default: null
    }
  },
  emits: ['update:selectedScanner'],
  data(): Data {
    return {
      scanner: this.selectedScanner,
      scanners: [],
      showNewScannerForm: false
    }
  },
  computed: {
    ...mapStores(useScannersStore)
  },
  watch: {
    /**
     * Update the selected scanner when the scanner changes.
     * @param newSelectedScanner The new scanner.
     */
    selectedScanner(newSelectedScanner) {
      this.scanner = newSelectedScanner
    },
    /**
     * Emit the selected scanner when the scanner changes.
     * @param newSelectedScanner The new scanner.
     */
    scanner(newSelectedScanner) {
      this.$emit('update:selectedScanner', newSelectedScanner)
    }
  },
  mounted() {
    this.scanners = this.scannersStore?.scanners || []
  },
  methods: {
    /**
     * Get the scanner details.
     * @param scanner The scanner whose details to get.
     */
    getScannerDetails(scanner: Scanner): { title: string, subtitle: string } {
      const scannerHasName = (scanner.name || '').trim() !== ''
      return {
        title: scannerHasName ? scanner.name : scanner.endpoint,
        subtitle: scannerHasName ? scanner.endpoint : ''
      }
    }
  }
})
</script>
