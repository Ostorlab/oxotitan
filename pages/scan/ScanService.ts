import type { AxiosInstance } from 'axios'
import type { OxoScanType, QueryScansArgs } from '~/graphql/types'
import requestAggregator from '~/utils/requestAggregator'
import type { Scanner } from '~/project/types'

const SCANS_QUERY = gql`query scans($scanIds: [Int], $page: Int, $numberElements: Int, $orderBy: OxoScanOrderByEnum, $sort: SortEnum) {

  scans(scanIds: $scanIds, page: $page, numberElements: $numberElements, orderBy: $orderBy, sort: $sort) {
    pageInfo{
      count
      numPages
    }
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

  /**
   * Get scans from all scanners
   * @param scanner
   * @param queryScansArgs
   */
  async getScans(scanner: Scanner, queryScansArgs: QueryScansArgs): Promise<OxoScanType[]> {
    queryScansArgs = { ...queryScansArgs }
    if (queryScansArgs.numberElements === -1) {
      queryScansArgs.numberElements = undefined
      queryScansArgs.page = undefined
    }
    const response = await this.requestAggregator.postToScanner(
      scanner,
      {
        query: SCANS_QUERY,
        variables: queryScansArgs
      })
    const scans = response?.data?.data.scans.scans || []
    this.totalScans = response?.data?.data?.scans?.pageInfo?.count || scans.length
    return scans
  }

  /**
   * Stop a scan
   * @param scan
   */
  stopScan(scan: OxoScanType): Promise<void> {
    console.log(scan)
    alert('stopScan not implemented')
    return Promise.resolve()
  }

  /**
   * Delete a scan
   * @param scan
   */
  deleteScan(scan: OxoScanType): Promise<void> {
    console.log(scan)
    alert('stopScan not implemented')
    return Promise.resolve()
  }
}
