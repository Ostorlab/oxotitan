<template>
  <div>
    <DfBreadcrumbs
      :breadcrumbs="breadcrumbs"
      class="mb-5"
    />
    <v-card
      variant="outlined"
      class="my-4"
      :loading="loading"
    >
      <v-card-title class="font-weight-light">
        Please fill in the required fields to import the scan:
      </v-card-title>
      <v-card-text>
        <ScannerSelect
          v-model:selected-scanner="selectedScanner"
          class="mb-6"
        />
        <v-file-input
          v-model="configFile"
          variant="outlined"
          show-size
          label="File"
          placeholder="Required JSON scan import file"
          prepend-icon="mdi-file-upload-outline"
          density="compact"
        />
        <v-text-field
          v-model="scanId"
          label="Scan Id"
          placeholder="Optional scan id to amend"
          clearable
          variant="outlined"
          prepend-icon="mdi-format-text"
          density="compact"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          variant="elevated"
          color="success"
          :loading="loading"
          @click="importScan"
        >
          <v-icon start>
            mdi-check
          </v-icon>Import
        </v-btn>
        <v-btn
          variant="elevated"
        >
          <v-icon start>
            mdi-close
          </v-icon>Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import ScanService from '~/project/scans/services/ScanService'
import type { Scanner } from '~/project/types'
import ScannerSelect from '~/project/scanners/components/ScannerSelect.vue'
import { DfBreadcrumbs } from '~/dragonfly/components/Sections/DfBreadcrumbs'
import type { VulnerabilityDetailBreadcrumbsType } from '~/dragonfly/components/Sections/DfBreadcrumbs/types'

const nuxt = useNuxtApp()
const notificationsStore = useNotificationsStore()
const service = new ScanService(nuxt.$axios)
const selectedScanner = ref<Scanner | null>(null)
const scanId = ref<number | null>(null)
const configFile = ref<File | null>(null)
const loading = ref<boolean>(false)
const breadcrumbs: VulnerabilityDetailBreadcrumbsType = [
  {
    text: 'Scan',
    disabled: true,
    exact: true
  },
  {
    text: 'Import',
    disabled: true,
    to: '/scan/import',
    exact: true
  }
]

/**
 * Clear all fields.
 */
const clear = () => {
  selectedScanner.value = null
  scanId.value = null
  configFile.value = null
}

/**
 * Import scan, update loading and shows notification.
 */
const importScan = async () => {
  try {
    loading.value = true

    if (selectedScanner.value === undefined || selectedScanner.value === null) {
      return
    }
    if (configFile.value === undefined || configFile.value === null) {
      return
    }

    await service.importScan(
      selectedScanner.value,
      configFile.value,
      scanId.value
    )
    notificationsStore.reportSuccess('Scan imported successfully.')
  } catch (e: any) {
    notificationsStore.reportError(e?.message || 'An error was encountered while importing scan.')
  } finally {
    loading.value = false
    clear()
  }
}
</script>

<style scoped>
</style>
