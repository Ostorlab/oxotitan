<template>
  <VulnerabilityDetail
    :scan-id="$route.params.scan"
    vuln-title="SQL Injection"
  />
</template>

<script lang="ts">
// :vuln-id="$route.params.vuln"
import VulnerabilityDetail from '~/scan/components/vulnz/VulnerabilityDetail.vue'

export default defineComponent({
  name: 'Vulnerability',
  components: { VulnerabilityDetail }
})
</script>
