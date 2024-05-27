import { defineStore } from 'pinia'

interface Scanner {
  endpoint: string
  apiKey: string
}

export const useScannersStore = defineStore('scanners', {
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
