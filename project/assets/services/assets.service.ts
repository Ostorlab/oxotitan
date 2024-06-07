import type { AxiosInstance } from 'axios'
import RequestHandler from '~/utils/requestHandler'
import type { Scanner } from '~/project/types'

enum AssetFileTypesEnum {
  AndroidFile = 'androidFile',
  IosFile = 'iosFile'
}

const CREATE_ASSETS_MUTATION = gql`
    mutation CreateAssets ($assets: [OxoAssetInputType]!) {
        createAssets(
            assets: $assets
        ) {
            assets {
                ... on OxoAndroidFileAssetType {
                    id
                }
                ... on OxoIOSFileAssetType {
                    id
                }
                ... on OxoAndroidStoreAssetType {
                    id
                }
                ... on OxoIOSStoreAssetType {
                    id
                }
                ... on OxoUrlAssetType {
                    id
                }
                ... on OxoNetworkAssetType {
                    id
                }
            }
        }
    }
`

export default class AssetsService {
  private readonly requestor: RequestHandler

  constructor(axios: AxiosInstance) {
    this.requestor = new RequestHandler(axios)
  }

  /**
   * Create assets.
   * @param scanner The scanner where the assets will be created.
   * @param assets The asset inputs.
   * @returns
   */
  async createAssets(scanner: Scanner, assets): Promise<Array<{ id: string }>> {
    const formData = this.constructCreateAssetsFormData(assets)

    const response = await this.requestor.$axios.post(
      scanner.endpoint,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Api-Key': scanner.apiKey
        }
      }
    )
    if ((response?.data?.errors || []).length > 0) {
      throw new Error(response?.data?.errors[0]?.message)
    }
    return response?.data?.data?.createAssets?.assets || []
  }

  /**
   * Construct the `formData` for the `createAssets` API.
   * @param assets The assets from which to construct the`formData`.
   * @returns The `formData`.
   */
  constructCreateAssetsFormData(assets): FormData {
    const formData = new FormData()
    const fileVariables: Array<{ path: string, file: File }> = []
    const map: { [key: number]: Array<string> } = {}

    assets = assets.map((asset: { [key: string]: any }, index: number) => {
      if (AssetFileTypesEnum.AndroidFile in asset) {
        fileVariables.push({
          path: `variables.assets.${index}.${AssetFileTypesEnum.AndroidFile}.file`,
          file: asset[AssetFileTypesEnum.AndroidFile].file
        })
        asset[AssetFileTypesEnum.AndroidFile].file = null
      } else if (AssetFileTypesEnum.IosFile in asset) {
        fileVariables.push({
          path: `variables.assets.${index}.${AssetFileTypesEnum.IosFile}.file`,
          file: asset[AssetFileTypesEnum.IosFile].file
        })
        asset[AssetFileTypesEnum.IosFile].file = null
      }
      return asset
    })
    formData.append(
      'operations',
      JSON.stringify({
        query: CREATE_ASSETS_MUTATION,
        variables: { assets }
      })
    )
    fileVariables.forEach((fileObj, index) => {
      map[index] = [fileObj.path]
      formData.append(index.toString(), fileObj.file)
    })

    formData.append('map', JSON.stringify(map))
    return formData
  }
}