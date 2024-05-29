import { defineStore } from 'pinia'
import { push } from 'notivue'

interface NotificationsActions {
  /**
     * Reports an error by showing an error notification.
     * @param message The message to show in the alert.
     */
  reportError(message: string): void

  /**
     * Reports a success by showing a success notification.
     * @param message The message to show in the alert.
     */
  reportSuccess(message: string): void

  /**
     * Reports an info message by showing an info notification.
     * @param message The message to show in the alert.
     */
  reportInfo(message: string): void

  /**
     * Reports a warning by showing a warning notification.
     * @param message The message to show in the alert.
     */
  reportWarning(message: string): void

}
/**
 * Store for managing notifications.
 */
export const useNotificationsStore = defineStore<'notifications', Record<string, never>, Record<string, never>, NotificationsActions>('notifications', {
  actions: {
    /**
     * Reports an error by showing an error notification.
     * @param message The message to show in the alert.
     */
    reportError(message: string): void {
      push.error(message)
    },

    /**
     * Reports a success by showing a success notification.
     * @param message The message to show in the alert.
     */
    reportSuccess(message: string): void {
      push.success(message)
    },

    /**
     * Reports an info message by showing an info notification.
     * @param message The message to show in the alert.
     */
    reportInfo(message: string): void {
      push.info(message)
    },
    /**
     * Reports a warning by showing a warning notification.
     * @param message The message to show in the alert.
     */
    reportWarning(message: string): void {
      push.warning(message)
    }
  }
})
