import { defineStore } from 'pinia'

export interface Scanner {
  endpoint: string
  apiKey: string
}
interface ScannersState {
  scanners: Scanner[]
}

interface ScannersActions {
  addOrUpdateScanner(scanner: Scanner): void
  deleteScanner(endpoint: string): void
}

export const useScannersStore = defineStore<'scanners', ScannersState, Record<string, never>, ScannersActions>('scanners', {
  state: () => ({
    scanners: [] as Scanner[]
  }),
  actions: {
    addOrUpdateScanner(scanner: Scanner) {
      const index = this.scanners.findIndex((_scanner) => _scanner.endpoint === scanner.endpoint)
      if (index == -1)
        this.scanners.push(scanner)
      else {
        this.scanners[index] = scanner
      }
    },
    deleteScanner(endpoint: string) {
      const index = this.scanners.findIndex((scanner) => scanner.endpoint === endpoint)
      if (index !== -1) {
        this.scanners.splice(index, 1)
      }
    }
  },
  persist: {
    storage: persistedState.localStorage
  }
})
