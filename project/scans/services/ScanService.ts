import type { AxiosInstance } from 'axios'
import type { OxoScanType, QueryScansArgs } from '~/graphql/types'
import RequestHandler from '~/utils/requestHandler'
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

const DELETE_SCAN_MUTATION = gql`mutation deleteScan($scanId: Int!) {
  deleteScan(scanId: $scanId) {
    result
  }
}
`

const STOP_SCAN_MUTATION = gql`mutation stopScan($scanId: Int!) {
  stopScan(scanId: $scanId) {
    scan {
      id
    }
  }
}`

const IMPORT_SCAN_MUTATION = gql`mutation ImportScan($file: Upload!, $scanId: Int) {
  importScan(file: $file, scanId: $scanId) {
    message
  }
}`

export default class ScansService {
  private readonly requestor: RequestHandler
  totalScans: number
  constructor(axios: AxiosInstance) {
    this.requestor = new RequestHandler(axios)
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
    const response = await this.requestor.post(
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
   * @param scanner
   * @param scanId
   */
  async stopScan(scanner: Scanner, scanId: number): Promise<void> {
    const response = await this.requestor.post(
      scanner,
      {
        query: STOP_SCAN_MUTATION,
        variables: {
          scanId: scanId
        }
      })
    return response?.data?.stopScan?.result || false
  }

  /**
   * Delete a scan
   * @param scanner
   * @param scanId
   */
  async deleteScan(scanner: Scanner, scanId: number): Promise<boolean> {
    const response = await this.requestor.post(
      scanner,
      {
        query: DELETE_SCAN_MUTATION,
        variables: {
          scanId: scanId
        }
      })
    return response?.data?.deleteScan?.result || false
  }

  /**
   * Import scan from file with optionally defined scan id.
   * @param scanner
   * @param file
   * @param scanId
   */
  async importScan(scanner: Scanner, file: File, scanId?: number | null): Promise<boolean> {
    const formData = new FormData()

    const query = IMPORT_SCAN_MUTATION
    const variables = {
      scanId: scanId,
      file: null
    }

    formData.append(
      'operations',
      JSON.stringify({
        query,
        variables,
        app: file,
        maps: {
          app: ['variables.file']
        }
      })
    )
    formData.append('0', file)
    formData.append(
      'map',
      JSON.stringify({
        0: ['variables.file']
      })
    )

    const response = await this.requestor.$axios.post(scanner.endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Api-Key': scanner.apiKey
      }
    })

    return response?.data?.importScan?.result || false
  }
}
