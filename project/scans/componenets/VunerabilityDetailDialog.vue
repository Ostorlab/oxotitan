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
        class="dialog-card px-2"
        :loading="loading"
        style="min-height: 100vh"
      >
        {{ vuln }}
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import type { OxoAggregatedKnowledgeBaseVulnerabilityType } from '~/graphql/types'

interface Data {
  dialog: boolean
  loading: boolean
}

export default defineComponent({
  name: 'VulnerabilityDetailDialog',
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
