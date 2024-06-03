<template>
  <v-stepper-vertical-item
    title="Target Web APIs"
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
        Please specify the target Web APIs:
      </p>
      <v-textarea
        v-model="rawUrls"
        :error-messages="rawUrlsErrorMessages"
        variant="outlined"
        density="compact"
        clearable
        label="Web APIs"
        placeholder="Add Web APIs each on a separate line"
        prepend-icon="mdi-api"
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
    :step="step + 1"
    :selected-scanner="selectedScanner"
    @reset="$emit('reset')"
  />
</template>

<script lang="ts">
import validator from 'validator'
import LoadingDialog from '~/common/components/LoadingDialog.vue'
import type { Scanner } from '~/project/types'
import AgentGroupSelect from '~/scan/components/AgentGroupSelect.vue'

interface Data {
  rawUrls: string | null
  loadingDialog: boolean
  isFormValid: boolean
}

export default defineComponent({
  name: 'CreateWebApiScanForm',
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
    }
  },
  emits: ['reset'],
  data(): Data {
    return {
      isFormValid: false,
      rawUrls: null,
      loadingDialog: false
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
    createScan(): void {}
  }
})
</script>
