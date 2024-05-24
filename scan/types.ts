export type AssetItem = {
  value: string
  title?: string
  description?: string
  icon?: string
  image?: string
  color?: string
}

export type Group = {
  group: string
  assets: Array<AssetItem>
}

export enum AssetEnum {
  ANDROID_APK = 'androidApk',
  ANDROID_PLAYSTORE = 'androidPlayStore',
  IOS_IPA = 'iosIpa',
  IOS_APPSTORE = 'iosAppStore',
  WEB_APP = 'webApp',
  WEB_API = 'webApi',
  NETWORK = 'NETWORK',
  YAML = 'yaml'
}
