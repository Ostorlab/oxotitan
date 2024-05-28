import type { AxiosInstance } from 'axios'
import type { OxoScanType, QueryScansArgs } from '~/graphql/types'
import requestAggregator from '~/utils/requestAggregator'

const SCANS_QUERY = gql`query scans($scanIds: [Int], $page: Int, $numberElements: Int, $orderBy: OxoScanOrderByEnum, $sort: SortEnum) {
    scans(scanIds: $scanIds, page: $page, numberElements: $numberElements, orderBy: $orderBy, sort: $sort) {
        scans {
            id
            title
            asset
            createdTime
            progress
        }
    }
}
`

export default class ScansService {
  private readonly requestAggregator: requestAggregator
  totalScans: number
  constructor(axios: AxiosInstance) {
    this.requestAggregator = new requestAggregator(axios)
    this.totalScans = 0
  }

  _aggregateScans(responses: Map<string, unknown>): OxoScanType[] {
    this.totalScans = 0
    let scans: OxoScanType[] = []
    for (const [endpoint, response] of responses) {
      this.totalScans += response?.data?.scans?.scans?.length || 0
      let requestScans = response?.data?.scans?.scans || []
      requestScans = requestScans.map((scan: OxoScanType) => {
        return {
          ...scan,
          scanner: endpoint
        }
      })
      scans = scans.concat(requestScans)
    }
    return scans
  }

  async getScans(queryScansArgs: QueryScansArgs): Promise<OxoScanType[]> {
    queryScansArgs = { ...queryScansArgs }
    if (queryScansArgs.numberElements === -1) {
      queryScansArgs.numberElements = undefined
      queryScansArgs.page = undefined
    }
    const responses = await this.requestAggregator.postToAll('/graphql', {
      query: SCANS_QUERY,
      variables: queryScansArgs
    })
    return this._aggregateScans(responses)
  }

  stopScan(scan: OxoScanType): Promise<void> {
    console.log(scan)
    alert('stopScan not implemented')
    return Promise.resolve()
  }
}
