<template>
  <div>
    <DfConfirmationModal
      v-model:model-value="deleteScannerDialog"
      :title="confirmDeleteScannerText"
      cancel-button-text="Cancel"
      confirm-button-text="Delete"
      cancel-icon="mdi-close"
      confirm-icon="mdi-check"
      confirm-button-color="secondary"
      card-icon="mdi-trash-can-outline"
      @confirm="deleteScanner"
      @cancel="selectedScanner = null"
    />
    <v-card
      v-if="showForm === true"
      variant="outlined"
      class="pa-4 mb-4"
    >
      <ScannerForm
        :scanner="selectedScanner"
        :is-edit-mode="true"
        @close-form="onCloseForm"
      />
    </v-card>
    <v-card variant="outlined">
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="scanners"
        :items-per-page="-1"
        hide-default-footer
        loading-text="Loading scanners..."
        no-data-text="No scanners added"
        density="compact"
      >
        <template #[`item.name`]="{ item }">
          {{ item.name }}
        </template>
        <template #[`item.endpoint`]="{ item }">
          <code>{{ item.endpoint }}</code>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-btn
            variant="text"
            size="small"
            :icon="true"
          >
            <v-icon icon="mdi-dots-vertical" />
            <v-menu
              activator="parent"
              location="bottom"
            >
              <v-list
                density="compact"
                class="py-0"
              >
                <template
                  v-for="(action, i) in actions"
                  :key="`item-${action.title}-${i}`"
                >
                  <v-list-item @click="action.action(item)">
                    <v-icon
                      start
                      size="small"
                      :icon="action.icon"
                    />
                    {{ action.title }}
                  </v-list-item>
                  <v-divider v-if="i !== actions.length - 1" />
                </template>
              </v-list>
            </v-menu>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { Scanner } from '~/project/types'
import { DfConfirmationModal } from '~/dragonfly/components/Modals/DfConfirmationModal'
import ScannerForm from '~/project/scanners/components/ScannerForm.vue'

const scannersStore = useScannersStore()
const notificationsStore = useNotificationsStore()
const loading = ref(true)
const deleteScannerDialog = ref(false)
const showForm = ref(false)
const selectedScanner: Ref<Scanner | null> = ref(null)
const headers = [
  {
    title: 'Name',
    value: 'name',
    align: 'left',
    width: '10%'
  },
  {
    title: 'Endpoint',
    value: 'endpoint',
    align: 'left'
  },
  {
    title: 'Actions',
    value: 'actions',
    align: 'center',
    width: '5%'
  }
]
const actions = [
  {
    title: 'Edit',
    action: (scanner: Scanner) => onUpdateScanner(scanner),
    icon: 'mdi-pencil-outline',
    color: 'primary',
    divider: true
  },
  {
    title: 'Delete',
    action: (scanner: Scanner) => confirmDeleteScanner(scanner),
    icon: 'mdi-delete',
    color: 'red'
  }
]

const scanners = computed(() => scannersStore.scanners)
const confirmDeleteScannerText = computed(() => {
  if (selectedScanner.value === null) {
    return 'Are you sure you would like to delete this scanner?'
  }
  return `Are you sure you would like to delete the '${selectedScanner.value.name}' scanner?`
})

/**
 * Handle the update-scanner event.
 * @param {Scanner} scanner - The scanner object to be updated.
 */
const onUpdateScanner = (scanner: Scanner): void => {
  selectedScanner.value = scanner
  showForm.value = true
}

/**
 * Close the scanner form.
 */
const onCloseForm = (): void => {
  showForm.value = false
  selectedScanner.value = null
}

/**
 * Confirm the scanner to delete.
 * @param scanner The scanner to delete.
 */
const confirmDeleteScanner = (scanner: Scanner): void => {
  selectedScanner.value = scanner
  deleteScannerDialog.value = true
}

/**
 * Remove the current scanner.
 */
const deleteScanner = (): void => {
  if (selectedScanner.value !== null) {
    try {
      scannersStore.deleteScanner(selectedScanner.value.endpoint)
      notificationsStore.reportSuccess('Scanner deleted successfully.')
    } catch (error) {
      notificationsStore.reportError('Failed to delete scanner. Please try again.')
    } finally {
      selectedScanner.value = null
    }
  }
}

onMounted(() => {
  loading.value = false
})
</script>
