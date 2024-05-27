<template>
  <v-list-item
    :title="scanner.endpoint"
    prepend-icon="mdi-laptop"
  >
    <template #append>
      <v-row class="ma-1">
        <v-col>
          <v-btn
            icon="mdi-pencil"
            color="primary"
            size="small"
            variant="outlined"
            @click="onUpdateScanner"
          />
        </v-col>
        <v-col>
          <v-btn
            icon="mdi-delete"
            color="red"
            size="small"
            variant="outlined"
            @click="onRemoveScanner"
          />
        </v-col>
      </v-row>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { type Scanner, useScannersStore } from '@/stores/scanners'

const emit = defineEmits(['update-scanner'])

const props = defineProps({
  scanner: {
    type: Object as () => Scanner,
    required: true
  }
})

const scannersStore = useScannersStore()

const onRemoveScanner = () => {
  scannersStore.deleteScanner(props.scanner.endpoint)
}

const onUpdateScanner = () => {
  emit('update-scanner', props.scanner)
}
</script>
