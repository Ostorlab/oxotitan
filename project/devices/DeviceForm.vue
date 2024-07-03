<template>
  <v-form
    ref="form"
    v-model="isValid"
    @submit.prevent="onSubmit"
  >
    <v-row no-gutters>
      <v-col
        class="pa-2"
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
        class="pa-2"
      >
        <v-text-field
          v-model="localDevice.name"
          variant="outlined"
          density="compact"
          label="Device name"
          placeholder="Android A3"
          :rules="[rules.required]"
          hide-details
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col
        cols="12"
        md="6"
        class="pa-2"
      >
        <v-text-field
          v-model="localDevice.deviceId"
          :disabled="isEditMode === true"
          variant="outlined"
          density="compact"
          label="Device ID"
          placeholder="Device ID"
          :rules="[rules.required]"
          hide-details
        />
      </v-col>
      <v-col
        class="pa-2"
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
    <v-row
      v-if="isIos === true"
      no-gutters
    >
      <v-col
        class="pa-2"
        cols="12"
        md="4"
      >
        <v-text-field
          v-model="localDevice.xcodeOrgId"
          variant="outlined"
          density="compact"
          label="xcode organisation ID"
          placeholder="xcode organisation ID"
          hide-details
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
        class="pa-2"
      >
        <v-text-field
          v-model="localDevice.xcodeSigningId"
          variant="outlined"
          density="compact"
          label="xcode Signing ID"
          placeholder="xcode Signing ID"
          hide-details
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
        class="pa-2"
      >
        <v-file-input
          v-model="localDevice.provisionProfile"
          variant="outlined"
          density="compact"
          label="Provision Profile"
          placeholder="Provision Profile"
          hide-details
        />
      </v-col>
    </v-row>

    <v-row no-gutters>
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
    <v-row no-gutters>
      <v-col
        cols="12"
        md="6"
        class="pa-2"
      >
        <v-text-field
          v-model="localDevice.relay.ip"
          variant="outlined"
          density="compact"
          label="IP Address"
          placeholder="0.0.0.0"
          :rules="[rules.required, rules.ip]"
        />
      </v-col>
      <v-col
        class="pa-2"
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="localDevice.relay.port"
          variant="outlined"
          density="compact"
          label="Port"
          placeholder="22"
          :rules="[rules.required, rules.port]"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col
        md="6"
        cols="12"
        class="pa-2"
      >
        <v-text-field
          v-model="localDevice.relay.username"
          variant="outlined"
          density="compact"
          label="Username"
          placeholder="root"
          :rules="[rules.required]"
          hide-details
        />
      </v-col>
      <v-col
        md="6"
        cols="12"
        class="pa-2"
      >
        <v-text-field
          v-model="localDevice.relay.password"
          variant="outlined"
          density="compact"
          label="Password"
          type="password"
          placeholder="Password"
          :rules="[rules.required]"
          hide-details
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
          :disabled="isValid === false"
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
import { isIP, isPort } from 'validator'
import { useDevicesStore } from '~/stores/devices'
import { useNotificationsStore } from '~/stores/notifications'
import { type Device, type DeviceInput, Platform } from '~/project/types'
import DevicePlatform from '~/project/devices/DevicePlatform.vue'

const DEFAULT_DEVICE_VALUE: DeviceInput = {
  name: null,
  deviceId: null,
  platform: Platform.Android,
  version: '0.0',
  available: false,
  rooted: false,
  xcodeOrgId: null,
  xcodeSigningId: null,
  provisionProfile: null,
  location: null,
  relay: {
    ip: null,
    username: null,
    password: null,
    port: null
  }
}

/**
 * Props
 * @property {Device | null} device - Device object to edit or null for a new device.
 */
const props = defineProps({
  device: {
    type: Object as PropType<Device>,
    default: () => ({ }),
    required: false
  },
  isEditMode: {
    type: Boolean,
    default: false
  }
})

const form = ref()
const isValid = ref(false)
const emit = defineEmits(['close-form'])
const devicesStore = useDevicesStore()
const notificationsStore = useNotificationsStore()
const localDevice = ref<Device | DeviceInput>(DEFAULT_DEVICE_VALUE)
const rules = {
  required: (value: string) => !!value || 'Required.',
  ip: (value: string) => isIP(value) || 'Must be a valid IP',
  port: (value: string) => isPort(value) || 'Must be a valid Port'
}

watch(props.device, (newVal) => {
  if ((newVal !== null && newVal !== undefined)) {
    localDevice.value = { ...newVal } as Device
  }
}, { immediate: true, deep: true })

/**
 * Handle form submission.
 * Add or update device information.
 */

const onSubmit = async (): Promise<void> => {
  if (isValid.value === true && localDevice.value !== null) {
    try {
      devicesStore.addOrUpdateDevice(localDevice.value as Device)
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
 * Compute if a selected platform is ios
 */
const isIos = computed((): boolean => {
  return [Platform.Ios, Platform.IosIpad].includes(localDevice.value.platform)
})
</script>
