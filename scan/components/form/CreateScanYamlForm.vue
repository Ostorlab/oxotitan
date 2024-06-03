<template>
  <CreateScanTargetAssetYamlForm
    :value="step"
  />
  <v-stepper-vertical-item
    title="YAML definition file"
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
        <code v-if="selectedAgentGroup !== null && selectedAgentGroup[0] !== null && selectedAgentGroup[0] !== undefined">
          {{ selectedAgentGroup[0]?.key }}
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
            <div class="d-flex align-center tab-header">
              <v-icon start>
                mdi-hexagon-multiple-outline
              </v-icon>
              Existing Agent Groups
            </div>
            <div style="border-right: 1px solid #DADADA; height: 300px">
              <p
                v-if="existingAgentGroups.length === 0"
                class="ml-4 pt-2 text-grey"
              >
                You have not yet created any scanners
              </p>
              <v-list
                v-else
                v-model:selected="selectedAgentGroup"
                style="height: 100%; flex-grow: 1;"
                density="compact"
                return-object
              >
                <v-list-item
                  v-for="item in existingAgentGroups"
                  :key="`${item.key}-${item.id}`"
                  :value="item"
                  :title="item.key"
                  :subtitle="item.description"
                />
              </v-list>
            </div>
          </div>
          <div style="width: 70%">
            <div class="d-flex align-center tab-header">
              <v-icon start>
                mdi-code-json
              </v-icon>
              New Agent Group
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
        :loading="loading"
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
import { parse as yamlParse } from 'yaml'
import LoadingDialog from '~/common/components/LoadingDialog.vue'
import CreateScanTargetAssetYamlForm from '~/scan/components/form/CreateScanTargetAssetYamlForm.vue'
import AgentGroupService from '~/agents/services/agentGroup.service'
import type { Scanner } from '~/project/types'

interface Data {
  loading: boolean
  selectedAgentGroup: {
    key: string
    description: string
    agentGroup: string
  } | null
  agentGroupInput: string | null
  loadingDialog: boolean
  inputTab: 'assets' | 'agentGroup'
  editorLanguage: string
  editorOptions: {
    [key: string]: string | boolean | { [key: string]: boolean }
  }
  existingAgentGroups: Array<{
    key: string
    description: string
    agentGroup: string
  }>
  agentGroupService: AgentGroupService
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
    }
  },
  emits: ['reset'],
  data(): Data {
    return {
      loading: false,
      agentGroupService: new AgentGroupService(this.$axios),
      selectedAgentGroup: null,
      agentGroupInput: `
description: Agent group definition for web scan
name: onprem_web
agents:
- args:
  - { name: token, type: string, value: abcdefg }
  key: agent/org/nuclei
      `,
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
    isFormValid() {
      return this.agentGroupInput !== null && this.agentGroupInput?.trim() !== ''
    }
  },
  async created() {
    await this.getAgentGroups()
  },
  methods: {
    /**
     * Clear the input fields.
     */
    clear(): void {
      this.agentGroupInput = null
      this.selectedAgentGroup = null
    },
    async getAgentGroups(): Promise<void> {
      try {
        this.existingAgentGroups = await this.agentGroupService.getAgentGroups(this.selectedScanner)
      } catch (e) {
        console.error(e)
      }
    },
    /**
     * Create a scan.
     */
    async createScan(): Promise<void> {
      try {
        this.loading = true
        const agentGroupId = await this.getAgentGroupId()
        console.log({ agentGroupId })
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    /**
     * Get the agent group ID to use for the scan.
     */
    async getAgentGroupId(): Promise<number | undefined> {
      try {
        if ((this.selectedAgentGroup || []).length > 0) {
          return this.selectedAgentGroup[0]?.id
        } else {
          const newAgentGroup = await this.createAgentGroup()
          return newAgentGroup.id
        }
      } catch (e) {
        console.error(e)
      }
    },
    /**
     * Create an agent group.
     */
    async createAgentGroup() {
      try {
        if (this.agentGroupInput !== null) {
          const agentGroupDefinition = yamlParse(this.agentGroupInput)
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
      } catch (e) {
        console.error(e)
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
