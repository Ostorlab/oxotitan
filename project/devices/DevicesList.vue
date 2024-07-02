<template>
  <div>
    <DfConfirmationModal
      v-model:model-value="deleteDeviceDialog"
      :title="confirmDeleteDeviceText"
      cancel-button-text="Cancel"
      confirm-button-text="Delete"
      cancel-icon="mdi-close"
      confirm-icon="mdi-check"
      confirm-button-color="secondary"
      card-icon="mdi-trash-can-outline"
      @confirm="deleteDevice"
      @cancel="selectedDevice = null"
    />
    <v-card
      v-if="showForm === true"
      variant="outlined"
      class="pa-4 mb-4"
    >
      <DeviceForm
        :device="selectedDevice"
        :is-edit-mode="true"
        @close-form="onCloseForm"
      />
    </v-card>
    <v-card variant="outlined">
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="devices"
        :items-per-page="-1"
        hide-default-footer
        loading-text="Loading devices..."
        no-data-text="No devices added"
        density="compact"
      >
        <template #[`item.name`]="{ item }">
          {{ item.name }}
        </template>
        <template #[`item.deviceId`]="{ item }">
          {{ item.deviceId }}
        </template>
        <template #[`item.platform`]="{ item }">
          {{ item.platform }}
        </template>
        <template #[`item.version`]="{ item }">
          {{ item.version }}
        </template>
        <template #[`item.available`]="{ item }">
          <v-icon :color="item.available ? 'success' : 'red'">
            {{ item.available ? 'mdi-check' : 'mdi-close' }}
          </v-icon>
        </template>
        <template #[`item.rooted`]="{ item }">
          <v-icon :color="item.rooted ? 'success' : 'red'">
            {{ item.rooted ? 'mdi-check' : 'mdi-close' }}
          </v-icon>
        </template>
        <template #[`item.xcodeOrgId`]="{ item }">
          {{ item.xcodeOrgId }}
        </template>
        <template #[`item.xcodeSigningId`]="{ item }">
          {{ item.xcodeSigningId }}
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
import { type Device } from '~/project/types'
import { DfConfirmationModal } from '~/dragonfly/components/Modals/DfConfirmationModal'
import DeviceForm from '~/project/devices/DeviceForm.vue'
import { useDevicesStore } from '~/stores/devices'

const devicesStore = useDevicesStore()
const notificationsStore = useNotificationsStore()
const loading = ref(true)
const deleteDeviceDialog = ref(false)
const showForm = ref(false)
const selectedDevice: Ref<Device | null> = ref(null)

const headers = [
  {
    title: 'Name',
    value: 'name',
    align: 'left',
    width: '10%'
  },
  {
    title: 'Device ID',
    value: 'deviceId',
    align: 'left'
  },
  {
    title: 'platform',
    value: 'platform'
  },
  {
    title: 'Version',
    value: 'version'
  },
  {
    title: 'Available',
    value: 'available'
  },
  {
    title: 'Rooted',
    value: 'rooted'
  },
  {
    title: 'Xcode Org ID',
    value: 'xcodeOrgId'
  },
  {
    title: 'Xcode Signing ID',
    value: 'xcodeSigningId'
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
    action: (device: Device) => onUpdateDevice(device),
    icon: 'mdi-pencil-outline',
    color: 'primary',
    divider: true
  },
  {
    title: 'Delete',
    action: (device: Device) => confirmDeleteDevice(device),
    icon: 'mdi-delete',
    color: 'red'
  }
]

const devices = computed(() => devicesStore.devices)
const confirmDeleteDeviceText = computed(() => {
  if (selectedDevice.value === null) {
    return 'Are you sure you would like to delete this device?'
  }
  return `Are you sure you would like to delete the '${selectedDevice.value.name}' device?`
})

/**
 * Handle the update-device event.
 * @param {Device} device - The device object to be updated.
 */
const onUpdateDevice = (device: Device): void => {
  selectedDevice.value = device
  showForm.value = true
}

/**
 * Close the device form.
 */
const onCloseForm = (): void => {
  showForm.value = false
  selectedDevice.value = null
}

/**
 * Confirm the device to delete.
 * @param device The device to delete.
 */
const confirmDeleteDevice = (device: Device): void => {
  selectedDevice.value = device
  deleteDeviceDialog.value = true
}

/**
 * Remove the current device.
 */
const deleteDevice = (): void => {
  if (selectedDevice.value !== null) {
    try {
      devicesStore.deleteDevice(selectedDevice.value.deviceId)
      notificationsStore.reportSuccess('Device deleted successfully.')
    } catch (error) {
      notificationsStore.reportError('Failed to delete device. Please try again.')
    } finally {
      selectedDevice.value = null
    }
  }
}

onMounted(() => {
  loading.value = false
})
</script>
