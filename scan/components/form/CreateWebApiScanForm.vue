<template>
  <div>
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
  </div>
</template>

<script lang="ts">
import validator from 'validator'
import LoadingDialog from '~/common/components/LoadingDialog.vue'
import type { AssetEnum } from '~/scan/types'

interface Data {
  rawUrls: string | null
  loadingDialog: boolean
  isFormValid: boolean
}

export default defineComponent({
  name: 'CreateWebApiScanForm',
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
      rawUrls: null,
      loadingDialog: false
    }
  },
  computed: {
    userUrls(): Array<string> {
      return this.rawUrls?.split('\n').filter(Boolean) || []
    },
    rawUrlsErrorMessages(): Array<string> {
      const errors: Array<string> = []
      for (const url of this.userUrls) {
        if (validator.isURL(url) === false) {
          errors.push(`URL ${url} is invalid`)
        }
      }
      return errors
    }
  },
  watch: {
    rawUrlsErrorMessages(newVal) {
      this.$emit('update:isStepValid', newVal.length > 0)
    }
  },
  mounted() {
    this.$emit('update:scan-target-step-title', 'Target Web APIs')
    this.$emit('update:scan-target-step-subtitle', 'required')
  },
  methods: {
    clear(): void {
      this.rawUrls = null
    },
    createScan() {}
  }
})
</script>
