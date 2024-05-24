<template>
  <div class="mb-n8">
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
        item-title="title"
        label="Package Name"
        placeholder="Select application from the store"
        prepend-icon="mdi-storefront"
        class="mb-4"
        return-object
      />
    </v-form>
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
      type: String as () => AssetEnum,
      default: null
    },
    assetType: {
      type: String as () => AssetEnum | string | null,
      default: null
    },
    scanTitle: {
      type: String,
      default: null
    }
  },
  emits: ['update:isStepValid'],
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
