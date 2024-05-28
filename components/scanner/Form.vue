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
      :disabled="!endpoint || !apiKey || !name"
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

const props = defineProps({
  scanner: {
    type: Object as () => Scanner | null,
    default: null
  }
})
const endpoint = ref(props.scanner?.endpoint || '')
const name = ref(props.scanner?.name || '')
const apiKey = ref(props.scanner?.apiKey || '')
const emit = defineEmits(['close-form'])
const scannersStore = useScannersStore()

const onSubmit = () => {
  scannersStore.addOrUpdateScanner({
    endpoint: endpoint.value,
    apiKey: apiKey.value,
    name: name.value
  })
  endpoint.value = ''
  apiKey.value = ''
  emit('close-form')
}
</script>
