<template>
  <v-stepper-vertical-item
    title="Agent Group Definition"
    subtitle="required"
    :value="step"
  >
    <v-select
      v-model="selectedAgentGroup"
      :items="agentGroups"
      hide-details
      variant="outlined"
      item-title="key"
      density="compact"
      clearable
      return-object
      label="Select an agent group"
      placeholder="Select an agent group to use for the scan"
      @update:model-value="$emit('update:model-value', $event);"
    >
      <template #item="{ item, index, props }">
        <v-list-item
          v-bind="props"
          :index="index"
          title=""
        >
          <v-list-item-title>{{ item.raw.key }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.raw.description }}</v-list-item-subtitle>
        </v-list-item>
      </template>
    </v-select>
    <template #next>
      <v-btn
        color="success"
        variant="elevated"
        :loading="createScanLoading"
        :disabled="selectedAgentGroup === null"
        @click="$emit('createScan')"
      >
        <v-icon start>
          mdi-check
        </v-icon>
        Submit
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
    </template>
  </v-stepper-vertical-item>
</template>

<script lang="ts">
import { mapActions } from 'pinia'
import AgentGroupService from '~/project/agents/services/agentGroup.service'
import { useNotificationsStore } from '~/stores/notifications'
import type { Scanner } from '~/project/types'
import type { AssetTypeEnum } from '~/graphql/types'

interface Data {
  selectedAgentGroup: unknown | null
  agentGroups: Array<unknown>
  agentGroupService: AgentGroupService
}
export default defineComponent({
  name: 'AgentGroupSelect',
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
    },
    agentGroupAssetType: {
      type: String as () => AssetTypeEnum,
      default: undefined
    }
  },
  emits: ['reset', 'createScan', 'update:model-value', 'update:agent-group-id'],
  data(): Data {
    return {
      agentGroupService: new AgentGroupService(this.$axios),
      selectedAgentGroup: null,
      agentGroups: []
    }
  },
  watch: {
    selectedScanner: {
      immediate: true,
      deep: true,
      async handler(newVal) {
        this.getAgentGroups(newVal)
      }
    }
  },
  methods: {
    ...mapActions(useNotificationsStore, ['reportError']),
    /**
     * Fetch  agent groups.
     */
    async getAgentGroups(scanner: Scanner): Promise<void> {
      try {
        this.agentGroups = await this.agentGroupService.getAgentGroups(scanner, this.agentGroupAssetType)
      } catch (e: any) {
        this.reportError(e?.message || 'Error fetching agent groups')
      }
    }
  }
})
</script>
