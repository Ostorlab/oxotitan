<template>
  <v-stepper-vertical-item
    title="Package Name"
    subtitle="required"
    :error="stepHasErrors"
    :value="step"
  >
    <LoadingDialog
      v-model:loading-dialog="loadingDialog"
      message="Please stand by while creating scan"
    />
    <v-form v-model="isFormValid">
      <v-text-field
        v-model="packageName"
        :rules="[rules.required]"
        variant="outlined"
        density="compact"
        clearable
        label="Package Name"
        placeholder="Enter the package name"
        prepend-icon="mdi-storefront"
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
import LoadingDialog from '~/project/common/components/LoadingDialog.vue'
import type { Scanner } from '~/project/types'
import AgentGroupSelect from '~/project/scans/components/AgentGroupSelect.vue'
import { AssetEnum } from '~/project/types'

interface Data {
  packageName: string | null
  loadingDialog: boolean
  isFormValid: boolean
  selectedAgentGroup: unknown
  rules: {
    required: (value: string | null) => boolean | string
  }
}

export default defineComponent({
  name: 'CreateMobileScanStoreForm',
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
    assetPlatformType: {
      type: String as () => AssetEnum,
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
      selectedAgentGroup: null,
      isFormValid: false,
      packageName: null,
      loadingDialog: false,
      rules: {
        required: (value: string | null) => !!value || 'Package Name is required'
      }
    }
  },
  computed: {
    /**
     * The selected asset type.
     */
    assetTypeData(): { type: 'androidStore' | 'iosStore', identifier: 'packageName' | 'bundleId' } {
      if (this.assetPlatformType === AssetEnum.ANDROID_PLAYSTORE) {
        return { type: 'androidStore', identifier: 'packageName' }
      }
      return { type: 'iosStore', identifier: 'bundleId' }
    },
    stepHasErrors(): boolean {
      return this.packageName !== null && this.isFormValid === false
    },
    isContinueDisabled(): boolean {
      return this.packageName === null || this.packageName?.trim() === '' || this.stepHasErrors === true
    }
  },
  watch: {
    packageName(newVal) {
      this.$emit('update:assets', [{ [this.assetTypeData.type]: [{ [this.assetTypeData.identifier]: newVal, applicationName: newVal }] }])
    },
    selectedAgentGroup: {
      deep: true,
      handler(newVal) {
        this.$emit('update:agent-group-id', newVal?.id)
      }
    }
  },
  methods: {
    clear(): void {
      this.packageName = null
    }
  }
})
</script>

  <style>
  .fill-width.v-input--selection-controls .v-input__control {
    width: 100% !important;
  }
  </style>
