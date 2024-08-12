<template>
  <v-stepper-vertical-item
    title="Agent Group Definition"
    subtitle="required"
    :value="step"
  >
    <v-form>
      <div class="d-flex align-center mb-3">
        <p class="mr-1 text-grey">
          Run a scan with
        </p>
        <p class="ml-1 text-grey">
          agent group
        </p>
      </div>

      <v-card
        variant="outlined"
        class="min-height-300"
      >
        <div class="d-flex align-start">
          <div class="width-30">
            <div class="d-flex align-center justify-space-between tab-header">
              <div>
                <v-icon start>
                  mdi-hexagon-multiple-outline
                </v-icon>
                Agent Groups
              </div>
            </div>
            <div class="border-right scrollable-height">
              <p
                v-if="agentGroups.length === 0"
                class="ml-4 pt-2 text-grey"
              >
                You have not yet created any scanners
              </p>
              <v-list
                v-model:selected="selectedAgentGroup"
                :items="agentGroups"
                item-title="key"
                item-value="key"
                return-object
                class="flex-grow-1"
              >
                <template #title="{ item }">
                  <v-list-item-title>{{ item.key }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.key }}</v-list-item-subtitle>
                </template>
              </v-list>
            </div>
          </div>
          <div class="width-70">
            <div class="d-flex align-center tab-header height-63">
              <v-icon start>
                mdi-code-json
              </v-icon>
              <span v-if="selectedAgentGroup">Selected Agent Group</span>
              <span v-else>New Agent Group</span>
            </div>
            <MonacoEditor
              v-model="agentGroupInput"
              :lang="editorLanguage"
              :options="editorOptions"
              class="min-height-300"
            />
          </div>
        </div>
      </v-card>
    </v-form>
    <template #next>
      <v-btn
        color="success"
        variant="elevated"
        :loading="createScanLoading"
        :disabled="selectedAgentGroup === null"
        @click="createScan"
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
        <v-icon start>
          mdi-skip-previous-outline
        </v-icon>
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
import Yaml from 'yaml'
import { mapActions } from 'pinia'
import type { Maybe, AssetTypeEnum, OxoAgentGroupType } from '~/graphql/types'
import AgentGroupService from '~/project/agents/services/agentGroup.service'
import type { Scanner } from '~/project/types'

interface Data {
  selectedAgentGroup: Array<Maybe<OxoAgentGroupType>> | null
  agentGroups: Array<OxoAgentGroupType>
  agentGroupService: AgentGroupService
  agentGroupInput: string | null
  editorLanguage: string
  editorOptions: {
    [key: string]: string | boolean | { [key: string]: boolean }
  }
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
      selectedAgentGroup: [],
      agentGroups: [],
      agentGroupInput: null,
      editorLanguage: 'yaml',
      editorOptions: {
        theme: 'vs',
        wordWrap: 'on',
        wordWrapColumn: 'on',
        fontFamily: 'Fira Code',
        automaticLayout: true,
        minimap: { enabled: false }
      }
    }
  },
  watch: {
    selectedScanner: {
      immediate: true,
      deep: true,
      async handler(newVal) {
        this.getAgentGroups(newVal)
      }
    },
    selectedAgentGroup: {
      immediate: true,
      deep: true,
      async handler(newVal) {
        this.agentGroupInput = Yaml.stringify(Yaml.parse(newVal[0]?.yamlSource))
        if (this.selectedAgentGroup != null) {
          this.$emit('update:model-value', this.selectedAgentGroup[0])
        }
      }
    }
  },
  methods: {
    ...mapActions(useNotificationsStore, ['reportError']),
    /**
     * Fetch agent groups.
     */
    async getAgentGroups(scanner: Scanner): Promise<void> {
      try {
        this.agentGroups = await this.agentGroupService.getAgentGroups(scanner, this.agentGroupAssetType)
      } catch (e: any) {
        this.reportError(e?.message || 'Error fetching agent groups')
      }
    },
    async createScan(): Promise<void> {
      /**
     * Trigger creation of scan .
     */
      try {
        await this.getAgentGroup()
        const agentGroup = await this.updateAgentGroup()
        if (agentGroup !== undefined && agentGroup !== null && agentGroup.id !== null && agentGroup.id !== undefined) {
          this.$emit('update:model-value', agentGroup)
          this.$emit('update:agent-group-id', agentGroup.id)
        }
        this.$emit('createScan')
        this.getAgentGroups(this.selectedScanner)
      } catch (e: any) {
        this.reportError(e?.message || 'Error creating scan')
      }
    },
    async getAgentGroup(): Promise<OxoAgentGroupType | null | undefined> {
      try {
        if (this.selectedAgentGroup != null && this.selectedAgentGroup.length > 0) {
          return this.selectedAgentGroup[0]
        }
      } catch (e: any) {
        this.reportError(e?.message || 'Error getting agent group')
      }
    },
    /**
 * Converts the provided YAML source string to a stringified YAML format.
 * @param yamlSource - The YAML source string to be converted. It can be null or undefined.
 * @returns The stringified YAML if the source is valid, otherwise returns undefined.
 */
    getAgentGroupInput(yamlSource: string | null) {
      if (yamlSource === null || yamlSource === undefined) {
        return
      } else {
        const agentGroupInput = Yaml.stringify(Yaml.parse(yamlSource))
        if (agentGroupInput !== null) {
          return agentGroupInput
        }
      }
    },
    /**
 * Updates the agent group by either creating a new one or updating an existing one.
 * */
    async updateAgentGroup(): Promise<OxoAgentGroupType | null | undefined> {
      if (!this.agentGroupInput) return

      try {
        const agentGroupInput = this.getAgentGroupInput(this.agentGroupInput)
        const agentGroupDefinition = Yaml.parse(agentGroupInput)
        if (!this.selectedScanner || !agentGroupInput) return
        if (this.selectedAgentGroup && this.selectedAgentGroup.length > 0) {
          const selectedAgentGroupYaml = this.getAgentGroupInput(this.selectedAgentGroup[0]?.yamlSource)

          if (agentGroupInput !== selectedAgentGroupYaml) {
            return this.createOrUpdateAgentGroup(
              agentGroupDefinition,
              this.selectedAgentGroup[0].description,
              this.selectedAgentGroup[0]?.name
            )
          } else {
            return this.getAgentGroup()
          }
        } else {
          return this.createOrUpdateAgentGroup(agentGroupDefinition)
        }
      } catch (error) {
        console.error('Error updating agent group:', error)
        return
      }
    },
    /**
 * Create new agent group from existing one .
 * @param agentGroupDefinition- Parsed yaml source. containing agents,description and name.
 * @param description- Name of existing agent group to fallback to .
 * @param name- Description of existing agent group to fallback to.
 * @returns The Created agent group.
**/
    async createOrUpdateAgentGroup(agentGroupDefinition: any, description: string = '', name: string = ''): Promise<OxoAgentGroupType | null | undefined> {
      return this.agentGroupService.createAgentGroup({
        scanner: this.selectedScanner,
        agentGroup: {
          description: agentGroupDefinition.description || description,
          agents: agentGroupDefinition?.agents,
          name: agentGroupDefinition.name || name,
          assetTypes: [this.agentGroupAssetType]
        }
      })
    }
  }
})
</script>

<style scoped lang="scss">
$border-color: #DADADA;

.tab-header {
  padding: 0.8rem;
  border-bottom: 1px solid $border-color;

  &:not(:last-of-type) {
    border-right: 1px solid $border-color;
  }
}

.min-height-300 {
  min-height: 300px;
}

.width-30 {
  width: 30%;
}

.width-70 {
  width: 70%;
}

.height-63 {
  height: 63px;
}

.border-right {
  border-right: 1px solid $border-color;
}

.scrollable-height {
  height: 300px;
  overflow-y: auto;
}

.text-grey {
  color: #666;
}

.flex-grow-1 {
  flex-grow: 1;
}
</style>
