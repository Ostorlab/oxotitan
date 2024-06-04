import type { AxiosInstance } from 'axios'

import type { Scanner } from '~/project/types'

const API_KEY_HEADER = 'X-Api-Key'

/**
 * Class to aggregate requests to multiple scanners and return the responses
 */
export default class RequestHandler {
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
  _createAuthorizationHeader(scanner: Scanner): { [API_KEY_HEADER]: string } {
    // TODO (mouhcine): Make sure to use the correct authorization header, after ticket #os-9357 is fixed
    return {
      [API_KEY_HEADER]: scanner.apiKey
    }
  }

  /**
     * Method to post a request to a specific scanner and return the response
     * @param scanner
     * @param data
     */
  async post(scanner: Scanner, data: NonNullable<unknown>) {
    if (scanner !== null) {
      return await this.$axios.post(scanner.endpoint, data, {
        headers: this._createAuthorizationHeader(scanner)
      })
    }
  }
}
