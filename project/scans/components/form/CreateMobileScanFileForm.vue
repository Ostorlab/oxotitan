<template>
  <v-stepper-vertical-item
    title="Application File"
    subtitle="required"
    :error="v$.application.maximumSize.$invalid === true"
    :value="step"
  >
    <LoadingDialog
      v-model:loading-dialog="loadingDialog"
      message="Please stand by while creating scan"
    />
    <v-row>
      <v-col
        id="select_source"
        cols="12"
      >
        <v-alert
          v-if="v$.application.maximumSize.$invalid === true"
          density="compact"
          color="error"
          type="error"
          class="mb-2"
        >
          <p class="text-white caption ma-0">
            The uploaded file exceeds the maximum file size allowed ({{ formatFileSize(maxFileSize) }}).
          </p>
        </v-alert>
        <UploadFile v-model:model-value="application" />
      </v-col>
    </v-row>
    <template #next="{ next }">
      <v-btn
        color="primary"
        variant="elevated"
        :disabled="isStepValid === false"
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
    :agent-group-asset-type="agentGroupAssetType"
    :create-scan-loading="createScanLoading"
    :step="step + 1"
    :selected-scanner="selectedScanner"
    @reset="$emit('reset')"
    @create-scan="$emit('createScan')"
  />
</template>

<script lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators'
import LoadingDialog from '~/project/common/components/LoadingDialog.vue'
import UploadFile from '~/project/scans/components/UploadFile.vue'
import AgentGroupSelect from '~/project/scans/components/AgentGroupSelect.vue'
import type { Scanner } from '~/project/types'
import { AssetEnum, AssetFileTypesEnum } from '~/project/types'
import { AssetTypeEnum } from '~/graphql/types'

const MAX_FILE_SIZE = 600000000 // 600 MB

const maxSize = (param: typeof MAX_FILE_SIZE) =>
  helpers.withParams(
    { type: 'maxSize', value: param },
    (value: File | null) => !helpers.req(value) || (value?.size || 0) < param
  )

type AndroidFileExtensions = 'aab' | 'apk'

interface Data {
  application: File | null
  maxFileSize: typeof MAX_FILE_SIZE
  loadingDialog: boolean
  selectedAgentGroup: unknown
}

const ANDROID_FILE_TYPES_MAPPING = {
  apk: AssetFileTypesEnum.AndroidApkFile,
  aab: AssetFileTypesEnum.AndroidAabFile
}

export default defineComponent({
  name: 'CreateMobileScanFileForm',
  components: {
    LoadingDialog,
    UploadFile,
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
    },
    assetPlatformType: {
      type: String as () => AssetEnum,
      required: true
    }
  },
  emits: ['reset', 'update:assets', 'update:agent-group-id', 'createScan'],
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  validations() {
    return {
      application: {
        maximumSize: maxSize(MAX_FILE_SIZE)
      }
    }
  },
  data(): Data {
    return {
      selectedAgentGroup: null,
      maxFileSize: MAX_FILE_SIZE,
      application: null,
      loadingDialog: false
    }
  },
  computed: {
    agentGroupAssetType(): AssetTypeEnum {
      return this.assetPlatformType === AssetEnum.ANDROID_APK ? AssetTypeEnum.AndroidFile : AssetTypeEnum.IosFile
    },
    isStepValid() {
      return this.application !== null && this.application !== undefined && this.v$.application?.$invalid === false
    },
    /**
     * The selected asset type.
     */
    assetTypeData(): { type: AssetFileTypesEnum, identifier: 'packageName' | 'bundleId' } {
      if (this.assetPlatformType === AssetEnum.ANDROID_APK) {
        const fileNameParts = (this.application?.name?.split('.') || []).filter(Boolean)
        const fileExtension: AndroidFileExtensions = fileNameParts[fileNameParts.length - 1]?.toLowerCase() as AndroidFileExtensions
        return { type: ANDROID_FILE_TYPES_MAPPING[fileExtension], identifier: 'packageName' }
      }
      return { type: AssetFileTypesEnum.IosFile, identifier: 'bundleId' }
    }
  },
  watch: {
    application: {
      deep: true,
      handler(newVal) {
        if (newVal === undefined) {
          this.$emit('update:assets', [])
        } else {
          this.$emit('update:assets', [{ [this.assetTypeData.type]: [{ [this.assetTypeData.identifier]: null, file: newVal }] }])
        }
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
    clear(): void {
      this.application = null
    },
    createScan() {}
  }
})
</script>

  <style>
  .fill-width.v-input--selection-controls .v-input__control {
    width: 100% !important;
  }
  </style>
