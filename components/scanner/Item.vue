<template>
  <div>
    <ScannerForm
      v-if="showForm"
      :scanner="scanner"
      @close-form="onCloseForm"
    />
    <v-list-item
      v-else
      :title="scanner.name"
      :subtitle="scanner.endpoint"
      prepend-icon="mdi-laptop"
      class="mb-6"
    >
      <template #append>
        <v-btn
          variant="flat"
        >
          <v-icon icon="mdi-dots-vertical" />
          <v-menu
            activator="parent"
            location="bottom"
          >
            <v-list>
              <v-list-item
                v-for="(item, i) in actions"
                :key="`item-${item.title}-${i}`"
                @click="item.action"
              >
                <v-list-item-title>
                  <v-icon
                    start
                    :icon="item.icon"
                  /> {{ item.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </v-list-item>
  </div>
</template>

<script setup lang="ts">
import { type Scanner, useScannersStore } from '@/stores/scanners'

const showForm = ref(false)

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
  showForm.value = true
}
const onCloseForm = () => {
  showForm.value = false
}

const actions = [
  {
    title: 'Edit',
    action: onUpdateScanner,
    icon: 'mdi-pencil-outline',
    color: 'primary',
    divider: true
  },
  {
    title: 'Delete',
    action: onRemoveScanner,
    icon: 'mdi-delete',
    color: 'red'
  }
]
</script>
