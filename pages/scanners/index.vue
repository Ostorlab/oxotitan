<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-btn
          :color="showForm ? 'error' : 'primary'"
          variant="outlined"
          @click="showForm = !showForm"
        >
          {{ showForm ? 'Cancel' : 'Add Scanner' }}
        </v-btn>
        <ScannerForm
          v-if="showForm"
          :scanner="currentScanner"
          @close-form="onCloseForm"
        />
        <v-divider class="my-4" />
        <ScannerList @update-scanner="onUpdateScanner" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import type { Scanner } from '~/stores/scanners'

const showForm = ref(false)
const currentScanner = ref<Scanner | null>(null)

const onUpdateScanner = (scanner: Scanner) => {
  showForm.value = true
  currentScanner.value = scanner
}
const onCloseForm = () => {
  showForm.value = false
  currentScanner.value = null
}
</script>
