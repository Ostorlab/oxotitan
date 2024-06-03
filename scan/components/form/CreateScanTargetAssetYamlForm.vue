<template>
  <v-stepper-vertical-item
    title="Scan Targets YAML definition"
    subtitle="required"
    :error="isStepValid === false"
    :value="step"
  >
    <v-form v-model="isFormValid">
      <p class="subtitle-1 mb-3">
        Please specify the target group definition:
      </p>
      <v-card variant="outlined">
        <MonacoEditor
          v-model="targetAssets"
          :lang="editorLanguage"
          :options="editorOptions"
          style="min-height: 300px;"
        />
      </v-card>
    </v-form>

    <template #next="{ next }">
      <v-btn
        color="primary"
        variant="elevated"
        :disabled="selectedScanner === null"
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
interface Data {
  loading: boolean
  targetAssets: string | null
  editorLanguage: string
  editorOptions: {
    [key: string]: string | boolean | { [key: string]: boolean }
  }
}

export default defineComponent({
  name: 'CreateScanTargetAssetYamlForm',
  props: {
    step: {
      type: Number,
      default: 1
    }
  },
  data(): Data {
    return {
      loading: false,
      targetAssets: `
description: Target group definition
kind: targetGroup
name: master_scan
assets:
  androidStore:
      - package_name: "com.example.test"
      `,
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
      return this.targetAssets !== null && this.agentGroupInput?.trim() !== ''
    }
  },
  methods: {
    /**
     * Clear the input fields.
     */
    clear(): void {
      this.targetAssets = null
    },
    /**
     * Create a scan.
     */
    async createAssets(): void {
      try {
        this.loading = true
        const agentGroupId = await this.getAgentGroupId()
        console.log({ agentGroupId })
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
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
