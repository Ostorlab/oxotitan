import type { AxiosInstance } from 'axios'
import { decode } from '@shelacek/ubjson'
import Downloader from '~/project/common/services/DownloaderService'
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
      createdTime
      progress
      assets {
        __typename
        ... on OxoAndroidFileAssetType {
          id
          packageName
          path
        }
        ... on OxoIOSFileAssetType {
          id
          bundleId
          path
        }
        ... on OxoAndroidStoreAssetType {
          id
          packageName
          applicationName
        }
        ... on OxoIOSStoreAssetType {
          id
          bundleId
          applicationName
        }
        ... on OxoUrlsAssetType {
          id
          links {
            url
            method
          }
        }
        ... on OxoNetworkAssetType {
          id
          networks {
            host
            mask
          }
        }
        ... on OxoDomainNameAssetsType {
          id
          domainNames {
            name
          }
        }
      }
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

const EXPORT_SCAN_MUTATION = gql`
  mutation ExportScan($scanId: Int!) {
    exportScan(scanId: $scanId) {
      content
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
   * Export scan to zip file.
   * @param scanner
   * @param scanId
   */
  async exportScan(scanner: Scanner, scanId: number): Promise<void> {
    const response = await this.requestor.$axios.post(
      scanner.endpoint,
      {
        query: EXPORT_SCAN_MUTATION,
        variables: {
          scanId: scanId
        }
      },
      {
        responseType: 'arraybuffer',
        headers: {
          'Accept': 'application/ubjson',
          'X-Api-Key': scanner.apiKey
        }
      }
    )

    const data = decode(response?.data)
    const content = data?.data?.exportScan?.content
    if (content !== null && content !== undefined) {
      const downloader = new Downloader()
      downloader.downloadArrayBuffer('exported_scan.zip', content)
    }
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
    if ((response?.data?.errors || []).length > 0) {
      throw new Error(response?.data?.errors[0]?.message)
    }
    if (response?.data?.data?.runScan === null || response?.data?.data?.runScan === undefined) {
      throw new Error('An error occurred while creating the scan')
    }
    return response?.data?.data?.runScan?.scan?.id
  }
}
