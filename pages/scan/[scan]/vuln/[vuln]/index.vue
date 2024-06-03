<template>
  <!-- TODO (Rabson) Read vulnTitle from object passed from the scan page -->
  <VulnerabilityDetail
    :scan-id="$route.params.scan"
    vuln-title="XSS"
  />
</template>

<script lang="ts">
import VulnerabilityDetail from '~/scan/components/vulnz/VulnerabilityDetail.vue'

export default defineComponent({
  name: 'Vulnerability',
  components: { VulnerabilityDetail }
})
</script>
