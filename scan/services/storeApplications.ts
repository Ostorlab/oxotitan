import type { AxiosInstance } from 'axios'

const QUERY = gql`
  query SearchApplications($search: String!, $platform: MobilePlatform!, $countryCode: String) {
    storeApplications(search: $search, platform: $platform, countryCodeAlpha2: $countryCode) {
      title
      description
      icon
      packageName
    }
  }
`

export default class StoreApplicationsService {
  private readonly $axios: AxiosInstance
  constructor(axios: AxiosInstance) {
    this.$axios = axios
  }

  /**
   * Search for application on the Android or iOS store.
   * @param search Search term.
   * @param platform Platform, either ANDROID or IOS.
   * @param countryCode Optional ISO2 Country code.
   * @returns {any}
   */
  async storeApplications({ search, platform, countryCode }) {
    const res = await this.$axios.post('/apis/graphql', {
      query: QUERY,
      variables: {
        search,
        platform,
        countryCode
      }
    })
    return res?.data?.data?.storeApplications
  }
}
