import type { AxiosInstance } from 'axios'

import type { Scanner } from '~/project/types'

/**
 * Class to aggregate requests to multiple scanners and return the responses
 */
export default class requestHandler {
  private readonly $axios: AxiosInstance

  /**
   * Constructor for the requestAggregator class that initializes the axios instance and the scanners
   * @param axios
   */
  constructor(axios: AxiosInstance) {
    this.$axios = axios
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
     * Method to post a request to a specific scanner and return the response
     * @param scanner
     * @param data
     */
  async post(scanner: Scanner, data: NonNullable<unknown>) {
    return await this.$axios.post(scanner.endpoint, data, {
      headers: this._createAuthorizationHeader(scanner)
    })
  }
}
