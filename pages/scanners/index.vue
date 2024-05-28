<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-btn
          v-if="!showForm"
          color="primary"
          @click="showForm = !showForm"
        >
          Add Scanner
        </v-btn>
        <ScannerForm
          v-else
          :scanner="currentScanner"
          @close-form="onCloseForm"
        />
      </v-card-text>
    </v-card>
    <v-divider class="my-6" />
    <v-card>
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

const onUpdateScanner = (scanner: Scanner) => {
  showForm.value = true
  currentScanner.value = scanner
}
const onCloseForm = () => {
  showForm.value = false
  currentScanner.value = null
}
</script>
