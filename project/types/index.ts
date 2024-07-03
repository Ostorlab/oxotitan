import type { Maybe, OxoRiskRating } from '~/graphql/types'

/**
 * Represents a Scanner object.
 */
export interface Scanner {
  endpoint: string
  apiKey: string
  name: string
}

export enum Platform {
  Android = 'android',
  Ios = 'ios',
  IosIpad = 'ios_ipad'
}
/**
 * Represents a Device object.
 */
export interface Device {
  name: string
  deviceId: string
  platform: Platform
  version: string
  available: boolean
  rooted: boolean
  xcodeOrgId: string
  xcodeSigningId: string
  provisionProfile: File
  location: string
  relay: {
    ip: string
    username: string
    password: string
    port: number
  }
}

export type DeviceInput = {
  name: string | null
  deviceId: string | null
  platform: Platform
  version: string | null
  available: boolean
  rooted: boolean
  xcodeOrgId: string | null
  xcodeSigningId: string | null
  provisionProfile: string | null
  location: string | null
  relay: {
    ip: string | null
    username: string | null
    password: string | null
    port: number | null
  }
}

export enum TextFormats {
  Html = 'HTML',
  Markdown = 'MARKDOWN'
}

export type FormattedVulnz = {
  key: string
  goToVulnId: boolean
  risk: Maybe<any | OxoRiskRating> | undefined
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

export enum AssetFileTypesEnum {
  AndroidApkFile = 'androidApkFile',
  AndroidAabFile = 'androidAabFile',
  IosFile = 'iosFile'
}
