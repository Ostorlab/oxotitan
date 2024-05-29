<template>
  <div>
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
      <div class="mt-4">
        <v-btn
          color="success"
          variant="elevated"
          @click="createScan"
        >
          <v-icon start>
            mdi-check
          </v-icon>
          Submit
        </v-btn>
        <v-btn
          variant="elevated"
          class="ml-2"
          @click="$emit('reset')"
        >
          <v-icon start>
            mdi-cancel
          </v-icon>
          Reset
        </v-btn>
      </div>
    </v-row>
  </div>
</template>

<script lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators'
import LoadingDialog from '~/common/components/LoadingDialog.vue'
import UploadFile from '~/scan/components/UploadFile.vue'
import type { AssetEnum } from '~/scan/types'

const MAX_FILE_SIZE = 600000000 // 600 MB

const maxSize = (param: typeof MAX_FILE_SIZE) =>
  helpers.withParams(
    { type: 'maxSize', value: param },
    (value: File | null) => !helpers.req(value) || (value?.size || 0) < param
  )

interface Data {
  application: File | null
  maxFileSize: typeof MAX_FILE_SIZE
  loadingDialog: boolean
}

export default defineComponent({
  name: 'CreateMobileScanFileForm',
  components: {
    LoadingDialog,
    UploadFile
  },
  props: {
    assetPlatformType: {
      type: String as () => AssetEnum | string | null,
      default: null
    },
    assetType: {
      type: String as () => AssetEnum | string | null,
      default: null
    }
  },
  emits: ['update:isStepValid', 'update:scan-target-step-title', 'update:scan-target-step-subtitle', 'reset'],
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
      maxFileSize: MAX_FILE_SIZE,
      application: null,
      loadingDialog: false
    }
  },
  watch: {
    application: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.$emit('update:isStepValid', newVal !== null && newVal !== undefined && this.v$.application?.$invalid === false)
      }
    }
  },
  mounted() {
    this.$emit('update:scan-target-step-title', 'Application File')
    this.$emit('update:scan-target-step-subtitle', 'required')
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
