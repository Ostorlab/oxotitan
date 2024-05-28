<template>
  <div>
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
  </div>
</template>

<script lang="ts">
import LoadingDialog from '~/common/components/LoadingDialog.vue'
import type { AssetEnum } from '~/scan/types'

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
  watch: {
    isFormValid(newVal) {
      this.$emit('update:isStepValid', typeof newVal === 'boolean' ? newVal : false)
    }
  },
  mounted() {
    this.$emit('update:scan-target-step-title', 'Package Name')
    this.$emit('update:scan-target-step-subtitle', 'required')
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
