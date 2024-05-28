<template>
  <v-container class="ga-2">
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
    <v-card variant="outlined">
      <v-card-text>
        <ScannerList @update-scanner="onUpdateScanner" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import type { Scanner } from '~/stores/scanners'

const showForm = ref(false)

const currentScanner = ref<Scanner | null>(null)

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
