/* eslint-disable */
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string, output: string }
  String: { input: string, output: string }
  Boolean: { input: boolean, output: boolean }
  Int: { input: number, output: number }
  Float: { input: number, output: number }
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: { input: any, output: any }
  /**
   * Create scalar that ignores normal serialization/deserialization, since
   * that will be handled by the multipart request spec
   */
  Upload: { input: any, output: any }
}

/** Import scan mutation. */
export type ImportScanMutation = {
  __typename?: 'ImportScanMutation'
  message?: Maybe<Scalars['String']['output']>
}

export type Mutations = {
  __typename?: 'Mutations'
  /** Import scan from file */
  importScan?: Maybe<ImportScanMutation>
}

export type MutationsImportScanArgs = {
  file: Scalars['Upload']['input']
  scanId?: InputMaybe<Scalars['Int']['input']>
}

/** Graphene object type for an aggregated knowledge base vulnerability. */
export type OxoAggregatedKnowledgeBaseVulnerabilityType = {
  __typename?: 'OxoAggregatedKnowledgeBaseVulnerabilityType'
  highestCvssV3BaseScore?: Maybe<Scalars['Float']['output']>
  highestCvssV3Vector?: Maybe<Scalars['String']['output']>
  highestRiskRating?: Maybe<RiskRatingEnum>
  kb?: Maybe<OxoKnowledgeBaseVulnerabilityType>
  /** List of vulnerabilities. */
  vulnerabilities?: Maybe<OxoVulnerabilitiesType>
}

/** Graphene object type for an aggregated knowledge base vulnerability. */
export type OxoAggregatedKnowledgeBaseVulnerabilityTypeVulnerabilitiesArgs = {
  detailTitles?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

/** SQLAlchemy object type for a knowledge base vulnerability. */
export type OxoKnowledgeBaseVulnerabilityType = {
  __typename?: 'OxoKnowledgeBaseVulnerabilityType'
  description?: Maybe<Scalars['String']['output']>
  recommendation?: Maybe<Scalars['String']['output']>
  references?: Maybe<Scalars['String']['output']>
  shortDescription?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

/** Enum for the elements to order a scan by. */
export enum OxoScanOrderByEnum {
  CreatedTime = 'CreatedTime',
  Progress = 'Progress',
  ScanId = 'ScanId',
  Title = 'Title'
}

/** Scan object. */
export type OxoScanType = {
  __typename?: 'OxoScanType'
  asset?: Maybe<Scalars['String']['output']>
  createdTime?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['ID']['output']
  /** List of aggregated knowledge base vulnerabilities. */
  kbVulnerabilities?: Maybe<Array<Maybe<OxoAggregatedKnowledgeBaseVulnerabilityType>>>
  messageStatus?: Maybe<Scalars['String']['output']>
  progress?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  /** List of vulnerabilities. */
  vulnerabilities?: Maybe<OxoVulnerabilitiesType>
}

/** Scan object. */
export type OxoScanTypeKbVulnerabilitiesArgs = {
  detailTitle?: InputMaybe<Scalars['String']['input']>
}

/** Scan object. */
export type OxoScanTypeVulnerabilitiesArgs = {
  detailTitles?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  vulnIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
}

/** Graphene object type for a list of scans. */
export type OxoScansType = {
  __typename?: 'OxoScansType'
  scans: Array<Maybe<OxoScanType>>
}

/** Graphene object type for a list of vulnerabilities. */
export type OxoVulnerabilitiesType = {
  __typename?: 'OxoVulnerabilitiesType'
  vulnerabilities: Array<Maybe<OxoVulnerabilityType>>
}

/** SQLAlchemy object type for a vulnerability. */
export type OxoVulnerabilityType = {
  __typename?: 'OxoVulnerabilityType'
  cvssV3BaseScore?: Maybe<Scalars['Float']['output']>
  cvssV3Vector?: Maybe<Scalars['String']['output']>
  detail?: Maybe<OxoKnowledgeBaseVulnerabilityType>
  dna?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  riskRating?: Maybe<RiskRating>
  technicalDetail?: Maybe<Scalars['String']['output']>
}

export type Query = {
  __typename?: 'Query'
  /** List of scans. */
  scans?: Maybe<OxoScansType>
}

export type QueryScansArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<OxoScanOrderByEnum>
  page?: InputMaybe<Scalars['Int']['input']>
  scanIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  sort?: InputMaybe<SortEnum>
}

/** Enumeration of the risk rating of a scan. */
export enum RiskRating {
  Critical = 'CRITICAL',
  Hardening = 'HARDENING',
  High = 'HIGH',
  Important = 'IMPORTANT',
  Info = 'INFO',
  Low = 'LOW',
  Medium = 'MEDIUM',
  Potentially = 'POTENTIALLY',
  Secure = 'SECURE'
}

/** Enum for the risk rating of a scan. */
export enum RiskRatingEnum {
  Critical = 'CRITICAL',
  Hardening = 'HARDENING',
  High = 'HIGH',
  Important = 'IMPORTANT',
  Info = 'INFO',
  Low = 'LOW',
  Medium = 'MEDIUM',
  Potentially = 'POTENTIALLY',
  Secure = 'SECURE'
}

/** Sort enum, for the sorting order of the results. */
export enum SortEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}
