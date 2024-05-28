import { defineStore } from 'pinia'
import type { Scanner } from '~/project/types'

interface ScannersState {
  scanners: Scanner[]
}

interface ScannersActions {
  addScanner(scanner: Scanner): void
  removeScanner(endpoint: string): void
}

export const useScannersStore = defineStore<'scanners', ScannersState, Record<string, never>, ScannersActions>('scanners', {
  state: () => ({
    scanners: [] as Scanner[]
  }),
  actions: {
    addScanner(scanner: Scanner) {
      // TODO(benyissa): implement local storage
      this.scanners.push(scanner)
    },
    removeScanner(endpoint: string) {
      // TODO(benyissa): implement local storage
      this.scanners = this.scanners.filter((scanner) => scanner.endpoint !== endpoint)
    }
  }
})
