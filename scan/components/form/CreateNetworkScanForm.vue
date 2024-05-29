<template>
  <v-stepper-vertical-item
    title="Target IPs"
    subtitle="required"
    :error="ipErrorMessages.length > 0"
    :value="step"
  >
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
    <template #next="{ next }">
      <v-btn
        color="primary"
        variant="elevated"
        :disabled="isFormValid === false"
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
import validator from 'validator'
import LoadingDialog from '~/common/components/LoadingDialog.vue'

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
    step: {
      type: Number,
      default: 1
    }
  },
  data(): Data {
    return {
      ip: null,
      userIps: [],
      loadingDialog: false
    }
  },
  computed: {
    /**
     * The errors for the IP messages.
     */
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
    /**
     * Whether the form is valid or not.
     */
    isFormValid(): boolean | undefined {
      if (this.userIps === undefined) {
        return
      }
      return this.userIps?.length > 0 && this.ipErrorMessages.length === 0
    }
  },
  methods: {
    /**
     * Check if an IP or IP range is valid.
     * @param lastAddedIp
     */
    isValidIpOrIpRange(lastAddedIp: string): boolean | undefined {
      if (this.ip === null || this.ip === undefined) {
        return
      }
      if (validator.isIP(lastAddedIp) === true || validator.isIPRange(lastAddedIp) === true) {
        return true
      }
      return false
    },
    /**
     * Add an IP to a list of IPs.
     */
    addToTargetIps(): void {
      this.userIps = this.ip?.split('\n').filter(Boolean) || []
      if (this.userIps === undefined) {
        this.userIps = []
        return
      }
      const lastAddedIp = this.userIps[this.userIps?.length - 1]
      if (lastAddedIp !== undefined && this.isValidIpOrIpRange(lastAddedIp) === true) {
        this.userIps.push(lastAddedIp)
      }
    },
    /**
     * Clear the user input.
     */
    clear(): void {
      this.ip = null
      this.userIps = []
    },
    /**
     * Create a scan.
     */
    createScan(): void {}
  }
})
</script>
