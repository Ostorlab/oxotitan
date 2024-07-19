<template>
  <CreateScanTargetAssetYamlForm
    v-model:assets="assets"
    :value="step"
  />
  <v-stepper-vertical-item
    title="Agent Group Definition"
    subtitle="required"
    :error="isStepValid === false"
    :value="step+1"
  >
    <LoadingDialog
      v-model:loading-dialog="loadingDialog"
      message="Please stand by while creating scan"
    />
    <v-form v-model="isFormValid">
      <div class="d-flex align-center mb-3">
        <p
          style="color: #666;"
          class="mr-1"
        >
          Run a scan with
        </p>
        <code v-if="selectedAgentGroups.length > 0">
          {{ selectedAgentGroups[0]?.key }}
        </code>
        <p
          v-else
          class="mb-0"
        >
          a new
        </p>
        <p
          style="color: #666;"
          class="ml-1"
        >
          agent group
        </p>
      </div>

      <v-card
        variant="outlined"
        style="min-height: 300px;"
      >
        <div class="d-flex align-start">
          <div style="width: 30%;">
            <div class="d-flex align-center justify-space-between tab-header">
              <div>
                <v-icon start>
                  mdi-hexagon-multiple-outline
                </v-icon>
                Existing Agent Groups
              </div>
              <v-btn
                variant="tonal"
                @click="clear"
              >
                <v-icon start>
                  mdi-plus
                </v-icon>
                New
              </v-btn>
            </div>
            <div style="border-right: 1px solid #DADADA; height: 300px; overflow-y: auto;">
              <p
                v-if="existingAgentGroups.length === 0"
                class="ml-4 pt-2 text-grey"
              >
                You have not yet created any scanners
              </p>
              <v-list
                v-model:selected="selectedAgentGroups"
                :items="existingAgentGroups"
                item-title="key"
                item-value="key"
                return-object
                style="height: 100%; flex-grow: 1;"
              >
                <template #title="{ item }">
                  <v-list-item-title>
                    {{ item.key }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.key }}
                  </v-list-item-subtitle>
                </template>
              </v-list>
            </div>
          </div>
          <div style="width: 70%">
            <div
              class="d-flex align-center tab-header"
              style="height: 63px;"
            >
              <v-icon start>
                mdi-code-json
              </v-icon>
              <span v-if="selectedAgentGroups.length > 0">Selected Agent Group</span>
              <span v-else>New Agent Group</span>
            </div>
            <MonacoEditor
              v-model="agentGroupInput"
              :lang="editorLanguage"
              :options="editorOptions"
              style="min-height: 300px;"
            />
          </div>
        </div>
      </v-card>
    </v-form>
    <template #next>
      <v-btn
        color="success"
        variant="elevated"
        :disabled="isFormValid === false"
        :loading="createScanLoading"
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
import { mapActions } from 'pinia'
import Yaml from 'yaml'
import LoadingDialog from '~/project/common/components/LoadingDialog.vue'
import CreateScanTargetAssetYamlForm from '~/project/scans/components/form/CreateScanTargetAssetYamlForm.vue'
import AgentGroupService from '~/project/agents/services/agentGroup.service'
import type { Scanner } from '~/project/types'
import type { OxoAgentGroupType, Maybe } from '~/graphql/types'
import { useNotificationsStore } from '~/stores/notifications'

interface Data {
  selectedAgentGroups: Array<Maybe<OxoAgentGroupType>>
  agentGroupInput: string | null
  loadingDialog: boolean
  editorLanguage: string
  editorOptions: {
    [key: string]: string | boolean | { [key: string]: boolean }
  }
  existingAgentGroups: Array<Maybe<OxoAgentGroupType>>
  agentGroupService: AgentGroupService
  assets: Array<unknown>
}

export default defineComponent({
  name: 'CreateScanYamlForm',
  components: {
    LoadingDialog,
    CreateScanTargetAssetYamlForm
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
      assets: [],
      agentGroupService: new AgentGroupService(this.$axios),
      selectedAgentGroups: [],
      agentGroupInput: null,
      existingAgentGroups: [],
      loadingDialog: false,
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
  computed: {
    isFormValid(): boolean {
      return (this.agentGroupInput !== null && this.agentGroupInput?.trim() !== '') || this.selectedAgentGroups.length > 0
    }
  },
  watch: {
    assets: {
      deep: true,
      handler(newVal) {
        this.$emit('update:assets', newVal)
      }
    },
    selectedAgentGroups: {
      deep: true,
      handler(newVal: Array<Maybe<OxoAgentGroupType>>) {
        if ((newVal || []).length > 0 && newVal[0]?.yamlSource !== undefined && newVal[0]?.yamlSource !== null) {
          this.agentGroupInput = Yaml.stringify(Yaml.parse(newVal[0]?.yamlSource))
        } else {
          // Set to an empty string for Monaco editor to update the value, `null` won't work.
          this.agentGroupInput = ''
        }
      }
    }
  },
  async created() {
    await this.getAgentGroups()
  },
  methods: {
    ...mapActions(useNotificationsStore, ['reportError']),
    /**
     * Clear the input fields.
     */
    clear(): void {
      this.agentGroupInput = ''
      this.selectedAgentGroups = []
    },
    /**
     * Fetch agent groups.
     */
    async getAgentGroups(): Promise<void> {
      try {
        this.existingAgentGroups = await this.agentGroupService.getAgentGroups(this.selectedScanner)
      } catch (e: any) {
        this.reportError(e?.message || 'Error fetching agent groups')
      }
    },
    /**
     * Create a scan.
     */
    async createScan(): Promise<void> {
      try {
        const agentGroupId = await this.getAgentGroupId()
        this.$emit('update:agent-group-id', agentGroupId)
        this.$emit('createScan')
      } catch (e: any) {
        this.reportError(e?.message || 'Error creating scan')
      }
    },
    /**
     * Get the agent group ID to use for the scan.
     */
    async getAgentGroupId(): Promise<number | string | undefined> {
      try {
        if (this.selectedAgentGroups.length > 0) {
          return this.selectedAgentGroups[0]?.id
        } else {
          const newAgentGroup = await this.createAgentGroup()
          return newAgentGroup?.id
        }
      } catch (e: any) {
        this.reportError(e?.message || 'Error getting agent group')
      }
    },
    /**
     * Create an agent group.
     */
    async createAgentGroup() {
      try {
        if (this.agentGroupInput !== null) {
          const agentGroupDefinition = Yaml.parse(this.agentGroupInput)
          const agentGroup = await this.agentGroupService.createAgentGroup({
            scanner: this.selectedScanner,
            agentGroup: {
              description: agentGroupDefinition?.description,
              agents: agentGroupDefinition?.agents,
              name: agentGroupDefinition?.name
            }
          })
          await this.getAgentGroups()
          return agentGroup
        }
      } catch (e: any) {
        this.reportError(e?.message || 'Error creating agent group')
      }
    }
  }
})
</script>

<style scoped lang="scss">
  $border-color: #DADADA;

  .tab-header {
    padding: .8rem;
    border-bottom: 1px solid $border-color;

    &:not(:last-of-type) {
      border-right: 1px solid $border-color;
    }
  }
</style>
