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
</template>

<script lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators'
import LoadingDialog from '~/common/components/LoadingDialog.vue'
import UploadFile from '~/scan/components/UploadFile.vue'

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
    step: {
      type: Number,
      default: 1
    }
  },
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
  computed: {
    isStepValid() {
      return this.application !== null && this.application !== undefined && this.v$.application?.$invalid === false
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
