<template>
  <v-form
    ref="form"
    class="mt-4"
    @submit.prevent="onSubmit"
  >
    <v-text-field
      v-model="endpoint"
      variant="outlined"
      density="compact"
      label="Scanner Endpoint"
      placeholder="https://api.example.com/graphql"
      :disabled="props.scanner !== null"
      :rules="[rules.required, rules.url]"
    />
    <v-text-field
      v-model="name"
      variant="outlined"
      density="compact"
      label="Scanner Name"
      placeholder="Scanner Name"
      :rules="[rules.required]"
    />
    <v-text-field
      v-model="apiKey"
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
import type { Scanner } from '~/stores/scanners'
import { useScannersStore } from '~/stores/scanners'

/**
 * Props
 * @property {Scanner | null} scanner - Scanner object to edit or null for a new scanner.
 */
const props = defineProps<{
  scanner: Scanner | null
}>()

const endpoint = ref<string>(props.scanner?.endpoint || '')
const name = ref<string>(props.scanner?.name || '')
const apiKey = ref<string>(props.scanner?.apiKey || '')
const form = ref()
const emit = defineEmits(['close-form'])
const scannersStore = useScannersStore()
const rules = {
  required: (value: string) => value.trim() !== '' || '',
  url: (value: string) => isURL(value) || 'Must be a valid URL'
}

/**
 * Handle form submission.
 * Add or update scanner information.
 */
const onSubmit = async (): Promise<void> => {
  const { valid } = await form.value.validate()
  if (valid === true) {
    scannersStore.addOrUpdateScanner({
      endpoint: endpoint.value,
      apiKey: apiKey.value,
      name: name.value
    })
    resetForm()
    emit('close-form')
  }
}

/**
 * Reset the form fields.
 */
const resetForm = (): void => {
  endpoint.value = ''
  name.value = ''
  apiKey.value = ''
}

/**
 * Close the form.
 */
const closeForm = (): void => {
  resetForm()
  emit('close-form')
}
</script>
