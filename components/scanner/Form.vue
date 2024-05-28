<template>
  <v-form
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
    />
    <v-text-field
      v-model="name"
      variant="outlined"
      density="compact"
      label="Scanner Name"
      placeholder="Scanner Name"
    />
    <v-text-field
      v-model="apiKey"
      variant="outlined"
      density="compact"
      label="API Key"
      placeholder="Enter API Key"
    />
    <v-btn
      class="me-2"
      type="submit"
      color="success"
      text="Save"
      prepend-icon="mdi-check"
    />
    <v-btn
      type="cancel"
      text="Cancel"
      prepend-icon="mdi-close"
      @click="emit('close-form')"
    />
  </v-form>
</template>

<script setup lang="ts">
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
const emit = defineEmits(['close-form'])
const scannersStore = useScannersStore()

/**
 * Handle form submission.
 * Add or update scanner information.
 */
const onSubmit = (): void => {
  scannersStore.addOrUpdateScanner({
    endpoint: endpoint.value,
    apiKey: apiKey.value,
    name: name.value
  })
  endpoint.value = ''
  apiKey.value = ''
  name.value = ''
  emit('close-form')
}
// TODO(benyissa) ADD FORM VALIDATION
</script>
