<template>
  <div>
    <LoadingDialog
      v-model:loading-dialog="loadingDialog"
      message="Please stand by while creating scan"
    />
    <v-form v-model="isFormValid">
      <p class="subtitle-1 mb-3">
        Please specify the YAML definition:
      </p>
      <v-textarea
        v-model="yamlInput"
        variant="outlined"
        density="compact"
        clearable
        label="YAML definition"
        placeholder="Add your YAML definition file"
        prepend-icon="mdi-code-json"
      />
    </v-form>
  </div>
</template>

<script lang="ts">
import LoadingDialog from '~/common/components/LoadingDialog.vue'
import type { AssetEnum } from '~/scan/types'

interface Data {
  yamlInput: string | null
  loadingDialog: boolean
  isFormValid: boolean
}

export default defineComponent({
  name: 'CreateScanYamlForm',
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
  emits: ['update:isStepValid', 'update:scan-target-step-title', 'update:scan-target-step-subtitle'],
  data(): Data {
    return {
      isFormValid: false,
      yamlInput: null,
      loadingDialog: false
    }
  },
  watch: {
    yamlInput(newVal) {
      this.$emit('update:isStepValid', newVal !== null && newVal !== undefined && newVal?.trim() !== '')
    }
  },
  mounted() {
    this.$emit('update:scan-target-step-title', 'YAML definition file')
    this.$emit('update:scan-target-step-subtitle', 'required')
  },
  methods: {
    clear(): void {
      this.yamlInput = null
    },
    createScan() {}
  }
})
</script>
