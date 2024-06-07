<template>
  <div class="vulnerability-detail-container">
    <v-dialog
      ref="dialogRef"
      v-model="dialog"
      scrollable
      attach
      eager
      max-width="50%"
      transition="slide-x-transition"
      class="ml-auto"
    >
      <v-card
        class="dialog-card pa-2"
        :loading="loading"
        style="min-height: 100vh"
      >
        <VulnerabilityDetail
          :vuln-title="vulnKey"
          :scan-id="scanId"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import type { OxoAggregatedKnowledgeBaseVulnerabilityType } from '~/graphql/types'
import VulnerabilityDetail from '~/project/scans/components/vulnz/VulnerabilityDetail.vue'

interface Data {
  dialog: boolean
  loading: boolean
}

export default defineComponent({
  name: 'VulnerabilityDetailDialog',
  components: { VulnerabilityDetail },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    vuln: {
      type: Object as () => OxoAggregatedKnowledgeBaseVulnerabilityType & { goToVulnId: boolean, key: string },
      default: null
    },
    scanId: {
      type: Number as () => number | undefined,
      required: true
    }
  },
  emits: ['update:modelValue'],
  data(): Data {
    return {
      loading: false,
      dialog: false
    }
  },
  computed: {
    vulnKey() {
      return this.vuln?.key
    }
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(val: boolean): void {
        this.dialog = val
      }
    },
    dialog(val: boolean): void {
      this.$emit('update:modelValue', val)
    }
  }
})
</script>
