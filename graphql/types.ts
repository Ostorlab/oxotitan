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

/** Input object type for an agent argument. */
export type AgentArgumentInputType = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
  value?: InputMaybe<Scalars['Bytes']['input']>;
};

/** Graphene object type for a list of agent arguments. */
export type AgentArgumentType = {
  __typename?: 'AgentArgumentType';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['Bytes']['output']>;
};

/** Graphene object type for a list of agent arguments. */
export type AgentArgumentsType = {
  __typename?: 'AgentArgumentsType';
  args: Array<Maybe<AgentArgumentType>>;
};

/** Input object type for creating an agent group agent. */
export type AgentGroupAgentCreateInputType = {
  args?: InputMaybe<Array<InputMaybe<AgentArgumentInputType>>>;
  key: Scalars['String']['input'];
};

/** Input object type for creating an agent group. */
export type AgentGroupCreateInputType = {
  agents: Array<InputMaybe<AgentGroupAgentCreateInputType>>;
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export enum AgentGroupOrderByEnum {
  AgentGroupId = 'AgentGroupId',
  CreatedTime = 'CreatedTime',
  Name = 'Name'
}

/** SQLAlchemy object type for an agent group. */
export type AgentGroupType = {
  __typename?: 'AgentGroupType';
  agents: AgentsType;
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  key?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type AgentGroupsType = {
  __typename?: 'AgentGroupsType';
  agentGroups: Array<Maybe<AgentGroupType>>;
  pageInfo?: Maybe<PageInfo>;
};

/** SQLAlchemy object type for an agent. */
export type AgentType = {
  __typename?: 'AgentType';
  args: AgentArgumentsType;
  id: Scalars['ID']['output'];
  key?: Maybe<Scalars['String']['output']>;
};

/** Graphene object type for a list of agents. */
export type AgentsType = {
  __typename?: 'AgentsType';
  agents: Array<Maybe<AgentType>>;
};

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
export type DeleteScanMutation = {
  __typename?: 'DeleteScanMutation';
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
  /** Delete a scan & all its information. */
  deleteScan?: Maybe<DeleteScanMutation>;
  /** Import scan from file. */
  importScan?: Maybe<ImportScanMutation>;
  /** Create agent group */
  publishAgentGroup?: Maybe<PublishAgentGroupMutation>;
  /** Run scan */
  runScan?: Maybe<RunScanMutation>;
  /** Stops running scan, scan is marked as stopped once the engine has completed cancellation. */
  stopScan?: Maybe<StopScanMutation>;
};


export type MutationsCreateAssetsArgs = {
  assets: Array<InputMaybe<OxoAssetInputType>>;
};


export type MutationsDeleteAgentGroupArgs = {
  agentGroupId: Scalars['Int']['input'];
};


export type MutationsDeleteScanArgs = {
  scanId: Scalars['Int']['input'];
};


export type MutationsImportScanArgs = {
  file: Scalars['Upload']['input'];
  scanId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationsPublishAgentGroupArgs = {
  agentGroup: AgentGroupCreateInputType;
};


export type MutationsRunScanArgs = {
  scan: OxoAgentScanInputType;
};


export type MutationsStopScanArgs = {
  scanId: Scalars['Int']['input'];
};

export type OxoAgentScanInputType = {
  agentGroupId: Scalars['Int']['input'];
  assetIds: Array<InputMaybe<Scalars['Int']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Graphene object type for an aggregated knowledge base vulnerability. */
export type OxoAggregatedKnowledgeBaseVulnerabilityType = {
  __typename?: 'OxoAggregatedKnowledgeBaseVulnerabilityType';
  highestCvssV3BaseScore?: Maybe<Scalars['Float']['output']>;
  highestCvssV3Vector?: Maybe<Scalars['String']['output']>;
  highestRiskRating?: Maybe<RiskRatingEnum>;
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
  scanId?: Maybe<Scalars['Int']['output']>;
  scans?: Maybe<Array<Maybe<OxoScanType>>>;
  type?: Maybe<Scalars['String']['output']>;
};


export type OxoAndroidFileAssetTypeScansArgs = {
  lastOnly?: InputMaybe<Scalars['Boolean']['input']>;
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
  scanId?: Maybe<Scalars['Int']['output']>;
  scans?: Maybe<Array<Maybe<OxoScanType>>>;
  type?: Maybe<Scalars['String']['output']>;
};


export type OxoAndroidStoreAssetTypeScansArgs = {
  lastOnly?: InputMaybe<Scalars['Boolean']['input']>;
};

export type OxoAssetInputType = {
  androidFile?: InputMaybe<OxoAndroidFileAssetInputType>;
  androidStore?: InputMaybe<OxoAndroidStoreAssetInputType>;
  iosFile?: InputMaybe<OxoIosFileAssetInputType>;
  iosStore?: InputMaybe<OxoIosStoreAssetInputType>;
  network?: InputMaybe<OxoNetworkAssetInputType>;
  url?: InputMaybe<OxoUrlAssetInputType>;
};

export type OxoAssetType = OxoAndroidFileAssetType | OxoAndroidStoreAssetType | OxoIosFileAssetType | OxoIosStoreAssetType | OxoNetworkAssetType | OxoUrlAssetType;

export type OxoIosFileAssetInputType = {
  bundleId?: InputMaybe<Scalars['String']['input']>;
  file?: InputMaybe<Scalars['Upload']['input']>;
};

export type OxoIosFileAssetType = {
  __typename?: 'OxoIOSFileAssetType';
  bundleId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  path?: Maybe<Scalars['String']['output']>;
  scanId?: Maybe<Scalars['Int']['output']>;
  scans?: Maybe<Array<Maybe<OxoScanType>>>;
  type?: Maybe<Scalars['String']['output']>;
};


export type OxoIosFileAssetTypeScansArgs = {
  lastOnly?: InputMaybe<Scalars['Boolean']['input']>;
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
  scanId?: Maybe<Scalars['Int']['output']>;
  scans?: Maybe<Array<Maybe<OxoScanType>>>;
  type?: Maybe<Scalars['String']['output']>;
};


export type OxoIosStoreAssetTypeScansArgs = {
  lastOnly?: InputMaybe<Scalars['Boolean']['input']>;
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

export type OxoNetworkAssetInputType = {
  networks?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OxoNetworkAssetType = {
  __typename?: 'OxoNetworkAssetType';
  id: Scalars['ID']['output'];
  networks?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  scanId?: Maybe<Scalars['Int']['output']>;
  scans?: Maybe<Array<Maybe<OxoScanType>>>;
  type?: Maybe<Scalars['String']['output']>;
};


export type OxoNetworkAssetTypeScansArgs = {
  lastOnly?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Graphene object type for a reference. */
export type OxoReferenceType = {
  __typename?: 'OxoReferenceType';
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

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

export type OxoUrlAssetInputType = {
  links?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OxoUrlAssetType = {
  __typename?: 'OxoUrlAssetType';
  id: Scalars['ID']['output'];
  links?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  scanId?: Maybe<Scalars['Int']['output']>;
  scans?: Maybe<Array<Maybe<OxoScanType>>>;
  type?: Maybe<Scalars['String']['output']>;
};


export type OxoUrlAssetTypeScansArgs = {
  lastOnly?: InputMaybe<Scalars['Boolean']['input']>;
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
  riskRating?: Maybe<RiskRating>;
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
  agentGroup?: Maybe<AgentGroupType>;
};

export type Query = {
  __typename?: 'Query';
  agentGroups?: Maybe<AgentGroupsType>;
  /** Retrieve scan by id. */
  scan?: Maybe<OxoScanType>;
  /** List of scans. */
  scans?: Maybe<OxoScansType>;
};


export type QueryAgentGroupsArgs = {
  agentGroupIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
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
export type StopScanMutation = {
  __typename?: 'StopScanMutation';
  scan?: Maybe<OxoScanType>;
};
