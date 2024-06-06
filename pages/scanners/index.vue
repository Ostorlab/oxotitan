<template>
  <div>
    <DfBreadcrumbs
      :breadcrumbs="breadcrumbs"
      class="mb-5"
    />
    <v-card
      variant="outlined"
      class="my-4"
    >
      <v-card-text>
        <v-btn
          v-if="!showForm"
          color="primary"
          prepend-icon="mdi-plus"
          @click="showForm = !showForm"
        >
          New
        </v-btn>
        <ScannerForm
          v-else
          :scanner="currentScanner"
          @close-form="onCloseForm"
        />
      </v-card-text>
    </v-card>
    <SvgLoader v-if="loading === true" />
    <v-card
      v-else-if="loading === false && scanners.length > 0"
      variant="outlined"
    >
      <v-card-text>
        <ScannerList @update-scanner="onUpdateScanner" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import SvgLoader from '~/common/components/SvgLoader.vue'
import { DfBreadcrumbs } from '~/dragonfly/components/Sections/DfBreadcrumbs'
import type { VulnerabilityDetailBreadcrumbsType } from '~/dragonfly/components/Sections/DfBreadcrumbs/types'
import type { Scanner } from '~/project/types'

const scannersStore = useScannersStore()

const scanners = computed(() => scannersStore.scanners)
const loading = ref(true)
const showForm = ref(false)

const currentScanner = ref<Scanner | null>(null)

const breadcrumbs: VulnerabilityDetailBreadcrumbsType = [
  {
    text: 'Scanning',
    disabled: true,
    exact: true
  },
  {
    text: 'Scanners',
    disabled: true,
    to: '/scanners',
    exact: true
  }
]

onMounted(() => {
  loading.value = false
})

/**
 * Handle the update-scanner event.
 * @param {Scanner} scanner - The scanner object to be updated.
 */
const onUpdateScanner = (scanner: Scanner): void => {
  showForm.value = true
  currentScanner.value = scanner
}

/**
 * Handle the close-form event.
 */
const onCloseForm = (): void => {
  showForm.value = false
  currentScanner.value = null
}
</script>
