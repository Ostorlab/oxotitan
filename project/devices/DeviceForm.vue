<template>
  <v-form
    ref="form"
    v-model="isValid"
    @submit.prevent="onSubmit"
  >
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-select
          v-model="localDevice.platform"
          variant="outlined"
          density="compact"
          label="Platform"
          :items="Object.values(Platform)"
          :rules="[rules.required]"
          hide-details
        >
          <template #item="{ props: item_props, item }">
            <v-list-item
              density="compact"
              v-bind="item_props"
              title=""
            >
              <DevicePlatform :platform="item.value" />
            </v-list-item>
          </template>
          <template #selection="{ item }">
            <DevicePlatform :platform="item.value" />
          </template>
        </v-select>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="localDevice.name"
          variant="outlined"
          density="compact"
          label="Device name"
          placeholder="Android A3"
          :disabled="isEditMode === true"
          :rules="[rules.required]"
          hide-details
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="localDevice.deviceId"
          variant="outlined"
          density="compact"
          label="Device ID"
          placeholder="Device ID"
          :rules="[rules.required]"
          hide-details
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="localDevice.version"
          variant="outlined"
          density="compact"
          label="Device version"
          placeholder="Device ID"
          :rules="[rules.required]"
          hide-details
        />
      </v-col>
    </v-row>
    <v-row v-if="isIos === true">
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="localDevice.xcodeOrgId"
          variant="outlined"
          density="compact"
          label="xcode organisation ID"
          placeholder="xcode organisation ID"
          :rules="[rules.required]"
          hide-details
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="localDevice.xcodeSigningId"
          variant="outlined"
          density="compact"
          label="xcode Signing ID"
          placeholder="xcode Signing ID"
          :rules="[rules.required]"
          hide-details
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
      >
        <v-checkbox
          v-model="localDevice.available"
          hide-details
          variant="outlined"
          density="compact"
          label="Available"
        />
        <v-checkbox
          v-model="localDevice.rooted"
          hide-details
          variant="outlined"
          density="compact"
          label="Rooted / Jail Broken?"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
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
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { useDevicesStore } from '~/stores/devices'
import { useNotificationsStore } from '~/stores/notifications'
import { type Device, Platform } from '~/project/types'
import DevicePlatform from '~/project/devices/DevicePlatform.vue'

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
  required: (value: string) => value?.trim() !== '' || ''
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
/**
 * Compute if selected platform is ios
 */
const isIos = computed((): boolean => {
  return [Platform.Ios, Platform.IosIpad].includes(localDevice.value.platform)
})
</script>
