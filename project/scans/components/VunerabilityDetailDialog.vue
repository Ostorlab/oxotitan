<template>
  <div id="vulnerability-detail-container">
    <v-dialog
      ref="dialogRef"
      v-model="dialog"
      scrollable
      attach
      eager
      max-width="50%"
      transition="slide-x-transition"
      class="ml-auto"
      @after-leave="$emit('afterLeave')"
    >
      <v-card
        class="dialog-card pa-2"
        :loading="loading"
        style="min-height: 100vh"
      >
        <VulnerabilityDetail
          v-model:loading="loading"
          :vuln-title="vulnKey"
          :scan-id="scanId"
          :scanner="scanner"
          :show-breadcrumbs="false"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import type { OxoAggregatedKnowledgeBaseVulnerabilityType } from '~/graphql/types'
import VulnerabilityDetail from '~/project/scans/components/vulnz/VulnerabilityDetail.vue'
import type { Scanner } from '~/project/types'

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
    },
    scanner: {
      type: Object as () => Scanner,
      required: true
    }
  },
  emits: ['update:modelValue', 'update:loading', 'afterLeave'],
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
    },
    loading(newVal) {
      this.$emit('update:loading', newVal)
      if (this.vuln !== null && this.vuln !== undefined) {
        if (newVal === true) {
          this.dialog = false
        } else {
          this.dialog = true
        }
      }
    }
  }
})
</script>

<style lang="scss">
#vulnerability-detail-container {
  .v-dialog {
    display: block;

    & > .v-overlay__content {
      margin-top: 3px;
      margin-right: 3px;
      position: absolute;
      right: 0
    }
  }
}
</style>
