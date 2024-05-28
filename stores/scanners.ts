import { defineStore } from 'pinia'

/**
 * Represents a Scanner object.
 */
export interface Scanner {
  endpoint: string
  apiKey: string
  name: string
}

/**
 * Represents the state of the scanners store.
 */
interface ScannersState {
  scanners: Scanner[]
}

/**
 * Represents the actions of the scanners store.
 */
interface ScannersActions {
  /**
   * Adds a new scanner or updates an existing scanner.
   * @param scanner - The scanner to be added or updated.
   */
  addOrUpdateScanner(scanner: Scanner): void

  /**
   * Deletes a scanner by its endpoint.
   * @param endpoint - The endpoint of the scanner to be deleted.
   */
  deleteScanner(endpoint: string): void
}

export const useScannersStore = defineStore<'scanners', ScannersState, Record<string, never>, ScannersActions>('scanners', {
  state: (): ScannersState => ({
    scanners: [] as Scanner[]
  }),
  actions: {
    /**
     * Adds a new scanner or updates an existing scanner.
     * @param scanner - The scanner to be added or updated.
     */
    addOrUpdateScanner(scanner: Scanner): void {
      const index = this.scanners.findIndex((_scanner) => _scanner.endpoint === scanner.endpoint)
      if (index === -1) {
        this.scanners.push(scanner)
      } else {
        this.scanners[index] = scanner
      }
    },

    /**
     * Deletes a scanner by its endpoint.
     * @param endpoint - The endpoint of the scanner to be deleted.
     */
    deleteScanner(endpoint: string): void {
      this.scanners = this.scanners.filter((scanner) => scanner.endpoint !== endpoint)
    }
  },
  persist: {
    storage: persistedState.localStorage
  }
})
