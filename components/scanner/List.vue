<template>
  <v-list lines="one">
    <ScannerItem
      v-for="scanner in scanners"
      :key="scanner.endpoint"
      :scanner="scanner"
      @update-scanner="onUpdateScanner"
    />
  </v-list>
</template>

<script setup lang="ts">
import type { Scanner } from '~/stores/scanners'

const scannersStore = useScannersStore()
const scanners = computed(() => scannersStore.scanners)
const emit = defineEmits(['update-scanner'])

const onUpdateScanner = (scanner: Scanner) => {
  emit('update-scanner', scanner)
}
</script>
