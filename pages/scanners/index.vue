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
          v-if="showForm === false"
          color="accent"
          prepend-icon="mdi-plus"
          @click="showForm = !showForm"
        >
          New
        </v-btn>
        <ScannerForm
          v-else
          :scanner="currentScanner"
          @close-form="closeForm"
        />
      </v-card-text>
    </v-card>
    <ScannersList />
  </div>
</template>

<script setup lang="ts">
import ScannerForm from '~/project/scanners/components/ScannerForm.vue'
import ScannersList from '~/project/scanners/components/ScannersList.vue'
import { DfBreadcrumbs } from '~/dragonfly/components/Sections/DfBreadcrumbs'
import type { VulnerabilityDetailBreadcrumbsType } from '~/dragonfly/components/Sections/DfBreadcrumbs/types'
import type { Scanner } from '~/project/types'

const showForm = ref(false)

const route = useRoute()
const currentScanner = ref<Scanner>({ endpoint: '', apiKey: '', name: '' })
onBeforeMount(() => {
  const endpoint = route.query.endpoint
  const apiKey = route.query.key
  const name = 'Local machine'
  if (endpoint !== undefined && endpoint !== null && apiKey !== undefined && apiKey !== null) {
    showForm.value = true
    currentScanner.value = {
      endpoint: endpoint.toString(),
      apiKey: apiKey.toString(),
      name
    }
  }
})

const breadcrumbs: VulnerabilityDetailBreadcrumbsType = [
  {
    text: 'Scanners',
    disabled: true,
    to: '/scanners',
    exact: true
  }
]

/**
 * Close the form and reset the current scanner.
 */
function closeForm() {
  showForm.value = false
  currentScanner.value = {
    endpoint: '',
    apiKey: '',
    name: ''
  }
}
</script>
