<template>
  <v-form
    ref="form"
    v-model="isValid"
    @submit.prevent="onSubmit"
  >
    <v-text-field
      v-model="localScanner.endpoint"
      variant="outlined"
      density="compact"
      label="Scanner Endpoint"
      placeholder="https://api.example.com/graphql"
      :disabled="isEditMode === true"
      :rules="[rules.required, rules.url]"
    />
    <v-text-field
      v-model="localScanner.name"
      variant="outlined"
      density="compact"
      label="Scanner Name"
      placeholder="Scanner Name"
      :rules="[rules.required]"
    />
    <v-text-field
      v-model="localScanner.apiKey"
      variant="outlined"
      density="compact"
      label="API Key"
      placeholder="Enter API Key"
      :rules="[rules.required]"
    />
    <v-btn
      class="me-2"
      type="submit"
      color="success"
      text="Save"
      prepend-icon="mdi-check"
      :disabled="!isValid"
    />
    <v-btn
      text="Cancel"
      prepend-icon="mdi-close"
      @click="closeForm"
    />
  </v-form>
</template>

<script setup lang="ts">
import isURL from 'validator/es/lib/isURL'
import type { PropType } from 'vue'
import { useScannersStore } from '~/stores/scanners'
import { useNotificationsStore } from '~/stores/notifications'
import type { Scanner } from '~/project/types'

const DEFAULT_SCANNER_VALUE = { endpoint: '', apiKey: '', name: '' }

/**
 * Props
 * @property {Scanner | null} scanner - Scanner object to edit or null for a new scanner.
 */
const props = defineProps({
  scanner: {
    type: Object as PropType<Scanner>,
    default: () => ({ endpoint: '', apiKey: '', name: '' })
  },
  isEditMode: {
    type: Boolean,
    default: false
  }
})

const form = ref()
const isValid = ref(false)
const emit = defineEmits(['close-form'])
const scannersStore = useScannersStore()
const notificationsStore = useNotificationsStore()
const localScanner = ref<Scanner>(DEFAULT_SCANNER_VALUE)
const rules = {
  required: (value: string) => value?.trim() !== '' || 'Value required',
  url: (value: string) => isURL(value) || 'Must be a valid URL'
}

watch(props.scanner, (newVal) => {
  localScanner.value = { ...newVal } as Scanner
}, { immediate: true, deep: true })

/**
 * Handle form submission.
 * Add or update scanner information.
 */

const onSubmit = async (): Promise<void> => {
  if (isValid.value === true && localScanner.value !== null) {
    try {
      scannersStore.addOrUpdateScanner(localScanner.value)
      resetForm()
      emit('close-form')
      notificationsStore.reportSuccess('Scanner saved successfully.')
    } catch (error) {
      notificationsStore.reportError('Failed to save scanner information. Please try again.')
    }
  }
}

/**
 * Reset the form fields.
 */
const resetForm = (): void => {
  localScanner.value = DEFAULT_SCANNER_VALUE
}

/**
 * Close the form.
 */
const closeForm = (): void => {
  resetForm()
  emit('close-form')
}
</script>
