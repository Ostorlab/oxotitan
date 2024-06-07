<template>
  <v-stepper-vertical-item
    title="Target URLs / domains"
    subtitle="required"
    :error="rawUrlsErrorMessages.length > 0"
    :value="step"
  >
    <LoadingDialog
      v-model:loading-dialog="loadingDialog"
      message="Please stand by while creating scan"
    />
    <v-form v-model="isFormValid">
      <p class="subtitle-1 mb-3">
        Please specify the target URLs / domains:
      </p>
      <v-textarea
        v-model="rawUrls"
        :error-messages="rawUrlsErrorMessages"
        variant="outlined"
        density="compact"
        clearable
        label="URLs / domains"
        placeholder="Add URLs and domains each on a separate line"
        prepend-icon="mdi-web"
      />
    </v-form>
    <template #next="{ next }">
      <v-btn
        color="primary"
        variant="elevated"
        :disabled="isContinueDisabled"
        @click="next"
      >
        <v-icon start>
          mdi-skip-next-outline
        </v-icon>
        Continue
      </v-btn>
    </template>
    <template #prev="{ prev }">
      <v-btn
        variant="elevated"
        class="ml-2"
        @click="prev"
      >
        Previous
      </v-btn>
    </template>
  </v-stepper-vertical-item>
  <AgentGroupSelect
    v-model:model-value="selectedAgentGroup"
    :create-scan-loading="createScanLoading"
    :step="step + 1"
    :selected-scanner="selectedScanner"
    @reset="$emit('reset')"
    @create-scan="$emit('createScan')"
  />
</template>

<script lang="ts">
import validator from 'validator'
import LoadingDialog from '~/project/common/components/LoadingDialog.vue'
import type { Scanner } from '~/project/types'
import AgentGroupSelect from '~/project/scans/components/AgentGroupSelect.vue'

interface Data {
  rawUrls: string | null
  loadingDialog: boolean
  isFormValid: boolean
  selectedAgentGroup: unknown
}

export default defineComponent({
  name: 'CreateWebScanForm',
  components: {
    LoadingDialog,
    AgentGroupSelect
  },
  props: {
    step: {
      type: Number,
      default: 1
    },
    selectedScanner: {
      type: Object as () => Scanner,
      required: true
    },
    createScanLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['reset', 'update:assets', 'update:agent-group-id', 'createScan'],
  data(): Data {
    return {
      isFormValid: false,
      rawUrls: null,
      loadingDialog: false,
      selectedAgentGroup: null
    }
  },
  computed: {
    /**
     * The formatted user URLs.
     */
    userUrls(): Array<string> {
      return this.rawUrls?.split('\n').filter(Boolean) || []
    },
    /**
     * The error messages for the user URLs.
     */
    rawUrlsErrorMessages(): Array<string> {
      const errors: Array<string> = []
      for (const url of this.userUrls) {
        if (validator.isURL(url) === false) {
          errors.push(`URL ${url} is invalid`)
        }
      }
      return errors
    },
    isContinueDisabled(): boolean {
      return this.rawUrlsErrorMessages.length > 0 || this.rawUrls === null || this.rawUrls?.trim() === ''
    }
  },
  watch: {
    userUrls: {
      deep: true,
      immediate: false,
      handler(newVal) {
        this.$emit('update:assets', [{ url: { links: newVal } }])
      }
    },
    selectedAgentGroup: {
      deep: true,
      handler(newVal) {
        this.$emit('update:agent-group-id', newVal?.id)
      }
    }
  },
  methods: {
    /**
     * Clear the input.
     */
    clear(): void {
      this.rawUrls = null
    },
    /**
     * Create a scan.
     */
    createScan() {}
  }
})
</script>
