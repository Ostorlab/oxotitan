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
        @click="proceedToNextStep(next)"
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
        <v-icon start>
          mdi-skip-previous-outline
        </v-icon>
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
    @reset="clear"
    @create-scan="$emit('createScan')"
  />
</template>

<script lang="ts">
import validator from 'validator'
import LoadingDialog from '~/project/common/components/LoadingDialog.vue'
import type { Scanner } from '~/project/types'
import AgentGroupSelect from '~/project/scans/components/AgentGroupSelect.vue'
import { parseIp } from '~/utils/asset'
import { AssetTypeEnum } from '~/graphql/types'

interface Data {
  ip: string | null
  userIps: Array<string>
  loadingDialog: boolean
  selectedAgentGroup: unknown
  agentGroupAssetType: AssetTypeEnum
}

export default defineComponent({
  name: 'CreateNetworkScanForm',
  components: {
    LoadingDialog,
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
    }
  },
  emits: ['reset', 'update:assets', 'update:agent-group-id', 'createScan'],
  data(): Data {
    return {
      agentGroupAssetType: AssetTypeEnum.Ip,
      ip: null,
      userIps: [],
      loadingDialog: false,
      selectedAgentGroup: null
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
  watch: {
    selectedAgentGroup: {
      deep: true,
      handler(newVal) {
        this.$emit('update:agent-group-id', newVal?.id)
      }
    }
  },
  methods: {
    /**
     * Proceed to the next step.
     * @param next The 'next' function from the stepper.
     */
    proceedToNextStep(next: () => void): void {
      this.$emit('update:assets', [
        {
          ip: [...new Set(this.userIps)].map((ip) => {
            const { host, mask } = parseIp(ip)
            return { host, mask: mask || undefined }
          })
        }
      ])
      next()
    },
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
      this.$emit('reset')
    }
  }
})
</script>
