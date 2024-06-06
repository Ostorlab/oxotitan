<template>
  <div>OXO</div>
</template>

<script setup lang="ts">
import { useScannersStore } from '~/stores/scanners'

const scannersStore = useScannersStore()
const scanners = scannersStore.scanners

onMounted(() => {
  if (scanners.length === 0) {
    navigateTo('/scanners')
  } else {
    navigateTo('/scan/list')
  }
})
</script>
