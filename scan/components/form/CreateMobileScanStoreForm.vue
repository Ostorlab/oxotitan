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
</template>

<script lang="ts">
import LoadingDialog from '~/common/components/LoadingDialog.vue'

interface Data {
  packageName: string | null
  loadingDialog: boolean
  isFormValid: boolean
  rules: {
    required: (value: string | null) => boolean | string
  }
}

export default defineComponent({
  name: 'CreateMobileScanStoreForm',
  components: {
    LoadingDialog
  },
  props: {
    step: {
      type: Number,
      default: 1
    }
  },
  data(): Data {
    return {
      isFormValid: false,
      packageName: null,
      loadingDialog: false,
      rules: {
        required: (value: string | null) => !!value || 'Package Name is required'
      }
    }
  },
  computed: {
    stepHasErrors(): boolean {
      return this.packageName !== null && this.isFormValid === false
    },
    isContinueDisabled(): boolean {
      return this.packageName === null || this.packageName?.trim() === '' || this.stepHasErrors === true
    }
  },
  methods: {
    clear(): void {
      this.packageName = null
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
