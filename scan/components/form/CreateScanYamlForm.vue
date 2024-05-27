<template>
  <div>
    <LoadingDialog
      v-model:loading-dialog="loadingDialog"
      message="Please stand by while creating scan"
    />
    <v-form v-model="isFormValid">
      <p class="subtitle-1 mb-3">
        Please specify the YAML definition:
      </p>

      <v-card variant="outlined">
        <v-tabs
          v-model="inputTab"
          color="primary"
          grow
        >
          <v-tab
            value="assets"
            :ripple="false"
          >
            <v-icon start>
              mdi-code-json
            </v-icon>
            Assets
          </v-tab>
          <v-tab
            value="agentGroup"
            :ripple="false"
          >
            <v-icon start>
              mdi-hexagon-multiple-outline
            </v-icon>
            Agent Group
          </v-tab>
        </v-tabs>

        <v-tabs-window v-model="inputTab">
          <v-tabs-window-item
            :transition="false"
            value="assets"
          >
            <MonacoEditor
              v-model="assetsInput"
              :lang="editorLanguage"
              :options="editorOptions"
              style="min-height: 300px;"
            />
          </v-tabs-window-item>

          <v-tabs-window-item
            :transition="false"
            value="agentGroup"
          >
            <MonacoEditor
              v-model="agentGroupInput"
              :lang="editorLanguage"
              :options="editorOptions"
              style="min-height: 300px;"
            />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card>
    </v-form>
  </div>
</template>

<script lang="ts">
import LoadingDialog from '~/common/components/LoadingDialog.vue'
import type { AssetEnum } from '~/scan/types'

interface Data {
  assetsInput: string | null
  agentGroupInput: string | null
  loadingDialog: boolean
  inputTab: 'assets' | 'agentGroup'
  editorLanguage: string
  editorOptions: { [key: string]: string | boolean }
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
  emits: ['update:isStepValid', 'update:scan-target-step-title', 'update:scan-target-step-subtitle'],
  data(): Data {
    return {
      inputTab: 'assets',
      assetsInput: `
description: Target group definition
kind: targetGroup
name: master_scan
assets:
  androidStore:
    - package_name: "com.example.com"
      `,
      agentGroupInput: `
description: Agent group definition for web scan
kind: AgentGroup
name: onprem_web
agents:
- args:
  - { name: token, type: string, value: abcdefg }
  key: agent/org/nuclei
      `,
      loadingDialog: false,
      editorLanguage: 'yaml',
      editorOptions: {
        theme: 'vs',
        wordWrap: 'on',
        wordWrapColumn: 'on',
        fontFamily: 'Fira Code',
        automaticLayout: true
      }
    }
  },
  computed: {
    isFormValid() {
      const isValid = this.assetsInput !== null && this.assetsInput?.trim() !== '' && this.agentGroupInput !== null && this.agentGroupInput?.trim() !== ''
      this.$emit('update:isStepValid', isValid)
      return isValid
    }
  },
  mounted() {
    this.$emit('update:scan-target-step-title', 'YAML definition file')
    this.$emit('update:scan-target-step-subtitle', 'required')
  },
  methods: {
    clear(): void {
      this.agentGroupInput = null
      this.assetsInput = null
    },
    createScan() {}
  }
})
</script>
