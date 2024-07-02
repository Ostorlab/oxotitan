<template>
  <v-form
    ref="form"
    v-model="isValid"
    @submit.prevent="onSubmit"
  >
    localDevice: {{ localDevice }}
    <v-text-field
      v-model="localDevice.name"
      variant="outlined"
      density="compact"
      label="Device name"
      placeholder="Android A3"
      :disabled="isEditMode === true"
      :rules="[rules.required]"
    />
    <v-text-field
      v-model="localDevice.deviceId"
      variant="outlined"
      density="compact"
      label="Device ID"
      placeholder="Device ID"
      :rules="[rules.required]"
    />
    <v-text-field
      v-model="localDevice.version"
      variant="outlined"
      density="compact"
      label="Device version"
      placeholder="Device ID"
      :rules="[rules.required]"
    />
    <v-text-field
      v-model="localDevice.xcodeOrgId"
      variant="outlined"
      density="compact"
      label="xcodeOrgId"
      placeholder="Device ID"
      :rules="[rules.required]"
    />
    <v-text-field
      v-model="localDevice.xcodeSigningId"
      variant="outlined"
      density="compact"
      label="xcodeSigningId"
      placeholder="xcodeSigningId"
      :rules="[rules.required]"
    />
    <v-select
      v-model="localDevice.platform"
      variant="outlined"
      density="compact"
      label="Platform"
      :items="Object.values(Platform)"
      :rules="[rules.required]"
    />
    <v-checkbox
      v-model="localDevice.available"
      variant="outlined"
      density="compact"
      label="Available"
    />
    <v-checkbox
      v-model="localDevice.rooted"
      variant="outlined"
      density="compact"
      label="Rooted"
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
import { useDevicesStore } from '~/stores/devices'
import { useNotificationsStore } from '~/stores/notifications'
import { type Device, Platform } from '~/project/types'

const DEFAULT_DEVICE_VALUE = {
  name: 'string',
  deviceId: 'string',
  platform: Platform.Android,
  version: '16.0.0',
  available: true,
  rooted: false,
  xcodeOrgId: 'string',
  xcodeSigningId: 'string',
  // provision_profile: string,
  location: 'string'
}

/**
 * Props
 * @property {Device | null} device - Device object to edit or null for a new device.
 */
const props = defineProps({
  device: {
    type: Object as PropType<Device>,
    default: () => ({ endpoint: '', apiKey: '', name: '' }),
    required: false
  },
  isEditMode: {
    type: Boolean,
    defualt: false
  }
})

const form = ref()
const isValid = ref(false)
const emit = defineEmits(['close-form'])
const devicesStore = useDevicesStore()
const notificationsStore = useNotificationsStore()
const localDevice = ref<Device>(DEFAULT_DEVICE_VALUE)
const rules = {
  required: (value: string) => value?.trim() !== '' || '',
  url: (value: string) => isURL(value) || 'Must be a valid URL'
}

watch(props.device, (newVal) => {
  localDevice.value = { ...newVal } as Device
}, { immediate: true, deep: true })

/**
 * Handle form submission.
 * Add or update device information.
 */

const onSubmit = async (): Promise<void> => {
  if (isValid.value === true && localDevice.value !== null) {
    try {
      devicesStore.addOrUpdateDevice(localDevice.value)
      resetForm()
      emit('close-form')
      notificationsStore.reportSuccess('Device saved successfully.')
    } catch (error) {
      notificationsStore.reportError('Failed to save device information. Please try again.')
    }
  }
}

/**
 * Reset the form fields.
 */
const resetForm = (): void => {
  localDevice.value = DEFAULT_DEVICE_VALUE
}

/**
 * Close the form.
 */
const closeForm = (): void => {
  resetForm()
  emit('close-form')
}
</script>
