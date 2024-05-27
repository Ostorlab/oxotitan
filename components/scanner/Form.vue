<template>
  <v-form
    class="mt-4"
    @submit.prevent="OnSubmit"
  >
    <v-text-field
      v-model="endpoint"
      variant="outlined"
      density="compact"
      label="Scanner Endpoint"
      placeholder="https://api.example.com/graphql"
      required
      :disabled="props.scanner !== null"
    />
    <v-text-field
      v-model="apiKey"
      variant="outlined"
      density="compact"
      label="API Key"
      placeholder="Enter API Key"
      required
    />
    <v-btn
      type="submit"
      color="success"
      variant="outlined"
      :disabled="!endpoint || !apiKey"
    >
      Save
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import type { Scanner } from '~/stores/scanners'

const props = defineProps({
  scanner: {
    type: Object as () => Scanner | null,
    default: null
  }
})
const endpoint = ref(props.scanner?.endpoint || '')
const apiKey = ref(props.scanner?.apiKey || '')
const emit = defineEmits(['close-form'])
const scannersStore = useScannersStore()

const OnSubmit = () => {
  scannersStore.addOrUpdateScanner({
    endpoint: endpoint.value,
    apiKey: apiKey.value
  })
  endpoint.value = ''
  apiKey.value = ''
  emit('close-form')
}
</script>
