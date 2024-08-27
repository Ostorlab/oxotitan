/* eslint-disable */

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `Bytes` scalar type represents binary data in a bytes format. */
  Bytes: { input: any; output: any; }
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: { input: any; output: any; }
  /**
   * Create scalar that ignores normal serialization/deserialization, since
   * that will be handled by the multipart request spec
   */
  Upload: { input: any; output: any; }
};

export enum AgentGroupOrderByEnum {
  AgentGroupId = 'AgentGroupId',
  CreatedTime = 'CreatedTime',
  Name = 'Name'
}

/** Enum for the asset types. */
export enum AssetTypeEnum {
  AndroidFile = 'ANDROID_FILE',
  AndroidStore = 'ANDROID_STORE',
  Domain = 'DOMAIN',
  File = 'FILE',
  IosFile = 'IOS_FILE',
  IosStore = 'IOS_STORE',
  Ip = 'IP',
  Link = 'LINK'
}

/** Create asset mutation. */
export type CreateAssetsMutation = {
  __typename?: 'CreateAssetsMutation';
  assets?: Maybe<Array<Maybe<OxoAssetType>>>;
};

/** Delete agent group mutation. */
export type DeleteAgentGroupMutation = {
  __typename?: 'DeleteAgentGroupMutation';
  result?: Maybe<Scalars['Boolean']['output']>;
};

/** Delete Scan & its information mutation. */
export type DeleteScansMutation = {
  __typename?: 'DeleteScansMutation';
  result?: Maybe<Scalars['Boolean']['output']>;
};

/** Import scan mutation. */
export type ImportScanMutation = {
  __typename?: 'ImportScanMutation';
  message?: Maybe<Scalars['String']['output']>;
};

export type Mutations = {
  __typename?: 'Mutations';
  /** Create an asset. */
  createAssets?: Maybe<CreateAssetsMutation>;
  /** Delete agent group. */
  deleteAgentGroup?: Maybe<DeleteAgentGroupMutation>;
  /** Delete scans & all their information. */
  deleteScans?: Maybe<DeleteScansMutation>;
  /** Import scan from file. */
  importScan?: Maybe<ImportScanMutation>;
  /** Create agent group */
  publishAgentGroup?: Maybe<PublishAgentGroupMutation>;
  /** Run scan */
  runScan?: Maybe<RunScanMutation>;
  /** Stops running scans, scan is marked as stopped once the engine has completed cancellation. */
  stopScans?: Maybe<StopScansMutation>;
};


export type MutationsCreateAssetsArgs = {
  assets: Array<InputMaybe<OxoAssetInputType>>;
};


export type MutationsDeleteAgentGroupArgs = {
  agentGroupId: Scalars['Int']['input'];
};


export type MutationsDeleteScansArgs = {
  scanIds: Array<InputMaybe<Scalars['Int']['input']>>;
};


export type MutationsImportScanArgs = {
  file: Scalars['Upload']['input'];
  scanId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationsPublishAgentGroupArgs = {
  agentGroup: OxoAgentGroupCreateInputType;
};


export type MutationsRunScanArgs = {
  scan: OxoAgentScanInputType;
};


export type MutationsStopScansArgs = {
  scanIds: Array<InputMaybe<Scalars['Int']['input']>>;
};

/** Input object type for an agent argument. */
export type OxoAgentArgumentInputType = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
  value?: InputMaybe<Scalars['Bytes']['input']>;
};

/** Graphene object type for a list of agent arguments. */
export type OxoAgentArgumentType = {
  __typename?: 'OxoAgentArgumentType';
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['Bytes']['output']>;
};

/** Graphene object type for a list of agent arguments. */
export type OxoAgentArgumentsType = {
  __typename?: 'OxoAgentArgumentsType';
  args: Array<Maybe<OxoAgentArgumentType>>;
};

/** Input object type for creating an agent group agent. */
export type OxoAgentGroupAgentCreateInputType = {
  args?: InputMaybe<Array<InputMaybe<OxoAgentArgumentInputType>>>;
  key: Scalars['String']['input'];
};

/** Input object type for creating an agent group. */
export type OxoAgentGroupCreateInputType = {
  agents: Array<InputMaybe<OxoAgentGroupAgentCreateInputType>>;
  assetTypes?: InputMaybe<Array<InputMaybe<AssetTypeEnum>>>;
  description: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

/** SQLAlchemy object type for an agent group. */
export type OxoAgentGroupType = {
  __typename?: 'OxoAgentGroupType';
  agents: OxoAgentsType;
  assetTypes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  key?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  yamlSource?: Maybe<Scalars['String']['output']>;
};


/** SQLAlchemy object type for an agent group. */
export type OxoAgentGroupTypeAgentsArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type OxoAgentGroupsType = {
  __typename?: 'OxoAgentGroupsType';
  agentGroups: Array<Maybe<OxoAgentGroupType>>;
  pageInfo?: Maybe<PageInfo>;
};

/** Input object type for scan */
export type OxoAgentScanInputType = {
  agentGroupId: Scalars['Int']['input'];
  assetIds: Array<InputMaybe<Scalars['Int']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** SQLAlchemy object type for an agent. */
export type OxoAgentType = {
  __typename?: 'OxoAgentType';
  args: OxoAgentArgumentsType;
  key?: Maybe<Scalars['String']['output']>;
};

/** Graphene object type for a list of agents. */
export type OxoAgentsType = {
  __typename?: 'OxoAgentsType';
  agents: Array<Maybe<OxoAgentType>>;
  pageInfo?: Maybe<PageInfo>;
};

/** Graphene object type for an aggregated knowledge base vulnerability. */
export type OxoAggregatedKnowledgeBaseVulnerabilityType = {
  __typename?: 'OxoAggregatedKnowledgeBaseVulnerabilityType';
  highestCvssV3BaseScore?: Maybe<Scalars['Float']['output']>;
  highestCvssV3Vector?: Maybe<Scalars['String']['output']>;
  highestRiskRating?: Maybe<OxoRiskRating>;
  kb?: Maybe<OxoKnowledgeBaseVulnerabilityType>;
  /** List of vulnerabilities. */
  vulnerabilities?: Maybe<OxoVulnerabilitiesType>;
};


/** Graphene object type for an aggregated knowledge base vulnerability. */
export type OxoAggregatedKnowledgeBaseVulnerabilityTypeVulnerabilitiesArgs = {
  detailTitles?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  numberElements?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type OxoAndroidFileAssetInputType = {
  file?: InputMaybe<Scalars['Upload']['input']>;
  packageName?: InputMaybe<Scalars['String']['input']>;
};

export type OxoAndroidFileAssetType = {
  __typename?: 'OxoAndroidFileAssetType';
  id: Scalars['ID']['output'];
  packageName?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
};

export type OxoAndroidStoreAssetInputType = {
  applicationName?: InputMaybe<Scalars['String']['input']>;
  packageName?: InputMaybe<Scalars['String']['input']>;
};

export type OxoAndroidStoreAssetType = {
  __typename?: 'OxoAndroidStoreAssetType';
  applicationName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  packageName?: Maybe<Scalars['String']['output']>;
};

export type OxoAssetInputType = {
  androidAabFile?: InputMaybe<Array<InputMaybe<OxoAndroidFileAssetInputType>>>;
  androidApkFile?: InputMaybe<Array<InputMaybe<OxoAndroidFileAssetInputType>>>;
  androidStore?: InputMaybe<Array<InputMaybe<OxoAndroidStoreAssetInputType>>>;
  domain?: InputMaybe<Array<InputMaybe<OxoDomainNameInputType>>>;
  iosFile?: InputMaybe<Array<InputMaybe<OxoIosFileAssetInputType>>>;
  iosStore?: InputMaybe<Array<InputMaybe<OxoIosStoreAssetInputType>>>;
  ip?: InputMaybe<Array<InputMaybe<OxoIpRangeInputType>>>;
  link?: InputMaybe<Array<InputMaybe<OxoLinkInputType>>>;
};

export type OxoAssetType = OxoAndroidFileAssetType | OxoAndroidStoreAssetType | OxoDomainNameAssetsType | OxoIosFileAssetType | OxoIosStoreAssetType | OxoNetworkAssetType | OxoUrlsAssetType;

export type OxoDomainNameAssetType = {
  __typename?: 'OxoDomainNameAssetType';
  name?: Maybe<Scalars['String']['output']>;
};

export type OxoDomainNameAssetsType = {
  __typename?: 'OxoDomainNameAssetsType';
  domainNames?: Maybe<Array<Maybe<OxoDomainNameAssetType>>>;
  id: Scalars['ID']['output'];
};

export type OxoDomainNameInputType = {
  name: Scalars['String']['input'];
};

export type OxoIosFileAssetInputType = {
  bundleId?: InputMaybe<Scalars['String']['input']>;
  file?: InputMaybe<Scalars['Upload']['input']>;
};

export type OxoIosFileAssetType = {
  __typename?: 'OxoIOSFileAssetType';
  bundleId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  path?: Maybe<Scalars['String']['output']>;
};

export type OxoIosStoreAssetInputType = {
  applicationName?: InputMaybe<Scalars['String']['input']>;
  bundleId?: InputMaybe<Scalars['String']['input']>;
};

export type OxoIosStoreAssetType = {
  __typename?: 'OxoIOSStoreAssetType';
  applicationName?: Maybe<Scalars['String']['output']>;
  bundleId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type OxoIpRangeAssetType = {
  __typename?: 'OxoIPRangeAssetType';
  host?: Maybe<Scalars['String']['output']>;
  mask?: Maybe<Scalars['String']['output']>;
};

export type OxoIpRangeInputType = {
  host: Scalars['String']['input'];
  mask?: InputMaybe<Scalars['String']['input']>;
};

/** SQLAlchemy object type for a knowledge base vulnerability. */
export type OxoKnowledgeBaseVulnerabilityType = {
  __typename?: 'OxoKnowledgeBaseVulnerabilityType';
  description?: Maybe<Scalars['String']['output']>;
  recommendation?: Maybe<Scalars['String']['output']>;
  references?: Maybe<Array<Maybe<OxoReferenceType>>>;
  shortDescription?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type OxoLinkAssetType = {
  __typename?: 'OxoLinkAssetType';
  method?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type OxoLinkInputType = {
  method?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

export type OxoNetworkAssetType = {
  __typename?: 'OxoNetworkAssetType';
  id: Scalars['ID']['output'];
  networks?: Maybe<Array<Maybe<OxoIpRangeAssetType>>>;
};

/** Graphene object type for a reference. */
export type OxoReferenceType = {
  __typename?: 'OxoReferenceType';
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export enum OxoRiskRating {
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

/** Enum for the elements to order a scan by. */
export enum OxoScanOrderByEnum {
  CreatedTime = 'CreatedTime',
  Progress = 'Progress',
  ScanId = 'ScanId',
  Title = 'Title'
}

/** Scan object. */
export type OxoScanType = {
  __typename?: 'OxoScanType';
  agentGroup?: Maybe<OxoAgentGroupType>;
  assets?: Maybe<Array<Maybe<OxoAssetType>>>;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  /** List of aggregated knowledge base vulnerabilities. */
  kbVulnerabilities?: Maybe<Array<Maybe<OxoAggregatedKnowledgeBaseVulnerabilityType>>>;
  messageStatus?: Maybe<Scalars['String']['output']>;
  progress?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  /** List of vulnerabilities. */
  vulnerabilities?: Maybe<OxoVulnerabilitiesType>;
  riskRating?: Maybe<Scalars['String']['output']>;
};


/** Scan object. */
export type OxoScanTypeKbVulnerabilitiesArgs = {
  detailTitle?: InputMaybe<Scalars['String']['input']>;
};


/** Scan object. */
export type OxoScanTypeVulnerabilitiesArgs = {
  detailTitles?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  numberElements?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  vulnIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

/** Graphene object type for a list of scans. */
export type OxoScansType = {
  __typename?: 'OxoScansType';
  pageInfo?: Maybe<PageInfo>;
  scans: Array<Maybe<OxoScanType>>;
};

export type OxoUrlsAssetType = {
  __typename?: 'OxoUrlsAssetType';
  id: Scalars['ID']['output'];
  links?: Maybe<Array<Maybe<OxoLinkAssetType>>>;
};

/** Graphene object type for a list of vulnerabilities. */
export type OxoVulnerabilitiesType = {
  __typename?: 'OxoVulnerabilitiesType';
  pageInfo?: Maybe<PageInfo>;
  vulnerabilities: Array<Maybe<OxoVulnerabilityType>>;
};

/** SQLAlchemy object type for a vulnerability. */
export type OxoVulnerabilityType = {
  __typename?: 'OxoVulnerabilityType';
  cvssV3BaseScore?: Maybe<Scalars['Float']['output']>;
  cvssV3Vector?: Maybe<Scalars['String']['output']>;
  detail?: Maybe<OxoKnowledgeBaseVulnerabilityType>;
  dna?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  riskRating?: Maybe<OxoRiskRating>;
  technicalDetail?: Maybe<Scalars['String']['output']>;
};

/** Page info object type. */
export type PageInfo = {
  __typename?: 'PageInfo';
  count?: Maybe<Scalars['Int']['output']>;
  hasNext?: Maybe<Scalars['Boolean']['output']>;
  hasPrevious?: Maybe<Scalars['Boolean']['output']>;
  numPages?: Maybe<Scalars['Int']['output']>;
};

/** Create agent group. */
export type PublishAgentGroupMutation = {
  __typename?: 'PublishAgentGroupMutation';
  agentGroup?: Maybe<OxoAgentGroupType>;
};

export type Query = {
  __typename?: 'Query';
  agentGroups?: Maybe<OxoAgentGroupsType>;
  /** Retrieve scan by id. */
  scan?: Maybe<OxoScanType>;
  /** List of scans. */
  scans?: Maybe<OxoScansType>;
};


export type QueryAgentGroupsArgs = {
  agentGroupIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  assetType?: InputMaybe<AssetTypeEnum>;
  numberElements?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AgentGroupOrderByEnum>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<SortEnum>;
};


export type QueryScanArgs = {
  scanId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryScansArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OxoScanOrderByEnum>;
  page?: InputMaybe<Scalars['Int']['input']>;
  scanIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sort?: InputMaybe<SortEnum>;
};

export type RunScanMutation = {
  __typename?: 'RunScanMutation';
  scan?: Maybe<OxoScanType>;
};

/** Sort enum, for the sorting order of the results. */
export enum SortEnum {
  Asc = 'Asc',
  Desc = 'Desc'
}

/** Stop scan mutation. */
export type StopScansMutation = {
  __typename?: 'StopScansMutation';
  scans?: Maybe<Array<Maybe<OxoScanType>>>;
};
