import type { Maybe, RiskRating } from '~/graphql/types'

/**
 * Represents a Scanner object.
 */
export interface Scanner {
  endpoint: string
  apiKey: string
  name: string
}

export enum TextFormats {
  Html = 'HTML',
  Markdown = 'MARKDOWN'
}

export type FormattedVulnz = {
  key: string
  goToVulnId: boolean
  risk: Maybe<any | RiskRating> | undefined
  title: string
  securityIssue: boolean
  privacyIssue: boolean
  targetedByMalware: boolean
  targetedByRansomware: boolean
  targetedByNationState: boolean
  hasPublicExploit: boolean
  cvssV3: Maybe<number> | undefined
  description: string | undefined
  descriptionFormat: any
  kb: Maybe<any> | undefined
}

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
