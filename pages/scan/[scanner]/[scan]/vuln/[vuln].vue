<template>
  <VulnerabilityDetail
    :scan-id="$route.params.scan"
    :scanner="scanner"
    :vuln-title="$route.params.vuln"
  />
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'
import crc32 from 'crc32/lib/crc32'
import { useScannersStore } from '~/stores/scanners'
import VulnerabilityDetail from '~/scan/components/vulnz/VulnerabilityDetail.vue'
import type { Scanner } from '~/project/types'

interface Data {
  scanner: Scanner
}

export default defineComponent({
  name: 'Vulnerability',
  components: { VulnerabilityDetail },
  data(): Data {
    return {
      scanner: {
        endpoint: '',
        name: '',
        apiKey: ''
      }
    }
  },
  computed: {
    ...mapState(useScannersStore, ['scanners'])
  },
  created() {
    const scanner = this.scanners.find((_scanner) => crc32(_scanner.endpoint) === this.$route.params.scanner)
    if (scanner === undefined) {
      this.reportError('Scanner not found')
      this.$router.push({
        name: 'scan-list'
      })
    } else {
      this.scanner = scanner
    }
  },
  methods: {
    ...mapActions(useNotificationsStore, ['reportError'])
  }
})
</script>
