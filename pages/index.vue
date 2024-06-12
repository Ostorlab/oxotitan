<template>
  <div>
    <div
      v-if="false"
      style="position: absolute; top: 50%; left:50%; transform: translate(-50%, -50%); background: repeating-linear-gradient(to right, #00415d 0%, #00415d 50%, #0081ba 100%); filter: blur(100px); opacity: 0.5; height: 200px; width: 500px;"
    />
    <SvgLoader />
    <div class="oxo-loader-bar" />
  </div>
</template>

<script setup lang="ts">
import { useScannersStore } from '~/stores/scanners'
import SvgLoader from '~/project/common/components/SvgLoader.vue'

const scannersStore = useScannersStore()
const scanners = scannersStore.scanners

onMounted(() => {
  if (scanners.length === 0) {
    // navigateTo('/scanners')
  } else {
    // navigateTo('/scan/list')
  }
})
</script>

<style scoped>
.oxo-loader-bar {
  background: repeating-linear-gradient(to right, #00415d 0%, #14506A 25%, #148BBF 50%, #4078c0 75%, #0081ba 100%);
  background-size: 200% auto;
  background-position: 0 0;
  position: fixed;
  height: 100px;
  bottom: -50px;
  left: -50px;
  right: -50px;
  filter: blur(100px);
  animation: gradient 3s infinite;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
}

@keyframes gradient {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
