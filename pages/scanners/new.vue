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
      <v-card-title>
        Add a new scanner
      </v-card-title>
      <v-card-text>
        <ScannerForm
          v-if="showForm === true"
          :scanner="currentScanner"
          @close-form="closeForm"
        />
        <v-skeleton-loader
          v-else
          type="heading@3, button@2"
          width="400px"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import ScannerForm from '~/project/scanners/components/ScannerForm.vue'
import { DfBreadcrumbs } from '~/dragonfly/components/Sections/DfBreadcrumbs'
import type { VulnerabilityDetailBreadcrumbsType } from '~/dragonfly/components/Sections/DfBreadcrumbs/types'
import type { Scanner } from '~/project/types'

const showForm = ref(false)
const route = useRoute()
const router = useRouter()
const currentScanner = ref<Scanner>({ endpoint: '', apiKey: '', name: '' })

onMounted(() => {
  const endpoint = route.query.endpoint
  const apiKey = route.query.key
  const name = 'Local machine'
  if (endpoint !== undefined && endpoint !== null && apiKey !== undefined && apiKey !== null) {
    currentScanner.value = {
      endpoint: endpoint.toString(),
      apiKey: apiKey.toString(),
      name
    }
  }
  showForm.value = true
})

const breadcrumbs: VulnerabilityDetailBreadcrumbsType = [
  {
    text: 'Scanners',
    disabled: false,
    to: '/scanners',
    exact: true
  },
  {
    text: 'New',
    disabled: true,
    to: '/scanners',
    exact: true
  }
]

/**
 * Close the form and reset the current scanner.
 */
function closeForm() {
  currentScanner.value = {
    endpoint: '',
    apiKey: '',
    name: ''
  }
  router.push({ path: '/scanners' })
}
</script>
