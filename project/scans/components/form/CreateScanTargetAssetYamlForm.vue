<template>
  <v-stepper-vertical-item
    title="Scan Targets YAML definition"
    subtitle="required"
    :error="isStepValid === false"
    :value="step"
  >
    <v-form v-model="isFormValid">
      <p class="subtitle-1 mb-3">
        Please specify the target group definition: Supported assets are
        <code><em>{{ supportedAssetTypes.join(', ') }}</em></code>.
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
        @click="continueToNextStep(next)"
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
import _ from 'lodash'
import { parse as yamlParse } from 'yaml'

interface Data {
  loading: boolean
  targetAssets: string | null
  editorLanguage: string
  editorOptions: {
    [key: string]: string | boolean | { [key: string]: boolean }
  }
  supportedAssetTypes: Array<string>
}

const TARGET_GROUP_EXAMPLE = `
# Target Group example
description: Target group definition
kind: targetGroup
name: master_scan
assets:
  androidStore:
    - package_name: "com.example.test"
    `

export default defineComponent({
  name: 'CreateScanTargetAssetYamlForm',
  props: {
    step: {
      type: Number,
      default: 1
    }
  },
  emits: ['update:assets'],
  data(): Data {
    return {
      loading: false,
      supportedAssetTypes: ['androidStore', 'iosStore', 'link', 'domain', 'ip'],
      targetAssets: TARGET_GROUP_EXAMPLE,
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
      return this.targetAssets !== null && this.targetAssets?.trim() !== ''
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
     * Create assets.
     * @param nextFn The `next` function from the stepper.
     */
    continueToNextStep(nextFn: () => void): void {
      this.$emit('update:assets', this.parseYamlToAssetInput(this.targetAssets))
      nextFn()
    },
    /**
     * Parse a yaml string to asset input type.
     * @param yamlString The yaml string to parse.
     */
    parseYamlToAssetInput(yamlString: string | null): Array<{ [key: string]: any }> {
      const parsedAssetsObject = yamlParse(yamlString || '')?.assets
      return Object.keys(parsedAssetsObject).map((key) => ({ [key]: parsedAssetsObject[key].map((asset: { [key: string]: string }) => this.convertObjectKeysToCamelCase(asset)) }))
    },
    /**
     * Convert all the keys of an object to camel case.
     * @param object The object whose keys to convert to camel case.
     */
    convertObjectKeysToCamelCase(object: { [key: string]: any }): { [key: string]: any } {
      return _.mapKeys(object, (_value, objKey) => _.camelCase(objKey))
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
