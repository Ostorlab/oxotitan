<template>
  <div>
    <LoadingDialog
      v-model:loading-dialog="loadingDialog"
      message="Please stand by while creating scan"
    />
    <v-form v-model="isFormValid">
      <p class="subtitle-1 mb-3">
        Please specify the target IPs:
      </p>
      <v-textarea
        v-model="ip"
        :error-messages="ipErrorMessages"
        variant="outlined"
        density="compact"
        clearable
        label="IP (IPv4 or IPv6)"
        placeholder="Add IPs each on a separate line"
        prepend-icon="mdi-ip-network-outline"
        @input="addToTargetIps"
        @keyup.enter="addToTargetIps"
      />
    </v-form>
  </div>
</template>

<script lang="ts">
import validator from 'validator'
import LoadingDialog from '~/common/components/LoadingDialog.vue'
import type { AssetEnum } from '~/scan/types'

interface Data {
  ip: string | null
  userIps: Array<string>
  loadingDialog: boolean
}

export default defineComponent({
  name: 'CreateNetworkScanForm',
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
      ip: null,
      userIps: [],
      loadingDialog: false
    }
  },
  computed: {
    ipErrorMessages(): Array<string> {
      const errors: Array<string> = []
      if (this.userIps === undefined) {
        return errors
      }
      for (const userIp of this.userIps) {
        if (this.isValidIpOrIpRange(userIp) === false) {
          errors.push(`IP or IP Range is invalid: ${userIp}`)
        }
      }
      return errors
    },
    isFormValid(): boolean | undefined {
      if (this.userIps === undefined) {
        return
      }
      return this.userIps?.length > 0 && this.ipErrorMessages.length === 0
    }
  },
  watch: {
    isFormValid(newVal) {
      this.$emit('update:isStepValid', newVal)
    }
  },
  mounted() {
    this.$emit('update:scan-target-step-title', 'Target IPs')
    this.$emit('update:scan-target-step-subtitle', 'required')
  },
  methods: {
    isValidIpOrIpRange(lastAddedIp: string): boolean | undefined {
      if (this.ip === null || this.ip === undefined) {
        return
      }
      if (validator.isIP(lastAddedIp) === true || validator.isIPRange(lastAddedIp) === true) {
        return true
      }
      return false
    },
    addToTargetIps(): void {
      this.userIps = this.ip?.split('\n').filter(Boolean)
      if (this.userIps === undefined) {
        this.userIps = []
        return
      }
      const lastAddedIp = this.userIps[this.userIps?.length - 1]
      if (lastAddedIp !== undefined && this.isValidIpOrIpRange(lastAddedIp) === true) {
        this.userIps.push(lastAddedIp)
      }
    },
    clear(): void {
      this.userIps = null
    },
    createScan() {}
  }
})
</script>
