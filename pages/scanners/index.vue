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
          @close-form="showForm = false"
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

const showForm = ref(false)

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
</script>
