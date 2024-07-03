import { defineStore } from 'pinia'
import type { Device, DeviceInput } from '~/project/types'

interface DevicesState {
  devices: Device[]
}

/**
 * Represents the actions of the devices' store.
 */
interface DevicesActions {
  /**
   * Adds a new device or updates an existing device.
   * @param device - The device to be added or updated.
   */
  addOrUpdateDevice(device: Device | DeviceInput): void

  /**
   * Deletes a device by its endpoint.
   * @param endpoint - The endpoint of the device to be deleted.
   */
  deleteDevice(endpoint: string): void
}

export const useDevicesStore = defineStore<'devices', DevicesState, Record<string, never>, DevicesActions>('devices', {
  state: (): DevicesState => ({
    devices: [] as Device[]
  }),
  actions: {
    /**
     * Adds a new device or updates an existing device.
     * @param device - The device to be added or updated.
     */
    addOrUpdateDevice(device: Device): void {
      const index = this.devices.findIndex((_device) => _device.deviceId === device.deviceId)
      if (index === -1) {
        this.devices.push(device)
      } else {
        this.devices[index] = device
      }
    },

    /**
     * Deletes a device by its endpoint.
     * @param deviceId - The endpoint of the device to be deleted.
     */
    deleteDevice(deviceId: string): void {
      this.devices = this.devices.filter((device) => device.deviceId !== deviceId)
    }
  },
  persist: {
    storage: persistedState.localStorage
  }
})
