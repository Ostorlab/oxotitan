import type { AxiosInstance } from 'axios'
import type { OxoScanType, QueryScansArgs } from '~/graphql/types'
import requestHandler from '~/utils/requestHandler'
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

const DELETE_SCAN_MUTATION = gql`mutation stopScan($scanId: Int!) {
  deleteScan(scanId: $scanId) {
    result
  }
}
`

export default class ScansService {
  private readonly requestAggregator: requestHandler
  totalScans: number
  constructor(axios: AxiosInstance) {
    this.requestAggregator = new requestHandler(axios)
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
    const response = await this.requestAggregator.post(
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
   * @param _scanner
   * @param _scanId
   */
  stopScan(_scanner: Scanner, _scanId: number): Promise<void> {
    // TODO (mouhcine): Implement stopScan
    return Promise.resolve()
  }

  /**
   * Delete a scan
   * @param scanner
   * @param scanId
   */
  async deleteScan(scanner: Scanner, scanId: number): Promise<boolean> {
    const response = await this.requestAggregator.post(
      scanner,
      {
        query: DELETE_SCAN_MUTATION,
        variables: {
          scanId: scanId
        }
      })
    return response?.data?.deleteScan?.result || false
  }
}
