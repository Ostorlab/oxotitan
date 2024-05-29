<template>
  <v-stepper-vertical-item
    title="Agent Group"
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
      label="Select an agent group"
      placeholder="Select an agent group to use for the scan"
      @update:model-value="$emit('update:model-value', $event)"
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
        :loading="loading"
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
import AgentGroupService from '~/agents/services/agentGroup.service'

interface Data {
  selectedAgentGroup: Scanner | null
  agentGroups: Array<Scanner>
  agentGroupService: AgentGroupService
}
export default defineComponent({
  name: 'AgentGroupSelect',
  props: {
    step: {
      type: Number,
      default: 1
    }
  },
  emits: ['reset', 'createScan', 'update:model-value'],
  data(): Data {
    return {
      agentGroupService: new AgentGroupService(this.$axios),
      selectedAgentGroup: null,
      agentGroups: []
    }
  },
  async created() {
    await this.getAgentGroups()
  },
  methods: {
    async getAgentGroups(): Promise<void> {
      try {
        this.agentGroups = await this.agentGroupService.getAgentGroups()
      } catch (e) {
        console.error(e)
      }
    }
  }
})
</script>
