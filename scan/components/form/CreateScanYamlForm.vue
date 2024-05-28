<template>
  <div>
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
            <v-list
              v-model:selected="selectedAgentGroup"
              style="height: 300px; flex-grow: 1; border-right: 1px solid #DADADA;"
              density="compact"
              return-object
            >
              <v-list-item
                v-for="item in existingAgentGroups"
                :key="item.key"
                :value="item"
                :title="item.key"
                :subtitle="item.description"
              />
            </v-list>
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
      <div class="mt-4">
        <v-btn
          color="success"
          variant="elevated"
          @click="createScan"
        >
          <v-icon start>
            mdi-check
          </v-icon>
          Submit
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
      </div>
    </v-form>
  </div>
</template>

<script lang="ts">
import { parse as yamlParse } from 'yaml'
import LoadingDialog from '~/common/components/LoadingDialog.vue'
import type { AssetEnum } from '~/scan/types'

interface Data {
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
  emits: ['update:isStepValid', 'update:scan-target-step-title', 'update:scan-target-step-subtitle', 'reset'],
  data(): Data {
    return {
      inputTab: 'assets',
      selectedAgentGroup: null,
      agentGroupInput: `
description: Agent group definition for web scan
kind: AgentGroup
name: onprem_web
agents:
- args:
  - { name: token, type: string, value: abcdefg }
  key: agent/org/nuclei
      `,
      existingAgentGroups: [
        {
          key: 'onprem_ip',
          description: 'Network scan',
          agentGroup: `
description: Network scan
kind: AgentGroup
name: onprem_ip
agents:
- args:
  - { name: token, type: string, value: abcdefg }
  key: agent/org/tsunami
          `
        },
        {
          key: 'onprem_mobile',
          description: 'Android scan',
          agentGroup: `
description: Android scan
kind: AgentGroup
name: onprem_mobile
agents:
- args:
  - { name: token, type: string, value: abcdefg }
  key: agent/org/tester
          `
        }
      ],
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
      const isValid = this.agentGroupInput !== null && this.agentGroupInput?.trim() !== ''
      this.$emit('update:isStepValid', isValid)
      return isValid
    }
  },
  mounted() {
    this.$emit('update:scan-target-step-title', 'YAML definition file')
    this.$emit('update:scan-target-step-subtitle', 'required')
  },
  methods: {
    /**
     * Clear the input fields.
     */
    clear(): void {
      this.agentGroupInput = null
      this.selectedAgentGroup = null
    },
    /**
     * Create a scan.
     */
    createScan(): void {
      try {
        const agentGroupId = this.getAgentGroupId()
        console.log({ agentGroupId })
      } catch (e) {
        console.error(e)
      }
    },
    /**
     * Get the agent group ID to use for the scan.
     */
    getAgentGroupId(): number {
      try {
        if (this.selectedAgentGroup !== null && this.selectedAgentGroup[0]?.trim() !== '') {
          return this.selectedAgentGroup?.id
        } else {
          const newAgentGroup = this.createAgentGroup()
          return newAgentGroup.id
        }
      } catch (e) {
        console.error(e)
      }
    },
    /**
     * Create an agent group.
     */
    createAgentGroup() {
      try {
        if (this.agentGroupInput !== null) {
          yamlParse(this.agentGroupInput)
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
