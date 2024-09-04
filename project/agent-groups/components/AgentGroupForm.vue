<template>
  <v-form
    ref="form"
    v-model="isFormValid"
    @submit.prevent="onSubmit"
  >
    <div class="pb-5">
      <!-- Scanner Select -->
      <v-select
        v-model="localScanner"
        :items="scanners"
        :item-props="getScannerDetails"
        hide-details
        variant="outlined"
        item-title="endpoint"
        density="compact"
        clearable
        return-object
        :disabled="isEditMode"
        label="Select a scanner"
        placeholder="Select or create a scanner for the agent group"
      >
        <template #selection="{ item }">
          <p
            v-if="(item.raw.name || '').trim() !== ''"
            class="mb-0"
          >
            {{ item.raw.name }} (<code>{{ item.raw.endpoint }}</code>)
          </p>
          <code
            v-else
            class="mb-0"
          >{{ item.raw.endpoint }}</code>
        </template>
        <template #no-data>
          <p
            class="create-scanner mb-0 pl-4 py-0"
            @click="showNewScannerForm = true"
          >
            Create New Scanner
          </p>
        </template>
      </v-select>
      <v-dialog
        v-model="showNewScannerForm"
        persistent
        max-width="600px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Create New Scanner</span>
          </v-card-title>
          <v-card-text>
            <ScannerForm @close-form="showNewScannerForm = false" />
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <v-text-field
      v-model="localAgentGroup.name"
      variant="outlined"
      density="compact"
      label="Agent Group Name"
      placeholder="Agent Group Name"
    />
    <v-text-field
      v-model="localAgentGroup.description"
      variant="outlined"
      density="compact"
      label="Agent Group Description"
      placeholder="Agent Group Description"
    />
    <v-select
      v-model="selectedAssetTypes"
      class="mb-4"
      :items="assetTypes"
      hide-details
      variant="outlined"
      density="compact"
      clearable
      multiple
      label="Choose Asset Types"
      placeholder="Choose Asset Types"
    >
      <template #selection="{ item }">
        <v-chip
          :key="item.value"
        >
          {{ assetTypeTitles[item.title] }}
        </v-chip>
      </template>
      <template #prepend-item>
        <v-list-item
          :disabled="assetTypes.length===0"
          @click="toggleSelectAll"
        >
          <div class="d-flex align-center custom-option">
            <v-checkbox
              :model-value="isAllSelected"
              class="mt-5"
              @click.stop="toggleSelectAll"
            />
            <v-list-item-title>
              {{ isAllSelected === true ? 'Deselect All' : 'Select All' }}
            </v-list-item-title>
          </div>
        </v-list-item>
        <v-divider />
      </template>
      <template #item="{ item }">
        <v-list-item
          v-bind="item"
          :key="item.value"
          title=""
          @click="toggleSelection(item)"
        >
          <div class="d-flex align-center custom-option">
            <v-checkbox
              :model-value="isSelected(item)"
              class="mt-5"
              @click.stop="toggleSelection(item)"
            />
            <v-icon>
              {{ item.raw.icon }}
            </v-icon>
            <v-list-item-title class="ml-3">
              {{ assetTypeTitles[item.title] }}
            </v-list-item-title>
          </div>
        </v-list-item>
      </template>
    </v-select>
    <div class="mb-4">
      <v-label>
        Agent Group Definition
      </v-label>
      <MonacoEditor
        v-model="yamlSource"
        :lang="editorLanguage"
        :options="editorOptions"
        style="min-height: 300px;"
      />
    </div>
    <v-btn
      class="me-2"
      type="submit"
      color="success"
      text="Save"
      prepend-icon="mdi-check"
      :disabled="!isFormValid"
    />
    <v-btn
      text="Cancel"
      prepend-icon="mdi-close"
      @click="closeForm"
    />
  </v-form>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { PropType } from 'vue'
import Yaml from 'yaml'
import { useNotificationsStore } from '~/stores/notifications'
import ScannerForm from '~/project/scanners/components/ScannerForm.vue'
import { type OxoAgentGroupType, AssetTypeEnum } from '~/graphql/types'
import { AssetTypeIconsEnum } from '~/utils/asset'
import AgentGroupService from '~/project/agents/services/agentGroup.service'
import type { Scanner } from '~/project/types'

const DEFAULT_AGENTGROUP_VALUE = { id: '', key: '', name: '', description: '', agents: { agents: [] } }

/**
   * Props
   * @property {OxoAgentGroupType | null} agentGroup - agentGroup object to edit or null for a new agentGroup.
   */
const props = defineProps({
  agentGroup: {
    type: Object as PropType<OxoAgentGroupType | null>,
    default: () => ({ id: '', key: '', name: '', description: '', agents: { agents: [] } })
  },
  isEditMode: {
    type: Boolean,
    default: false
  },
  scanner: {
    type: Object as PropType<Scanner>,
    default: () => ({ endpoint: '', name: '', apiKey: '' })
  }
})
const form = ref()
const emit = defineEmits(['close-form'])
const notificationsStore = useNotificationsStore()
const localAgentGroup = ref<OxoAgentGroupType>(DEFAULT_AGENTGROUP_VALUE)
const yamlSource = ref<string>('')
interface AssetType {
  title: string
  icon: string
}
const assetTypes: AssetType[] = Object.keys(AssetTypeEnum).map((key) => {
  return {
    title: AssetTypeEnum[key as keyof typeof AssetTypeEnum],
    icon: AssetTypeIconsEnum[key as keyof typeof AssetTypeIconsEnum]
  }
})

const formatAssetTypeTitle = (assetType: string): string => {
  return assetType
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const assetTypeTitles = Object.values(AssetTypeEnum).reduce((acc, value) => {
  acc[value] = formatAssetTypeTitle(value)
  return acc
}, {} as Record<string, string>)

const selectedAssetTypes = ref<string[]>([])

const isSelected = (item: AssetType): boolean => {
  return selectedAssetTypes.value.includes(item.title)
}

const toggleSelection = (item: AssetType): void => {
  if (item.title === 'Select All') {
    toggleSelectAll()
    return
  }
  const index = selectedAssetTypes.value.findIndex(
    (selectedItem) => selectedItem === item.title
  )
  if (index === -1) {
    selectedAssetTypes.value.push(item.value)
  } else {
    selectedAssetTypes.value.splice(index, 1)
  }
}

const isAllSelected = computed((): boolean =>
  selectedAssetTypes.value.length === assetTypes.length
)

const toggleSelectAll = (): void => {
  if (isAllSelected.value === true) {
    selectedAssetTypes.value = []
  } else {
    selectedAssetTypes.value = assetTypes.map((item) => item.title)
  }
}

const editorLanguage = 'yaml'
const editorOptions = {
  theme: 'vs',
  wordWrap: 'on',
  wordWrapColumn: 'on',
  fontFamily: 'Fira Code',
  automaticLayout: true,
  minimap: { enabled: false },
  Placeholder: true,
  PlaceholderText: 'Start typing here'
}
const { $axios } = useNuxtApp()
const agentGroupService = new AgentGroupService($axios)

const localScanner = ref<Scanner | null>(null)
const scanners = ref<Array<Scanner>>([])
const showNewScannerForm = ref(false)

onMounted(() => {
  yamlSource.value = ''
  if (props.agentGroup !== null && props.agentGroup !== undefined && props.agentGroup.yamlSource !== null && props.agentGroup.yamlSource !== undefined) {
    yamlSource.value = props.agentGroup.yamlSource
  }
  if (props.scanner !== null && props.scanner !== undefined) {
    localScanner.value = props.scanner
  }
})

const isFormValid = computed(() => {
  return localScanner.value != null && yamlSource.value.trim() !== ''
})

const getAgentGroupInput = (yamlSource: string) => {
  const agentGroupInput = Yaml.stringify(Yaml.parse(yamlSource))
  if (agentGroupInput != null) {
    return agentGroupInput
  }
}

/**
   * Handle form submission.
   * Add or update agent group information.
   */
const onSubmit = async (): Promise<void> => {
  if (isFormValid.value === true && localAgentGroup.value !== null) {
    try {
      const agentGroupInput = getAgentGroupInput(yamlSource.value)
      if (localScanner.value !== null && agentGroupInput !== null && agentGroupInput !== undefined) {
        const agentGroupDefinition = Yaml.parse(agentGroupInput)
        if (props.isEditMode == true) {
          await agentGroupService.deleteAgentGroup(localScanner.value, parseInt(localAgentGroup.value.id as string))
        }
        await agentGroupService.createAgentGroup({
          scanner: localScanner.value,
          agentGroup: {
            description: localAgentGroup.value.description || '',
            agents: agentGroupDefinition?.agents,
            name: localAgentGroup.value.name,
            assetTypes: selectedAssetTypes.value
          }
        })
      }
      resetForm()
      emit('close-form')
      notificationsStore.reportSuccess('Agent group saved successfully.')
    } catch (error) {
      notificationsStore.reportError(error?.message || 'Failed to save Agent group information. Please try again.')
    }
  }
}

/**
   * Reset the form fields.
   */
const resetForm = (): void => {
  localAgentGroup.value = DEFAULT_AGENTGROUP_VALUE
  yamlSource.value = ''
  localScanner.value = null
}

/**
   * Close the form.
   */
const closeForm = (): void => {
  resetForm()
  emit('close-form')
}

/**
   * Get the scanner details.
   * @param scanner The scanner whose details to get.
   */
const getScannerDetails = (scanner: Scanner): { title: string, subtitle: string } => {
  const scannerHasName = (scanner.name || '').trim() !== ''
  return {
    title: scannerHasName ? scanner.name : scanner.endpoint,
    subtitle: scannerHasName ? scanner.endpoint : ''
  }
}
// Watch for changes in the prop agentGroup and update the localAgentGroup.
watch(() => props.agentGroup, (newVal) => {
  localAgentGroup.value = { ...newVal } as OxoAgentGroupType
  yamlSource.value = props.agentGroup?.yamlSource || ''
}, { immediate: true, deep: true })

watch(() => yamlSource, (newVal) => {
  yamlSource.value = newVal.value
}, { immediate: true, deep: true })
const scannersStore = useScannersStore()
scanners.value = scannersStore.scanners || []
</script>

  <style scoped>
  .create-scanner {
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  .create-scanner:hover {
    background-color: #f0f0f0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  .custom-option {
    margin: -22px auto;
  }
  </style>
