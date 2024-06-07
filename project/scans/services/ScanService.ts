import type { AxiosInstance } from 'axios'
import type { OxoScanType, QueryScansArgs } from '~/graphql/types'
import RequestHandler from '~/utils/requestHandler'
import type { Scanner } from '~/project/types'

const SCANS_QUERY = gql`query scans($scanIds: [Int], $page: Int, $numberElements: Int, $orderBy: OxoScanOrderByEnum, $sort: SortEnum) {
  scans(scanIds: $scanIds, page: $page, numberElements: $numberElements, orderBy: $orderBy, sort: $sort) {
    pageInfo {
      count
      numPages
    }
    scans {
      id
      title
      assets {
        __typename
        ... on OxoAndroidFileAssetType {
          id
          type
          scanId
          packageName
          path
        }
        ... on OxoIOSFileAssetType {
          id
          type
          bundleId
          path
        }
        ... on OxoAndroidStoreAssetType {
          id
          type
          applicationName
        }
        ... on OxoIOSStoreAssetType {
          id
          type
          bundleId
          applicationName
        }
        ... on OxoUrlAssetType {
          id
          type
          links
        }
        ... on OxoNetworkAssetType {
          id
          type
          networks
        }
      }
      createdTime
      progress
    }
  }
}
`

const GET_SCAN_QUERY = gql`
query Scan($scanId: Int!) {
  scan(scanId: $scanId) {
      id
      title
      createdTime
      messageStatus
      progress
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

const RUN_SCAN_MUTATION = gql`
  mutation RunScan ($scan: OxoAgentScanInputType!) {
    runScan (scan: $scan) {
      scan {
        id
      }
    }
  }
`

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
   * Fetches a single scan.
   * @param scanner
   * @param scanId The ID of the scan to fetch.
   */
  async getScan(scanner: Scanner, scanId: number | string): Promise<OxoScanType> {
    const res = await this.requestor.post(scanner, {
      query: GET_SCAN_QUERY,
      variables: { scanId }
    })
    return res?.data?.data?.scan || {}
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

  /**
   * Run a scan.
   * @param scanner The scanner on which to run the scan.
   * @param mutationArgs The arguments to use to create the scan.
   */
  async runScan(scanner: Scanner, mutationArgs: { title?: string, assetIds: Array<number>, agentGroupId: number }): Promise<number> {
    const response = await this.requestor.post(
      scanner,
      {
        query: RUN_SCAN_MUTATION,
        variables: { scan: mutationArgs }
      }
    )
    if (response?.data?.runScan === null || response?.data?.runScan === undefined) {
      throw new Error('An error occurred while creating the scan')
    }
    if ((response?.data?.errors || []).length > 0) {
      throw new Error(response?.data?.errors[0]?.message)
    }
    return response?.data?.runScan?.scan?.id
  }
}
