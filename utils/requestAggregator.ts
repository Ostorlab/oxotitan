import type { AxiosInstance } from 'axios'

import type { Scanner } from '~/project/types'
import { useScannersStore } from '~/stores/scanners'

/**
 * Class to aggregate requests to multiple scanners and return the responses
 */
export default class requestAggregator {
  private readonly $axios: AxiosInstance
  private readonly scanners: Scanner[]

  /**
   * Constructor for the requestAggregator class that initializes the axios instance and the scanners
   * @param axios
   */
  constructor(axios: AxiosInstance) {
    const scannersStore = useScannersStore()
    this.$axios = axios
    this.scanners = scannersStore.scanners
  }

  /**
     * Method to create the authorization header for the request
     * @param scanner
     */
  _createAuthorizationHeader(scanner: Scanner): { Authorization: string } {
    // TODO (mouhcine): Make sure to use the correct authorization header, after ticket #os-9357 is fixed
    return {
      Authorization: 'Bearer ' + scanner.apiKey
    }
  }

  /**
     * Method to post a request to all scanners and return the responses
     * @param data
     */
  async postToAll(data: NonNullable<unknown>): Promise<Map<string, unknown>> {
    const responses = new Map<string, unknown>()
    for (const scanner of this.scanners) {
      const response = await this.$axios.post(scanner.endpoint, data, {
        headers: this._createAuthorizationHeader(scanner)
      })
      responses.set(scanner.endpoint, response.data)
    }
    return responses
  }

  /**
     * Method to post a request to a specific scanner and return the response
     * @param scanner
     * @param data
     */
  async postToScanner(scanner: Scanner, data: NonNullable<unknown>) {
    return await this.$axios.post(scanner.endpoint, data, {
      headers: this._createAuthorizationHeader(scanner)
    })
  }
}
