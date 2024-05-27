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
  /** The `Bytes` scalar type represents represents binary data in a bytes format. */
  Bytes: { input: any, output: any }
  /**
     * The `Date` scalar type represents a Date
     * value as specified by
     * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
     */
  Date: { input: any, output: any }
  /**
     * The `DateTime` scalar type represents a DateTime
     * value as specified by
     * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
     */
  DateTime: { input: any, output: any }
  /**
     * The `Time` scalar type represents a Time value as
     * specified by
     * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
     */
  Time: { input: any, output: any }
  /**
     * Leverages the internal Python implmeentation of UUID (uuid.UUID) to provide native UUID objects
     * in fields, resolvers and input.
     */
  UUID: { input: any, output: any }
  /**
     * Create scalar that ignores normal serialization/deserialization, since
     * that will be handled by the multipart request spec
     */
  Upload: { input: any, output: any }
}

export type AckNotificationsMutation = {
  __typename?: 'AckNotificationsMutation'
  result?: Maybe<Scalars['Boolean']['output']>
}

export enum ActionAuditOrderByEnum {
  ActionId = 'ActionId',
  CreatedTime = 'CreatedTime',
  Organisation = 'Organisation',
  OrganisationUser = 'OrganisationUser'
}

export type ActionAuditType = {
  __typename?: 'ActionAuditType'
  createdTime: Scalars['DateTime']['output']
  /** Content of the action. */
  event: Scalars['String']['output']
  id: Scalars['ID']['output']
  organisation?: Maybe<RestrictedOrganisationType>
  organisationUser?: Maybe<RestrictedOrganisationUserType>
}

export type ActionAuditsType = {
  __typename?: 'ActionAuditsType'
  audits: Array<Maybe<ActionAuditType>>
  pageInfo?: Maybe<PageInfo>
}

export type ActionDefinitionType = {
  __typename?: 'ActionDefinitionType'
  args?: Maybe<Array<Maybe<ActionKwargType>>>
  contexts: Array<Maybe<Scalars['String']['output']>>
  description: Scalars['String']['output']
  name: Scalars['String']['output']
}

export type ActionDefinitionsType = {
  __typename?: 'ActionDefinitionsType'
  actionDefinitions: Array<Maybe<ActionDefinitionType>>
  pageInfo?: Maybe<PageInfo>
}

export type ActionInputType = {
  handler: Scalars['String']['input']
  kwargs?: InputMaybe<Array<InputMaybe<ActionKwargsInputType>>>
}

export type ActionKwargType = {
  __typename?: 'ActionKwargType'
  description?: Maybe<Scalars['String']['output']>
  name: Scalars['String']['output']
  value?: Maybe<Scalars['String']['output']>
}

export type ActionKwargsInputType = {
  name: Scalars['String']['input']
  value?: InputMaybe<Scalars['String']['input']>
}

export type ActionType = {
  __typename?: 'ActionType'
  handler: Scalars['String']['output']
  id: Scalars['ID']['output']
  kwargs: Array<Maybe<ActionKwargType>>
  rule: RuleType
}

export type ActionsType = {
  __typename?: 'ActionsType'
  actions: Array<Maybe<ActionType>>
  pageInfo?: Maybe<PageInfo>
}

export type AddChecklistMutation = {
  __typename?: 'AddChecklistMutation'
  checklist?: Maybe<ChecklistType>
}

export type AddCommentMutation = {
  __typename?: 'AddCommentMutation'
  edit?: Maybe<TicketEditType>
}

export type AddResponse = {
  __typename?: 'AddResponse'
  result?: Maybe<Scalars['Boolean']['output']>
}

/** Graphene Mutation for granting access to scanner to child-organisations. */
export type AddScannerAccessMutation = {
  __typename?: 'AddScannerAccessMutation'
  result?: Maybe<Scalars['Boolean']['output']>
}

/** Graphene Mutation for creating a new scanner. */
export type AddScannerMutation = {
  __typename?: 'AddScannerMutation'
  scanner?: Maybe<ScannerType>
}

export type AddScannerStateMutation = {
  __typename?: 'AddScannerStateMutation'
  scannerState?: Maybe<ScannerStateType>
}

export type AddTotpDevice = {
  __typename?: 'AddTOTPDevice'
  totpDevice?: Maybe<TotpDeviceType>
}

export type AddTicketMutation = {
  __typename?: 'AddTicketMutation'
  ticket?: Maybe<TicketType>
}

export type AddUserOrganisation = {
  __typename?: 'AddUserOrganisation'
  message?: Maybe<Scalars['String']['output']>
}

export type AddVulnerabilitiesMutation = {
  __typename?: 'AddVulnerabilitiesMutation'
  vulnerabilities?: Maybe<Array<Maybe<VulnerabilityType>>>
}

export type AddressTestCredentials = {
  __typename?: 'AddressTestCredentials'
  addressLine: Scalars['String']['output']
  city: Scalars['String']['output']
  country: Scalars['String']['output']
  credentialName?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  zipCode: Scalars['Int']['output']
}

export type AddressTestCredentialsInput = {
  addressLine?: InputMaybe<Scalars['String']['input']>
  city?: InputMaybe<Scalars['String']['input']>
  country?: InputMaybe<Scalars['String']['input']>
  zipCode?: InputMaybe<Scalars['Int']['input']>
}

export type AddressTestCredentialsInstance = {
  __typename?: 'AddressTestCredentialsInstance'
  addressLine: Scalars['String']['output']
  city: Scalars['String']['output']
  country: Scalars['String']['output']
  credentialName?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  zipCode: Scalars['Int']['output']
}

export enum AgentAccess {
  /** Private */
  Private = 'PRIVATE',
  /** Public */
  Public = 'PUBLIC'
}

export enum AgentAccessEnum {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type AgentArgumentInputType = {
  description?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
  type: Scalars['String']['input']
  value?: InputMaybe<Scalars['Bytes']['input']>
}

export type AgentArgumentType = {
  __typename?: 'AgentArgumentType'
  description: Scalars['String']['output']
  name: Scalars['String']['output']
  /** Type should help the client know how to show or provision the argument value. */
  type: Scalars['String']['output']
  value?: Maybe<Scalars['Bytes']['output']>
}

export enum AgentBuildStatus {
  /** Error */
  Error = 'ERROR',
  /** Not Started */
  NotStarted = 'NOT_STARTED',
  /** Running */
  Running = 'RUNNING',
  /** Success */
  Success = 'SUCCESS'
}

export type AgentBuildType = {
  __typename?: 'AgentBuildType'
  createdTime: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  logs: Scalars['String']['output']
  status: AgentBuildStatus
  version: Scalars['String']['output']
}

export type AgentBuildsType = {
  __typename?: 'AgentBuildsType'
  builds: Array<Maybe<AgentBuildType>>
  pageInfo?: Maybe<PageInfo>
}

export enum AgentGroupAccess {
  /** Private */
  Private = 'PRIVATE',
  /** Public */
  Public = 'PUBLIC'
}

export type AgentGroupAgentCreateInputType = {
  agentKey: Scalars['String']['input']
  args?: InputMaybe<Array<InputMaybe<AgentArgumentInputType>>>
  replicas?: InputMaybe<Scalars['Int']['input']>
  version: Scalars['String']['input']
}

export type AgentGroupCreateInputType = {
  access?: InputMaybe<AgentAccessEnum>
  agents: Array<InputMaybe<AgentGroupAgentCreateInputType>>
  description: Scalars['String']['input']
  image?: InputMaybe<Scalars['Bytes']['input']>
  name: Scalars['String']['input']
}

export type AgentGroupInputType = {
  access?: InputMaybe<AgentAccessEnum>
  deletedAgents?: InputMaybe<Array<InputMaybe<AgentGroupAgentCreateInputType>>>
  description: Scalars['String']['input']
  image?: InputMaybe<Scalars['Bytes']['input']>
  name: Scalars['String']['input']
  updatedAgents?: InputMaybe<Array<InputMaybe<AgentGroupAgentCreateInputType>>>
}

export type AgentGroupType = {
  __typename?: 'AgentGroupType'
  access: AgentGroupAccess
  createdTime: Scalars['DateTime']['output']
  description: Scalars['String']['output']
  id: Scalars['ID']['output']
  image?: Maybe<Scalars['String']['output']>
  key?: Maybe<Scalars['String']['output']>
  modifiedTime: Scalars['DateTime']['output']
  name: Scalars['String']['output']
}

export type AgentInputType = {
  access: AgentAccessEnum
  gitLocation: Scalars['String']['input']
  listable: Scalars['Boolean']['input']
  name: Scalars['String']['input']
  yamlFileLocation: Scalars['String']['input']
}

export enum AgentOrderByEnum {
  AgentId = 'AgentId',
  CreatedTime = 'CreatedTime',
  Name = 'Name'
}

export type AgentScanInputType = {
  agentGroupId: Scalars['Int']['input']
  assetId: Scalars['Int']['input']
  title?: InputMaybe<Scalars['String']['input']>
}

export type AgentType = {
  __typename?: 'AgentType'
  access: AgentAccess
  builds?: Maybe<AgentBuildsType>
  createdTime: Scalars['DateTime']['output']
  detectionCount: Scalars['Int']['output']
  dockerLocation?: Maybe<Scalars['String']['output']>
  falsePositiveCount: Scalars['Int']['output']
  gitLocation?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  key?: Maybe<Scalars['String']['output']>
  listable: Scalars['Boolean']['output']
  modifiedTime: Scalars['DateTime']['output']
  name: Scalars['String']['output']
  organisation?: Maybe<RestrictedOrganisationType>
  scanCount: Scalars['Int']['output']
  versions?: Maybe<AgentVersionsType>
  yamlFileLocation: Scalars['String']['output']
}

export type AgentTypeBuildsArgs = {
  buildId?: InputMaybe<Scalars['Int']['input']>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  version?: InputMaybe<Scalars['String']['input']>
}

export type AgentTypeVersionsArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<AgentVersionOrderByEnum>
  page?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<SortEnum>
  version?: InputMaybe<Scalars['String']['input']>
}

export enum AgentVersionOrderByEnum {
  CreatedTime = 'CreatedTime',
  ScanCount = 'ScanCount',
  Version = 'Version'
}

export enum AgentVersionRestartPolicy {
  /** any */
  Any = 'ANY',
  /** None */
  None = 'NONE',
  /** On Failure */
  OnFailure = 'ON_FAILURE'
}

export type AgentVersionType = {
  __typename?: 'AgentVersionType'
  agentVersionImageUrl?: Maybe<Scalars['String']['output']>
  arguments?: Maybe<Array<Maybe<AgentArgumentType>>>
  /** docker run constraints */
  constraints?: Maybe<Array<Scalars['String']['output']>>
  createdTime: Scalars['DateTime']['output']
  description: Scalars['String']['output']
  detectionCount: Scalars['Int']['output']
  falsePositiveCount: Scalars['Int']['output']
  id: Scalars['ID']['output']
  image?: Maybe<Scalars['String']['output']>
  inSelectors?: Maybe<Array<Scalars['String']['output']>>
  key?: Maybe<Scalars['String']['output']>
  license?: Maybe<Scalars['String']['output']>
  memLimit?: Maybe<Scalars['Int']['output']>
  modifiedTime: Scalars['DateTime']['output']
  /** docker dir mounts */
  mounts?: Maybe<Array<Scalars['String']['output']>>
  outSelectors?: Maybe<Array<Scalars['String']['output']>>
  portMapping?: Maybe<Array<Maybe<PortMappingType>>>
  restartPolicy: AgentVersionRestartPolicy
  restrictions?: Maybe<Array<Scalars['String']['output']>>
  scanCount: Scalars['Int']['output']
  source?: Maybe<Scalars['String']['output']>
  version: Scalars['String']['output']
}

export type AgentVersionsType = {
  __typename?: 'AgentVersionsType'
  pageInfo?: Maybe<PageInfo>
  versions: Array<Maybe<AgentVersionType>>
}

export type AgentsType = {
  __typename?: 'AgentsType'
  agents: Array<Maybe<AgentType>>
  pageInfo?: Maybe<PageInfo>
}

export type AggregatedKnowledgeBaseVulnerabilityType = {
  __typename?: 'AggregatedKnowledgeBaseVulnerabilityType'
  highestCvssV3BaseScore?: Maybe<Scalars['Float']['output']>
  highestCvssV3Vector?: Maybe<Scalars['String']['output']>
  highestRiskRating?: Maybe<RiskRating>
  kb?: Maybe<KnowledgeBaseVulnerabilityType>
  vulnerabilities?: Maybe<VulnerabilitiesType>
}

export type AggregatedKnowledgeBaseVulnerabilityTypeVulnerabilitiesArgs = {
  detailIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  titles?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type AndroidAppActivityIntentFilterType = {
  __typename?: 'AndroidAppActivityIntentFilterType'
  action?: Maybe<Scalars['String']['output']>
  category?: Maybe<Scalars['String']['output']>
  data?: Maybe<Scalars['String']['output']>
  historyStatus?: Maybe<ScanStatusTypeEnum>
}

export type AndroidAppActivityType = {
  __typename?: 'AndroidAppActivityType'
  createdTime?: Maybe<Scalars['DateTime']['output']>
  exported?: Maybe<Scalars['Boolean']['output']>
  historyInstance?: Maybe<AndroidAppAssetHistoryInstanceType>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  intentFilters: Array<AndroidAppActivityIntentFilterType>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  name?: Maybe<Scalars['String']['output']>
  permission?: Maybe<Scalars['String']['output']>
}

export type AndroidAppAssetHistoryInstanceType = {
  __typename?: 'AndroidAppAssetHistoryInstanceType'
  androidBackendLinks: Array<AndroidBackendLinkType>
  appActivities: Array<AndroidAppActivityType>
  appBroadcastReceivers: Array<AndroidAppReceiverType>
  appPermissions: Array<AndroidAppPermissionType>
  appProviders: Array<AndroidAppContentProviderType>
  appServices: Array<AndroidAppServiceType>
  createdTime?: Maybe<Scalars['DateTime']['output']>
  features: Array<AndroidAppFeaturesType>
  fingerprints: Array<AndroidAppFingerprintType>
  id: Scalars['ID']['output']
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  scanId: Scalars['Int']['output']
}

export type AndroidAppAssetHistoryInstancesType = {
  __typename?: 'AndroidAppAssetHistoryInstancesType'
  historyInstances: Array<Maybe<AndroidAppAssetHistoryInstanceType>>
  pageInfo?: Maybe<PageInfo>
}

export type AndroidAppContentProviderType = {
  __typename?: 'AndroidAppContentProviderType'
  createdTime?: Maybe<Scalars['DateTime']['output']>
  exported?: Maybe<Scalars['Boolean']['output']>
  historyInstance?: Maybe<AndroidAppAssetHistoryInstanceType>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  intentFilters: Array<AndroidAppProviderIntentFilter>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  name?: Maybe<Scalars['String']['output']>
  permission?: Maybe<Scalars['String']['output']>
}

export type AndroidAppFeaturesType = {
  __typename?: 'AndroidAppFeaturesType'
  createdTime?: Maybe<Scalars['DateTime']['output']>
  description?: Maybe<Scalars['String']['output']>
  detail?: Maybe<Scalars['String']['output']>
  historyInstance?: Maybe<AndroidAppAssetHistoryInstanceType>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  name?: Maybe<FeaturesNamesTypeEnum>
}

export type AndroidAppFingerprintType = {
  __typename?: 'AndroidAppFingerprintType'
  createdTime?: Maybe<Scalars['DateTime']['output']>
  detail?: Maybe<Scalars['String']['output']>
  fingerprintType?: Maybe<MobileAppFingerprintTypeEnum>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  name: Scalars['String']['output']
  version?: Maybe<Scalars['String']['output']>
}

export type AndroidAppPermissionType = {
  __typename?: 'AndroidAppPermissionType'
  createdTime?: Maybe<Scalars['DateTime']['output']>
  historyInstance?: Maybe<AndroidAppAssetHistoryInstanceType>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  name?: Maybe<Scalars['String']['output']>
  protectionLevels?: Maybe<Array<Scalars['String']['output']>>
}

export type AndroidAppProviderIntentFilter = {
  __typename?: 'AndroidAppProviderIntentFilter'
  action?: Maybe<Scalars['String']['output']>
  category?: Maybe<Scalars['String']['output']>
  data?: Maybe<Scalars['String']['output']>
  historyStatus?: Maybe<ScanStatusTypeEnum>
}

export type AndroidAppReceiverIntentFilter = {
  __typename?: 'AndroidAppReceiverIntentFilter'
  action?: Maybe<Scalars['String']['output']>
  category?: Maybe<Scalars['String']['output']>
  data?: Maybe<Scalars['String']['output']>
  historyStatus?: Maybe<ScanStatusTypeEnum>
}

export type AndroidAppReceiverType = {
  __typename?: 'AndroidAppReceiverType'
  createdTime?: Maybe<Scalars['DateTime']['output']>
  exported?: Maybe<Scalars['Boolean']['output']>
  historyInstance?: Maybe<AndroidAppAssetHistoryInstanceType>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  intentFilters: Array<AndroidAppReceiverIntentFilter>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  name?: Maybe<Scalars['String']['output']>
  permission?: Maybe<Scalars['String']['output']>
}

export enum AndroidAppServiceForegroundServiceType {
  /** Camera */
  Camera = 'CAMERA',
  /** Connected device */
  ConnectedDevice = 'CONNECTED_DEVICE',
  /** Data sync */
  DataSync = 'DATA_SYNC',
  /** Location */
  Location = 'LOCATION',
  /** Media playback */
  MediaPlayback = 'MEDIA_PLAYBACK',
  /** Media projection */
  MediaProjection = 'MEDIA_PROJECTION',
  /** Microphone */
  Microphone = 'MICROPHONE',
  /** Phone call */
  PhoneCall = 'PHONE_CALL'
}

export type AndroidAppServiceIntentFilter = {
  __typename?: 'AndroidAppServiceIntentFilter'
  action?: Maybe<Scalars['String']['output']>
  category?: Maybe<Scalars['String']['output']>
  data?: Maybe<Scalars['String']['output']>
  historyStatus?: Maybe<ScanStatusTypeEnum>
}

export type AndroidAppServiceType = {
  __typename?: 'AndroidAppServiceType'
  createdTime?: Maybe<Scalars['DateTime']['output']>
  exported?: Maybe<Scalars['Boolean']['output']>
  foregroundServiceType?: Maybe<AndroidAppServiceForegroundServiceType>
  historyInstance?: Maybe<AndroidAppAssetHistoryInstanceType>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  intentFilters: Array<AndroidAppServiceIntentFilter>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  name?: Maybe<Scalars['String']['output']>
  permission?: Maybe<Scalars['String']['output']>
}

export type AndroidAssetType = {
  __typename?: 'AndroidAssetType'
  fileAssets: Array<AndroidFileAssetType>
  icon?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  packageName: Scalars['String']['output']
  scans?: Maybe<Array<Maybe<ScanType>>>
  storeAssets: Array<AndroidStoreAssetType>
  tags?: Maybe<Array<Maybe<TagsType>>>
}

export type AndroidAssetTypeScansArgs = {
  lastOnly?: InputMaybe<Scalars['Boolean']['input']>
}

export type AndroidBackendLinkType = {
  __typename?: 'AndroidBackendLinkType'
  androidIpLocations: Array<AndroidIpLocationType>
  historyInstance?: Maybe<AndroidAppAssetHistoryInstanceType>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  host: Scalars['String']['output']
  path?: Maybe<Scalars['String']['output']>
  port?: Maybe<Scalars['Int']['output']>
}

export type AndroidFileAssetInputType = {
  file?: InputMaybe<Scalars['Upload']['input']>
}

export type AndroidFileAssetType = {
  __typename?: 'AndroidFileAssetType'
  file?: Maybe<Scalars['Upload']['output']>
  id: Scalars['ID']['output']
  scans?: Maybe<Array<Maybe<ScanType>>>
  tags?: Maybe<Array<Maybe<TagsType>>>
}

export type AndroidFileAssetTypeScansArgs = {
  lastOnly?: InputMaybe<Scalars['Boolean']['input']>
}

export type AndroidIpLocationType = {
  __typename?: 'AndroidIPLocationType'
  androidBackendLink?: Maybe<AndroidBackendLinkType>
  city?: Maybe<Scalars['String']['output']>
  continent?: Maybe<Scalars['String']['output']>
  continentCode?: Maybe<Scalars['String']['output']>
  country?: Maybe<Scalars['String']['output']>
  countryCode?: Maybe<Scalars['String']['output']>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  ipAddress: Scalars['String']['output']
  latitude?: Maybe<Scalars['Float']['output']>
  longitude?: Maybe<Scalars['Float']['output']>
  region?: Maybe<Scalars['String']['output']>
  regionName?: Maybe<Scalars['String']['output']>
  timezone?: Maybe<Scalars['String']['output']>
  version?: Maybe<Scalars['Int']['output']>
  zipCode?: Maybe<Scalars['String']['output']>
}

export type AndroidManifestType = {
  __typename?: 'AndroidManifestType'
  dna?: Maybe<Scalars['String']['output']>
  formattedXml?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  version?: Maybe<Scalars['Int']['output']>
}

export type AndroidResourceType = {
  __typename?: 'AndroidResourceType'
  dna?: Maybe<Scalars['String']['output']>
  formattedXml?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  subPath?: Maybe<Scalars['String']['output']>
  version?: Maybe<Scalars['Int']['output']>
}

export type AndroidResourcesType = {
  __typename?: 'AndroidResourcesType'
  resources: Array<Maybe<AndroidResourceType>>
}

export type AndroidStoreAssetInputType = {
  applicationName?: InputMaybe<Scalars['String']['input']>
  packageName?: InputMaybe<Scalars['String']['input']>
}

export type AndroidStoreAssetType = {
  __typename?: 'AndroidStoreAssetType'
  applicationName: Scalars['String']['output']
  icon?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  packageName: Scalars['String']['output']
  scans?: Maybe<Array<Maybe<ScanType>>>
  tags?: Maybe<Array<Maybe<TagsType>>>
}

export type AndroidStoreAssetTypeScansArgs = {
  lastOnly?: InputMaybe<Scalars['Boolean']['input']>
}

export type ApiKeyModelType = {
  __typename?: 'ApiKeyModelType'
  created: Scalars['DateTime']['output']
  /** Once API key expires, clients cannot use it anymore. */
  expiryDate?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['String']['output']
  /** A free-form name for the API key. Need not be unique. 50 characters max. */
  name: Scalars['String']['output']
  prefix: Scalars['String']['output']
}

export type ApiKeysType = {
  __typename?: 'ApiKeysType'
  apiKeys: Array<Maybe<ApiKeyModelType>>
  pageInfo?: Maybe<PageInfo>
}

export type AppCenterIntegrationConfigurationType = {
  __typename?: 'AppCenterIntegrationConfigurationType'
  apiKey?: Maybe<Scalars['String']['output']>
  appName?: Maybe<Scalars['String']['output']>
  credentials?: Maybe<Array<Maybe<TestCredentials>>>
  enabled: Scalars['Boolean']['output']
  id: Scalars['ID']['output']
  organisation?: Maybe<OrganisationType>
  ownerName?: Maybe<Scalars['String']['output']>
  scanProfile?: Maybe<Scalars['String']['output']>
  uiRules: Array<UiAutomationRuleType>
}

export type AppCenterIntegrationInputType = {
  apiKey: Scalars['String']['input']
  appName: Scalars['String']['input']
  credentialIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  ownerName: Scalars['String']['input']
  scanProfile: Scalars['String']['input']
  uiRules?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
}

export type AppCenterIntegrationUpdateInputType = {
  apiKey?: InputMaybe<Scalars['String']['input']>
  appName?: InputMaybe<Scalars['String']['input']>
  credentialIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  enabled?: InputMaybe<Scalars['Boolean']['input']>
  ownerName?: InputMaybe<Scalars['String']['input']>
  scanProfile?: InputMaybe<Scalars['String']['input']>
  uiRules?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
}

export type ApplicationType = {
  __typename?: 'ApplicationType'
  description?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['Int']['output']>
  name?: Maybe<Scalars['String']['output']>
  repository?: Maybe<Scalars['String']['output']>
  repositoryUrl?: Maybe<Scalars['String']['output']>
  sourceUrl?: Maybe<Scalars['String']['output']>
}

export type ApplicationVersionType = {
  __typename?: 'ApplicationVersionType'
  application?: Maybe<ApplicationType>
  end?: Maybe<Scalars['String']['output']>
  endInclude?: Maybe<Scalars['Boolean']['output']>
  id?: Maybe<Scalars['Int']['output']>
  start?: Maybe<Scalars['String']['output']>
  startInclude?: Maybe<Scalars['Boolean']['output']>
}

export type ApplicationsType = {
  __typename?: 'ApplicationsType'
  applications: Array<Maybe<ApplicationType>>
  pageInfo?: Maybe<PageInfo>
}

export type ArchiveAgentGroupMutation = {
  __typename?: 'ArchiveAgentGroupMutation'
  result?: Maybe<Scalars['Boolean']['output']>
}

export type ArchiveAgentMutation = {
  __typename?: 'ArchiveAgentMutation'
  result?: Maybe<Scalars['Boolean']['output']>
}

export type ArchiveOrganisation = {
  __typename?: 'ArchiveOrganisation'
  result?: Maybe<Scalars['Boolean']['output']>
}

export type ArchiveScanMutation = {
  __typename?: 'ArchiveScanMutation'
  result?: Maybe<Scalars['Boolean']['output']>
}

export type ArgInputType = {
  name: Scalars['String']['input']
  value?: InputMaybe<Scalars['String']['input']>
}

export type AssetAncestorPathType = {
  __typename?: 'AssetAncestorPathType'
  ancestorsList: Array<Scalars['String']['output']>
}

export type AssetDiscoveryInputType = {
  androidStore?: InputMaybe<AndroidStoreAssetInputType>
  domain?: InputMaybe<DomainAssetInputType>
  iosStore?: InputMaybe<IosStoreAssetInputType>
  ip?: InputMaybe<IpAssetInputType>
  ipV4?: InputMaybe<IPv4AssetInputType>
  ipV6?: InputMaybe<IPv6AssetInputType>
}

export type AssetInputType = {
  androidFile?: InputMaybe<AndroidFileAssetInputType>
  androidStore?: InputMaybe<AndroidStoreAssetInputType>
  domain?: InputMaybe<DomainAssetInputType>
  file?: InputMaybe<FileAssetInputType>
  iosFile?: InputMaybe<IosFileAssetInputType>
  iosStore?: InputMaybe<IosStoreAssetInputType>
  ip?: InputMaybe<IpAssetInputType>
  ipV4?: InputMaybe<IPv4AssetInputType>
  ipV6?: InputMaybe<IPv6AssetInputType>
  network?: InputMaybe<NetworkAssetInputType>
  sourceCode?: InputMaybe<SourceCodeAssetInputType>
  tags?: InputMaybe<Array<InputMaybe<TagsInputType>>>
  url?: InputMaybe<UrlAssetInputType>
}

export type AssetListSelectorType = {
  __typename?: 'AssetListSelectorType'
  assets?: Maybe<Array<Maybe<AssetType>>>
}

export type AssetLocationInputMutableType = {
  address?: InputMaybe<Scalars['String']['input']>
  assetLocationId: Scalars['Int']['input']
  name?: InputMaybe<Scalars['String']['input']>
  parentId?: InputMaybe<Scalars['Int']['input']>
  unassignParent?: InputMaybe<Scalars['Boolean']['input']>
}

export type AssetLocationInputType = {
  address?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
  parentId?: InputMaybe<Scalars['Int']['input']>
}

export type AssetLocationType = {
  __typename?: 'AssetLocationType'
  address?: Maybe<Scalars['String']['output']>
  createdTime?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['ID']['output']
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  name: Scalars['String']['output']
  organisation: OrganisationType
  parent?: Maybe<AssetLocationType>
}

export type AssetLocationsType = {
  __typename?: 'AssetLocationsType'
  locations: Array<Maybe<AssetLocationType>>
  pageInfo?: Maybe<PageInfo>
}

export enum AssetOrderByEnum {
  AssetId = 'AssetId',
  LastRiskRating = 'LastRiskRating',
  LastScanDate = 'LastScanDate',
  PackageName = 'PackageName',
  Platform = 'Platform'
}

export enum AssetOwnerOrderByEnum {
  Name = 'Name'
}

export type AssetSelectorType = AssetListSelectorType | AssetTypeSelectorType | NgAssetTypeListSelectorType

export type AssetType = AndroidAssetType | AndroidFileAssetType | AndroidStoreAssetType | IosAssetType | IosFileAssetType | IosStoreAssetType | NetworkAssetType | UrlAssetType

export type AssetTypeSelectorType = {
  __typename?: 'AssetTypeSelectorType'
  assetType?: Maybe<AssetTypesEnum>
  tags?: Maybe<Array<Maybe<TagsType>>>
}

export enum AssetTypesEnum {
  AndroidFile = 'AndroidFile',
  AndroidStore = 'AndroidStore',
  IosFile = 'IOSFile',
  IosStore = 'IOSStore',
  Network = 'Network',
  Url = 'Url'
}

export type AssetsType = {
  __typename?: 'AssetsType'
  assets: Array<Maybe<AssetType>>
  pageInfo?: Maybe<PageInfo>
}

export type AttachmentInputType = {
  content: Scalars['Bytes']['input']
  name?: InputMaybe<Scalars['String']['input']>
}

export type AttachmentObjectType = {
  __typename?: 'AttachmentObjectType'
  content?: Maybe<Scalars['Bytes']['output']>
  id: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  preview?: Maybe<Scalars['Bytes']['output']>
  type: Scalars['String']['output']
}

export type AttachmentsType = {
  __typename?: 'AttachmentsType'
  attachments: Array<Maybe<AttachmentObjectType>>
  pageInfo?: Maybe<PageInfo>
}

export type AttributeInputType = {
  name: Scalars['String']['input']
  value?: InputMaybe<Scalars['String']['input']>
}

export type AttributeType = {
  __typename?: 'AttributeType'
  name?: Maybe<Scalars['String']['output']>
  value?: Maybe<Scalars['String']['output']>
}

export type BasicTestCredentials = {
  __typename?: 'BasicTestCredentials'
  credentialName?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  login?: Maybe<Scalars['String']['output']>
  password?: Maybe<Scalars['String']['output']>
}

export type BasicTestCredentialsInput = {
  login?: InputMaybe<Scalars['String']['input']>
  password?: InputMaybe<Scalars['String']['input']>
}

export type BasicTestCredentialsInstance = {
  __typename?: 'BasicTestCredentialsInstance'
  credentialName?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  login?: Maybe<Scalars['String']['output']>
  password?: Maybe<Scalars['String']['output']>
}

export enum BillingFrequencyEnum {
  Monthly = 'MONTHLY',
  Oneoff = 'ONEOFF',
  Yearly = 'YEARLY'
}

export type BulkCsvCreateOrUpdateNgAssetsMutation = {
  __typename?: 'BulkCSVCreateOrUpdateNGAssetsMutation'
  job?: Maybe<Job>
}

export type CilClassType = {
  __typename?: 'CILClassType'
  className: Scalars['String']['output']
  /** DNA to uniquely reference the object */
  dna?: Maybe<Scalars['String']['output']>
  formattedDisassembly: Scalars['String']['output']
  formattedSourceCode: Scalars['String']['output']
  id: Scalars['ID']['output']
}

export type CilMethodType = {
  __typename?: 'CILMethodType'
  className: Scalars['String']['output']
  /** DNA to uniquely reference the object */
  dna?: Maybe<Scalars['String']['output']>
  formattedDisassembly: Scalars['String']['output']
  formattedSourceCode: Scalars['String']['output']
  id: Scalars['ID']['output']
  methodSignature: Scalars['String']['output']
}

export type CilPackageType = {
  __typename?: 'CILPackageType'
  /** DNA to uniquely reference the object */
  dna?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  packageName: Scalars['String']['output']
}

export type CpeMatchType = {
  __typename?: 'CPEMatchType'
  edition?: Maybe<Scalars['String']['output']>
  hw?: Maybe<Scalars['String']['output']>
  language?: Maybe<Scalars['String']['output']>
  other?: Maybe<Scalars['String']['output']>
  part?: Maybe<Scalars['String']['output']>
  product?: Maybe<Scalars['String']['output']>
  sw?: Maybe<Scalars['String']['output']>
  swEdition?: Maybe<Scalars['String']['output']>
  update?: Maybe<Scalars['String']['output']>
  vendor?: Maybe<Scalars['String']['output']>
  version?: Maybe<VersionMatchType>
  vulnerable?: Maybe<Scalars['Boolean']['output']>
}

export type CveType = {
  __typename?: 'CVEType'
  cveId?: Maybe<Scalars['String']['output']>
  cvssV2Vector?: Maybe<Scalars['String']['output']>
  cvssV3Vector?: Maybe<Scalars['String']['output']>
  cwe?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['Int']['output']>
  modifiedDate?: Maybe<Scalars['String']['output']>
  publishedDate?: Maybe<Scalars['String']['output']>
  references?: Maybe<Array<Maybe<ReferenceType>>>
}

export enum CallStackOrderByEnum {
  ClassName = 'ClassName',
  CreatedTime = 'CreatedTime',
  FrameId = 'FrameId',
  FunctionName = 'FunctionName',
  PackageName = 'PackageName',
  StackTraceId = 'StackTraceId'
}

export type CallUiNodeType = {
  __typename?: 'CallUINodeType'
  id: Scalars['ID']['output']
  parent?: Maybe<CallUiNodeType>
  path?: Maybe<Scalars['String']['output']>
  preview?: Maybe<Scalars['String']['output']>
  screenshot?: Maybe<Scalars['String']['output']>
}

export type CallUiNodesType = {
  __typename?: 'CallUINodesType'
  nodes: Array<Maybe<CallUiNodeType>>
  pageInfo?: Maybe<PageInfo>
}

export type CancelSubscriptionMutation = {
  __typename?: 'CancelSubscriptionMutation'
  result?: Maybe<Scalars['Boolean']['output']>
}

export type CategoryGroupsInputType = {
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  key?: InputMaybe<Scalars['String']['input']>
}

export type ChangePasswordMutation = {
  __typename?: 'ChangePasswordMutation'
  valid?: Maybe<Scalars['Boolean']['output']>
}

export type ChecklistItemInputType = {
  assigned?: InputMaybe<Scalars['String']['input']>
  checked: Scalars['Boolean']['input']
  value: Scalars['String']['input']
}

export type ChecklistItemType = {
  __typename?: 'ChecklistItemType'
  assigned?: Maybe<OrganisationUserType>
  checked: Scalars['Boolean']['output']
  id: Scalars['ID']['output']
  order: Scalars['Int']['output']
  value: Scalars['String']['output']
}

export type ChecklistType = {
  __typename?: 'ChecklistType'
  id: Scalars['ID']['output']
  items: Array<Maybe<ChecklistItemType>>
  ticket?: Maybe<TicketType>
  title: Scalars['String']['output']
}

export type ComputePotentialAssetsMutation = {
  __typename?: 'ComputePotentialAssetsMutation'
  job?: Maybe<Job>
}

export type ConfigureJiraIntegrationMutation = {
  __typename?: 'ConfigureJiraIntegrationMutation'
  integration?: Maybe<JiraIntegrationConfiguration>
}

export type ConfirmTotpDevice = {
  __typename?: 'ConfirmTOTPDevice'
  result?: Maybe<Scalars['Boolean']['output']>
}

export type ContactInput = {
  email: Scalars['String']['input']
  name: Scalars['String']['input']
}

export enum ContextEnum {
  AttackSurface = 'ATTACK_SURFACE',
  Inventory = 'INVENTORY',
  Remediation = 'REMEDIATION'
}

export type ContinuousTimeSelectorType = {
  __typename?: 'ContinuousTimeSelectorType'
  maxNoScanDuration?: Maybe<Scalars['Float']['output']>
}

export type CreateAgentScanMutation = {
  __typename?: 'CreateAgentScanMutation'
  scan?: Maybe<ScanType>
}

export type CreateApiKey = {
  __typename?: 'CreateApiKey'
  apiKey?: Maybe<SecretApiKey>
}

export type CreateAppCenterIntegrationMutation = {
  __typename?: 'CreateAppCenterIntegrationMutation'
  integration?: Maybe<AppCenterIntegrationConfigurationType>
}

export type CreateApplicationFromRepoMutation = {
  __typename?: 'CreateApplicationFromRepoMutation'
  application?: Maybe<ApplicationType>
}

export type CreateApplicationMutation = {
  __typename?: 'CreateApplicationMutation'
  application?: Maybe<ApplicationType>
}

export type CreateAssetMutation = {
  __typename?: 'CreateAssetMutation'
  asset?: Maybe<AssetType>
}

export type CreateAssetsLocationMutation = {
  __typename?: 'CreateAssetsLocationMutation'
  assetLocations?: Maybe<Array<Maybe<AssetLocationType>>>
}

export type CreateContinuousScheduleRuleListAssetsMutation = {
  __typename?: 'CreateContinuousScheduleRuleListAssetsMutation'
  scheduleRule?: Maybe<ScheduleRuleType>
}

export type CreateContinuousScheduleRuleListNgAssetsMutation = {
  __typename?: 'CreateContinuousScheduleRuleListNgAssetsMutation'
  scheduleRule?: Maybe<ScheduleRuleType>
}

export type CreateCronScheduleRuleListNgAssetsMutation = {
  __typename?: 'CreateCronScheduleRuleListNgAssetsMutation'
  scheduleRule?: Maybe<ScheduleRuleType>
}

export type CreateCustomAutodiscoveryScanMutation = {
  __typename?: 'CreateCustomAutodiscoveryScanMutation'
  result?: Maybe<Scalars['Boolean']['output']>
}

export type CreateJiraTicketMapMutation = {
  __typename?: 'CreateJiraTicketMapMutation'
  jiraTicketMap?: Maybe<JiraTicketMapType>
}

export type CreateJiraTicketMutation = {
  __typename?: 'CreateJiraTicketMutation'
  jiraTicketMap?: Maybe<JiraTicketMapType>
}

export enum CreateModeEnum {
  Automatic = 'AUTOMATIC',
  OnDemand = 'ON_DEMAND',
  Passive = 'PASSIVE'
}

export type CreateNgAssetsMutation = {
  __typename?: 'CreateNGAssetsMutation'
  assets?: Maybe<Array<Maybe<NgAssetType>>>
}

export type CreateOnPremScanMutation = {
  __typename?: 'CreateOnPremScanMutation'
  scan?: Maybe<ScanType>
}

export type CreateOrganisation = {
  __typename?: 'CreateOrganisation'
  organisation?: Maybe<OrganisationType>
}

export type CreateOveMutation = {
  __typename?: 'CreateOveMutation'
  ove?: Maybe<OveType>
}

export type CreateOwnerMutation = {
  __typename?: 'CreateOwnerMutation'
  owner?: Maybe<OwnerType>
}

export type CreatePlanMutation = {
  __typename?: 'CreatePlanMutation'
  plan?: Maybe<PlanNgType>
}

export type CreateRuleMutation = {
  __typename?: 'CreateRuleMutation'
  rule?: Maybe<RuleType>
}

export type CreateSamlIntegrationConfigurationMutation = {
  __typename?: 'CreateSamlIntegrationConfigurationMutation'
  samlIntegrationConfiguration?: Maybe<SamlIntegrationConfigurationType>
}

export type CreateScanSummaryMutation = {
  __typename?: 'CreateScanSummaryMutation'
  scanSummary?: Maybe<ScanSummaryType>
}

export type CreateSharedAccessTemporaryToken = {
  __typename?: 'CreateSharedAccessTemporaryToken'
  sharedAccessTemporaryToken?: Maybe<SharedAccessTemporaryToken>
}

export type CreateSharedAccessToken = {
  __typename?: 'CreateSharedAccessToken'
  sharedAccessToken?: Maybe<SharedAccessTokenType>
}

export type CreateTestCredentialsMutation = {
  __typename?: 'CreateTestCredentialsMutation'
  testCredentials?: Maybe<TestCredentials>
}

export type CreditCardTestCredentials = {
  __typename?: 'CreditCardTestCredentials'
  credentialName?: Maybe<Scalars['String']['output']>
  creditCardNumber: Scalars['String']['output']
  cvv: Scalars['Int']['output']
  expirationDate: Scalars['String']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
}

export type CreditCardTestCredentialsInput = {
  creditCardNumber?: InputMaybe<Scalars['String']['input']>
  cvv?: InputMaybe<Scalars['Int']['input']>
  expirationDate?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type CreditCardTestCredentialsInstance = {
  __typename?: 'CreditCardTestCredentialsInstance'
  credentialName?: Maybe<Scalars['String']['output']>
  creditCardNumber: Scalars['String']['output']
  cvv: Scalars['Int']['output']
  expirationDate: Scalars['String']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
}

export type CronTimeSelectorType = {
  __typename?: 'CronTimeSelectorType'
  crontab: Scalars['String']['output']
}

export type CustomTestCredentials = {
  __typename?: 'CustomTestCredentials'
  credentialName?: Maybe<Scalars['String']['output']>
  credentials?: Maybe<Array<Maybe<TagsType>>>
  id: Scalars['ID']['output']
}

export type CustomTestCredentialsInput = {
  credentials?: InputMaybe<Array<InputMaybe<MapInput>>>
}

export type CustomTestCredentialsInstance = {
  __typename?: 'CustomTestCredentialsInstance'
  credentialName?: Maybe<Scalars['String']['output']>
  credentials?: Maybe<Array<Maybe<TagsType>>>
  id: Scalars['ID']['output']
}

export type CustomizeVulnerabilitiesMutation = {
  __typename?: 'CustomizeVulnerabilitiesMutation'
  result?: Maybe<Scalars['Boolean']['output']>
}

export type DnsRecordFilterInputType = {
  record?: InputMaybe<Scalars['String']['input']>
  value?: InputMaybe<Scalars['String']['input']>
}

export enum DnsRecordHistoryStatus {
  /** Added */
  Added = 'ADDED',
  /** No Change */
  NoChange = 'NO_CHANGE',
  /** Removed */
  Removed = 'REMOVED'
}

export type DnsRecordType = {
  __typename?: 'DNSRecordType'
  createdTime?: Maybe<Scalars['DateTime']['output']>
  historyInstance?: Maybe<DomainAssetHistoryInstanceType>
  historyStatus?: Maybe<DnsRecordHistoryStatus>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  record?: Maybe<Scalars['String']['output']>
  value?: Maybe<Scalars['String']['output']>
}

export type DeleteAppCenterIntegrationMutation = {
  __typename?: 'DeleteAppCenterIntegrationMutation'
  result?: Maybe<Scalars['Boolean']['output']>
}

export type DeleteApplicationMutation = {
  __typename?: 'DeleteApplicationMutation'
  result?: Maybe<Scalars['Boolean']['output']>
}

export type DeleteAssetMutation = {
  __typename?: 'DeleteAssetMutation'
  result?: Maybe<Scalars['Boolean']['output']>
}

export type DeleteAssetsLocationMutation = {
  __typename?: 'DeleteAssetsLocationMutation'
  message?: Maybe<Scalars['Boolean']['output']>
}

export type DeleteChecklistMutation = {
  __typename?: 'DeleteChecklistMutation'
  result?: Maybe<Scalars['Boolean']['output']>
}

export type DeleteCommentMutation = {
  __typename?: 'DeleteCommentMutation'
  result?: Maybe<Scalars['Boolean']['output']>
}

export type DeleteJiraTicketMapMutation = {
  __typename?: 'DeleteJiraTicketMapMutation'
  result?: Maybe<Scalars['Boolean']['output']>
}

export type DeleteNgAssetMutation = {
  __typename?: 'DeleteNGAssetMutation'
  message?: Maybe<Scalars['Boolean']['output']>
}

export type DeleteOwnerMutation = {
  __typename?: 'DeleteOwnerMutation'
  message?: Maybe<Scalars['Boolean']['output']>
}

export type DeleteRuleMutation = {
  __typename?: 'DeleteRuleMutation'
  result?: Maybe<Scalars['Boolean']['output']>
}

/** Graphene Mutation for granting access to scanner to child-organisations. */
export type DeleteScannerAccessMutation = {
  __typename?: 'DeleteScannerAccessMutation'
  result?: Maybe<Scalars['Boolean']['output']>
}

/** Graphene Mutation for deleting a new scanner. */
export type DeleteScannerMutation = {
  __typename?: 'DeleteScannerMutation'
  message?: Maybe<Scalars['Boolean']['output']>
}

export type DeleteScheduleMutation = {
  __typename?: 'DeleteScheduleMutation'
  result?: Maybe<Scalars['Boolean']['output']>
}

export type DeleteTotpDevice = {
  __typename?: 'DeleteTOTPDevice'
  result?: Maybe<Scalars['Boolean']['output']>
}

export type DeleteTargetMutation = {
  __typename?: 'DeleteTargetMutation'
  result?: Maybe<Scalars['Boolean']['output']>
}

export type DeleteTestCredentialsMutation = {
  __typename?: 'DeleteTestCredentialsMutation'
  result?: Maybe<Scalars['Boolean']['output']>
}

export type DeleteTicketMutation = {
  __typename?: 'DeleteTicketMutation'
  result?: Maybe<Scalars['Boolean']['output']>
}

export type DexClassType = {
  __typename?: 'DexClassType'
  className?: Maybe<Scalars['String']['output']>
  dna?: Maybe<Scalars['String']['output']>
  formattedSmali?: Maybe<Scalars['String']['output']>
  formattedSourceCode?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  methods?: Maybe<Array<Maybe<DexMethodType>>>
  packageName?: Maybe<Scalars['String']['output']>
  version?: Maybe<Scalars['Int']['output']>
}

export type DexFileType = {
  __typename?: 'DexFileType'
  dna?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  packages?: Maybe<DexPackagesType>
  version?: Maybe<Scalars['Int']['output']>
}

export type DexFileTypePackagesArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type DexMethodType = {
  __typename?: 'DexMethodType'
  className?: Maybe<Scalars['String']['output']>
  dna?: Maybe<Scalars['String']['output']>
  formattedSmali?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  methodSignature?: Maybe<Scalars['String']['output']>
  packageName?: Maybe<Scalars['String']['output']>
  version?: Maybe<Scalars['Int']['output']>
}

export type DexPackageType = {
  __typename?: 'DexPackageType'
  classes?: Maybe<Array<Maybe<DexClassType>>>
  dna?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  packageName?: Maybe<Scalars['String']['output']>
  version?: Maybe<Scalars['Int']['output']>
}

export type DexPackageTypeClassesArgs = {
  search?: InputMaybe<Scalars['String']['input']>
}

export type DexPackagesType = {
  __typename?: 'DexPackagesType'
  packages: Array<Maybe<DexPackageType>>
  pageInfo: PageInfo
}

export type DisableScheduleMutation = {
  __typename?: 'DisableScheduleMutation'
  scheduleRule?: Maybe<ScheduleRuleType>
}

/** Debugging information for the current query. */
export type DjangoDebug = {
  __typename?: 'DjangoDebug'
  /** Executed SQL queries for this API query. */
  sql?: Maybe<Array<Maybe<DjangoDebugSql>>>
}

/** Represents a single database query made to a Django managed DB. */
export type DjangoDebugSql = {
  __typename?: 'DjangoDebugSQL'
  /** The Django database alias (e.g. 'default'). */
  alias: Scalars['String']['output']
  /** Duration of this database query in seconds. */
  duration: Scalars['Float']['output']
  /** Postgres connection encoding if available. */
  encoding?: Maybe<Scalars['String']['output']>
  /** Whether this database query was a SELECT. */
  isSelect: Scalars['Boolean']['output']
  /** Whether this database query took more than 10 seconds. */
  isSlow: Scalars['Boolean']['output']
  /** Postgres isolation level if available. */
  isoLevel?: Maybe<Scalars['String']['output']>
  /** JSON encoded database query parameters. */
  params: Scalars['String']['output']
  /** The raw SQL of this query, without params. */
  rawSql: Scalars['String']['output']
  /** The actual SQL sent to this database. */
  sql?: Maybe<Scalars['String']['output']>
  /** Start time of this database query. */
  startTime: Scalars['Float']['output']
  /** Stop time of this database query. */
  stopTime: Scalars['Float']['output']
  /** Postgres transaction ID if available. */
  transId?: Maybe<Scalars['String']['output']>
  /** Postgres transaction status if available. */
  transStatus?: Maybe<Scalars['String']['output']>
  /** The type of database being used (e.g. postrgesql, mysql, sqlite). */
  vendor: Scalars['String']['output']
}

export type DomainAssetHistoryInstanceType = {
  __typename?: 'DomainAssetHistoryInstanceType'
  createdTime?: Maybe<Scalars['DateTime']['output']>
  dnsRecords: Array<DnsRecordType>
  id: Scalars['ID']['output']
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  scanId: Scalars['Int']['output']
  screenshots: Array<ScreenshotType>
  services: Array<DomainServiceType>
  whoisRecords: Array<DomainWhoisType>
}

export type DomainAssetHistoryInstancesType = {
  __typename?: 'DomainAssetHistoryInstancesType'
  historyInstances: Array<Maybe<DomainAssetHistoryInstanceType>>
  pageInfo?: Maybe<PageInfo>
}

export type DomainAssetInputType = {
  domain?: InputMaybe<Scalars['String']['input']>
}

export type DomainFingerprintType = {
  __typename?: 'DomainFingerprintType'
  detail?: Maybe<Scalars['String']['output']>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  name?: Maybe<Scalars['String']['output']>
  service: DomainServiceType
  version: Scalars['String']['output']
}

export type DomainServiceCertificateChainType = {
  __typename?: 'DomainServiceCertificateChainType'
  certificates: Array<DomainX509CertificateType>
}

export type DomainServiceType = {
  __typename?: 'DomainServiceType'
  certificates: Array<DomainServiceCertificateChainType>
  createdTime?: Maybe<Scalars['DateTime']['output']>
  fingerprints: Array<DomainFingerprintType>
  historyInstance?: Maybe<DomainAssetHistoryInstanceType>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  port?: Maybe<Scalars['Int']['output']>
  protocol?: Maybe<Scalars['String']['output']>
}

export type DomainWhoisType = {
  __typename?: 'DomainWhoisType'
  address?: Maybe<Scalars['String']['output']>
  createdTime?: Maybe<Scalars['DateTime']['output']>
  email?: Maybe<Scalars['String']['output']>
  historyInstance?: Maybe<DomainAssetHistoryInstanceType>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  org?: Maybe<Scalars['String']['output']>
}

export type DomainX509CertificateType = {
  __typename?: 'DomainX509CertificateType'
  certificateChain: DomainServiceCertificateChainType
  chainIndex: Scalars['Int']['output']
  id: Scalars['ID']['output']
  issuer?: Maybe<Scalars['String']['output']>
  publicKeyAlgorithm?: Maybe<Scalars['String']['output']>
  publicKeyValue?: Maybe<Scalars['String']['output']>
  serialNumber?: Maybe<Scalars['String']['output']>
  sha256Fingerprint?: Maybe<Scalars['String']['output']>
  signatureAlgorithm?: Maybe<Scalars['String']['output']>
  signatureValue?: Maybe<Scalars['String']['output']>
  subject?: Maybe<Scalars['String']['output']>
  validityNotAfter?: Maybe<Scalars['DateTime']['output']>
  validityNotBefore?: Maybe<Scalars['DateTime']['output']>
  versionNumber?: Maybe<Scalars['Int']['output']>
}

export type DuplicateTargetMutation = {
  __typename?: 'DuplicateTargetMutation'
  target?: Maybe<TargetType>
}

export type ElfFileType = {
  __typename?: 'ElfFileType'
  dna?: Maybe<Scalars['String']['output']>
  functions?: Maybe<ElfFunctionsType>
  id: Scalars['ID']['output']
  strings?: Maybe<ElfStringsType>
  version?: Maybe<Scalars['Int']['output']>
}

export type ElfFileTypeFunctionsArgs = {
  name?: InputMaybe<Scalars['String']['input']>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type ElfFileTypeStringsArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type ElfFunctionType = {
  __typename?: 'ElfFunctionType'
  address?: Maybe<Scalars['String']['output']>
  dna?: Maybe<Scalars['String']['output']>
  formattedDisassembly?: Maybe<Scalars['String']['output']>
  formattedSourceCode?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  path?: Maybe<Scalars['String']['output']>
  version?: Maybe<Scalars['Int']['output']>
}

export type ElfFunctionsType = {
  __typename?: 'ElfFunctionsType'
  functions: Array<Maybe<ElfFunctionType>>
  pageInfo: PageInfo
}

export type ElfStringType = {
  __typename?: 'ElfStringType'
  dna?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  path?: Maybe<Scalars['String']['output']>
  physicalAddress?: Maybe<Scalars['String']['output']>
  section?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
  value?: Maybe<Scalars['String']['output']>
  version?: Maybe<Scalars['Int']['output']>
  virtualAddress?: Maybe<Scalars['String']['output']>
}

export type ElfStringsType = {
  __typename?: 'ElfStringsType'
  pageInfo: PageInfo
  strings: Array<Maybe<ElfStringType>>
}

export type EmailTestCredentials = {
  __typename?: 'EmailTestCredentials'
  credentialName?: Maybe<Scalars['String']['output']>
  email: Scalars['String']['output']
  id: Scalars['ID']['output']
}

export type EmailTestCredentialsInput = {
  email?: InputMaybe<Scalars['String']['input']>
}

export type EmailTestCredentialsInstance = {
  __typename?: 'EmailTestCredentialsInstance'
  credentialName?: Maybe<Scalars['String']['output']>
  email: Scalars['String']['output']
  id: Scalars['ID']['output']
}

export type EnableScheduleMutation = {
  __typename?: 'EnableScheduleMutation'
  scheduleRule?: Maybe<ScheduleRuleType>
}

export enum EnvironmentalRequirementLevelsEnum {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

/** GraphQL mutation to execute a rule: Match the targeted elements & apply the action. */
export type ExecuteRuleMutation = {
  __typename?: 'ExecuteRuleMutation'
  result?: Maybe<Scalars['Boolean']['output']>
}

export type ExportAssetsMutation = {
  __typename?: 'ExportAssetsMutation'
  job?: Maybe<Job>
}

export type ExportScanMutation = {
  __typename?: 'ExportScanMutation'
  job?: Maybe<Job>
}

export type ExportTicketsMutation = {
  __typename?: 'ExportTicketsMutation'
  job?: Maybe<Job>
}

export type ExportVulnerabilitiesMutation = {
  __typename?: 'ExportVulnerabilitiesMutation'
  job?: Maybe<Job>
}

export enum FeaturesNamesTypeEnum {
  Accessibility = 'ACCESSIBILITY',
  AdsLibrary = 'ADS_LIBRARY',
  AnalyticsLibrary = 'ANALYTICS_LIBRARY',
  Authentication = 'AUTHENTICATION',
  Biometric = 'BIOMETRIC',
  Bluetooth = 'BLUETOOTH',
  CallLogs = 'CALL_LOGS',
  Camera = 'CAMERA',
  Contacts = 'CONTACTS',
  Geolocation = 'GEOLOCATION',
  Gps = 'GPS',
  Health = 'HEALTH',
  InstallPackage = 'INSTALL_PACKAGE',
  Internet = 'INTERNET',
  Libraries = 'LIBRARIES',
  MediaFiles = 'MEDIA_FILES',
  Nfc = 'NFC',
  Sms = 'SMS',
  Tracking = 'TRACKING',
  Wallet = 'WALLET',
  Wifi = 'WIFI'
}

export type FileAssetInputType = {
  content?: InputMaybe<Scalars['Upload']['input']>
  path?: InputMaybe<Scalars['String']['input']>
}

export type FileTypeCast = AndroidManifestType | AndroidResourcesType | DexFileType | ElfFileType | JavascriptFileType | MachosFileType | PlistType

export type FilterInputType = {
  id?: InputMaybe<Scalars['Int']['input']>
  query?: InputMaybe<Scalars['String']['input']>
}

export type FilterType = {
  __typename?: 'FilterType'
  id: Scalars['ID']['output']
  query?: Maybe<Scalars['String']['output']>
  rule: RuleType
}

export enum FingerprintDetailFormat {
  /** HTML */
  Html = 'HTML',
  /** Markdown */
  Markdown = 'MARKDOWN'
}

export type FingerprintFilterInputType = {
  detail?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  version?: InputMaybe<Scalars['String']['input']>
}

export type FingerprintModelType = {
  __typename?: 'FingerprintModelType'
  detail?: Maybe<Scalars['String']['output']>
  detailFormat: FingerprintDetailFormat
  dna: Scalars['String']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  type: FingerprintType
  version?: Maybe<Scalars['String']['output']>
}

export enum FingerprintType {
  /** BACKEND COMPONENT */
  BackendComponent = 'BACKEND_COMPONENT',
  /** Cordova Framework */
  CordovaFramework = 'CORDOVA_FRAMEWORK',
  /** dotNet Framework */
  DotnetFramework = 'DOTNET_FRAMEWORK',
  /** ELF Library */
  ElfLibrary = 'ELF_LIBRARY',
  /** Flutter Framework */
  FlutterFramework = 'FLUTTER_FRAMEWORK',
  /** iOS Framework */
  IosFramework = 'IOS_FRAMEWORK',
  /** Javascript Library */
  JavascriptLibrary = 'JAVASCRIPT_LIBRARY',
  /** Java Library */
  JavaLibrary = 'JAVA_LIBRARY',
  /** Macho Library */
  MachoLibrary = 'MACHO_LIBRARY',
  /** PE Library */
  PeLibrary = 'PE_LIBRARY',
  /** Programming Language */
  ProgrammingLanguage = 'PROGRAMMING_LANGUAGE'
}

export type FingerprintsType = {
  __typename?: 'FingerprintsType'
  fingerprints: Array<Maybe<FingerprintModelType>>
  pageInfo?: Maybe<PageInfo>
}

export enum FunctionExtern {
  /** JNI */
  Jni = 'JNI',
  /** Javascript Interface */
  JsInterface = 'JS_INTERFACE'
}

export enum FunctionType {
  /** Xamarin Function */
  Cil = 'CIL',
  /** Dex Function */
  Dex = 'DEX',
  /** ELF Function */
  Elf = 'ELF',
  /** Javascript Function */
  Js = 'JS',
  /** Macho Function */
  Macho = 'MACHO'
}

export type GeneratePdfMutation = {
  __typename?: 'GeneratePdfMutation'
  job?: Maybe<Job>
}

export enum GlobalMetricEventType {
  /** Average Count of High Risk Issues */
  AverageCountHigh = 'AVERAGE_COUNT_HIGH',
  /** Average Count of Exception */
  AverageException = 'AVERAGE_EXCEPTION',
  /** Average Re-Open Rate */
  AverageReopen = 'AVERAGE_REOPEN',
  /** Mean Time to Resolution */
  MeanResolutionTime = 'MEAN_RESOLUTION_TIME',
  /** % Asset with no Vulnerabilities */
  SecureAssets = 'SECURE_ASSETS'
}

export type GlobalMetricType = {
  __typename?: 'GlobalMetricType'
  eventType: GlobalMetricEventType
  key: Scalars['String']['output']
  value: Scalars['Float']['output']
}

export enum GlobalMetricTypeEnum {
  AverageCountHigh = 'AVERAGE_COUNT_HIGH',
  AverageException = 'AVERAGE_EXCEPTION',
  AverageReopen = 'AVERAGE_REOPEN',
  MeanResolutionTime = 'MEAN_RESOLUTION_TIME',
  SecureAssets = 'SECURE_ASSETS'
}

export type GlobalMetricsType = {
  __typename?: 'GlobalMetricsType'
  metrics: Array<Maybe<GlobalMetricType>>
  pageInfo?: Maybe<PageInfo>
}

export type GraphEdgeType = {
  __typename?: 'GraphEdgeType'
  attributes?: Maybe<Array<Maybe<AttributeType>>>
  creationTime?: Maybe<Scalars['DateTime']['output']>
  fromKey?: Maybe<Scalars['String']['output']>
  fromType?: Maybe<Scalars['String']['output']>
  lastSeenTime?: Maybe<Scalars['DateTime']['output']>
  toKey?: Maybe<Scalars['String']['output']>
  toType?: Maybe<Scalars['String']['output']>
}

export type GraphNodeType = {
  __typename?: 'GraphNodeType'
  assetId?: Maybe<Scalars['String']['output']>
  assetType?: Maybe<Scalars['String']['output']>
  attributes?: Maybe<Array<Maybe<AttributeType>>>
  creationTime?: Maybe<Scalars['DateTime']['output']>
  customColor?: Maybe<Scalars['String']['output']>
  key?: Maybe<Scalars['String']['output']>
  lastSeenTime?: Maybe<Scalars['DateTime']['output']>
  ownershipType?: Maybe<Scalars['String']['output']>
  score?: Maybe<Scalars['Int']['output']>
  type?: Maybe<Scalars['String']['output']>
}

export type HttpFolderChildType = {
  __typename?: 'HTTPFolderChildType'
  children: Array<HttpFolderType>
  host: Scalars['String']['output']
  id: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  port: Scalars['Int']['output']
}

export type HttpFolderRequestsResponsesType = {
  __typename?: 'HTTPFolderRequestsResponsesType'
  pageInfo?: Maybe<PageInfo>
  requestsResponses: Array<Maybe<HttpRequestType>>
}

export type HttpFolderType = {
  __typename?: 'HTTPFolderType'
  children?: Maybe<Array<Maybe<HttpFolderChildType>>>
  host: Scalars['String']['output']
  id: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  port: Scalars['Int']['output']
  requestsResponses?: Maybe<HttpFolderRequestsResponsesType>
}

export type HttpFolderTypeChildrenArgs = {
  orderBy?: InputMaybe<HttpFolderOrderByEnum>
  sort?: InputMaybe<SortEnum>
}

export type HttpFolderTypeRequestsResponsesArgs = {
  host?: InputMaybe<Scalars['String']['input']>
  method?: InputMaybe<Scalars['String']['input']>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  path?: InputMaybe<Scalars['String']['input']>
  port?: InputMaybe<Scalars['Int']['input']>
  responseId?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  statusCode?: InputMaybe<Scalars['Int']['input']>
}

export type HttpFoldersType = {
  __typename?: 'HTTPFoldersType'
  folders?: Maybe<Array<Maybe<HttpFolderType>>>
  pageInfo?: Maybe<PageInfo>
}

export type HttpHeaderType = {
  __typename?: 'HTTPHeaderType'
  index: Scalars['Int']['output']
  name: Scalars['Bytes']['output']
  value: Scalars['Bytes']['output']
}

export type HttpRequestType = {
  __typename?: 'HTTPRequestType'
  content?: Maybe<Scalars['Bytes']['output']>
  headers: Array<HttpHeaderType>
  host: Scalars['String']['output']
  httpVersion: Scalars['Bytes']['output']
  method: Scalars['Bytes']['output']
  path: Scalars['Bytes']['output']
  port: Scalars['Int']['output']
  response?: Maybe<HttpResponseType>
  scheme: Scalars['Bytes']['output']
  timeEnd?: Maybe<Scalars['Int']['output']>
  timeStart?: Maybe<Scalars['Int']['output']>
  uuid: Scalars['UUID']['output']
}

export type HttpRequestsResponsesType = {
  __typename?: 'HTTPRequestsResponsesType'
  pageInfo?: Maybe<PageInfo>
  responses: Array<Maybe<HttpResponseType>>
}

export type HttpResponseType = {
  __typename?: 'HTTPResponseType'
  content?: Maybe<Scalars['Bytes']['output']>
  contentType?: Maybe<Scalars['String']['output']>
  headers: Array<HttpHeaderType>
  httpVersion: Scalars['Bytes']['output']
  id: Scalars['ID']['output']
  reason: Scalars['Bytes']['output']
  request?: Maybe<HttpRequestType>
  size?: Maybe<Scalars['Int']['output']>
  statusCode: Scalars['Int']['output']
  timeEnd?: Maybe<Scalars['Int']['output']>
  timeStart?: Maybe<Scalars['Int']['output']>
  uuid: Scalars['UUID']['output']
}

export type HintType = {
  __typename?: 'HintType'
  packageName: Scalars['String']['output']
  repo: Scalars['String']['output']
  repoUrl: Scalars['String']['output']
}

export enum HttpFolderOrderByEnum {
  Name = 'Name'
}

export type IosAppAssetHistoryInstanceType = {
  __typename?: 'IOSAppAssetHistoryInstanceType'
  appPermissions: Array<IosAppPermissionType>
  createdTime?: Maybe<Scalars['DateTime']['output']>
  features: Array<IosAppFeaturesType>
  fingerprints: Array<IosAppFingerprintType>
  id: Scalars['ID']['output']
  iosBackendLinks: Array<IosBackendLinkType>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  scanId: Scalars['Int']['output']
}

export type IosAppAssetHistoryInstancesType = {
  __typename?: 'IOSAppAssetHistoryInstancesType'
  historyInstances: Array<Maybe<IosAppAssetHistoryInstanceType>>
  pageInfo?: Maybe<PageInfo>
}

export type IosAppFeaturesType = {
  __typename?: 'IOSAppFeaturesType'
  createdTime?: Maybe<Scalars['DateTime']['output']>
  description?: Maybe<Scalars['String']['output']>
  detail?: Maybe<Scalars['String']['output']>
  historyInstance?: Maybe<IosAppAssetHistoryInstanceType>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  name?: Maybe<FeaturesNamesTypeEnum>
}

export type IosAppFingerprintType = {
  __typename?: 'IOSAppFingerprintType'
  createdTime?: Maybe<Scalars['DateTime']['output']>
  detail?: Maybe<Scalars['String']['output']>
  fingerprintType?: Maybe<MobileAppFingerprintTypeEnum>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  name: Scalars['String']['output']
  version?: Maybe<Scalars['String']['output']>
}

export type IosAppPermissionType = {
  __typename?: 'IOSAppPermissionType'
  createdTime?: Maybe<Scalars['DateTime']['output']>
  historyInstance?: Maybe<IosAppAssetHistoryInstanceType>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  name?: Maybe<Scalars['String']['output']>
  usageDescription?: Maybe<Scalars['String']['output']>
}

export type IosAssetType = {
  __typename?: 'IOSAssetType'
  fileAssets: Array<IosFileAssetType>
  icon?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  packageName: Scalars['String']['output']
  scans?: Maybe<Array<Maybe<ScanType>>>
  storeAssets: Array<IosStoreAssetType>
  tags?: Maybe<Array<Maybe<TagsType>>>
}

export type IosAssetTypeScansArgs = {
  lastOnly?: InputMaybe<Scalars['Boolean']['input']>
}

export type IosBackendLinkType = {
  __typename?: 'IOSBackendLinkType'
  historyInstance?: Maybe<IosAppAssetHistoryInstanceType>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  host: Scalars['String']['output']
  iosIpLocations: Array<IosipLocationType>
  path?: Maybe<Scalars['String']['output']>
  port?: Maybe<Scalars['Int']['output']>
}

export type IosFileAssetInputType = {
  file?: InputMaybe<Scalars['Upload']['input']>
}

export type IosFileAssetType = {
  __typename?: 'IOSFileAssetType'
  file?: Maybe<Scalars['Upload']['output']>
  id: Scalars['ID']['output']
  scans?: Maybe<Array<Maybe<ScanType>>>
  tags?: Maybe<Array<Maybe<TagsType>>>
}

export type IosFileAssetTypeScansArgs = {
  lastOnly?: InputMaybe<Scalars['Boolean']['input']>
}

export type IosipLocationType = {
  __typename?: 'IOSIPLocationType'
  city?: Maybe<Scalars['String']['output']>
  continent?: Maybe<Scalars['String']['output']>
  continentCode?: Maybe<Scalars['String']['output']>
  country?: Maybe<Scalars['String']['output']>
  countryCode?: Maybe<Scalars['String']['output']>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  iosBackendLink?: Maybe<IosBackendLinkType>
  ipAddress: Scalars['String']['output']
  latitude?: Maybe<Scalars['Float']['output']>
  longitude?: Maybe<Scalars['Float']['output']>
  region?: Maybe<Scalars['String']['output']>
  regionName?: Maybe<Scalars['String']['output']>
  timezone?: Maybe<Scalars['String']['output']>
  version?: Maybe<Scalars['Int']['output']>
  zipCode?: Maybe<Scalars['String']['output']>
}

export type IosStoreAssetInputType = {
  applicationName?: InputMaybe<Scalars['String']['input']>
  packageName?: InputMaybe<Scalars['String']['input']>
}

export type IosStoreAssetType = {
  __typename?: 'IOSStoreAssetType'
  applicationName: Scalars['String']['output']
  icon?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  packageName: Scalars['String']['output']
  scans?: Maybe<Array<Maybe<ScanType>>>
  tags?: Maybe<Array<Maybe<TagsType>>>
}

export type IosStoreAssetTypeScansArgs = {
  lastOnly?: InputMaybe<Scalars['Boolean']['input']>
}

export type IpAssetInputType = {
  host?: InputMaybe<Scalars['String']['input']>
  mask?: InputMaybe<Scalars['String']['input']>
  version?: InputMaybe<Scalars['Int']['input']>
}

export type IPv4AssetHistoryInstanceType = {
  __typename?: 'IPv4AssetHistoryInstanceType'
  createdTime?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['ID']['output']
  ipv4Geolocations: Array<IPv4GeolocationType>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  scanId: Scalars['Int']['output']
  services: Array<IPv4ServiceType>
  whoisRecords: Array<IPv4WhoisType>
}

export type IPv4AssetHistoryInstancesType = {
  __typename?: 'IPv4AssetHistoryInstancesType'
  historyInstances: Array<Maybe<IPv4AssetHistoryInstanceType>>
  pageInfo?: Maybe<PageInfo>
}

export type IPv4AssetInputType = {
  host?: InputMaybe<Scalars['String']['input']>
  mask?: InputMaybe<Scalars['String']['input']>
  version?: InputMaybe<Scalars['Int']['input']>
}

export type IPv4FingerprintType = {
  __typename?: 'IPv4FingerprintType'
  createdTime?: Maybe<Scalars['DateTime']['output']>
  detail?: Maybe<Scalars['String']['output']>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  name?: Maybe<Scalars['String']['output']>
  version: Scalars['String']['output']
}

export type IPv4GeolocationType = {
  __typename?: 'IPv4GeolocationType'
  city?: Maybe<Scalars['String']['output']>
  continent?: Maybe<Scalars['String']['output']>
  continentCode?: Maybe<Scalars['String']['output']>
  country?: Maybe<Scalars['String']['output']>
  countryCode?: Maybe<Scalars['String']['output']>
  createdTime?: Maybe<Scalars['DateTime']['output']>
  district?: Maybe<Scalars['String']['output']>
  historyInstance?: Maybe<IPv4AssetHistoryInstanceType>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  id: Scalars['ID']['output']
  latitude?: Maybe<Scalars['Float']['output']>
  longitude?: Maybe<Scalars['Float']['output']>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  region?: Maybe<Scalars['String']['output']>
  regionName?: Maybe<Scalars['String']['output']>
  timezone?: Maybe<Scalars['String']['output']>
  zipCode?: Maybe<Scalars['String']['output']>
}

export type IPv4ServiceCertificateChainType = {
  __typename?: 'IPv4ServiceCertificateChainType'
  certificates: Array<IPv4X509CertificateType>
}

export type IPv4ServiceType = {
  __typename?: 'IPv4ServiceType'
  certificates: Array<IPv4ServiceCertificateChainType>
  createdTime?: Maybe<Scalars['DateTime']['output']>
  fingerprints: Array<IPv4FingerprintType>
  historyInstance?: Maybe<IPv4AssetHistoryInstanceType>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  port?: Maybe<Scalars['Int']['output']>
  protocol?: Maybe<Scalars['String']['output']>
}

export type IPv4WhoisType = {
  __typename?: 'IPv4WhoisType'
  address?: Maybe<Scalars['String']['output']>
  createdTime?: Maybe<Scalars['DateTime']['output']>
  email?: Maybe<Scalars['String']['output']>
  historyInstance?: Maybe<IPv4AssetHistoryInstanceType>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  org?: Maybe<Scalars['String']['output']>
}

export type IPv4X509CertificateType = {
  __typename?: 'IPv4X509CertificateType'
  certificateChain: IPv4ServiceCertificateChainType
  chainIndex: Scalars['Int']['output']
  id: Scalars['ID']['output']
  issuer?: Maybe<Scalars['String']['output']>
  publicKeyAlgorithm?: Maybe<Scalars['String']['output']>
  publicKeyValue?: Maybe<Scalars['String']['output']>
  serialNumber?: Maybe<Scalars['String']['output']>
  sha256Fingerprint?: Maybe<Scalars['String']['output']>
  signatureAlgorithm?: Maybe<Scalars['String']['output']>
  signatureValue?: Maybe<Scalars['String']['output']>
  subject?: Maybe<Scalars['String']['output']>
  validityNotAfter?: Maybe<Scalars['DateTime']['output']>
  validityNotBefore?: Maybe<Scalars['DateTime']['output']>
  versionNumber?: Maybe<Scalars['Int']['output']>
}

export type IPv6AssetHistoryInstanceType = {
  __typename?: 'IPv6AssetHistoryInstanceType'
  createdTime?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['ID']['output']
  ipv6Geolocations: Array<IPv6GeolocationType>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  scanId: Scalars['Int']['output']
  services: Array<IPv6ServiceType>
  whoisRecords: Array<IPv6WhoisType>
}

export type IPv6AssetHistoryInstancesType = {
  __typename?: 'IPv6AssetHistoryInstancesType'
  historyInstances: Array<Maybe<IPv6AssetHistoryInstanceType>>
  pageInfo?: Maybe<PageInfo>
}

export type IPv6AssetInputType = {
  host?: InputMaybe<Scalars['String']['input']>
  mask?: InputMaybe<Scalars['String']['input']>
  version?: InputMaybe<Scalars['Int']['input']>
}

export type IPv6FingerprintType = {
  __typename?: 'IPv6FingerprintType'
  createdTime?: Maybe<Scalars['DateTime']['output']>
  detail?: Maybe<Scalars['String']['output']>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  name?: Maybe<Scalars['String']['output']>
  version: Scalars['String']['output']
}

export type IPv6GeolocationType = {
  __typename?: 'IPv6GeolocationType'
  city?: Maybe<Scalars['String']['output']>
  continent?: Maybe<Scalars['String']['output']>
  continentCode?: Maybe<Scalars['String']['output']>
  country?: Maybe<Scalars['String']['output']>
  countryCode?: Maybe<Scalars['String']['output']>
  createdTime?: Maybe<Scalars['DateTime']['output']>
  district?: Maybe<Scalars['String']['output']>
  historyInstance?: Maybe<IPv6AssetHistoryInstanceType>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  id: Scalars['ID']['output']
  latitude?: Maybe<Scalars['Float']['output']>
  longitude?: Maybe<Scalars['Float']['output']>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  region?: Maybe<Scalars['String']['output']>
  regionName?: Maybe<Scalars['String']['output']>
  timezone?: Maybe<Scalars['String']['output']>
  zipCode?: Maybe<Scalars['String']['output']>
}

export type IPv6ServiceCertificateChainType = {
  __typename?: 'IPv6ServiceCertificateChainType'
  certificates: Array<IPv6X509CertificateType>
}

export type IPv6ServiceType = {
  __typename?: 'IPv6ServiceType'
  certificates: Array<IPv6ServiceCertificateChainType>
  createdTime?: Maybe<Scalars['DateTime']['output']>
  fingerprints: Array<IPv6FingerprintType>
  historyInstance?: Maybe<IPv6AssetHistoryInstanceType>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  port?: Maybe<Scalars['Int']['output']>
  protocol?: Maybe<Scalars['String']['output']>
}

export type IPv6WhoisType = {
  __typename?: 'IPv6WhoisType'
  address?: Maybe<Scalars['String']['output']>
  createdTime?: Maybe<Scalars['DateTime']['output']>
  email?: Maybe<Scalars['String']['output']>
  historyInstance?: Maybe<IPv6AssetHistoryInstanceType>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  org?: Maybe<Scalars['String']['output']>
}

export type IPv6X509CertificateType = {
  __typename?: 'IPv6X509CertificateType'
  certificateChain: IPv6ServiceCertificateChainType
  chainIndex: Scalars['Int']['output']
  id: Scalars['ID']['output']
  issuer?: Maybe<Scalars['String']['output']>
  publicKeyAlgorithm?: Maybe<Scalars['String']['output']>
  publicKeyValue?: Maybe<Scalars['String']['output']>
  serialNumber?: Maybe<Scalars['String']['output']>
  sha256Fingerprint?: Maybe<Scalars['String']['output']>
  signatureAlgorithm?: Maybe<Scalars['String']['output']>
  signatureValue?: Maybe<Scalars['String']['output']>
  subject?: Maybe<Scalars['String']['output']>
  validityNotAfter?: Maybe<Scalars['DateTime']['output']>
  validityNotBefore?: Maybe<Scalars['DateTime']['output']>
  versionNumber?: Maybe<Scalars['Int']['output']>
}

export type IdeFileType = {
  __typename?: 'IdeFileType'
  cast?: Maybe<FileTypeCast>
  dna?: Maybe<Scalars['String']['output']>
  elf?: Maybe<ElfFileType>
  id: Scalars['ID']['output']
  path: Scalars['String']['output']
  size?: Maybe<Scalars['Int']['output']>
  type?: Maybe<Scalars['String']['output']>
  version?: Maybe<Scalars['Int']['output']>
}

export type IdeFilesType = {
  __typename?: 'IdeFilesType'
  files: Array<Maybe<IdeFileType>>
  pageInfo?: Maybe<PageInfo>
}

export type IdeFunctionType = {
  __typename?: 'IdeFunctionType'
  className?: Maybe<Scalars['String']['output']>
  cpuSubtype?: Maybe<Scalars['String']['output']>
  cpuType?: Maybe<Scalars['String']['output']>
  deprecated: Scalars['Boolean']['output']
  description?: Maybe<Scalars['String']['output']>
  /** external function, like JNI for java, native javascript for JS, etc */
  extern?: Maybe<FunctionExtern>
  id: Scalars['ID']['output']
  inputs?: Maybe<Array<Scalars['String']['output']>>
  name: Scalars['String']['output']
  packageName?: Maybe<Scalars['String']['output']>
  path?: Maybe<Scalars['String']['output']>
  persistRead?: Maybe<Array<Scalars['String']['output']>>
  persistWrite?: Maybe<Array<Scalars['String']['output']>>
  privacySources?: Maybe<Array<Scalars['String']['output']>>
  refs?: Maybe<Array<Maybe<IdeFunctionType>>>
  sanitizers?: Maybe<Array<Scalars['String']['output']>>
  signature?: Maybe<Scalars['String']['output']>
  sinks?: Maybe<Array<Scalars['String']['output']>>
  sources?: Maybe<Array<Scalars['String']['output']>>
  type: FunctionType
  xrefs?: Maybe<Array<Maybe<IdeFunctionType>>>
}

export type IdeFunctionsType = {
  __typename?: 'IdeFunctionsType'
  functions: Array<Maybe<IdeFunctionType>>
  pageInfo?: Maybe<PageInfo>
}

export type IdeLogType = {
  __typename?: 'IdeLogType'
  content: Scalars['String']['output']
  createdTime: Scalars['DateTime']['output']
  deviceId?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  scan: ScanType
}

export type IdeLogsType = {
  __typename?: 'IdeLogsType'
  logs: Array<Maybe<IdeLogType>>
  pageInfo?: Maybe<PageInfo>
}

export type ImportScanMutation = {
  __typename?: 'ImportScanMutation'
  job?: Maybe<Job>
}

export type InvitationModelType = {
  __typename?: 'InvitationModelType'
  accepted?: Maybe<Scalars['Boolean']['output']>
  createdTime: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  invitee: Scalars['String']['output']
  inviter?: Maybe<OrganisationUserType>
  organisation: OrganisationType
  status?: Maybe<Scalars['String']['output']>
}

export type InvitationsType = {
  __typename?: 'InvitationsType'
  invitations: Array<Maybe<InvitationModelType>>
  pageInfo?: Maybe<PageInfo>
}

export type InvoiceType = {
  __typename?: 'InvoiceType'
  currency?: Maybe<Scalars['String']['output']>
  identifier?: Maybe<Scalars['String']['output']>
  pdfUrl?: Maybe<Scalars['String']['output']>
  periodEnd?: Maybe<Scalars['DateTime']['output']>
  periodStart?: Maybe<Scalars['DateTime']['output']>
  quantity?: Maybe<Scalars['String']['output']>
  status?: Maybe<Scalars['String']['output']>
  total?: Maybe<Scalars['String']['output']>
}

export type JavascriptFileType = {
  __typename?: 'JavascriptFileType'
  dna?: Maybe<Scalars['String']['output']>
  formattedJavascript?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  path?: Maybe<Scalars['String']['output']>
  version?: Maybe<Scalars['Int']['output']>
}

export type JiraFieldMapping = {
  __typename?: 'JiraFieldMapping'
  id: Scalars['ID']['output']
  jiraField: Scalars['String']['output']
  jiraFieldId: Scalars['String']['output']
  mappingType?: Maybe<Scalars['String']['output']>
  mappingValue: Scalars['String']['output']
}

export type JiraFieldMappingInputType = {
  jiraField: Scalars['String']['input']
  jiraFieldId: Scalars['String']['input']
  mappingType: Scalars['String']['input']
  mappingValue: Scalars['String']['input']
}

export type JiraFieldType = {
  __typename?: 'JiraFieldType'
  id?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
}

export type JiraIntegrationConfiguration = {
  __typename?: 'JiraIntegrationConfiguration'
  apiKey?: Maybe<Scalars['String']['output']>
  createMode: JiraIntegrationConfigurationCreateMode
  enabled: Scalars['Boolean']['output']
  fieldsMapping?: Maybe<Array<Maybe<JiraFieldMapping>>>
  id: Scalars['ID']['output']
  issueTypeId?: Maybe<Scalars['String']['output']>
  jiraProjectKey?: Maybe<Scalars['String']['output']>
  jiraSyncRiskRatings?: Maybe<Array<Scalars['String']['output']>>
  organisation?: Maybe<OrganisationType>
  syncFields?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  syncMode: JiraIntegrationConfigurationSyncMode
  updateMode: JiraIntegrationConfigurationUpdateMode
  username?: Maybe<Scalars['String']['output']>
  workspaceUrl?: Maybe<Scalars['String']['output']>
}

export enum JiraIntegrationConfigurationCreateMode {
  /** Automatic */
  Automatic = 'AUTOMATIC',
  /** On demand */
  OnDemand = 'ON_DEMAND',
  /** Passive */
  Passive = 'PASSIVE'
}

export enum JiraIntegrationConfigurationSyncMode {
  /** Automatic */
  Automatic = 'AUTOMATIC',
  /** Passive */
  Passive = 'PASSIVE'
}

export enum JiraIntegrationConfigurationUpdateMode {
  /** Automatic */
  Automatic = 'AUTOMATIC',
  /** Passive */
  Passive = 'PASSIVE'
}

export type JiraIntegrationInput = {
  apiKey?: InputMaybe<Scalars['String']['input']>
  createMode?: InputMaybe<CreateModeEnum>
  enabled?: InputMaybe<Scalars['Boolean']['input']>
  issueTypeId?: InputMaybe<Scalars['String']['input']>
  jiraFieldsMapping?: InputMaybe<Array<InputMaybe<JiraFieldMappingInputType>>>
  jiraProjectKey: Scalars['String']['input']
  jiraSyncRiskRatings?: InputMaybe<Array<InputMaybe<JiraRiskRating>>>
  syncFields?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  syncMode?: InputMaybe<SyncModeEnum>
  updateExistingTicketMap?: InputMaybe<Scalars['Boolean']['input']>
  updateMode?: InputMaybe<UpdateModeEnum>
  username: Scalars['String']['input']
  workspaceUrl: Scalars['String']['input']
}

export type JiraIssueTypeType = {
  __typename?: 'JiraIssueTypeType'
  id?: Maybe<Scalars['Int']['output']>
  name?: Maybe<Scalars['String']['output']>
}

export type JiraProjectType = {
  __typename?: 'JiraProjectType'
  fields: Array<Maybe<JiraFieldType>>
  issueTypes: Array<Maybe<JiraIssueTypeType>>
  key?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
}

export type JiraProjectsType = {
  __typename?: 'JiraProjectsType'
  projects: Array<Maybe<JiraProjectType>>
}

export enum JiraRiskRating {
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

export type JiraTestType = {
  __typename?: 'JiraTestType'
  name?: Maybe<Scalars['String']['output']>
  response?: Maybe<Scalars['String']['output']>
  success?: Maybe<Scalars['Boolean']['output']>
}

export type JiraTestsType = {
  __typename?: 'JiraTestsType'
  tests: Array<Maybe<JiraTestType>>
}

export type JiraTicketMapInput = {
  issueTypeId?: InputMaybe<Scalars['String']['input']>
  jiraFieldsMapping?: InputMaybe<Array<InputMaybe<JiraFieldMappingInputType>>>
  jiraProjectKey?: InputMaybe<Scalars['String']['input']>
  jiraTicketKey?: InputMaybe<Scalars['String']['input']>
  syncFields?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  syncMode?: InputMaybe<SyncModeEnum>
  updateMode?: InputMaybe<UpdateModeEnum>
  workspaceUrl?: InputMaybe<Scalars['String']['input']>
}

export enum JiraTicketMapSyncMode {
  /** Automatic */
  Automatic = 'AUTOMATIC',
  /** Passive */
  Passive = 'PASSIVE'
}

export type JiraTicketMapType = {
  __typename?: 'JiraTicketMapType'
  id: Scalars['ID']['output']
  jiraProjectKey?: Maybe<Scalars['String']['output']>
  jiraTicketKey?: Maybe<Scalars['String']['output']>
  syncFields?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  syncMode?: Maybe<JiraTicketMapSyncMode>
  ticket?: Maybe<TicketType>
  updateMode?: Maybe<JiraTicketMapUpdateMode>
  workspaceUrl?: Maybe<Scalars['String']['output']>
}

export enum JiraTicketMapUpdateMode {
  /** Automatic */
  Automatic = 'AUTOMATIC',
  /** Passive */
  Passive = 'PASSIVE'
}

export type Job = {
  __typename?: 'Job'
  id?: Maybe<Scalars['String']['output']>
  status?: Maybe<Scalars['String']['output']>
}

export type KbCategory = {
  __typename?: 'KBCategory'
  description?: Maybe<Scalars['String']['output']>
  group?: Maybe<Scalars['String']['output']>
  kbVulnerabilities?: Maybe<Array<Maybe<AggregatedKnowledgeBaseVulnerabilityType>>>
  key?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
}

export type KbCategoryGroup = {
  __typename?: 'KBCategoryGroup'
  categories?: Maybe<Array<Maybe<KbCategory>>>
  description?: Maybe<Scalars['String']['output']>
  key?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  status?: Maybe<Scalars['String']['output']>
}

export type KnowledgeBaseReferenceType = {
  __typename?: 'KnowledgeBaseReferenceType'
  id: Scalars['ID']['output']
  title: Scalars['String']['output']
  url: Scalars['String']['output']
}

export type KnowledgeBaseReferenceTypeInput = {
  title?: InputMaybe<Scalars['String']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

export enum KnowledgeBaseVulnerabilityDescriptionFormat {
  /** HTML */
  Html = 'HTML',
  /** Markdown */
  Markdown = 'MARKDOWN'
}

export type KnowledgeBaseVulnerabilityInputType = {
  categoryGroups?: InputMaybe<Array<InputMaybe<CategoryGroupsInputType>>>
  cvssV3Vector?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  descriptionFormat?: InputMaybe<TextFormats>
  hasPublicExploit?: InputMaybe<Scalars['Boolean']['input']>
  privacyIssue?: InputMaybe<Scalars['Boolean']['input']>
  recommendation?: InputMaybe<Scalars['String']['input']>
  recommendationFormat?: InputMaybe<TextFormats>
  references?: InputMaybe<Array<InputMaybe<KnowledgeBaseReferenceTypeInput>>>
  riskRating?: InputMaybe<Scalars['String']['input']>
  securityIssue?: InputMaybe<Scalars['Boolean']['input']>
  shortDescription?: InputMaybe<Scalars['String']['input']>
  shortDescriptionFormat?: InputMaybe<TextFormats>
  targetedByMalware?: InputMaybe<Scalars['Boolean']['input']>
  targetedByNationState?: InputMaybe<Scalars['Boolean']['input']>
  targetedByRansomware?: InputMaybe<Scalars['Boolean']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export enum KnowledgeBaseVulnerabilityRecommendationFormat {
  /** HTML */
  Html = 'HTML',
  /** Markdown */
  Markdown = 'MARKDOWN'
}

export enum KnowledgeBaseVulnerabilityRiskRating {
  /** Critical */
  Critical = 'CRITICAL',
  /** Hardening */
  Hardening = 'HARDENING',
  /** High */
  High = 'HIGH',
  /** Important */
  Important = 'IMPORTANT',
  /** Info */
  Info = 'INFO',
  /** Low */
  Low = 'LOW',
  /** Medium */
  Medium = 'MEDIUM',
  /** Potentially */
  Potentially = 'POTENTIALLY',
  /** Secure */
  Secure = 'SECURE'
}

export enum KnowledgeBaseVulnerabilityShortDescriptionFormat {
  /** HTML */
  Html = 'HTML',
  /** Markdown */
  Markdown = 'MARKDOWN'
}

export type KnowledgeBaseVulnerabilityType = {
  __typename?: 'KnowledgeBaseVulnerabilityType'
  context?: Maybe<Scalars['String']['output']>
  cvssV3BaseScore?: Maybe<Scalars['Float']['output']>
  cvssV3Vector?: Maybe<Scalars['String']['output']>
  description: Scalars['String']['output']
  descriptionFormat: KnowledgeBaseVulnerabilityDescriptionFormat
  hasPublicExploit: Scalars['Boolean']['output']
  id: Scalars['ID']['output']
  privacyIssue: Scalars['Boolean']['output']
  recommendation: Scalars['String']['output']
  recommendationFormat: KnowledgeBaseVulnerabilityRecommendationFormat
  references: Array<KnowledgeBaseReferenceType>
  riskRating: KnowledgeBaseVulnerabilityRiskRating
  securityIssue: Scalars['Boolean']['output']
  shortDescription: Scalars['String']['output']
  shortDescriptionFormat: KnowledgeBaseVulnerabilityShortDescriptionFormat
  targetedByMalware: Scalars['Boolean']['output']
  targetedByNationState: Scalars['Boolean']['output']
  targetedByRansomware: Scalars['Boolean']['output']
  title: Scalars['String']['output']
}

export type LeaveOrganisation = {
  __typename?: 'LeaveOrganisation'
  result?: Maybe<Scalars['Boolean']['output']>
}

export type LoginPasswordTestCredentials = {
  __typename?: 'LoginPasswordTestCredentials'
  credentialName?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  login?: Maybe<Scalars['String']['output']>
  password?: Maybe<Scalars['String']['output']>
  role?: Maybe<Scalars['String']['output']>
  type: LoginPasswordTestCredentialsType
  url?: Maybe<Scalars['String']['output']>
}

export type LoginPasswordTestCredentialsInput = {
  login?: InputMaybe<Scalars['String']['input']>
  password?: InputMaybe<Scalars['String']['input']>
  role?: InputMaybe<Scalars['String']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

export type LoginPasswordTestCredentialsInstance = {
  __typename?: 'LoginPasswordTestCredentialsInstance'
  credentialName?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  login?: Maybe<Scalars['String']['output']>
  password?: Maybe<Scalars['String']['output']>
  role?: Maybe<Scalars['String']['output']>
  type: LoginPasswordTestCredentialsInstanceType
  url?: Maybe<Scalars['String']['output']>
}

export enum LoginPasswordTestCredentialsInstanceType {
  /** Custom Form */
  CustomForm = 'CUSTOM_FORM'
}

export enum LoginPasswordTestCredentialsType {
  /** Custom Form */
  CustomForm = 'CUSTOM_FORM'
}

export type LogoutUser = {
  __typename?: 'LogoutUser'
  message?: Maybe<Scalars['String']['output']>
}

export type MachoClassType = {
  __typename?: 'MachoClassType'
  address?: Maybe<Scalars['String']['output']>
  dna?: Maybe<Scalars['String']['output']>
  fields?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  index?: Maybe<Scalars['String']['output']>
  methods?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  path?: Maybe<Scalars['String']['output']>
  version?: Maybe<Scalars['Int']['output']>
}

export type MachoClassesType = {
  __typename?: 'MachoClassesType'
  classes: Array<Maybe<MachoClassType>>
  pageInfo: PageInfo
}

export type MachoFileType = {
  __typename?: 'MachoFileType'
  classes?: Maybe<MachoClassesType>
  cpuSubtype?: Maybe<Scalars['String']['output']>
  cpuType?: Maybe<Scalars['String']['output']>
  dna?: Maybe<Scalars['String']['output']>
  functions?: Maybe<MachoFunctionsType>
  id: Scalars['ID']['output']
  strings?: Maybe<MachoStringsType>
  version?: Maybe<Scalars['Int']['output']>
}

export type MachoFileTypeClassesArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type MachoFileTypeFunctionsArgs = {
  name?: InputMaybe<Scalars['String']['input']>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type MachoFileTypeStringsArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type MachoFunctionType = {
  __typename?: 'MachoFunctionType'
  address?: Maybe<Scalars['String']['output']>
  dna?: Maybe<Scalars['String']['output']>
  formattedDisassembly?: Maybe<Scalars['String']['output']>
  formattedSourceCode?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  path?: Maybe<Scalars['String']['output']>
  version?: Maybe<Scalars['Int']['output']>
}

export type MachoFunctionsType = {
  __typename?: 'MachoFunctionsType'
  functions: Array<Maybe<MachoFunctionType>>
  pageInfo: PageInfo
}

export type MachoStringType = {
  __typename?: 'MachoStringType'
  dna?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  path?: Maybe<Scalars['String']['output']>
  physicalAddress?: Maybe<Scalars['String']['output']>
  section?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
  value?: Maybe<Scalars['String']['output']>
  version?: Maybe<Scalars['Int']['output']>
  virtualAddress?: Maybe<Scalars['String']['output']>
}

export type MachoStringsType = {
  __typename?: 'MachoStringsType'
  pageInfo: PageInfo
  strings: Array<Maybe<MachoStringType>>
}

export type MachosFileType = {
  __typename?: 'MachosFileType'
  machos: Array<Maybe<MachoFileType>>
}

export type MapInput = {
  name: Scalars['String']['input']
  value?: InputMaybe<Scalars['String']['input']>
}

export type MapInputType = {
  name: Scalars['String']['input']
  value?: InputMaybe<Scalars['String']['input']>
}

export enum MetadataType {
  CodeLocation = 'CODE_LOCATION',
  FilePath = 'FILE_PATH',
  Port = 'PORT',
  Url = 'URL'
}

export type MetricValueType = {
  __typename?: 'MetricValueType'
  key: Scalars['String']['output']
  time?: Maybe<Scalars['DateTime']['output']>
  value: Scalars['Float']['output']
}

export enum MobileAppFingerprintTypeEnum {
  BackendComponent = 'BACKEND_COMPONENT',
  CordovaFramework = 'CORDOVA_FRAMEWORK',
  DotnetFramework = 'DOTNET_FRAMEWORK',
  ElfLibrary = 'ELF_LIBRARY',
  FlutterFramework = 'FLUTTER_FRAMEWORK',
  IosFramework = 'IOS_FRAMEWORK',
  JavascriptLibrary = 'JAVASCRIPT_LIBRARY',
  JavaLibrary = 'JAVA_LIBRARY',
  MachoLibrary = 'MACHO_LIBRARY',
  PeLibrary = 'PE_LIBRARY',
  ProgrammingLanguage = 'PROGRAMMING_LANGUAGE'
}

export type MobileFileScanMutation = {
  __typename?: 'MobileFileScanMutation'
  scan?: Maybe<ScanType>
}

export enum MobilePlatform {
  Android = 'ANDROID',
  Ios = 'IOS'
}

export type MobileStoreScanMutation = {
  __typename?: 'MobileStoreScanMutation'
  scan?: Maybe<ScanType>
}

export type MutableAssetInputType = {
  tags?: InputMaybe<Array<InputMaybe<TagsInputType>>>
}

export type Mutations = {
  __typename?: 'Mutations'
  /** Acknowledge notifications. */
  ackNotifications?: Maybe<AckNotificationsMutation>
  /** Add checklist to Ticket */
  addChecklist?: Maybe<AddChecklistMutation>
  /** Add a Comment */
  addComment?: Maybe<AddCommentMutation>
  addResponse?: Maybe<AddResponse>
  /** Create an Onpremise scanner. */
  addScanner?: Maybe<AddScannerMutation>
  /** Grant scanner-access to child-organisations. */
  addScannerAccess?: Maybe<AddScannerAccessMutation>
  /** add scanner state */
  addScannerState?: Maybe<AddScannerStateMutation>
  /** Create a Ticket */
  addTicket?: Maybe<AddTicketMutation>
  addTotpDevice?: Maybe<AddTotpDevice>
  /** Add user to organisation, user must have an account */
  addUserOrganisation?: Maybe<AddUserOrganisation>
  /** Add vulnerabilities to scan. */
  addVulnerabilities?: Maybe<AddVulnerabilitiesMutation>
  /** Archive Agent */
  archiveAgent?: Maybe<ArchiveAgentMutation>
  /** Archive Agent Group */
  archiveAgentGroup?: Maybe<ArchiveAgentGroupMutation>
  /** Archive organisation */
  archiveOrganisation?: Maybe<ArchiveOrganisation>
  /** Archive scan. */
  archiveScan?: Maybe<ArchiveScanMutation>
  /** Bulk update new generation assets */
  bulkCsvCreateOrUpdateNgAssets?: Maybe<BulkCsvCreateOrUpdateNgAssetsMutation>
  /** Cancel Subscription */
  cancelSubscription?: Maybe<CancelSubscriptionMutation>
  /** change current password. */
  changePassword?: Maybe<ChangePasswordMutation>
  /** Compute potential assets. */
  computePotentialAssets?: Maybe<ComputePotentialAssetsMutation>
  /** Update jira configuration */
  configureJiraIntegration?: Maybe<ConfigureJiraIntegrationMutation>
  confirmTotpDevice?: Maybe<ConfirmTotpDevice>
  /** Creates scan, with agent group, for an asset. */
  createAgentScan?: Maybe<CreateAgentScanMutation>
  /** Create Api Key. */
  createApiKey?: Maybe<CreateApiKey>
  /** Create AppCenter Integration */
  createAppCenterIntegration?: Maybe<CreateAppCenterIntegrationMutation>
  createApplication?: Maybe<CreateApplicationMutation>
  createApplicationFromRepo?: Maybe<CreateApplicationFromRepoMutation>
  /** Create new asset */
  createAsset?: Maybe<CreateAssetMutation>
  /** Create new asset locations. */
  createAssetLocation?: Maybe<CreateAssetsLocationMutation>
  /** Creates a custom autodiscovery scan. */
  createAutodiscoveryScan?: Maybe<CreateCustomAutodiscoveryScanMutation>
  createCronScheduleRuleByListNgAssets?: Maybe<CreateCronScheduleRuleListNgAssetsMutation>
  /** Create jira ticket */
  createJiraTicket?: Maybe<CreateJiraTicketMutation>
  /** Create jira ticket map */
  createJiraTicketMap?: Maybe<CreateJiraTicketMapMutation>
  /** Creates and schedules a Mobile scan (Android, iOS), use the scan id to retrieve the scan progress. */
  createMobileScan?: Maybe<MobileFileScanMutation>
  /** Creates and schedules a Mobile scan from the Store(Android, iOS), use the scan id to retrieve the scan progress. */
  createMobileStoreScan?: Maybe<MobileStoreScanMutation>
  /** Creates and schedules a Network scan, use the scan id to retrieve the scan progress. */
  createNetworkScan?: Maybe<NetworkScanMutation>
  /** Create new assets (new generation) */
  createNgAssets?: Maybe<CreateNgAssetsMutation>
  /** Create new organisation */
  createOrganisation?: Maybe<CreateOrganisation>
  createOve?: Maybe<CreateOveMutation>
  /** Create new team in you org. */
  createOwner?: Maybe<CreateOwnerMutation>
  /** Create new Plan */
  createPlan?: Maybe<CreatePlanMutation>
  /** Create a rule with filters & actions. */
  createRule?: Maybe<CreateRuleMutation>
  /** Create Saml integration config */
  createSamlIntegrationConfiguration?: Maybe<CreateSamlIntegrationConfigurationMutation>
  /** Create on-premise scan. */
  createScan?: Maybe<CreateOnPremScanMutation>
  /** Create a scan summary with the help of AI. */
  createScanSummary?: Maybe<CreateScanSummaryMutation>
  createScheduleRuleByListAssets?: Maybe<CreateContinuousScheduleRuleListAssetsMutation>
  createScheduleRuleByListNgAssets?: Maybe<CreateContinuousScheduleRuleListNgAssetsMutation>
  createSharedAccessTemporaryToken?: Maybe<CreateSharedAccessTemporaryToken>
  createSharedAccessToken?: Maybe<CreateSharedAccessToken>
  /** Create new test credentials. */
  createTestCredentials?: Maybe<CreateTestCredentialsMutation>
  /** Creates and schedules a Web scan, use the scan id to retrieve the scan progress. */
  createWebScan?: Maybe<WebScanMutation>
  /** update some vulnerabilities fields. */
  customizeVulnerabilities?: Maybe<CustomizeVulnerabilitiesMutation>
  /** Delete AppCenter Integration */
  deleteAppCenterIntegration?: Maybe<DeleteAppCenterIntegrationMutation>
  deleteApplication?: Maybe<DeleteApplicationMutation>
  /** Delete asset */
  deleteAsset?: Maybe<DeleteAssetMutation>
  /** Delete asset locations. */
  deleteAssetLocation?: Maybe<DeleteAssetsLocationMutation>
  /** delete checklist */
  deleteChecklist?: Maybe<DeleteChecklistMutation>
  /** Delete a Comment */
  deleteComment?: Maybe<DeleteCommentMutation>
  /** Delete jira ticket map */
  deleteJiraTicketMap?: Maybe<DeleteJiraTicketMapMutation>
  /** Delete ng asset */
  deleteNgAsset?: Maybe<DeleteNgAssetMutation>
  /** Delete owner. */
  deleteOwner?: Maybe<DeleteOwnerMutation>
  /** Delete a rule with its filters & actions. */
  deleteRule?: Maybe<DeleteRuleMutation>
  /** Delete scanner. */
  deleteScanner?: Maybe<DeleteScannerMutation>
  /** Remove scanner-access to child-organisations. */
  deleteScannerAccess?: Maybe<DeleteScannerAccessMutation>
  deleteScheduleRule?: Maybe<DeleteScheduleMutation>
  deleteTarget?: Maybe<DeleteTargetMutation>
  /** Delete test credentials. */
  deleteTestCredentials?: Maybe<DeleteTestCredentialsMutation>
  /** Delete a Ticket */
  deleteTicket?: Maybe<DeleteTicketMutation>
  deleteTotpDevice?: Maybe<DeleteTotpDevice>
  disableScheduleRule?: Maybe<DisableScheduleMutation>
  duplicateTarget?: Maybe<DuplicateTargetMutation>
  enableScheduleRule?: Maybe<EnableScheduleMutation>
  /** Execute a rule: Match using the filter & execute the action. */
  executeRule?: Maybe<ExecuteRuleMutation>
  /** Export assets to CSV. */
  exportAssets?: Maybe<ExportAssetsMutation>
  /** Export Mobile scan. */
  exportScan?: Maybe<ExportScanMutation>
  /** Export tickets into a CSV. */
  exportTickets?: Maybe<ExportTicketsMutation>
  /** Export scan vulnerabilities. */
  exportVulnerabilities?: Maybe<ExportVulnerabilitiesMutation>
  /** Generate PDF scan report. */
  generatePdf?: Maybe<GeneratePdfMutation>
  /** Import Mobile scan. */
  importScan?: Maybe<ImportScanMutation>
  /** Leave organisation */
  leaveOrganisation?: Maybe<LeaveOrganisation>
  /** Logout user */
  logout?: Maybe<LogoutUser>
  /** Publish an agent to the store */
  publishAgent?: Maybe<PublishAgentMutation>
  /** Publish an agent group to the store */
  publishAgentGroup?: Maybe<PublishAgentGroupMutation>
  regenerateStaticTokens?: Maybe<RegenerateStaticTokens>
  /** Review users invitations */
  reviewInvitation?: Maybe<ReviewInvitation>
  /** Revoke Api Key. */
  revokeApiKey?: Maybe<RevokeApiKey>
  revokeSharedAccessToken?: Maybe<RevokeSharedAccessToken>
  /** Revoke user access to organisation */
  revokeUserOrganisation?: Maybe<RevokeUserOrganisation>
  /** Send contact messages. */
  sendContactMessage?: Maybe<SendContactMessageMutation>
  /** Send contact messages. */
  sendRequestFeedbackMessage?: Maybe<SendRequestFeedbackMessageMutation>
  /** Inject asset into auto-discovery universe. */
  startAssetDiscovery?: Maybe<StartAssetDiscoveryMutation>
  /** Start Agent Build */
  startBuildAgent?: Maybe<StartBuildAgentMutation>
  /** Stops running scan, scan is marked as stopped once the engine has completed cancellation. */
  stopScan?: Maybe<StopScanMutation>
  /** Switch active organisation */
  switchOrganisation?: Maybe<SwitchOrganisation>
  /** Transfer Subscription */
  transferPlan?: Maybe<TransferPlanMutation>
  /** Update the active scan summary. */
  updateActiveScanSummary?: Maybe<UpdateActiveScanSummaryMutation>
  /** Update Agent */
  updateAgent?: Maybe<UpdateAgentMutation>
  /** Update Agent Group */
  updateAgentGroup?: Maybe<UpdateAgentGroupMutation>
  /** Update Api Key. */
  updateApiKey?: Maybe<UpdateApiKey>
  /** Update AppCenter Integration */
  updateAppCenterIntegration?: Maybe<UpdateAppCenterIntegrationMutation>
  /** Update asset mutable properties. The only mutable properties of an asset at the moment are tags. All other attributes are what uniquely defines the asset and cannot be modified. */
  updateAsset?: Maybe<UpdateAssetMutation>
  /** Update asset locations. */
  updateAssetLocation?: Maybe<UpdateAssetsLocationMutation>
  /** update checklist */
  updateChecklist?: Maybe<UpdateChecklistMutation>
  /** Update a Comment */
  updateComment?: Maybe<UpdateCommentMutation>
  /** Update jira ticket map */
  updateJiraTicketMap?: Maybe<UpdateJiraTicketMapMutation>
  /** Bulk update new generation assets */
  updateNgAssets?: Maybe<UpdateNgAssetsMutation>
  /** Update Onboarding Task Completion State. */
  updateOnboardingTaskCompletionState?: Maybe<UpdateOnboardingTaskCompletionState>
  /** Update organisation level settings */
  updateOrganisationSettings?: Maybe<UpdateOrganisationSettings>
  /** Update Organisation User information. */
  updateOrganisationUser?: Maybe<UpdateOrganisationUser>
  /** Update owner. */
  updateOwner?: Maybe<UpdateOwnerMutation>
  /** Update potential nodes. */
  updatePotentialNodes?: Maybe<UpdatePotentialNodesMutation>
  /** Update ticket priority SLO */
  updatePrioritySlo?: Maybe<UpdatePrioritySloMutation>
  /** Update attributes of a rule or its filters & actions. */
  updateRule?: Maybe<UpdateRuleMutation>
  /** Update Saml Integration Configuration. */
  updateSamlIntegrationConfiguration?: Maybe<UpdateSamlIntegrationConfigurationMutation>
  /** Update status of a scan. */
  updateScan?: Maybe<UpdateScan>
  /** Update scanner. */
  updateScanner?: Maybe<UpdateScannerMutation>
  /** Update ticket risk SLO */
  updateSlo?: Maybe<UpdateSloMutation>
  updateTargetsByFilter?: Maybe<UpdateTargetsByFilterMutation>
  updateTargetsById?: Maybe<UpdateTargetsByIdMutation>
  /** Update test credentials by id of the same type. */
  updateTestCredentials?: Maybe<UpdateTestCredentialsMutation>
  /** Update a Ticket content */
  updateTicket?: Maybe<UpdateTicketMutation>
  /** Update user organisation access, like role */
  updateUserOrganisationAccess?: Maybe<UpdateUserOrganisationAccess>
}

export type MutationsAckNotificationsArgs = {
  notificationIds: Array<InputMaybe<Scalars['Int']['input']>>
}

export type MutationsAddChecklistArgs = {
  items?: InputMaybe<Array<InputMaybe<ChecklistItemInputType>>>
  ticketId?: InputMaybe<Scalars['Int']['input']>
  ticketKey?: InputMaybe<Scalars['String']['input']>
  title: Scalars['String']['input']
}

export type MutationsAddCommentArgs = {
  attachments?: InputMaybe<Array<InputMaybe<Scalars['Upload']['input']>>>
  message: Scalars['String']['input']
  ticketId?: InputMaybe<Scalars['Int']['input']>
  ticketKey?: InputMaybe<Scalars['String']['input']>
}

export type MutationsAddResponseArgs = {
  choice?: InputMaybe<Scalars['String']['input']>
  questionId: Scalars['Int']['input']
  rating?: InputMaybe<Scalars['Int']['input']>
  referer: Scalars['String']['input']
  text?: InputMaybe<Scalars['String']['input']>
}

export type MutationsAddScannerArgs = {
  scanner: ScannerInputType
}

export type MutationsAddScannerAccessArgs = {
  organisationIds: Array<InputMaybe<Scalars['Int']['input']>>
  scannerId: Scalars['Int']['input']
}

export type MutationsAddScannerStateArgs = {
  scannerState: ScannerStateInputType
}

export type MutationsAddTicketArgs = {
  ticket: TicketCreateInputType
}

export type MutationsAddTotpDeviceArgs = {
  name?: InputMaybe<Scalars['String']['input']>
}

export type MutationsAddUserOrganisationArgs = {
  email: Scalars['String']['input']
  organisationId: Scalars['Int']['input']
  role: Scalars['String']['input']
}

export type MutationsAddVulnerabilitiesArgs = {
  scanId: Scalars['Int']['input']
  vulnerabilities?: InputMaybe<Array<InputMaybe<VulnerabilityInputType>>>
}

export type MutationsArchiveAgentArgs = {
  agentKey: Scalars['String']['input']
}

export type MutationsArchiveAgentGroupArgs = {
  agentGroupKey: Scalars['String']['input']
}

export type MutationsArchiveOrganisationArgs = {
  organisationId: Scalars['Int']['input']
}

export type MutationsArchiveScanArgs = {
  scanId: Scalars['Int']['input']
}

export type MutationsBulkCsvCreateOrUpdateNgAssetsArgs = {
  createLocation?: InputMaybe<Scalars['Boolean']['input']>
  createOwner?: InputMaybe<Scalars['Boolean']['input']>
  csvContent: Scalars['Bytes']['input']
  updateAssetIfExists?: InputMaybe<Scalars['Boolean']['input']>
}

export type MutationsCancelSubscriptionArgs = {
  planId: Scalars['Int']['input']
}

export type MutationsChangePasswordArgs = {
  currentPassword: Scalars['String']['input']
  newPassword: Scalars['String']['input']
}

export type MutationsConfigureJiraIntegrationArgs = {
  jiraIntegrationInput: JiraIntegrationInput
}

export type MutationsConfirmTotpDeviceArgs = {
  deviceId?: InputMaybe<Scalars['Int']['input']>
  token?: InputMaybe<Scalars['String']['input']>
}

export type MutationsCreateAgentScanArgs = {
  scan: AgentScanInputType
  scannerId?: InputMaybe<Scalars['Int']['input']>
}

export type MutationsCreateApiKeyArgs = {
  expiryDate?: InputMaybe<Scalars['DateTime']['input']>
  name: Scalars['String']['input']
}

export type MutationsCreateAppCenterIntegrationArgs = {
  appCenterIntegrationInput: AppCenterIntegrationInputType
}

export type MutationsCreateApplicationArgs = {
  applicationName: Scalars['String']['input']
  packageDescription?: InputMaybe<Scalars['String']['input']>
  packageRepository?: InputMaybe<Scalars['String']['input']>
  packageRepositoryUrl?: InputMaybe<Scalars['String']['input']>
  packageSourceUrl?: InputMaybe<Scalars['String']['input']>
}

export type MutationsCreateApplicationFromRepoArgs = {
  applicationName: Scalars['String']['input']
  repo: Scalars['String']['input']
}

export type MutationsCreateAssetArgs = {
  asset: AssetInputType
}

export type MutationsCreateAssetLocationArgs = {
  assetLocations: Array<InputMaybe<AssetLocationInputType>>
}

export type MutationsCreateCronScheduleRuleByListNgAssetsArgs = {
  assets: Array<InputMaybe<NgAssetIdInputType>>
  credentialIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  crontab: Scalars['String']['input']
  name: Scalars['String']['input']
  scanProfile: Scalars['String']['input']
}

export type MutationsCreateJiraTicketArgs = {
  jiraTicketMapInput: JiraTicketMapInput
  ticketId?: InputMaybe<Scalars['Int']['input']>
  ticketKey?: InputMaybe<Scalars['String']['input']>
}

export type MutationsCreateJiraTicketMapArgs = {
  jiraTicketMapInput: JiraTicketMapInput
  ticketId?: InputMaybe<Scalars['Int']['input']>
  ticketKey?: InputMaybe<Scalars['String']['input']>
}

export type MutationsCreateMobileScanArgs = {
  application: Scalars['Upload']['input']
  assetType: Scalars['String']['input']
  credentialIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  sboms?: InputMaybe<Array<InputMaybe<Scalars['Upload']['input']>>>
  scanProfile: Scalars['String']['input']
  scannerId?: InputMaybe<Scalars['Int']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  uiAutomationRuleInstances?: InputMaybe<Array<InputMaybe<UiAutomationRuleInstanceInputType>>>
}

export type MutationsCreateMobileStoreScanArgs = {
  applicationName: Scalars['String']['input']
  assetType: Scalars['String']['input']
  credentialIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  packageName: Scalars['String']['input']
  scanProfile: Scalars['String']['input']
  scannerId?: InputMaybe<Scalars['Int']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  uiAutomationRuleInstances?: InputMaybe<Array<InputMaybe<UiAutomationRuleInstanceInputType>>>
}

export type MutationsCreateNetworkScanArgs = {
  networks: Array<InputMaybe<Scalars['String']['input']>>
  scanProfile: Scalars['String']['input']
  scannerId?: InputMaybe<Scalars['Int']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type MutationsCreateNgAssetsArgs = {
  assets: Array<InputMaybe<NgAssetInputType>>
}

export type MutationsCreateOrganisationArgs = {
  name: Scalars['String']['input']
  parentOrganisationId?: InputMaybe<Scalars['Int']['input']>
}

export type MutationsCreateOveArgs = {
  cvssV3Vector?: InputMaybe<Scalars['String']['input']>
  cwe?: InputMaybe<Scalars['Int']['input']>
  description: Scalars['String']['input']
  references?: InputMaybe<Array<InputMaybe<ReferenceInput>>>
}

export type MutationsCreateOwnerArgs = {
  owner: OwnerInputType
}

export type MutationsCreatePlanArgs = {
  billingFrequency: BillingFrequencyEnum
  productPlan: ProductPlanTypeEnum
  products: Array<InputMaybe<ProductTypeInput>>
}

export type MutationsCreateRuleArgs = {
  rule: RuleInputType
}

export type MutationsCreateSamlIntegrationConfigurationArgs = {
  samlConfiguration: SamlIntegrationConfigurationInputType
}

export type MutationsCreateScanArgs = {
  asset: AssetInputType
  title?: InputMaybe<Scalars['String']['input']>
}

export type MutationsCreateScanSummaryArgs = {
  prompt: Scalars['String']['input']
  scanId: Scalars['Int']['input']
}

export type MutationsCreateScheduleRuleByListAssetsArgs = {
  assetIds: Array<InputMaybe<Scalars['Int']['input']>>
  credentialIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  name: Scalars['String']['input']
  scanProfile: Scalars['String']['input']
}

export type MutationsCreateScheduleRuleByListNgAssetsArgs = {
  assets: Array<InputMaybe<NgAssetIdInputType>>
  credentialIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  maxNoScanDuration?: InputMaybe<Scalars['Int']['input']>
  name: Scalars['String']['input']
  scanProfile: Scalars['String']['input']
}

export type MutationsCreateSharedAccessTemporaryTokenArgs = {
  prefix: Scalars['String']['input']
  token: Scalars['String']['input']
}

export type MutationsCreateSharedAccessTokenArgs = {
  scanId?: InputMaybe<Scalars['Int']['input']>
}

export type MutationsCreateTestCredentialsArgs = {
  testCredentials: TestCredentialsInput
}

export type MutationsCreateWebScanArgs = {
  credentialIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  filteredUrlRegexes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  proxy?: InputMaybe<Scalars['String']['input']>
  qps?: InputMaybe<Scalars['Int']['input']>
  scanProfile: Scalars['String']['input']
  scannerId?: InputMaybe<Scalars['Int']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  uiAutomationRuleInstances?: InputMaybe<Array<InputMaybe<UiAutomationRuleInstanceInputType>>>
  urls: Array<InputMaybe<Scalars['String']['input']>>
}

export type MutationsCustomizeVulnerabilitiesArgs = {
  customRiskRating?: InputMaybe<Scalars['String']['input']>
  delete?: InputMaybe<Scalars['Boolean']['input']>
  detailId?: InputMaybe<Scalars['Int']['input']>
  markFalsePositive?: InputMaybe<Scalars['Boolean']['input']>
  scanId?: InputMaybe<Scalars['Int']['input']>
  vulnerabilityIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
}

export type MutationsDeleteAppCenterIntegrationArgs = {
  appCenterIntegrationId?: InputMaybe<Scalars['Int']['input']>
}

export type MutationsDeleteApplicationArgs = {
  applicationId: Scalars['Int']['input']
}

export type MutationsDeleteAssetArgs = {
  assetId: Scalars['Int']['input']
}

export type MutationsDeleteAssetLocationArgs = {
  assetLocationsIds: Array<InputMaybe<Scalars['Int']['input']>>
}

export type MutationsDeleteChecklistArgs = {
  checklistId: Scalars['Int']['input']
}

export type MutationsDeleteCommentArgs = {
  commentId: Scalars['Int']['input']
}

export type MutationsDeleteJiraTicketMapArgs = {
  jiraTicketMapId: Scalars['Int']['input']
}

export type MutationsDeleteNgAssetArgs = {
  assets: Array<InputMaybe<NgAssetIdInputType>>
}

export type MutationsDeleteOwnerArgs = {
  ownerId: Scalars['Int']['input']
}

export type MutationsDeleteRuleArgs = {
  ruleId: Scalars['Int']['input']
}

export type MutationsDeleteScannerArgs = {
  scannerId: Scalars['Int']['input']
}

export type MutationsDeleteScannerAccessArgs = {
  organisationIds: Array<InputMaybe<Scalars['Int']['input']>>
  scannerId: Scalars['Int']['input']
}

export type MutationsDeleteScheduleRuleArgs = {
  scheduleRuleId: Scalars['Int']['input']
}

export type MutationsDeleteTargetArgs = {
  targetId?: InputMaybe<Scalars['Int']['input']>
}

export type MutationsDeleteTestCredentialsArgs = {
  testCredentialsIds: Array<InputMaybe<Scalars['Int']['input']>>
}

export type MutationsDeleteTicketArgs = {
  ticketId?: InputMaybe<Scalars['Int']['input']>
  ticketKey?: InputMaybe<Scalars['String']['input']>
}

export type MutationsDeleteTotpDeviceArgs = {
  deviceId?: InputMaybe<Scalars['Int']['input']>
}

export type MutationsDisableScheduleRuleArgs = {
  scheduleRuleId: Scalars['Int']['input']
}

export type MutationsDuplicateTargetArgs = {
  targetId?: InputMaybe<Scalars['Int']['input']>
}

export type MutationsEnableScheduleRuleArgs = {
  scheduleRuleId: Scalars['Int']['input']
}

export type MutationsExecuteRuleArgs = {
  rule: RuleInputType
}

export type MutationsExportAssetsArgs = {
  assetLocationIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  assetTypes?: InputMaybe<Array<InputMaybe<NgAssetTypeInputTypeEnum>>>
  assets?: InputMaybe<Array<InputMaybe<NgAssetIdInputType>>>
  dnsRecords?: InputMaybe<Array<InputMaybe<DnsRecordFilterInputType>>>
  excludeSearches?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  fingerprints?: InputMaybe<Array<InputMaybe<FingerprintFilterInputType>>>
  nodeTypes?: InputMaybe<Array<InputMaybe<NgNodeTypeInputTypeEnum>>>
  ownerIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  ownerNames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  ownershipTypes?: InputMaybe<Array<InputMaybe<OwnerTypesEnum>>>
  searches?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  services?: InputMaybe<Array<InputMaybe<ServiceFilterInputType>>>
  tagKeys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  tagValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  whoisRecords?: InputMaybe<Array<InputMaybe<WhoisFilterInputType>>>
}

export type MutationsExportScanArgs = {
  exportIde?: InputMaybe<Scalars['Boolean']['input']>
  scanId: Scalars['Int']['input']
}

export type MutationsExportTicketsArgs = {
  assignedEmails?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  assignedToMe?: InputMaybe<Scalars['Boolean']['input']>
  createdAfter?: InputMaybe<Scalars['DateTime']['input']>
  createdBefore?: InputMaybe<Scalars['DateTime']['input']>
  endAfter?: InputMaybe<Scalars['DateTime']['input']>
  endBefore?: InputMaybe<Scalars['DateTime']['input']>
  excludeAssignedEmails?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  excludePriorities?: InputMaybe<Array<InputMaybe<TicketPriorityEnum>>>
  excludeReporterEmails?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  excludeSearches?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  excludeStatuses?: InputMaybe<Array<InputMaybe<TicketStatusEnum>>>
  excludeTagNames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  excludeTagValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  modifiedAfter?: InputMaybe<Scalars['DateTime']['input']>
  modifiedBefore?: InputMaybe<Scalars['DateTime']['input']>
  priorities?: InputMaybe<Array<InputMaybe<TicketPriorityEnum>>>
  reportedByMe?: InputMaybe<Scalars['Boolean']['input']>
  reporterEmails?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  searches?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  startAfter?: InputMaybe<Scalars['DateTime']['input']>
  startBefore?: InputMaybe<Scalars['DateTime']['input']>
  statuses?: InputMaybe<Array<InputMaybe<TicketStatusEnum>>>
  tagNames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  tagValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  withinSlo?: InputMaybe<Scalars['Boolean']['input']>
}

export type MutationsExportVulnerabilitiesArgs = {
  scanId: Scalars['Int']['input']
}

export type MutationsGeneratePdfArgs = {
  pdfReportTemplate: PdfReportTemplate
  riskRatings: Array<InputMaybe<RiskRating>>
  scanId: Scalars['Int']['input']
  standards?: InputMaybe<Array<InputMaybe<ScanCategoryGroupEnum>>>
  statuses?: InputMaybe<Array<InputMaybe<TicketStatusEnum>>>
}

export type MutationsImportScanArgs = {
  file: Scalars['Upload']['input']
  scanId?: InputMaybe<Scalars['Int']['input']>
}

export type MutationsLeaveOrganisationArgs = {
  organisationId: Scalars['Int']['input']
}

export type MutationsPublishAgentArgs = {
  agent: AgentInputType
}

export type MutationsPublishAgentGroupArgs = {
  agentGroup: AgentGroupCreateInputType
}

export type MutationsReviewInvitationArgs = {
  accepted: Scalars['Boolean']['input']
  invitationId: Scalars['Int']['input']
}

export type MutationsRevokeApiKeyArgs = {
  apiKeyId: Scalars['String']['input']
}

export type MutationsRevokeSharedAccessTokenArgs = {
  sharedAccessTokenId: Scalars['Int']['input']
}

export type MutationsRevokeUserOrganisationArgs = {
  organisationId: Scalars['Int']['input']
  organisationUserIds: Array<InputMaybe<Scalars['Int']['input']>>
}

export type MutationsSendContactMessageArgs = {
  message: Scalars['String']['input']
  subject: Scalars['String']['input']
}

export type MutationsSendRequestFeedbackMessageArgs = {
  contacts: Array<InputMaybe<ContactInput>>
  subject: Scalars['String']['input']
}

export type MutationsStartAssetDiscoveryArgs = {
  assets: Array<InputMaybe<AssetDiscoveryInputType>>
}

export type MutationsStartBuildAgentArgs = {
  agentKey: Scalars['String']['input']
  agentVersion: Scalars['String']['input']
}

export type MutationsStopScanArgs = {
  scanId: Scalars['Int']['input']
}

export type MutationsSwitchOrganisationArgs = {
  organisationId: Scalars['Int']['input']
}

export type MutationsTransferPlanArgs = {
  destinationOrgId: Scalars['Int']['input']
  planId: Scalars['Int']['input']
  products: Array<InputMaybe<ProductTypeInput>>
  sourceOrgId: Scalars['Int']['input']
}

export type MutationsUpdateActiveScanSummaryArgs = {
  scanId: Scalars['Int']['input']
  scanSummaryId: Scalars['Int']['input']
}

export type MutationsUpdateAgentArgs = {
  agent: AgentInputType
  agentKey: Scalars['String']['input']
}

export type MutationsUpdateAgentGroupArgs = {
  agentGroup: AgentGroupInputType
  agentGroupKey: Scalars['String']['input']
}

export type MutationsUpdateApiKeyArgs = {
  apiKeyId: Scalars['String']['input']
  expiryDate?: InputMaybe<Scalars['DateTime']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type MutationsUpdateAppCenterIntegrationArgs = {
  appCenterIntegrationId?: InputMaybe<Scalars['Int']['input']>
  appCenterIntegrationInput: AppCenterIntegrationUpdateInputType
}

export type MutationsUpdateAssetArgs = {
  asset: MutableAssetInputType
  assetId: Scalars['Int']['input']
}

export type MutationsUpdateAssetLocationArgs = {
  assetLocations: Array<InputMaybe<AssetLocationInputMutableType>>
}

export type MutationsUpdateChecklistArgs = {
  checklistId: Scalars['Int']['input']
  items?: InputMaybe<Array<InputMaybe<ChecklistItemInputType>>>
  title?: InputMaybe<Scalars['String']['input']>
}

export type MutationsUpdateCommentArgs = {
  addedAttachments?: InputMaybe<Array<InputMaybe<Scalars['Upload']['input']>>>
  commentId: Scalars['Int']['input']
  message: Scalars['String']['input']
  removedAttachments?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
}

export type MutationsUpdateJiraTicketMapArgs = {
  jiraTicketMapId: Scalars['Int']['input']
  jiraTicketMapInput: JiraTicketMapInput
  ticketId?: InputMaybe<Scalars['Int']['input']>
  ticketKey?: InputMaybe<Scalars['String']['input']>
}

export type MutationsUpdateNgAssetsArgs = {
  assetLocationId?: InputMaybe<Scalars['Int']['input']>
  assets: Array<InputMaybe<NgAssetIdInputType>>
  availabilityRequirement?: InputMaybe<EnvironmentalRequirementLevelsEnum>
  confidentialityRequirement?: InputMaybe<EnvironmentalRequirementLevelsEnum>
  customColor?: InputMaybe<Scalars['String']['input']>
  integrityRequirement?: InputMaybe<EnvironmentalRequirementLevelsEnum>
  note?: InputMaybe<Scalars['String']['input']>
  ownerId?: InputMaybe<Scalars['Int']['input']>
  tags?: InputMaybe<Array<InputMaybe<TagsInputType>>>
  unsignCustomColor?: InputMaybe<Scalars['Boolean']['input']>
}

export type MutationsUpdateOnboardingTaskCompletionStateArgs = {
  isDisabled: Scalars['Boolean']['input']
  taskId: Scalars['String']['input']
}

export type MutationsUpdateOrganisationSettingsArgs = {
  canUseAiEngine?: InputMaybe<Scalars['Boolean']['input']>
  isOtpRequired?: InputMaybe<Scalars['Boolean']['input']>
  sessionTimeout?: InputMaybe<Scalars['Int']['input']>
}

export type MutationsUpdateOrganisationUserArgs = {
  acceptEmails?: InputMaybe<Scalars['Boolean']['input']>
  address?: InputMaybe<Scalars['String']['input']>
  firstName?: InputMaybe<Scalars['String']['input']>
  hasOtpEnabled?: InputMaybe<Scalars['Boolean']['input']>
  lastName?: InputMaybe<Scalars['String']['input']>
  organisationLogo?: InputMaybe<Scalars['Upload']['input']>
  organisationName?: InputMaybe<Scalars['String']['input']>
  organisationPrefix?: InputMaybe<Scalars['String']['input']>
  organisationWebsite?: InputMaybe<Scalars['String']['input']>
  parentOrganisationId?: InputMaybe<Scalars['Int']['input']>
  removeOrganisationLogo?: InputMaybe<Scalars['Boolean']['input']>
  removeUserImage?: InputMaybe<Scalars['Boolean']['input']>
  unassignParentOrganisation?: InputMaybe<Scalars['Boolean']['input']>
  userImage?: InputMaybe<Scalars['Upload']['input']>
  whitelistedSsoOrgs?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
}

export type MutationsUpdateOwnerArgs = {
  owner: OwnerInputMutableType
  ownerId: Scalars['Int']['input']
}

export type MutationsUpdatePotentialNodesArgs = {
  nodeIds: Array<InputMaybe<Scalars['Int']['input']>>
  ownerId?: InputMaybe<Scalars['Int']['input']>
}

export type MutationsUpdatePrioritySloArgs = {
  prioritySlo: PrioritySloInputType
}

export type MutationsUpdateRuleArgs = {
  rule: UpdateRuleInputType
  ruleId: Scalars['Int']['input']
}

export type MutationsUpdateSamlIntegrationConfigurationArgs = {
  samlConfiguration: SamlIntegrationConfigurationUpdateInputType
}

export type MutationsUpdateScanArgs = {
  progress: Scalars['String']['input']
  scanId: Scalars['Int']['input']
}

export type MutationsUpdateScannerArgs = {
  scanner: ScannerInputType
  scannerId: Scalars['Int']['input']
}

export type MutationsUpdateSloArgs = {
  slo: SloInputType
}

export type MutationsUpdateTargetsByFilterArgs = {
  addendum?: InputMaybe<Scalars['String']['input']>
  after?: InputMaybe<Scalars['Date']['input']>
  applicationId?: InputMaybe<Scalars['Int']['input']>
  applicationName?: InputMaybe<Scalars['String']['input']>
  applicationPackage?: InputMaybe<Scalars['String']['input']>
  cveId?: InputMaybe<Scalars['String']['input']>
  excludeApplicationNames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  excludeCveIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  excludeOveIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  excludeProducts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  excludeVendors?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  excludeYears?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  hasApplication?: InputMaybe<Scalars['Boolean']['input']>
  oveId?: InputMaybe<Scalars['String']['input']>
  packageName?: InputMaybe<Scalars['String']['input']>
  part?: InputMaybe<Scalars['String']['input']>
  product?: InputMaybe<Scalars['String']['input']>
  search?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  sw?: InputMaybe<Scalars['String']['input']>
  vendor?: InputMaybe<Scalars['String']['input']>
  version?: InputMaybe<VersionInput>
  year?: InputMaybe<Scalars['Int']['input']>
}

export type MutationsUpdateTargetsByIdArgs = {
  addendum?: InputMaybe<Scalars['String']['input']>
  applicationId?: InputMaybe<Scalars['Int']['input']>
  packageName?: InputMaybe<Scalars['String']['input']>
  targetIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  version?: InputMaybe<VersionInput>
}

export type MutationsUpdateTestCredentialsArgs = {
  testCredentials: TestCredentialsInput
  testCredentialsId: Scalars['Int']['input']
}

export type MutationsUpdateTicketArgs = {
  ticket: TicketInputType
}

export type MutationsUpdateUserOrganisationAccessArgs = {
  organisationId: Scalars['Int']['input']
  organisationUserId: Scalars['Int']['input']
  ownerIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  role: Scalars['String']['input']
}

export type NgAndroidAppAssetInputType = {
  packageName: Scalars['String']['input']
}

export type NgAndroidAppAssetType = {
  __typename?: 'NGAndroidAppAssetType'
  assetAncestors?: Maybe<Array<Maybe<AssetAncestorPathType>>>
  availabilityRequirement?: Maybe<EnvironmentalRequirementLevelsEnum>
  confidentialityRequirement?: Maybe<EnvironmentalRequirementLevelsEnum>
  createdTime?: Maybe<Scalars['DateTime']['output']>
  customColor?: Maybe<Scalars['String']['output']>
  historyInstances?: Maybe<AndroidAppAssetHistoryInstancesType>
  id: Scalars['ID']['output']
  integrityRequirement?: Maybe<EnvironmentalRequirementLevelsEnum>
  location?: Maybe<AssetLocationType>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  note?: Maybe<Scalars['String']['output']>
  owner?: Maybe<OwnerType>
  packageName: Scalars['String']['output']
  pageInfo?: Maybe<PageInfo>
  scans?: Maybe<Array<Maybe<ScanType>>>
  tags?: Maybe<Array<Maybe<TagsType>>>
}

export type NgAndroidAppAssetTypeHistoryInstancesArgs = {
  last?: InputMaybe<Scalars['Boolean']['input']>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type NgAndroidAppAssetTypeScansArgs = {
  lastOnly?: InputMaybe<Scalars['Boolean']['input']>
}

export type NgAssetIdInputType = {
  assetId: Scalars['Int']['input']
  assetType: NgAssetTypeInputTypeEnum
}

export type NgAssetInputType = {
  androidApp?: InputMaybe<NgAndroidAppAssetInputType>
  domain?: InputMaybe<NgDomainAssetInputType>
  iosApp?: InputMaybe<NgiosAppAssetInputType>
  ipv4?: InputMaybe<NgiPv4AssetInputType>
  ipv6?: InputMaybe<NgiPv6AssetInputType>
  metadata?: InputMaybe<NgAssetMetadataInputType>
  node?: InputMaybe<NodeAssetInputType>
}

export type NgAssetMetadataInputType = {
  ancestorNodeKeys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  assetLocationId?: InputMaybe<Scalars['Int']['input']>
  availabilityRequirement?: InputMaybe<EnvironmentalRequirementLevelsEnum>
  confidentialityRequirement?: InputMaybe<EnvironmentalRequirementLevelsEnum>
  customColor?: InputMaybe<Scalars['String']['input']>
  integrityRequirement?: InputMaybe<EnvironmentalRequirementLevelsEnum>
  note?: InputMaybe<Scalars['String']['input']>
  ownerId: Scalars['Int']['input']
  tags?: InputMaybe<Array<InputMaybe<TagsInputType>>>
}

export type NgAssetType = NgAndroidAppAssetType | NgDomainAssetType | NgiosAppAssetType | NgiPv4AssetType | NgiPv6AssetType | NgNodeType

export enum NgAssetTypeInputTypeEnum {
  AndroidAppAsset = 'ANDROID_APP_ASSET',
  DomainAsset = 'DOMAIN_ASSET',
  IosAppAsset = 'IOS_APP_ASSET',
  IpV4Asset = 'IP_V4_ASSET',
  IpV6Asset = 'IP_V6_ASSET',
  Node = 'NODE'
}

export type NgAssetsType = {
  __typename?: 'NGAssetsType'
  assets: Array<Maybe<NgAssetType>>
  pageInfo?: Maybe<PageInfo>
}

export type NgDomainAssetInputType = {
  name: Scalars['String']['input']
}

export type NgDomainAssetType = {
  __typename?: 'NGDomainAssetType'
  assetAncestors?: Maybe<Array<Maybe<AssetAncestorPathType>>>
  availabilityRequirement?: Maybe<EnvironmentalRequirementLevelsEnum>
  confidentialityRequirement?: Maybe<EnvironmentalRequirementLevelsEnum>
  createdTime?: Maybe<Scalars['DateTime']['output']>
  customColor?: Maybe<Scalars['String']['output']>
  historyInstances?: Maybe<DomainAssetHistoryInstancesType>
  id: Scalars['ID']['output']
  integrityRequirement?: Maybe<EnvironmentalRequirementLevelsEnum>
  location?: Maybe<AssetLocationType>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  name: Scalars['String']['output']
  note?: Maybe<Scalars['String']['output']>
  owner?: Maybe<OwnerType>
  pageInfo?: Maybe<PageInfo>
  scans?: Maybe<Array<Maybe<ScanType>>>
  tags?: Maybe<Array<Maybe<TagsType>>>
}

export type NgDomainAssetTypeHistoryInstancesArgs = {
  last?: InputMaybe<Scalars['Boolean']['input']>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type NgDomainAssetTypeScansArgs = {
  lastOnly?: InputMaybe<Scalars['Boolean']['input']>
}

export type NgiosAppAssetInputType = {
  bundleId: Scalars['String']['input']
}

export type NgiosAppAssetType = {
  __typename?: 'NGIOSAppAssetType'
  assetAncestors?: Maybe<Array<Maybe<AssetAncestorPathType>>>
  availabilityRequirement?: Maybe<EnvironmentalRequirementLevelsEnum>
  bundleId: Scalars['String']['output']
  confidentialityRequirement?: Maybe<EnvironmentalRequirementLevelsEnum>
  createdTime?: Maybe<Scalars['DateTime']['output']>
  customColor?: Maybe<Scalars['String']['output']>
  historyInstances?: Maybe<IosAppAssetHistoryInstancesType>
  id: Scalars['ID']['output']
  integrityRequirement?: Maybe<EnvironmentalRequirementLevelsEnum>
  location?: Maybe<AssetLocationType>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  note?: Maybe<Scalars['String']['output']>
  owner?: Maybe<OwnerType>
  pageInfo?: Maybe<PageInfo>
  scans?: Maybe<Array<Maybe<ScanType>>>
  tags?: Maybe<Array<Maybe<TagsType>>>
}

export type NgiosAppAssetTypeHistoryInstancesArgs = {
  last?: InputMaybe<Scalars['Boolean']['input']>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type NgiosAppAssetTypeScansArgs = {
  lastOnly?: InputMaybe<Scalars['Boolean']['input']>
}

export type NgiPv4AssetInputType = {
  host: Scalars['String']['input']
}

export type NgiPv4AssetType = {
  __typename?: 'NGIPv4AssetType'
  assetAncestors?: Maybe<Array<Maybe<AssetAncestorPathType>>>
  availabilityRequirement?: Maybe<EnvironmentalRequirementLevelsEnum>
  confidentialityRequirement?: Maybe<EnvironmentalRequirementLevelsEnum>
  createdTime?: Maybe<Scalars['DateTime']['output']>
  customColor?: Maybe<Scalars['String']['output']>
  historyInstances?: Maybe<IPv4AssetHistoryInstancesType>
  host: Scalars['String']['output']
  id: Scalars['ID']['output']
  integrityRequirement?: Maybe<EnvironmentalRequirementLevelsEnum>
  location?: Maybe<AssetLocationType>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  note?: Maybe<Scalars['String']['output']>
  owner?: Maybe<OwnerType>
  pageInfo?: Maybe<PageInfo>
  scans?: Maybe<Array<Maybe<ScanType>>>
  tags?: Maybe<Array<Maybe<TagsType>>>
}

export type NgiPv4AssetTypeHistoryInstancesArgs = {
  last?: InputMaybe<Scalars['Boolean']['input']>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type NgiPv4AssetTypeScansArgs = {
  lastOnly?: InputMaybe<Scalars['Boolean']['input']>
}

export type NgiPv6AssetInputType = {
  host: Scalars['String']['input']
}

export type NgiPv6AssetType = {
  __typename?: 'NGIPv6AssetType'
  assetAncestors?: Maybe<Array<Maybe<AssetAncestorPathType>>>
  availabilityRequirement?: Maybe<EnvironmentalRequirementLevelsEnum>
  confidentialityRequirement?: Maybe<EnvironmentalRequirementLevelsEnum>
  createdTime?: Maybe<Scalars['DateTime']['output']>
  customColor?: Maybe<Scalars['String']['output']>
  historyInstances?: Maybe<IPv6AssetHistoryInstancesType>
  host: Scalars['String']['output']
  id: Scalars['ID']['output']
  integrityRequirement?: Maybe<EnvironmentalRequirementLevelsEnum>
  location?: Maybe<AssetLocationType>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  note?: Maybe<Scalars['String']['output']>
  owner?: Maybe<OwnerType>
  pageInfo?: Maybe<PageInfo>
  scans?: Maybe<Array<Maybe<ScanType>>>
  tags?: Maybe<Array<Maybe<TagsType>>>
}

export type NgiPv6AssetTypeHistoryInstancesArgs = {
  last?: InputMaybe<Scalars['Boolean']['input']>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type NgiPv6AssetTypeScansArgs = {
  lastOnly?: InputMaybe<Scalars['Boolean']['input']>
}

export type NgNodeType = {
  __typename?: 'NGNodeType'
  assetAncestors?: Maybe<Array<Maybe<AssetAncestorPathType>>>
  attributes?: Maybe<Array<Maybe<AttributeType>>>
  availabilityRequirement?: Maybe<EnvironmentalRequirementLevelsEnum>
  confidentialityRequirement?: Maybe<EnvironmentalRequirementLevelsEnum>
  createdTime?: Maybe<Scalars['DateTime']['output']>
  customColor?: Maybe<Scalars['String']['output']>
  historyInstances: Array<NodeAssetHistoryInstanceType>
  id: Scalars['ID']['output']
  integrityRequirement?: Maybe<EnvironmentalRequirementLevelsEnum>
  location?: Maybe<AssetLocationType>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  nodeKey: Scalars['String']['output']
  nodeType: Scalars['String']['output']
  note?: Maybe<Scalars['String']['output']>
  owner?: Maybe<OwnerType>
  scans?: Maybe<Array<Maybe<ScanType>>>
  tags?: Maybe<Array<Maybe<TagsType>>>
}

export type NgNodeTypeScansArgs = {
  lastOnly?: InputMaybe<Scalars['Boolean']['input']>
}

export enum NgNodeTypeInputTypeEnum {
  Asn = 'ASN',
  Ip = 'IP',
  Address = 'address',
  Domain = 'domain',
  Email = 'email',
  Org = 'org',
  Person = 'person',
  Service = 'service',
  Tld = 'tld'
}

export type NetworkAssetInputType = {
  network?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type NetworkAssetType = {
  __typename?: 'NetworkAssetType'
  id: Scalars['ID']['output']
  networks: Array<Scalars['String']['output']>
  scans?: Maybe<Array<Maybe<ScanType>>>
  tags?: Maybe<Array<Maybe<TagsType>>>
}

export type NetworkAssetTypeScansArgs = {
  lastOnly?: InputMaybe<Scalars['Boolean']['input']>
}

export type NetworkScanMutation = {
  __typename?: 'NetworkScanMutation'
  scan?: Maybe<ScanType>
}

export type NgAssetTypeListSelectorType = {
  __typename?: 'NgAssetTypeListSelectorType'
  androidAssets: Array<NgAndroidAppAssetType>
  domainAssets: Array<NgDomainAssetType>
  iosAssets: Array<NgiosAppAssetType>
  ipv4Assets: Array<NgiPv4AssetType>
  ipv6Assets: Array<NgiPv6AssetType>
  nodeAssets: Array<NgNodeType>
}

export type NodeAssetHistoryInstanceType = {
  __typename?: 'NodeAssetHistoryInstanceType'
  createdTime?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['ID']['output']
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  scanId: Scalars['Int']['output']
}

export type NodeAssetInputType = {
  attributes?: InputMaybe<Array<InputMaybe<AttributeInputType>>>
  nodeKey: Scalars['String']['input']
  nodeType: Scalars['String']['input']
}

export type NodesEdgesType = {
  __typename?: 'NodesEdgesType'
  edges: Array<Maybe<GraphEdgeType>>
  nodes: Array<Maybe<GraphNodeType>>
}

export enum NotificationLevel {
  /** Error */
  Error = 'ERROR',
  /** Info */
  Info = 'INFO',
  /** Warning */
  Warning = 'WARNING'
}

export type NotificationType = {
  __typename?: 'NotificationType'
  createdTime?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['ID']['output']
  level: NotificationLevel
  message: Scalars['String']['output']
}

export type NotificationsType = {
  __typename?: 'NotificationsType'
  notifications: Array<Maybe<NotificationType>>
  pageInfo?: Maybe<PageInfo>
}

export type OveType = {
  __typename?: 'OVEType'
  cvssV3Vector?: Maybe<Scalars['String']['output']>
  cwe?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['Int']['output']>
  oveId?: Maybe<Scalars['String']['output']>
  references?: Maybe<Array<Maybe<ReferenceType>>>
}

export type OnboardingTaskActionType = {
  __typename?: 'OnboardingTaskActionType'
  name: Scalars['String']['output']
  path: Scalars['String']['output']
}

export type OrganisationScannerAccessesType = {
  __typename?: 'OrganisationScannerAccessesType'
  organisationAccesses: Array<Maybe<RestrictedOrganisationType>>
  pageInfo?: Maybe<PageInfo>
}

export type OrganisationSettingsType = {
  __typename?: 'OrganisationSettingsType'
  canCreateMonitoringRule: Scalars['Boolean']['output']
  canCreateScanner: Scalars['Boolean']['output']
  canUseAiEngine: Scalars['Boolean']['output']
  hasAttackSurfaceMonitoring: Scalars['Boolean']['output']
  hasIntegrations: Scalars['Boolean']['output']
  isOtpRequired: Scalars['Boolean']['output']
  /** total session timeout in seconds. */
  sessionTimeout?: Maybe<Scalars['Int']['output']>
}

/** The governing user organisation. */
export type OrganisationType = {
  __typename?: 'OrganisationType'
  b64Logo?: Maybe<Scalars['String']['output']>
  childOrganisations?: Maybe<Array<Maybe<RestrictedOrganisationType>>>
  dateCreated: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  jira?: Maybe<JiraIntegrationConfiguration>
  logoUrl?: Maybe<Scalars['String']['output']>
  name: Scalars['String']['output']
  organisationAccess?: Maybe<Array<Maybe<OrganisationUserAccessType>>>
  parentOrganisation?: Maybe<RestrictedOrganisationType>
  prefix?: Maybe<Scalars['String']['output']>
  settings?: Maybe<OrganisationSettingsType>
  users?: Maybe<Array<Maybe<OrganisationUserType>>>
  website: Scalars['String']['output']
}

/** The governing user organisation. */
export type OrganisationTypeOrganisationAccessArgs = {
  hasOtpEnabled?: InputMaybe<Scalars['Boolean']['input']>
}

export enum OrganisationUserAccessRole {
  /** ADMIN */
  Admin = 'ADMIN',
  /** ATTACK SURFACE AUDITOR */
  AttackSurfaceAuditor = 'ATTACK_SURFACE_AUDITOR',
  /** READER */
  Reader = 'READER',
  /** USER */
  User = 'USER'
}

export type OrganisationUserAccessType = {
  __typename?: 'OrganisationUserAccessType'
  id: Scalars['ID']['output']
  organisation: OrganisationType
  organisationUser: OrganisationUserType
  /** Field apply to Attack Surface Auditor only and list the owner to whom the auditor has access to. Owners parents are | separated. */
  owners: Array<OwnerType>
  role: OrganisationUserAccessRole
}

/** User Badges. */
export type OrganisationUserBadgeType = {
  __typename?: 'OrganisationUserBadgeType'
  badge: Scalars['String']['output']
  description: Scalars['String']['output']
}

/** User objects. */
export type OrganisationUserType = {
  __typename?: 'OrganisationUserType'
  acceptEmails: Scalars['Boolean']['output']
  address: Scalars['String']['output']
  b64UserImage?: Maybe<Scalars['String']['output']>
  badges?: Maybe<Array<Maybe<OrganisationUserBadgeType>>>
  canCreateOrganisation: Scalars['Boolean']['output']
  email?: Maybe<Scalars['String']['output']>
  firstName?: Maybe<Scalars['String']['output']>
  hasOtpEnabled: Scalars['Boolean']['output']
  id: Scalars['ID']['output']
  isStaff?: Maybe<Scalars['Boolean']['output']>
  lastName?: Maybe<Scalars['String']['output']>
  organisation?: Maybe<OrganisationType>
  organisationAccess?: Maybe<Array<Maybe<OrganisationUserAccessType>>>
  role?: Maybe<Scalars['String']['output']>
  userImageUrl?: Maybe<Scalars['String']['output']>
  username?: Maybe<Scalars['String']['output']>
  whitelistedSsoOrgs?: Maybe<Array<Maybe<RestrictedOrganisationType>>>
}

export type OwnerInputMutableType = {
  contactEmail?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  ownershipType?: InputMaybe<OwnerTypesEnum>
  parentId?: InputMaybe<Scalars['Int']['input']>
  unassignContactUser?: InputMaybe<Scalars['Boolean']['input']>
  unassignParent?: InputMaybe<Scalars['Boolean']['input']>
}

export type OwnerInputType = {
  contactEmail?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
  ownershipType: OwnerTypesEnum
  parentId?: InputMaybe<Scalars['Int']['input']>
}

export enum OwnerOwnershipType {
  /** Acquisition */
  Acquisition = 'ACQUISITION',
  /** Internal */
  Internal = 'INTERNAL',
  /** Rejected */
  Rejected = 'REJECTED',
  /** 3rd party service */
  ThirdPartyService = 'THIRD_PARTY_SERVICE'
}

export type OwnerType = {
  __typename?: 'OwnerType'
  contactEmail?: Maybe<Scalars['String']['output']>
  contactUser?: Maybe<OrganisationUserType>
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  organisation: OrganisationType
  ownershipType: OwnerOwnershipType
  parent?: Maybe<OwnerType>
}

export enum OwnerTypesEnum {
  Acquisition = 'ACQUISITION',
  Internal = 'INTERNAL',
  Rejected = 'REJECTED',
  ThirdPartyService = 'THIRD_PARTY_SERVICE'
}

export type OwnersType = {
  __typename?: 'OwnersType'
  owners: Array<Maybe<OwnerType>>
  pageInfo?: Maybe<PageInfo>
}

export enum PdfReportTemplate {
  ExecutiveSummaryReport = 'executive_summary_report',
  FullReport = 'full_report',
  StandardsReport = 'standards_report'
}

export type PageInfo = {
  __typename?: 'PageInfo'
  count?: Maybe<Scalars['Int']['output']>
  hasNext?: Maybe<Scalars['Boolean']['output']>
  hasPrevious?: Maybe<Scalars['Boolean']['output']>
  numPages?: Maybe<Scalars['Int']['output']>
}

export type PaymentType = {
  __typename?: 'PaymentType'
  created?: Maybe<Scalars['DateTime']['output']>
  currentPeriodEnd?: Maybe<Scalars['DateTime']['output']>
  currentPeriodStart?: Maybe<Scalars['DateTime']['output']>
}

export type PcapFileType = {
  __typename?: 'PcapFileType'
  id: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  size?: Maybe<Scalars['Int']['output']>
}

export type PcapFilesType = {
  __typename?: 'PcapFilesType'
  files: Array<Maybe<PcapFileType>>
  pageInfo?: Maybe<PageInfo>
}

export type PhoneNumberTestCredentials = {
  __typename?: 'PhoneNumberTestCredentials'
  credentialName?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  phoneNumber: Scalars['String']['output']
}

export type PhoneNumberTestCredentialsInput = {
  phoneNumber?: InputMaybe<Scalars['String']['input']>
}

export type PhoneNumberTestCredentialsInstance = {
  __typename?: 'PhoneNumberTestCredentialsInstance'
  credentialName?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  phoneNumber: Scalars['String']['output']
}

export type PlanAssetIdentifierType = {
  __typename?: 'PlanAssetIdentifierType'
  /** List of assets identifiers allowed in this plan per product */
  assetIdentifier?: Maybe<Array<Scalars['String']['output']>>
  id: Scalars['ID']['output']
  plan: PlanNgType
  product: ProductNgType
}

export type PlanAssetIdentifiersType = {
  __typename?: 'PlanAssetIdentifiersType'
  assetIdentifiers: Array<Maybe<PlanAssetIdentifierType>>
  pageInfo?: Maybe<PageInfo>
}

export type PlanHistoricalCountUsage = {
  __typename?: 'PlanHistoricalCountUsage'
  end?: Maybe<Scalars['Date']['output']>
  mobileSlotsUsageCount?: Maybe<Scalars['Int']['output']>
  mobileSlotsUsageIdentifiers?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  networkSlotsUsageCount?: Maybe<Scalars['Int']['output']>
  networkSlotsUsageIdentifiers?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  start?: Maybe<Scalars['Date']['output']>
  webSlotsUsageCount?: Maybe<Scalars['Int']['output']>
  webSlotsUsageIdentifiers?: Maybe<Array<Maybe<Scalars['String']['output']>>>
}

export type PlanNgType = {
  __typename?: 'PlanNgType'
  assetIdentifiers?: Maybe<PlanAssetIdentifiersType>
  id: Scalars['ID']['output']
  isCanceled?: Maybe<Scalars['Boolean']['output']>
  mobileSlotsUsageCount?: Maybe<Scalars['Int']['output']>
  mobileSlotsUsageIdentifiers?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  networkSlotsUsageCount?: Maybe<Scalars['Int']['output']>
  networkSlotsUsageIdentifiers?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  organisation?: Maybe<OrganisationType>
  planHistoricalCountUsage?: Maybe<Array<Maybe<PlanHistoricalCountUsage>>>
  planName?: Maybe<Scalars['String']['output']>
  planScansHistory?: Maybe<Array<Maybe<PlanScansHistory>>>
  planType?: Maybe<Scalars['String']['output']>
  productCountMobileAssets?: Maybe<PlanProductCountType>
  productCountNetworkAssets?: Maybe<PlanProductCountType>
  productCountWebAssets?: Maybe<PlanProductCountType>
  status?: Maybe<Scalars['String']['output']>
  subscription?: Maybe<SubscriptionNgType>
  webSlotsUsageCount?: Maybe<Scalars['Int']['output']>
  webSlotsUsageIdentifiers?: Maybe<Array<Maybe<Scalars['String']['output']>>>
}

export type PlanProductCountType = {
  __typename?: 'PlanProductCountType'
  assetCount: Scalars['Int']['output']
  id: Scalars['ID']['output']
  plan: PlanNgType
  product: ProductNgType
  slotsCount: Scalars['Int']['output']
}

export type PlanScansHistory = {
  __typename?: 'PlanScansHistory'
  date: Scalars['DateTime']['output']
  scannedAsset: Scalars['String']['output']
}

export type PlansNgType = {
  __typename?: 'PlansNgType'
  pageInfo?: Maybe<PageInfo>
  plans: Array<Maybe<PlanNgType>>
}

export type PlistType = {
  __typename?: 'PlistType'
  dna?: Maybe<Scalars['String']['output']>
  formattedJson?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  path?: Maybe<Scalars['String']['output']>
  version?: Maybe<Scalars['Int']['output']>
}

export type PortMappingType = {
  __typename?: 'PortMappingType'
  id: Scalars['ID']['output']
  portDst: Scalars['Int']['output']
  portSrc: Scalars['Int']['output']
}

export type PotentialNodeType = {
  __typename?: 'PotentialNodeType'
  /** List of keys of the confirmed assets that led to discovering this node */
  ancestorNodeKeys?: Maybe<Array<Scalars['String']['output']>>
  attributes?: Maybe<Array<Maybe<AttributeType>>>
  creationTime?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['ID']['output']
  key?: Maybe<Scalars['String']['output']>
  lastSeenTime?: Maybe<Scalars['DateTime']['output']>
  owner?: Maybe<OwnerType>
  ownershipType?: Maybe<Scalars['String']['output']>
  score: Scalars['Int']['output']
  type?: Maybe<Scalars['String']['output']>
}

export enum PotentialNodesOrderByEnum {
  CreateTime = 'CreateTime',
  LastSeen = 'LastSeen',
  NodeId = 'NodeId',
  NodeKey = 'NodeKey',
  NodeType = 'NodeType',
  Owner = 'Owner',
  Score = 'Score'
}

export type PotentialNodesType = {
  __typename?: 'PotentialNodesType'
  nodes: Array<Maybe<PotentialNodeType>>
  pageInfo?: Maybe<PageInfo>
}

export type PrioritySloInputType = {
  p0?: InputMaybe<Scalars['Int']['input']>
  p1?: InputMaybe<Scalars['Int']['input']>
  p2?: InputMaybe<Scalars['Int']['input']>
  p3?: InputMaybe<Scalars['Int']['input']>
}

export type PrioritySloType = {
  __typename?: 'PrioritySLOType'
  p0?: Maybe<Scalars['Float']['output']>
  p1?: Maybe<Scalars['Float']['output']>
  p2?: Maybe<Scalars['Float']['output']>
  p3?: Maybe<Scalars['Float']['output']>
}

export enum ProductNgFrequency {
  /** Monthly */
  Monthly = 'MONTHLY',
  /** Oneoff */
  Oneoff = 'ONEOFF',
  /** Yearly */
  Yearly = 'YEARLY'
}

export enum ProductNgProductPlan {
  /** Access */
  Access = 'ACCESS',
  /** Business */
  Business = 'BUSINESS',
  /** Community */
  Community = 'COMMUNITY',
  /** Enterprise */
  Enterprise = 'ENTERPRISE'
}

export enum ProductNgProductType {
  /** Agent Plan */
  Agent = 'AGENT',
  /** Mobile Plan */
  Mobile = 'MOBILE',
  /** Network Plan */
  Network = 'NETWORK',
  /** Web Plan */
  Web = 'WEB'
}

export type ProductNgType = {
  __typename?: 'ProductNgType'
  description?: Maybe<Scalars['String']['output']>
  frequency: ProductNgFrequency
  id: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  paymentProductId?: Maybe<Scalars['String']['output']>
  productCount: Scalars['Int']['output']
  productPlan: ProductNgProductPlan
  productType: ProductNgProductType
  unitaryPrice: Scalars['Int']['output']
}

export enum ProductPlanTypeEnum {
  Access = 'ACCESS',
  Business = 'BUSINESS',
  Enterprise = 'ENTERPRISE'
}

export enum ProductTypeEnum {
  Agent = 'AGENT',
  Mobile = 'MOBILE',
  Network = 'NETWORK',
  Web = 'WEB'
}

export type ProductTypeInput = {
  productCount: Scalars['Int']['input']
  productType: ProductTypeEnum
}

export type ProductsNgType = {
  __typename?: 'ProductsNgType'
  pageInfo?: Maybe<PageInfo>
  products: Array<Maybe<ProductNgType>>
}

export enum ProgressEnum {
  Disabled = 'Disabled',
  Done = 'Done',
  Error = 'Error',
  InProgress = 'In_Progress',
  NotStarted = 'Not_Started',
  Stopped = 'Stopped'
}

export type PublishAgentGroupMutation = {
  __typename?: 'PublishAgentGroupMutation'
  agentGroup?: Maybe<AgentGroupType>
}

export type PublishAgentMutation = {
  __typename?: 'PublishAgentMutation'
  agent?: Maybe<AgentType>
}

export type Query = {
  __typename?: 'Query'
  _debug?: Maybe<DjangoDebug>
  actionDefinitions?: Maybe<ActionDefinitionsType>
  agent?: Maybe<AgentType>
  agents?: Maybe<AgentsType>
  apiKeys?: Maybe<ApiKeysType>
  appCenterIntegrations?: Maybe<Array<Maybe<AppCenterIntegrationConfigurationType>>>
  applications?: Maybe<ApplicationsType>
  asset?: Maybe<AssetType>
  assetLocations?: Maybe<AssetLocationsType>
  assets?: Maybe<AssetsType>
  auditActions?: Maybe<ActionAuditsType>
  callUiNodes?: Maybe<CallUiNodesType>
  functions?: Maybe<IdeFunctionsType>
  globalMetrics?: Maybe<GlobalMetricsType>
  /** Get package hints from different repos */
  hints?: Maybe<Array<Maybe<HintType>>>
  httpFolders?: Maybe<HttpFoldersType>
  httpRequestsResponses?: Maybe<HttpRequestsResponsesType>
  ideFiles?: Maybe<IdeFilesType>
  ideLogs?: Maybe<IdeLogsType>
  invitations?: Maybe<InvitationsType>
  jiraIntegrationConfiguration?: Maybe<JiraIntegrationConfiguration>
  jiraIntegrationTest?: Maybe<JiraTestsType>
  jiraProjects?: Maybe<JiraProjectsType>
  jiraTicketMap?: Maybe<JiraTicketMapType>
  /** Retrieve Job by Id */
  job?: Maybe<Job>
  ngAssets?: Maybe<NgAssetsType>
  nodesEdges?: Maybe<NodesEdgesType>
  notifications?: Maybe<NotificationsType>
  /** The progress of a user's onboarding. */
  onboardingTasks?: Maybe<Array<Maybe<UserOnboardingTaskType>>>
  /** Access User, Organisation and all subsequent information like subscription. */
  organisationUser?: Maybe<OrganisationUserType>
  owners?: Maybe<OwnersType>
  pcapFiles?: Maybe<PcapFilesType>
  plans?: Maybe<PlansNgType>
  potentialNodes?: Maybe<PotentialNodesType>
  prioritySlo?: Maybe<PrioritySloType>
  products?: Maybe<ProductsNgType>
  question?: Maybe<QuestionType>
  rules?: Maybe<RulesType>
  samlIntegrationConfiguration?: Maybe<SamlIntegrationConfigurationType>
  /** Retrieve scan by id. */
  scan?: Maybe<ScanType>
  /** list all the scan profiles based on the organisation. */
  scanProfiles?: Maybe<ScansProfilesType>
  scanSummaries?: Maybe<ScanSummariesType>
  scanners?: Maybe<ScannersType>
  scans?: Maybe<ScansType>
  scheduleRules?: Maybe<ScheduleRulesType>
  searchIde?: Maybe<SearchResultsType>
  /** Search vulnerabilities of a scan. */
  searchVulnerabilities?: Maybe<Array<Maybe<VulnerabilityType>>>
  sharedAccessTokens?: Maybe<Array<Maybe<SharedAccessTokenType>>>
  slo?: Maybe<SloType>
  stackTraces?: Maybe<StackTracesType>
  staticTokens?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  storeApplications?: Maybe<Array<Maybe<StoreApplication>>>
  /** List of targets */
  targets?: Maybe<TargetsType>
  testsCredentials?: Maybe<TestsCredentials>
  ticket?: Maybe<TicketType>
  tickets?: Maybe<TicketsType>
  timeSeriesMetrics?: Maybe<TimeSeriesMetricsType>
  totpDevices?: Maybe<Array<Maybe<TotpDeviceType>>>
  uiAutomationRules?: Maybe<UiAutomationRulesType>
}

export type QueryActionDefinitionsArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryAgentArgs = {
  agentKey: Scalars['String']['input']
}

export type QueryAgentsArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<AgentOrderByEnum>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  sort?: InputMaybe<SortEnum>
}

export type QueryApiKeysArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  prefixes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  searches?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryApplicationsArgs = {
  applicationName?: InputMaybe<Scalars['String']['input']>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryAssetArgs = {
  assetId: Scalars['Int']['input']
}

export type QueryAssetLocationsArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryAssetsArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<AssetOrderByEnum>
  page?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<SortEnum>
}

export type QueryAuditActionsArgs = {
  actionId?: InputMaybe<Scalars['Int']['input']>
  byMe?: InputMaybe<Scalars['Boolean']['input']>
  createdAfter?: InputMaybe<Scalars['Date']['input']>
  createdBefore?: InputMaybe<Scalars['Date']['input']>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<ActionAuditOrderByEnum>
  organisationName?: InputMaybe<Scalars['String']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  searches?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  sort?: InputMaybe<SortEnum>
  user?: InputMaybe<Scalars['String']['input']>
}

export type QueryCallUiNodesArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  scanId: Scalars['Int']['input']
}

export type QueryFunctionsArgs = {
  className?: InputMaybe<Scalars['String']['input']>
  cpuSubtype?: InputMaybe<Scalars['String']['input']>
  cpuType?: InputMaybe<Scalars['String']['input']>
  deprecated?: InputMaybe<Scalars['Boolean']['input']>
  extern?: InputMaybe<Scalars['String']['input']>
  ids?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  input?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  packageName?: InputMaybe<Scalars['String']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  path?: InputMaybe<Scalars['String']['input']>
  persistRead?: InputMaybe<Scalars['String']['input']>
  persistWrite?: InputMaybe<Scalars['String']['input']>
  privacySource?: InputMaybe<Scalars['String']['input']>
  recursiveFetchRefs?: InputMaybe<Scalars['Boolean']['input']>
  recursiveFetchXrefs?: InputMaybe<Scalars['Boolean']['input']>
  sanitizer?: InputMaybe<Scalars['String']['input']>
  scanId: Scalars['Int']['input']
  search?: InputMaybe<Scalars['String']['input']>
  signature?: InputMaybe<Scalars['String']['input']>
  sink?: InputMaybe<Scalars['String']['input']>
  source?: InputMaybe<Scalars['String']['input']>
}

export type QueryGlobalMetricsArgs = {
  eventTypes?: InputMaybe<Array<InputMaybe<GlobalMetricTypeEnum>>>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryHintsArgs = {
  targetId: Scalars['Int']['input']
}

export type QueryHttpFoldersArgs = {
  folderId?: InputMaybe<Scalars['Int']['input']>
  folderName?: InputMaybe<Scalars['String']['input']>
  host?: InputMaybe<Scalars['String']['input']>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<HttpFolderOrderByEnum>
  page?: InputMaybe<Scalars['Int']['input']>
  port?: InputMaybe<Scalars['Int']['input']>
  scanId: Scalars['Int']['input']
  sort?: InputMaybe<SortEnum>
}

export type QueryHttpRequestsResponsesArgs = {
  host?: InputMaybe<Scalars['String']['input']>
  method?: InputMaybe<Scalars['String']['input']>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  path?: InputMaybe<Scalars['String']['input']>
  port?: InputMaybe<Scalars['Int']['input']>
  responseId?: InputMaybe<Scalars['Int']['input']>
  scanId: Scalars['Int']['input']
  search?: InputMaybe<Scalars['String']['input']>
  statusCode?: InputMaybe<Scalars['Int']['input']>
}

export type QueryIdeFilesArgs = {
  fileType?: InputMaybe<Scalars['String']['input']>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  path?: InputMaybe<Scalars['String']['input']>
  scanId: Scalars['Int']['input']
}

export type QueryIdeLogsArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  scanId: Scalars['Int']['input']
}

export type QueryInvitationsArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryJiraProjectsArgs = {
  apiKey?: InputMaybe<Scalars['String']['input']>
  username?: InputMaybe<Scalars['String']['input']>
  workspaceUrl?: InputMaybe<Scalars['String']['input']>
}

export type QueryJiraTicketMapArgs = {
  ticketId?: InputMaybe<Scalars['Int']['input']>
  ticketKey?: InputMaybe<Scalars['String']['input']>
}

export type QueryJobArgs = {
  jobId?: InputMaybe<Scalars['String']['input']>
}

export type QueryNgAssetsArgs = {
  assetLocationIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  assetTypes?: InputMaybe<Array<InputMaybe<NgAssetTypeInputTypeEnum>>>
  assets?: InputMaybe<Array<InputMaybe<NgAssetIdInputType>>>
  dnsRecords?: InputMaybe<Array<InputMaybe<DnsRecordFilterInputType>>>
  excludeSearches?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  fingerprints?: InputMaybe<Array<InputMaybe<FingerprintFilterInputType>>>
  nodeTypes?: InputMaybe<Array<InputMaybe<NgNodeTypeInputTypeEnum>>>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  ownerIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  ownerNames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  ownershipTypes?: InputMaybe<Array<InputMaybe<OwnerTypesEnum>>>
  page?: InputMaybe<Scalars['Int']['input']>
  searches?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  services?: InputMaybe<Array<InputMaybe<ServiceFilterInputType>>>
  tagKeys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  tagValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  whoisRecords?: InputMaybe<Array<InputMaybe<WhoisFilterInputType>>>
}

export type QueryNodesEdgesArgs = {
  assets?: InputMaybe<Array<InputMaybe<NgAssetIdInputType>>>
  depth?: InputMaybe<Scalars['Int']['input']>
  filterExcluded?: InputMaybe<Scalars['Boolean']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
  nodeKeys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  ownerIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
}

export type QueryNotificationsArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryOwnersArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<AssetOwnerOrderByEnum>
  page?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<SortEnum>
}

export type QueryPcapFilesArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  scanId: Scalars['Int']['input']
}

export type QueryPlansArgs = {
  allOrgs?: InputMaybe<Scalars['Boolean']['input']>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryPotentialNodesArgs = {
  assets?: InputMaybe<Array<InputMaybe<NgAssetIdInputType>>>
  createdAfter?: InputMaybe<Scalars['Date']['input']>
  createdBefore?: InputMaybe<Scalars['Date']['input']>
  excludeSearches?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  lastSeenAfter?: InputMaybe<Scalars['Date']['input']>
  lastSeenBefore?: InputMaybe<Scalars['Date']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
  maxScore?: InputMaybe<Scalars['Int']['input']>
  minScore?: InputMaybe<Scalars['Int']['input']>
  nodeKeys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  nodeTypes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<PotentialNodesOrderByEnum>
  ownerIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  page?: InputMaybe<Scalars['Int']['input']>
  searches?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  sort?: InputMaybe<SortEnum>
}

export type QueryProductsArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryRulesArgs = {
  context?: InputMaybe<ContextEnum>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryScanArgs = {
  scanId?: InputMaybe<Scalars['Int']['input']>
}

export type QueryScanProfilesArgs = {
  assetType: Scalars['String']['input']
}

export type QueryScanSummariesArgs = {
  scanId: Scalars['Int']['input']
  scanSummaryId?: InputMaybe<Scalars['Int']['input']>
}

export type QueryScannersArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  scannerUuid?: InputMaybe<Scalars['UUID']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type QueryScansArgs = {
  createdAfter?: InputMaybe<Scalars['DateTime']['input']>
  createdBefore?: InputMaybe<Scalars['DateTime']['input']>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<ScanOrderByEnum>
  page?: InputMaybe<Scalars['Int']['input']>
  progress?: InputMaybe<Array<InputMaybe<ProgressEnum>>>
  riskRatings?: InputMaybe<Array<InputMaybe<RiskRating>>>
  searches?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  sort?: InputMaybe<SortEnum>
  target?: InputMaybe<Scalars['String']['input']>
  targetAssetTypes?: InputMaybe<Array<InputMaybe<AssetTypesEnum>>>
}

export type QueryScheduleRulesArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  ruleId?: InputMaybe<Scalars['Int']['input']>
  searchAsset?: InputMaybe<Scalars['String']['input']>
}

export type QuerySearchIdeArgs = {
  generateHighlight?: InputMaybe<Scalars['Boolean']['input']>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  scanId?: InputMaybe<Scalars['Int']['input']>
  search: Scalars['String']['input']
}

export type QuerySearchVulnerabilitiesArgs = {
  scan?: InputMaybe<Scalars['Int']['input']>
  text?: InputMaybe<Scalars['String']['input']>
}

export type QueryStackTracesArgs = {
  argNames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  argTypes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  argValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  classNames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  functionNames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<CallStackOrderByEnum>
  packageNames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  page?: InputMaybe<Scalars['Int']['input']>
  paths?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  runtimes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  scanId: Scalars['Int']['input']
  searches?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  sort?: InputMaybe<SortEnum>
  stackTraceId?: InputMaybe<Scalars['Int']['input']>
}

export type QueryStoreApplicationsArgs = {
  countryCodeAlpha2?: InputMaybe<Scalars['String']['input']>
  platform?: InputMaybe<MobilePlatform>
  search?: InputMaybe<Scalars['String']['input']>
}

export type QueryTargetsArgs = {
  after?: InputMaybe<Scalars['Date']['input']>
  applicationName?: InputMaybe<Scalars['String']['input']>
  applicationPackage?: InputMaybe<Scalars['String']['input']>
  cveId?: InputMaybe<Scalars['String']['input']>
  excludeApplicationNames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  excludeCveIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  excludeOveIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  excludeProducts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  excludeVendors?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  excludeYears?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  hasApplication?: InputMaybe<Scalars['Boolean']['input']>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  oveId?: InputMaybe<Scalars['String']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  part?: InputMaybe<Scalars['String']['input']>
  product?: InputMaybe<Scalars['String']['input']>
  search?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  sw?: InputMaybe<Scalars['String']['input']>
  vendor?: InputMaybe<Scalars['String']['input']>
  version?: InputMaybe<Scalars['String']['input']>
  year?: InputMaybe<Scalars['Int']['input']>
}

export type QueryTestsCredentialsArgs = {
  credentialsType?: InputMaybe<Array<InputMaybe<TestsCredentialsEnum>>>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  searches?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryTicketArgs = {
  ticketId?: InputMaybe<Scalars['Int']['input']>
  ticketKey?: InputMaybe<Scalars['String']['input']>
}

export type QueryTicketsArgs = {
  assignedEmails?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  assignedToMe?: InputMaybe<Scalars['Boolean']['input']>
  createdAfter?: InputMaybe<Scalars['DateTime']['input']>
  createdBefore?: InputMaybe<Scalars['DateTime']['input']>
  endAfter?: InputMaybe<Scalars['DateTime']['input']>
  endBefore?: InputMaybe<Scalars['DateTime']['input']>
  excludeAssignedEmails?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  excludePriorities?: InputMaybe<Array<InputMaybe<TicketPriorityEnum>>>
  excludeReporterEmails?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  excludeSearches?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  excludeStatuses?: InputMaybe<Array<InputMaybe<TicketStatusEnum>>>
  excludeTagNames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  excludeTagValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  modifiedAfter?: InputMaybe<Scalars['DateTime']['input']>
  modifiedBefore?: InputMaybe<Scalars['DateTime']['input']>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<TicketOrderByEnum>
  page?: InputMaybe<Scalars['Int']['input']>
  priorities?: InputMaybe<Array<InputMaybe<TicketPriorityEnum>>>
  reportedByMe?: InputMaybe<Scalars['Boolean']['input']>
  reporterEmails?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  scanId?: InputMaybe<Scalars['Int']['input']>
  searches?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  sort?: InputMaybe<SortEnum>
  startAfter?: InputMaybe<Scalars['DateTime']['input']>
  startBefore?: InputMaybe<Scalars['DateTime']['input']>
  statuses?: InputMaybe<Array<InputMaybe<TicketStatusEnum>>>
  tagNames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  tagValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  withinSlo?: InputMaybe<Scalars['Boolean']['input']>
}

export type QueryTimeSeriesMetricsArgs = {
  metricTypes?: InputMaybe<Array<InputMaybe<TimeMetricTypeEnum>>>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type QueryUiAutomationRulesArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export enum QuestionQuestionType {
  /** Freetext */
  FreeText = 'FREE_TEXT',
  /** Multi-choice */
  MultiChoice = 'MULTI_CHOICE',
  /** Rating */
  Rating = 'RATING'
}

export type QuestionType = {
  __typename?: 'QuestionType'
  active: Scalars['Boolean']['output']
  choices?: Maybe<Array<Scalars['String']['output']>>
  id: Scalars['ID']['output']
  question: Scalars['String']['output']
  questionType: QuestionQuestionType
  responses: Array<ResponseType>
  shownCount: Scalars['Int']['output']
}

export type ReferenceInput = {
  refsource?: InputMaybe<Scalars['String']['input']>
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  title: Scalars['String']['input']
  url: Scalars['String']['input']
}

export type ReferenceType = {
  __typename?: 'ReferenceType'
  content?: Maybe<Scalars['String']['output']>
  refsource?: Maybe<Scalars['String']['output']>
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  title?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type RegenerateStaticTokens = {
  __typename?: 'RegenerateStaticTokens'
  staticTokens?: Maybe<Array<Maybe<Scalars['String']['output']>>>
}

export type RegistryConfiguration = {
  __typename?: 'RegistryConfiguration'
  accountName?: Maybe<Scalars['String']['output']>
  credentials?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type ResponseType = {
  __typename?: 'ResponseType'
  question: QuestionType
}

export type RestrictedOrganisationType = {
  __typename?: 'RestrictedOrganisationType'
  id: Scalars['Int']['output']
  logoUrl?: Maybe<Scalars['String']['output']>
  name: Scalars['String']['output']
}

export type RestrictedOrganisationUserType = {
  __typename?: 'RestrictedOrganisationUserType'
  email: Scalars['String']['output']
  firstName?: Maybe<Scalars['String']['output']>
  id: Scalars['Int']['output']
  lastName?: Maybe<Scalars['String']['output']>
  role?: Maybe<Scalars['String']['output']>
  userImageUrl?: Maybe<Scalars['String']['output']>
  username: Scalars['String']['output']
}

export type ReviewInvitation = {
  __typename?: 'ReviewInvitation'
  message?: Maybe<Scalars['String']['output']>
}

export type RevokeApiKey = {
  __typename?: 'RevokeApiKey'
  result?: Maybe<Scalars['Boolean']['output']>
}

export type RevokeSharedAccessToken = {
  __typename?: 'RevokeSharedAccessToken'
  result?: Maybe<Scalars['Boolean']['output']>
}

export type RevokeUserOrganisation = {
  __typename?: 'RevokeUserOrganisation'
  message?: Maybe<Scalars['String']['output']>
}

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

export enum RuleContext {
  /** Attack Surface */
  AttackSurface = 'ATTACK_SURFACE',
  /** Inventory */
  Inventory = 'INVENTORY',
  /** Remediation */
  Remediation = 'REMEDIATION'
}

export type RuleInputType = {
  actions?: InputMaybe<Array<InputMaybe<ActionInputType>>>
  active?: InputMaybe<Scalars['Boolean']['input']>
  context: ContextEnum
  filter: FilterInputType
  name?: InputMaybe<Scalars['String']['input']>
  sharedWithOrganisation?: InputMaybe<Scalars['Boolean']['input']>
}

export type RuleType = {
  __typename?: 'RuleType'
  actions?: Maybe<ActionsType>
  active: Scalars['Boolean']['output']
  context: RuleContext
  filter?: Maybe<FilterType>
  id: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  sharedWithOrganisation?: Maybe<Scalars['Boolean']['output']>
}

export type RuleTypeActionsArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type RulesType = {
  __typename?: 'RulesType'
  pageInfo?: Maybe<PageInfo>
  rules: Array<Maybe<RuleType>>
}

export type SbomFileType = {
  __typename?: 'SBOMFileType'
  content: Scalars['Bytes']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
}

export type SloInputType = {
  critical?: InputMaybe<Scalars['Int']['input']>
  hardening?: InputMaybe<Scalars['Int']['input']>
  high?: InputMaybe<Scalars['Int']['input']>
  low?: InputMaybe<Scalars['Int']['input']>
  medium?: InputMaybe<Scalars['Int']['input']>
}

export type SloType = {
  __typename?: 'SLOType'
  critical?: Maybe<Scalars['Float']['output']>
  hardening?: Maybe<Scalars['Float']['output']>
  high?: Maybe<Scalars['Float']['output']>
  low?: Maybe<Scalars['Float']['output']>
  medium?: Maybe<Scalars['Float']['output']>
}

export type SamlIntegrationConfigurationInputType = {
  certificate: Scalars['String']['input']
  identityProviderEntityId: Scalars['String']['input']
  signOnServiceBinding: Scalars['String']['input']
  signOnServiceUrl: Scalars['String']['input']
  signOutServiceBinding?: InputMaybe<Scalars['String']['input']>
  signOutServiceUrl?: InputMaybe<Scalars['String']['input']>
}

export type SamlIntegrationConfigurationType = {
  __typename?: 'SamlIntegrationConfigurationType'
  certificate: Scalars['String']['output']
  createdTime: Scalars['DateTime']['output']
  enabled: Scalars['Boolean']['output']
  id: Scalars['ID']['output']
  identityProviderEntityId: Scalars['String']['output']
  modifiedTime: Scalars['DateTime']['output']
  signOnServiceBinding?: Maybe<Scalars['String']['output']>
  signOnServiceUrl?: Maybe<Scalars['String']['output']>
  signOutServiceBinding?: Maybe<Scalars['String']['output']>
  signOutServiceUrl?: Maybe<Scalars['String']['output']>
}

export type SamlIntegrationConfigurationUpdateInputType = {
  certificate?: InputMaybe<Scalars['String']['input']>
  enabled?: InputMaybe<Scalars['Boolean']['input']>
  identityProviderEntityId?: InputMaybe<Scalars['String']['input']>
  signOnServiceBinding?: InputMaybe<Scalars['String']['input']>
  signOnServiceUrl?: InputMaybe<Scalars['String']['input']>
  signOutServiceBinding?: InputMaybe<Scalars['String']['input']>
  signOutServiceUrl?: InputMaybe<Scalars['String']['input']>
}

export enum ScanCategoryGroupEnum {
  CweTop_25 = 'CWE_TOP_25',
  Gdpr = 'GDPR',
  OwaspAsvsL1 = 'OWASP_ASVS_L1',
  OwaspAsvsL2 = 'OWASP_ASVS_L2',
  OwaspAsvsL3 = 'OWASP_ASVS_L3',
  OwaspMasvsL1 = 'OWASP_MASVS_L1',
  OwaspMasvsL2 = 'OWASP_MASVS_L2',
  OwaspMasvsResilience = 'OWASP_MASVS_RESILIENCE',
  PciStandards = 'PCI_STANDARDS'
}

export enum ScanOrderByEnum {
  CreatedTime = 'CreatedTime',
  Progress = 'Progress',
  RiskRating = 'RiskRating',
  ScanId = 'ScanId',
  ScanProfile = 'ScanProfile',
  Title = 'Title'
}

export enum ScanPlan {
  /** Agent Scan */
  AgentScan = 'AGENT_SCAN',
  /** Free */
  Free = 'FREE',
  /** Free+IDE */
  FreeIde = 'FREE_IDE',
  /** Network Plan */
  NetworkPlan = 'NETWORK_PLAN',
  /** Static Dynamic Backend */
  StaticDynamicBackend = 'STATIC_DYNAMIC_BACKEND',
  /** Web Plan */
  WebPlan = 'WEB_PLAN'
}

export enum ScanRiskRating {
  /** Critical */
  Critical = 'CRITICAL',
  /** Hardening */
  Hardening = 'HARDENING',
  /** High */
  High = 'HIGH',
  /** Important */
  Important = 'IMPORTANT',
  /** Info */
  Info = 'INFO',
  /** Low */
  Low = 'LOW',
  /** Medium */
  Medium = 'MEDIUM',
  /** Potentially */
  Potentially = 'POTENTIALLY',
  /** Secure */
  Secure = 'SECURE'
}

export enum ScanStatusTypeEnum {
  Added = 'ADDED',
  NoChange = 'NO_CHANGE',
  Removed = 'REMOVED'
}

export type ScanSummariesType = {
  __typename?: 'ScanSummariesType'
  maxNumberOfSummaries: Scalars['Int']['output']
  summaries: Array<Maybe<ScanSummaryType>>
}

export type ScanSummaryType = {
  __typename?: 'ScanSummaryType'
  active: Scalars['Boolean']['output']
  createdTime: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  modifiedTime: Scalars['DateTime']['output']
  organisationUser?: Maybe<OrganisationUserType>
  scan: ScanType
  summary: Scalars['String']['output']
  /** The prompt provided by the user. */
  userPrompt?: Maybe<Scalars['String']['output']>
}

/** Scan object. */
export type ScanType = {
  __typename?: 'ScanType'
  applicationHash?: Maybe<Scalars['String']['output']>
  /** Human readable application size. */
  applicationSize?: Maybe<Scalars['String']['output']>
  asset?: Maybe<AssetType>
  assetType?: Maybe<Scalars['String']['output']>
  b64Icon?: Maybe<Scalars['String']['output']>
  categories?: Maybe<Array<Maybe<KbCategoryGroup>>>
  createdTime: Scalars['DateTime']['output']
  fingerprints?: Maybe<FingerprintsType>
  hasAnalysis: Scalars['Boolean']['output']
  hasExported: Scalars['Boolean']['output']
  hasPdf: Scalars['Boolean']['output']
  id: Scalars['ID']['output']
  isEditable: Scalars['Boolean']['output']
  kbVulnerabilities?: Maybe<Array<Maybe<AggregatedKnowledgeBaseVulnerabilityType>>>
  messageStatus?: Maybe<Scalars['String']['output']>
  modifiedTime: Scalars['DateTime']['output']
  name?: Maybe<Scalars['String']['output']>
  ngAssets?: Maybe<NgAssetsType>
  packageName?: Maybe<Scalars['String']['output']>
  plan?: Maybe<ScanPlan>
  progress?: Maybe<Scalars['String']['output']>
  proxy?: Maybe<Scalars['String']['output']>
  public: Scalars['Boolean']['output']
  riskRating?: Maybe<ScanRiskRating>
  sboms?: Maybe<Array<Maybe<SbomFileType>>>
  scanProfile?: Maybe<Scalars['String']['output']>
  selfLink?: Maybe<Scalars['String']['output']>
  testCredentials?: Maybe<TestsCredentialsInstance>
  title?: Maybe<Scalars['String']['output']>
  version?: Maybe<Scalars['String']['output']>
  vulnerabilities?: Maybe<VulnerabilitiesType>
}

/** Scan object. */
export type ScanTypeFingerprintsArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

/** Scan object. */
export type ScanTypeKbVulnerabilitiesArgs = {
  detailId?: InputMaybe<Scalars['Int']['input']>
}

/** Scan object. */
export type ScanTypeNgAssetsArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

/** Scan object. */
export type ScanTypeVulnerabilitiesArgs = {
  detailId?: InputMaybe<Scalars['Int']['input']>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  vulnerabilityId?: InputMaybe<Scalars['Int']['input']>
}

export type ScannerConfigurationType = {
  __typename?: 'ScannerConfigurationType'
  busClientName?: Maybe<Scalars['String']['output']>
  busClusterId?: Maybe<Scalars['String']['output']>
  busUrl?: Maybe<Scalars['String']['output']>
  dockerImage: Scalars['String']['output']
  registryConfiguration?: Maybe<RegistryConfiguration>
  stateUpdateFrequency: Scalars['Time']['output']
  subjectBusConfigs?: Maybe<SubjectBusConfigsType>
}

export type ScannerConfigurationTypeSubjectBusConfigsArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type ScannerInputType = {
  description: Scalars['String']['input']
  name: Scalars['String']['input']
}

export type ScannerStateInputType = {
  cpuLoad: Scalars['Float']['input']
  hostname: Scalars['String']['input']
  ipAddress: Scalars['String']['input']
  memoryLoad: Scalars['Float']['input']
  scanId?: InputMaybe<Scalars['Int']['input']>
  scannerUuid: Scalars['UUID']['input']
  totalCpu: Scalars['Int']['input']
  totalMemory: Scalars['Int']['input']
}

export type ScannerStateType = {
  __typename?: 'ScannerStateType'
  cpuLoad: Scalars['Float']['output']
  hostname: Scalars['String']['output']
  id: Scalars['ID']['output']
  ipAddress: Scalars['String']['output']
  memoryLoad: Scalars['Float']['output']
  scanId?: Maybe<Scalars['Int']['output']>
  scanner: ScannerType
  totalCpu: Scalars['Int']['output']
  totalMemory: Scalars['Int']['output']
}

export type ScannerStatesType = {
  __typename?: 'ScannerStatesType'
  pageInfo?: Maybe<PageInfo>
  scannerStates: Array<Maybe<ScannerStateType>>
}

export type ScannerType = {
  __typename?: 'ScannerType'
  config?: Maybe<ScannerConfigurationType>
  description: Scalars['String']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  organisation: OrganisationType
  organisationAccesses?: Maybe<OrganisationScannerAccessesType>
  secretToken: Scalars['String']['output']
  states?: Maybe<ScannerStatesType>
  token?: Maybe<Scalars['String']['output']>
  uuid: Scalars['UUID']['output']
}

export type ScannerTypeOrganisationAccessesArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type ScannerTypeStatesArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type ScannersType = {
  __typename?: 'ScannersType'
  pageInfo?: Maybe<PageInfo>
  scanners: Array<Maybe<ScannerType>>
}

export type ScansProfileType = {
  __typename?: 'ScansProfileType'
  description?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
}

export type ScansProfilesType = {
  __typename?: 'ScansProfilesType'
  scanProfile: Array<Maybe<ScansProfileType>>
}

export type ScansType = {
  __typename?: 'ScansType'
  pageInfo?: Maybe<PageInfo>
  scans: Array<Maybe<ScanType>>
}

export enum ScheduleRulePlan {
  /** Agent Scan */
  AgentScan = 'AGENT_SCAN',
  /** Free */
  Free = 'FREE',
  /** Free+IDE */
  FreeIde = 'FREE_IDE',
  /** Network Plan */
  NetworkPlan = 'NETWORK_PLAN',
  /** Static Dynamic Backend */
  StaticDynamicBackend = 'STATIC_DYNAMIC_BACKEND',
  /** Web Plan */
  WebPlan = 'WEB_PLAN'
}

export type ScheduleRuleType = {
  __typename?: 'ScheduleRuleType'
  active: Scalars['Boolean']['output']
  assetSelector?: Maybe<AssetSelectorType>
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  plan?: Maybe<ScheduleRulePlan>
  scanProfile?: Maybe<Scalars['String']['output']>
  scans?: Maybe<ScansType>
  testCredentials?: Maybe<TestsCredentials>
  timeSelector?: Maybe<TimeSelectorType>
}

export type ScheduleRuleTypeScansArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type ScheduleRulesType = {
  __typename?: 'ScheduleRulesType'
  pageInfo: PageInfo
  scheduleRules: Array<Maybe<ScheduleRuleType>>
}

export type ScreenshotType = {
  __typename?: 'ScreenshotType'
  createdTime?: Maybe<Scalars['DateTime']['output']>
  description?: Maybe<Scalars['String']['output']>
  historyInstance?: Maybe<DomainAssetHistoryInstanceType>
  historyStatus?: Maybe<ScanStatusTypeEnum>
  id: Scalars['ID']['output']
  image?: Maybe<Scalars['String']['output']>
  modifiedTime?: Maybe<Scalars['DateTime']['output']>
  name?: Maybe<Scalars['String']['output']>
  screenshotUrl?: Maybe<Scalars['String']['output']>
}

export type ScriptCredentialsInput = {
  script?: InputMaybe<Scalars['String']['input']>
}

export type ScriptTestCredentials = {
  __typename?: 'ScriptTestCredentials'
  credentialName?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  script: Scalars['String']['output']
}

export type ScriptTestCredentialsInstance = {
  __typename?: 'ScriptTestCredentialsInstance'
  credentialName?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  script?: Maybe<Scalars['String']['output']>
}

export type SearchResultElement = AndroidManifestType | AndroidResourceType | CilClassType | CilMethodType | CilPackageType | DexClassType | DexFileType | DexMethodType | DexPackageType | ElfFileType | ElfFunctionType | ElfStringType | HttpRequestType | HttpResponseType | IdeFileType | IdeFunctionType | JavascriptFileType | MachoClassType | MachoFileType | MachoFunctionType | MachoStringType | PlistType

export type SearchResultType = {
  __typename?: 'SearchResultType'
  highlight?: Maybe<Scalars['String']['output']>
  result: SearchResultElement
}

export type SearchResultsType = {
  __typename?: 'SearchResultsType'
  pageInfo?: Maybe<PageInfo>
  results: Array<Maybe<SearchResultType>>
}

export type SecretApiKey = {
  __typename?: 'SecretApiKey'
  apiKey: ApiKeyModelType
  secretKey?: Maybe<Scalars['String']['output']>
}

export type SendContactMessageMutation = {
  __typename?: 'SendContactMessageMutation'
  result?: Maybe<Scalars['String']['output']>
}

export type SendRequestFeedbackMessageMutation = {
  __typename?: 'SendRequestFeedbackMessageMutation'
  result?: Maybe<Scalars['String']['output']>
}

export type ServiceFilterInputType = {
  port?: InputMaybe<Scalars['Int']['input']>
  protocol?: InputMaybe<Scalars['String']['input']>
}

export type SharedAccessTemporaryToken = {
  __typename?: 'SharedAccessTemporaryToken'
  createdTime: Scalars['DateTime']['output']
  sharedAccessToken: SharedAccessTokenType
  token: Scalars['String']['output']
}

export type SharedAccessTokenType = {
  __typename?: 'SharedAccessTokenType'
  accessCount: Scalars['Int']['output']
  createdTime: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  lastAccessTime?: Maybe<Scalars['DateTime']['output']>
  /** prefix are public value for auditing purposes to identify the key in logs and show it to the user. */
  prefix: Scalars['String']['output']
  scan?: Maybe<ScanType>
  token: Scalars['String']['output']
}

export enum SortEnum {
  Asc = 'Asc',
  Desc = 'Desc'
}

export type SourceCodeAssetInputType = {
  content?: InputMaybe<Scalars['Upload']['input']>
  language?: InputMaybe<Scalars['String']['input']>
  path?: InputMaybe<Scalars['String']['input']>
}

export type StackTraceFrameArgType = {
  __typename?: 'StackTraceFrameArgType'
  id: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
  value?: Maybe<Scalars['Bytes']['output']>
}

export type StackTraceFrameType = {
  __typename?: 'StackTraceFrameType'
  addr?: Maybe<Scalars['String']['output']>
  args: Array<StackTraceFrameArgType>
  className?: Maybe<Scalars['String']['output']>
  filePath?: Maybe<Scalars['String']['output']>
  functionName?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  packageName?: Maybe<Scalars['String']['output']>
  returnType?: Maybe<Scalars['String']['output']>
}

export type StackTraceFrameTypes = {
  __typename?: 'StackTraceFrameTypes'
  frames: Array<Maybe<StackTraceFrameType>>
  pageInfo?: Maybe<PageInfo>
}

export type StackTraceType = {
  __typename?: 'StackTraceType'
  createdTime: Scalars['DateTime']['output']
  frames?: Maybe<StackTraceFrameTypes>
  id: Scalars['ID']['output']
  runtime?: Maybe<Scalars['String']['output']>
  scan: ScanType
  threadId: Scalars['String']['output']
}

export type StackTraceTypeFramesArgs = {
  argNames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  argTypes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  argValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  classNames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  frameId?: InputMaybe<Scalars['Int']['input']>
  functionNames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<CallStackOrderByEnum>
  packageNames?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  page?: InputMaybe<Scalars['Int']['input']>
  paths?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  searches?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  sort?: InputMaybe<SortEnum>
}

export type StackTracesType = {
  __typename?: 'StackTracesType'
  pageInfo?: Maybe<PageInfo>
  stackTraces: Array<Maybe<StackTraceType>>
}

export type StartAssetDiscoveryMutation = {
  __typename?: 'StartAssetDiscoveryMutation'
  result?: Maybe<Scalars['Boolean']['output']>
}

/** Triggers building the agent. */
export type StartBuildAgentMutation = {
  __typename?: 'StartBuildAgentMutation'
  result?: Maybe<Scalars['Boolean']['output']>
}

export type StopScanMutation = {
  __typename?: 'StopScanMutation'
  scan?: Maybe<ScanType>
}

export type StoreApplication = {
  __typename?: 'StoreApplication'
  description?: Maybe<Scalars['String']['output']>
  icon?: Maybe<Scalars['String']['output']>
  packageName?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type SubjectBusConfigType = {
  __typename?: 'SubjectBusConfigType'
  queue: Scalars['String']['output']
  subject: Scalars['String']['output']
}

export type SubjectBusConfigsType = {
  __typename?: 'SubjectBusConfigsType'
  pageInfo?: Maybe<PageInfo>
  subjectBusConfigs: Array<Maybe<SubjectBusConfigType>>
}

export enum SubscriptionNgBillingFrequency {
  /** Monthly */
  Monthly = 'MONTHLY',
  /** Oneoff */
  Oneoff = 'ONEOFF',
  /** Yearly */
  Yearly = 'YEARLY'
}

export enum SubscriptionNgPaymentType {
  /** Paypal */
  Paypal = 'PAYPAL',
  /** Stripe */
  Stripe = 'STRIPE',
  /** Wire */
  Wire = 'WIRE'
}

export type SubscriptionNgType = {
  __typename?: 'SubscriptionNgType'
  billingFrequency: SubscriptionNgBillingFrequency
  id: Scalars['ID']['output']
  invoices?: Maybe<Array<Maybe<InvoiceType>>>
  lastPayment?: Maybe<Scalars['DateTime']['output']>
  payment?: Maybe<PaymentType>
  paymentSubscriptionId?: Maybe<Scalars['String']['output']>
  paymentType: SubscriptionNgPaymentType
  upcomingInvoice?: Maybe<InvoiceType>
}

export type SwitchOrganisation = {
  __typename?: 'SwitchOrganisation'
  organisationUser?: Maybe<OrganisationUserType>
}

export enum SyncModeEnum {
  Automatic = 'AUTOMATIC',
  Passive = 'PASSIVE'
}

export type TotpDeviceType = {
  __typename?: 'TOTPDeviceType'
  configUrl?: Maybe<Scalars['String']['output']>
  /** Is this device ready for use? */
  confirmed: Scalars['Boolean']['output']
  id: Scalars['ID']['output']
  /** The human-readable name of this device. */
  name: Scalars['String']['output']
}

export type TagsInputType = {
  name: Scalars['String']['input']
  value?: InputMaybe<Scalars['String']['input']>
}

export type TagsType = {
  __typename?: 'TagsType'
  name: Scalars['String']['output']
  value?: Maybe<Scalars['String']['output']>
}

export type TargetType = {
  __typename?: 'TargetType'
  addendum?: Maybe<Scalars['String']['output']>
  applicationVersion?: Maybe<ApplicationVersionType>
  cpeMatches?: Maybe<Array<Maybe<CpeMatchType>>>
  cve?: Maybe<CveType>
  id?: Maybe<Scalars['Int']['output']>
  ove?: Maybe<OveType>
}

export type TargetsType = {
  __typename?: 'TargetsType'
  pageInfo?: Maybe<PageInfo>
  targets: Array<Maybe<TargetType>>
}

export type TestCredentials = AddressTestCredentials | BasicTestCredentials | CreditCardTestCredentials | CustomTestCredentials | EmailTestCredentials | LoginPasswordTestCredentials | PhoneNumberTestCredentials | ScriptTestCredentials | TlsCertificateTestCredentials

export type TestCredentialsInput = {
  address?: InputMaybe<AddressTestCredentialsInput>
  basic?: InputMaybe<BasicTestCredentialsInput>
  credentialName?: InputMaybe<Scalars['String']['input']>
  creditCard?: InputMaybe<CreditCardTestCredentialsInput>
  custom?: InputMaybe<CustomTestCredentialsInput>
  email?: InputMaybe<EmailTestCredentialsInput>
  loginPassword?: InputMaybe<LoginPasswordTestCredentialsInput>
  phoneNumber?: InputMaybe<PhoneNumberTestCredentialsInput>
  script?: InputMaybe<ScriptCredentialsInput>
  tlsCertificate?: InputMaybe<TlsCertificateTestCredentialsInput>
}

export type TestCredentialsInstance = AddressTestCredentialsInstance | BasicTestCredentialsInstance | CreditCardTestCredentialsInstance | CustomTestCredentialsInstance | EmailTestCredentialsInstance | LoginPasswordTestCredentialsInstance | PhoneNumberTestCredentialsInstance | ScriptTestCredentialsInstance | TlsCertificateTestCredentialsInstance

export type TestsCredentials = {
  __typename?: 'TestsCredentials'
  pageInfo?: Maybe<PageInfo>
  testsCredentials: Array<Maybe<TestCredentials>>
}

export enum TestsCredentialsEnum {
  Address = 'ADDRESS',
  Basic = 'BASIC',
  Certificate = 'CERTIFICATE',
  CreditCard = 'CREDIT_CARD',
  Email = 'EMAIL',
  LoginPassword = 'LOGIN_PASSWORD',
  PhoneNumber = 'PHONE_NUMBER',
  Script = 'SCRIPT'
}

export type TestsCredentialsInstance = {
  __typename?: 'TestsCredentialsInstance'
  pageInfo?: Maybe<PageInfo>
  testsCredentials: Array<Maybe<TestCredentialsInstance>>
}

export enum TextFormats {
  Html = 'HTML',
  Markdown = 'MARKDOWN'
}

export type TicketCreateInputType = {
  assigned?: InputMaybe<Scalars['String']['input']>
  attachments?: InputMaybe<Array<InputMaybe<AttachmentInputType>>>
  description?: InputMaybe<Scalars['String']['input']>
  endTime?: InputMaybe<Scalars['DateTime']['input']>
  priority?: InputMaybe<TicketPriorityEnum>
  scanIds: Array<InputMaybe<Scalars['Int']['input']>>
  startTime?: InputMaybe<Scalars['DateTime']['input']>
  tags?: InputMaybe<Array<InputMaybe<TagsInputType>>>
  title: Scalars['String']['input']
  vulnerabilityIds: Array<InputMaybe<Scalars['Int']['input']>>
}

export enum TicketDescriptionFormat {
  /** HTML */
  Html = 'HTML',
  /** Markdown */
  Markdown = 'MARKDOWN'
}

export enum TicketEditEditType {
  /** Add checklist */
  AddChecklist = 'ADD_CHECKLIST',
  /** Assign User */
  AssignUser = 'ASSIGN_USER',
  /** Comment */
  Comment = 'COMMENT',
  /** Delete checklist */
  DeleteChecklist = 'DELETE_CHECKLIST',
  /** Delete Comment */
  DeleteComment = 'DELETE_COMMENT',
  /** New Scan */
  NewScan = 'NEW_SCAN',
  /** Update Added comment attachment */
  UpdateAddedAttachmentComment = 'UPDATE_ADDED_ATTACHMENT_COMMENT',
  /** Update Added ticket attachment */
  UpdateAddedTicketAttachment = 'UPDATE_ADDED_TICKET_ATTACHMENT',
  /** Update Assigned */
  UpdateAssigned = 'UPDATE_ASSIGNED',
  /** Update checklist */
  UpdateChecklist = 'UPDATE_CHECKLIST',
  /** Update Comment */
  UpdateComment = 'UPDATE_COMMENT',
  /** Update Removed comment attachment */
  UpdateDeletedAttachmentComment = 'UPDATE_DELETED_ATTACHMENT_COMMENT',
  /** Update Description */
  UpdateDescription = 'UPDATE_DESCRIPTION',
  /** Update end time */
  UpdateEndTime = 'UPDATE_END_TIME',
  /** Update List of Scans */
  UpdateListScans = 'UPDATE_LIST_SCANS',
  /** Update List of Vulnerabilities */
  UpdateListVulnerabilities = 'UPDATE_LIST_VULNERABILITIES',
  /** Update Priority */
  UpdatePriority = 'UPDATE_PRIORITY',
  /** Update Removed ticket attachment */
  UpdateRemovedTicketAttachment = 'UPDATE_REMOVED_TICKET_ATTACHMENT',
  /** Update start time */
  UpdateStartTime = 'UPDATE_START_TIME',
  /** Update Status */
  UpdateStatus = 'UPDATE_STATUS',
  /** Update Title */
  UpdateTitle = 'UPDATE_TITLE'
}

export type TicketEditType = {
  __typename?: 'TicketEditType'
  attachments?: Maybe<AttachmentsType>
  createdTime: Scalars['DateTime']['output']
  editAuthor?: Maybe<OrganisationUserType>
  editType: TicketEditEditType
  id: Scalars['ID']['output']
  message?: Maybe<Scalars['String']['output']>
  modifiedTime: Scalars['DateTime']['output']
}

export type TicketEditTypeAttachmentsArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type TicketEditsType = {
  __typename?: 'TicketEditsType'
  edits: Array<Maybe<TicketEditType>>
  pageInfo?: Maybe<PageInfo>
}

export type TicketInputType = {
  addedAttachments?: InputMaybe<Array<InputMaybe<AttachmentInputType>>>
  addedScanIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  addedVulnerabilityIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  assigned?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  endTime?: InputMaybe<Scalars['DateTime']['input']>
  priority?: InputMaybe<TicketPriorityEnum>
  removeStartEndTime?: InputMaybe<Scalars['Boolean']['input']>
  removedAttachments?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  removedScanIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  removedVulnerabilityIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  startTime?: InputMaybe<Scalars['DateTime']['input']>
  status?: InputMaybe<TicketStatusEnum>
  tags?: InputMaybe<Array<InputMaybe<TagsInputType>>>
  ticketId?: InputMaybe<Scalars['Int']['input']>
  ticketKey?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  unassign?: InputMaybe<Scalars['Boolean']['input']>
}

export enum TicketOrderByEnum {
  AssignedUser = 'AssignedUser',
  CreateTime = 'CreateTime',
  EndTime = 'EndTime',
  ModifiedTime = 'ModifiedTime',
  Priority = 'Priority',
  Reporter = 'Reporter',
  StartTime = 'StartTime',
  Status = 'Status',
  TicketId = 'TicketId',
  Title = 'Title'
}

export enum TicketPriority {
  /** P0 */
  P0 = 'P0',
  /** P1 */
  P1 = 'P1',
  /** P2 */
  P2 = 'P2',
  /** P3 */
  P3 = 'P3'
}

export enum TicketPriorityEnum {
  P0 = 'P0',
  P1 = 'P1',
  P2 = 'P2',
  P3 = 'P3'
}

export enum TicketStatus {
  /** Exception */
  Exception = 'EXCEPTION',
  /** False Positive */
  FalsePositive = 'FALSE_POSITIVE',
  /** Fixed */
  Fixed = 'FIXED',
  /** Fixed and Verified */
  FixedVerified = 'FIXED_VERIFIED',
  /** Open */
  Open = 'OPEN',
  /** Re-Open */
  Reopen = 'REOPEN'
}

export enum TicketStatusEnum {
  Exception = 'EXCEPTION',
  FalsePositive = 'FALSE_POSITIVE',
  Fixed = 'FIXED',
  FixedVerified = 'FIXED_VERIFIED',
  Open = 'OPEN',
  Reopen = 'REOPEN'
}

export type TicketType = {
  __typename?: 'TicketType'
  activity?: Maybe<TicketEditsType>
  assignedEmail?: Maybe<Scalars['String']['output']>
  assignedUser?: Maybe<OrganisationUserType>
  attachments?: Maybe<AttachmentsType>
  checklists?: Maybe<Array<Maybe<ChecklistType>>>
  /** Date when the ticket status is changed to either: fixed, fixed_verified, exception or false_positive. */
  closedTime?: Maybe<Scalars['DateTime']['output']>
  comments?: Maybe<TicketEditsType>
  createdTime: Scalars['DateTime']['output']
  description: Scalars['String']['output']
  descriptionFormat: TicketDescriptionFormat
  dueDate?: Maybe<Scalars['DateTime']['output']>
  edits?: Maybe<TicketEditsType>
  endTime?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['ID']['output']
  key?: Maybe<Scalars['String']['output']>
  modifiedTime: Scalars['DateTime']['output']
  /** Date when the ticket is either opened or re-opened. */
  openTime?: Maybe<Scalars['DateTime']['output']>
  priority: TicketPriority
  reporter?: Maybe<OrganisationUserType>
  scans?: Maybe<ScansType>
  startTime?: Maybe<Scalars['DateTime']['output']>
  status: TicketStatus
  tags?: Maybe<Array<Maybe<TagsType>>>
  textSummary?: Maybe<Scalars['String']['output']>
  title: Scalars['String']['output']
  vulnerabilities?: Maybe<VulnerabilitiesType>
  withinSlo?: Maybe<Scalars['Boolean']['output']>
}

export type TicketTypeActivityArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type TicketTypeAttachmentsArgs = {
  attachmentId?: InputMaybe<Scalars['Int']['input']>
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type TicketTypeCommentsArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type TicketTypeEditsArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type TicketTypeScansArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type TicketTypeVulnerabilitiesArgs = {
  numberElements?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
}

export type TicketsType = {
  __typename?: 'TicketsType'
  assignedUsers?: Maybe<Array<Maybe<OrganisationUserType>>>
  pageInfo?: Maybe<PageInfo>
  tagNames?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  tagValues?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  tickets: Array<Maybe<TicketType>>
}

export type TicketsTypeTagValuesArgs = {
  tagName?: InputMaybe<Scalars['String']['input']>
}

export enum TimeMetricTypeEnum {
  CountCritical = 'COUNT_CRITICAL',
  CountCriticalScans = 'COUNT_CRITICAL_SCANS',
  CountDistributionByService = 'COUNT_DISTRIBUTION_BY_SERVICE',
  CountDistributionByWhois = 'COUNT_DISTRIBUTION_BY_WHOIS',
  CountException = 'COUNT_EXCEPTION',
  CountFalsePositive = 'COUNT_FALSE_POSITIVE',
  CountFingerprints = 'COUNT_FINGERPRINTS',
  CountFixed = 'COUNT_FIXED',
  CountFixedConfirmed = 'COUNT_FIXED_CONFIRMED',
  CountHardening = 'COUNT_HARDENING',
  CountHardeningScans = 'COUNT_HARDENING_SCANS',
  CountHigh = 'COUNT_HIGH',
  CountHighScans = 'COUNT_HIGH_SCANS',
  CountImportantScans = 'COUNT_IMPORTANT_SCANS',
  CountInfoScans = 'COUNT_INFO_SCANS',
  CountIssueAverageFixTime = 'COUNT_ISSUE_AVERAGE_FIX_TIME',
  CountIssueAverageFixTimeNoRisk = 'COUNT_ISSUE_AVERAGE_FIX_TIME_NO_RISK',
  CountLow = 'COUNT_LOW',
  CountLowScans = 'COUNT_LOW_SCANS',
  CountMedium = 'COUNT_MEDIUM',
  CountMediumScans = 'COUNT_MEDIUM_SCANS',
  CountMonitoredAssets = 'COUNT_MONITORED_ASSETS',
  CountNonMonitoredAssets = 'COUNT_NON_MONITORED_ASSETS',
  CountOfVulnerabilityByOccurrence = 'COUNT_OF_VULNERABILITY_BY_OCCURRENCE',
  CountOfVulnerabilityByOccurrenceForAnAsset = 'COUNT_OF_VULNERABILITY_BY_OCCURRENCE_FOR_AN_ASSET',
  CountOpen = 'COUNT_OPEN',
  CountOutOfSlo = 'COUNT_OUT_OF_SLO',
  CountPotentially = 'COUNT_POTENTIALLY',
  CountPotentiallyScans = 'COUNT_POTENTIALLY_SCANS',
  CountPotentialAndroidApps = 'COUNT_POTENTIAL_ANDROID_APPS',
  CountPotentialAsns = 'COUNT_POTENTIAL_ASNS',
  CountPotentialDomains = 'COUNT_POTENTIAL_DOMAINS',
  CountPotentialIosApps = 'COUNT_POTENTIAL_IOS_APPS',
  CountPotentialIpv4 = 'COUNT_POTENTIAL_IPV4',
  CountPotentialIpv6 = 'COUNT_POTENTIAL_IPV6',
  CountPotentialSubdomains = 'COUNT_POTENTIAL_SUBDOMAINS',
  CountReopen = 'COUNT_REOPEN',
  CountScans = 'COUNT_SCANS',
  CountScansByScanProfile = 'COUNT_SCANS_BY_SCAN_PROFILE',
  CountSecureScans = 'COUNT_SECURE_SCANS',
  CountTicketByAssignedByDay = 'COUNT_TICKET_BY_ASSIGNED_BY_DAY',
  CountTicketByStatusPerMonth = 'COUNT_TICKET_BY_STATUS_PER_MONTH',
  CountTicketPerPriorityPerDay = 'COUNT_TICKET_PER_PRIORITY_PER_DAY',
  CountVulnerabilityPerRiskPerAsset = 'COUNT_VULNERABILITY_PER_RISK_PER_ASSET',
  RatioMonitoredAssets = 'RATIO_MONITORED_ASSETS',
  TotalAssets = 'TOTAL_ASSETS',
  TotalAssetsByLocation = 'TOTAL_ASSETS_BY_LOCATION',
  TotalAssetsByLocationByAssetType = 'TOTAL_ASSETS_BY_LOCATION_BY_ASSET_TYPE',
  TotalAssetsByOwner = 'TOTAL_ASSETS_BY_OWNER',
  TotalAssetsByOwnerByAssetType = 'TOTAL_ASSETS_BY_OWNER_BY_ASSET_TYPE',
  TotalAssetPerDayByAssetType = 'TOTAL_ASSET_PER_DAY_BY_ASSET_TYPE',
  TotalCountCertificates = 'TOTAL_COUNT_CERTIFICATES',
  TotalCountException = 'TOTAL_COUNT_EXCEPTION',
  TotalCountFalsePositive = 'TOTAL_COUNT_FALSE_POSITIVE',
  TotalCountFixed = 'TOTAL_COUNT_FIXED',
  TotalCountFixedConfirmed = 'TOTAL_COUNT_FIXED_CONFIRMED',
  TotalCountOpen = 'TOTAL_COUNT_OPEN',
  TotalCountReopen = 'TOTAL_COUNT_REOPEN'
}

export type TimeSelectorType = ContinuousTimeSelectorType | CronTimeSelectorType

export enum TimeSeriesMetricTimeFrequencyEnum {
  Daily = 'DAILY',
  Hourly = 'HOURLY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY'
}

export enum TimeSeriesMetricTimeType {
  /** Count Critical Issues */
  CountCritical = 'COUNT_CRITICAL',
  /** Count Scans with Critical Risk Rating */
  CountCriticalScans = 'COUNT_CRITICAL_SCANS',
  /** Count Distribution By Service */
  CountDistributionByService = 'COUNT_DISTRIBUTION_BY_SERVICE',
  /** Count Distribution By Whois */
  CountDistributionByWhois = 'COUNT_DISTRIBUTION_BY_WHOIS',
  /** Count Exception Tickets */
  CountException = 'COUNT_EXCEPTION',
  /** Count False Positive Tickets */
  CountFalsePositive = 'COUNT_FALSE_POSITIVE',
  /** Total Count of Fingerprints */
  CountFingerprints = 'COUNT_FINGERPRINTS',
  /** Count Fixed Tickets */
  CountFixed = 'COUNT_FIXED',
  /** Count Fixed and Confirmed Tickets */
  CountFixedConfirmed = 'COUNT_FIXED_CONFIRMED',
  /** Count Hardening Issues */
  CountHardening = 'COUNT_HARDENING',
  /** Count Scans with Hardening Risk Rating */
  CountHardeningScans = 'COUNT_HARDENING_SCANS',
  /** Count High Issues */
  CountHigh = 'COUNT_HIGH',
  /** Count Scans with High Risk Rating */
  CountHighScans = 'COUNT_HIGH_SCANS',
  /** Count Scans with Important Risk Rating */
  CountImportantScans = 'COUNT_IMPORTANT_SCANS',
  /** Count Scans with Info Risk Rating */
  CountInfoScans = 'COUNT_INFO_SCANS',
  /** Count Issue Average Fix Time */
  CountIssueAverageFixTime = 'COUNT_ISSUE_AVERAGE_FIX_TIME',
  /** Count Issue Average Fix Time without risk */
  CountIssueAverageFixTimeNoRisk = 'COUNT_ISSUE_AVERAGE_FIX_TIME_NO_RISK',
  /** Count Low Issues */
  CountLow = 'COUNT_LOW',
  /** Count Scans with Low Risk Rating */
  CountLowScans = 'COUNT_LOW_SCANS',
  /** Count Medium Issues */
  CountMedium = 'COUNT_MEDIUM',
  /** Count Scans with Medium Risk Rating */
  CountMediumScans = 'COUNT_MEDIUM_SCANS',
  /** Count Monitored Assets */
  CountMonitoredAssets = 'COUNT_MONITORED_ASSETS',
  /** Count Non-Monitored Assets */
  CountNonMonitoredAssets = 'COUNT_NON_MONITORED_ASSETS',
  /** Count Of Vulnerability By Occurrence */
  CountOfVulnerabilityByOccurrence = 'COUNT_OF_VULNERABILITY_BY_OCCURRENCE',
  /** Count Of Vulnerability By Occurrence For An Asset */
  CountOfVulnerabilityByOccurrenceForAnAsset = 'COUNT_OF_VULNERABILITY_BY_OCCURRENCE_FOR_AN_ASSET',
  /** Count Open Tickets */
  CountOpen = 'COUNT_OPEN',
  /** Count of Out-of-Slo Tickets */
  CountOutOfSlo = 'COUNT_OUT_OF_SLO',
  /** Count Potential Issues */
  CountPotentially = 'COUNT_POTENTIALLY',
  /** Count Scans with Potentially Risk Rating */
  CountPotentiallyScans = 'COUNT_POTENTIALLY_SCANS',
  /** Count Potential Android APPs */
  CountPotentialAndroidApps = 'COUNT_POTENTIAL_ANDROID_APPS',
  /** Count Potential ASNs */
  CountPotentialAsns = 'COUNT_POTENTIAL_ASNS',
  /** Count Potential Domains */
  CountPotentialDomains = 'COUNT_POTENTIAL_DOMAINS',
  /** Count Potential IOS APPs */
  CountPotentialIosApps = 'COUNT_POTENTIAL_IOS_APPS',
  /** Count Potential IPv4 */
  CountPotentialIpv4 = 'COUNT_POTENTIAL_IPV4',
  /** Count Potential IPv6 */
  CountPotentialIpv6 = 'COUNT_POTENTIAL_IPV6',
  /** Count Potential Sub Domains */
  CountPotentialSubdomains = 'COUNT_POTENTIAL_SUBDOMAINS',
  /** Count Re-Open Tickets */
  CountReopen = 'COUNT_REOPEN',
  /** Count Scans */
  CountScans = 'COUNT_SCANS',
  /** Count Scans By Scan Profile */
  CountScansByScanProfile = 'COUNT_SCANS_BY_SCAN_PROFILE',
  /** Count Scans with Secure Risk Rating */
  CountSecureScans = 'COUNT_SECURE_SCANS',
  /** Count Ticket By Assigned By Day */
  CountTicketByAssignedByDay = 'COUNT_TICKET_BY_ASSIGNED_BY_DAY',
  /** Count Ticket By Status Per Month */
  CountTicketByStatusPerMonth = 'COUNT_TICKET_BY_STATUS_PER_MONTH',
  /** Count Ticket Per Priority Per Day */
  CountTicketPerPriorityPerDay = 'COUNT_TICKET_PER_PRIORITY_PER_DAY',
  /** Count Vulnerability Per Risk Per Asset */
  CountVulnerabilityPerRiskPerAsset = 'COUNT_VULNERABILITY_PER_RISK_PER_ASSET',
  /** Ratio Of Assets Covered By Monitoring Rules */
  RatioMonitoredAssets = 'RATIO_MONITORED_ASSETS',
  /** Total Assets */
  TotalAssets = 'TOTAL_ASSETS',
  /** Total Assets By Location */
  TotalAssetsByLocation = 'TOTAL_ASSETS_BY_LOCATION',
  /** Total Assets By Location By Asset Type */
  TotalAssetsByLocationByAssetType = 'TOTAL_ASSETS_BY_LOCATION_BY_ASSET_TYPE',
  /** Total Assets By Owner */
  TotalAssetsByOwner = 'TOTAL_ASSETS_BY_OWNER',
  /** Total Assets By Owner By Asset Type */
  TotalAssetsByOwnerByAssetType = 'TOTAL_ASSETS_BY_OWNER_BY_ASSET_TYPE',
  /** Total Asset Per Day By Asset Type */
  TotalAssetPerDayByAssetType = 'TOTAL_ASSET_PER_DAY_BY_ASSET_TYPE',
  /** Total count of certificates */
  TotalCountCertificates = 'TOTAL_COUNT_CERTIFICATES',
  /** Total Count Exception Tickets */
  TotalCountException = 'TOTAL_COUNT_EXCEPTION',
  /** Total Count False Positive Tickets */
  TotalCountFalsePositive = 'TOTAL_COUNT_FALSE_POSITIVE',
  /** Total Count Fixed Tickets */
  TotalCountFixed = 'TOTAL_COUNT_FIXED',
  /** Total Count Fixed and Confirmed Tickets */
  TotalCountFixedConfirmed = 'TOTAL_COUNT_FIXED_CONFIRMED',
  /** Total Count Open Tickets */
  TotalCountOpen = 'TOTAL_COUNT_OPEN',
  /** Total Count Re-Open Tickets */
  TotalCountReopen = 'TOTAL_COUNT_REOPEN'
}

export type TimeSeriesMetricType = {
  __typename?: 'TimeSeriesMetricType'
  timeFrequency?: Maybe<TimeSeriesMetricTimeFrequencyEnum>
  timeType: TimeSeriesMetricTimeType
  values?: Maybe<Array<Maybe<MetricValueType>>>
}

export type TimeSeriesMetricTypeValuesArgs = {
  after?: InputMaybe<Scalars['DateTime']['input']>
  before?: InputMaybe<Scalars['DateTime']['input']>
}

export type TimeSeriesMetricsType = {
  __typename?: 'TimeSeriesMetricsType'
  metrics: Array<Maybe<TimeSeriesMetricType>>
  pageInfo?: Maybe<PageInfo>
}

export type TlsCertificateTestCredentials = {
  __typename?: 'TlsCertificateTestCredentials'
  credentialName?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  tlsCertificate: Scalars['String']['output']
}

export type TlsCertificateTestCredentialsInput = {
  tlsCertificate?: InputMaybe<Scalars['String']['input']>
}

export type TlsCertificateTestCredentialsInstance = {
  __typename?: 'TlsCertificateTestCredentialsInstance'
  credentialName?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  tlsCertificate?: Maybe<Scalars['String']['output']>
}

export type TransferPlanMutation = {
  __typename?: 'TransferPlanMutation'
  plans?: Maybe<Array<Maybe<PlanNgType>>>
}

export type UiAutomationRuleInstanceInputType = {
  args: Array<InputMaybe<ArgInputType>>
  ruleId: Scalars['Int']['input']
}

export type UiAutomationRuleType = {
  __typename?: 'UIAutomationRuleType'
  code: Scalars['String']['output']
  description: Scalars['String']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  organisation?: Maybe<OrganisationType>
  params?: Maybe<Array<Scalars['String']['output']>>
}

export type UiAutomationRulesType = {
  __typename?: 'UIAutomationRulesType'
  pageInfo?: Maybe<PageInfo>
  rules: Array<Maybe<UiAutomationRuleType>>
}

export type UpdateActionInputType = {
  handler: Scalars['String']['input']
  id: Scalars['Int']['input']
  kwargs?: InputMaybe<Array<InputMaybe<ActionKwargsInputType>>>
}

export type UpdateActiveScanSummaryMutation = {
  __typename?: 'UpdateActiveScanSummaryMutation'
  scanSummary?: Maybe<ScanSummaryType>
}

export type UpdateAgentGroupMutation = {
  __typename?: 'UpdateAgentGroupMutation'
  agentGroup?: Maybe<AgentGroupType>
}

export type UpdateAgentMutation = {
  __typename?: 'UpdateAgentMutation'
  agent?: Maybe<AgentType>
}

export type UpdateApiKey = {
  __typename?: 'UpdateApiKey'
  apiKey?: Maybe<ApiKeyModelType>
}

export type UpdateAppCenterIntegrationMutation = {
  __typename?: 'UpdateAppCenterIntegrationMutation'
  integration?: Maybe<AppCenterIntegrationConfigurationType>
}

export type UpdateAssetMutation = {
  __typename?: 'UpdateAssetMutation'
  asset?: Maybe<AssetType>
}

export type UpdateAssetsLocationMutation = {
  __typename?: 'UpdateAssetsLocationMutation'
  assetLocations?: Maybe<Array<Maybe<AssetLocationType>>>
}

export type UpdateChecklistMutation = {
  __typename?: 'UpdateChecklistMutation'
  checklist?: Maybe<ChecklistType>
}

export type UpdateCommentMutation = {
  __typename?: 'UpdateCommentMutation'
  edit?: Maybe<TicketEditType>
}

export type UpdateJiraTicketMapMutation = {
  __typename?: 'UpdateJiraTicketMapMutation'
  jiraTicketMap?: Maybe<JiraTicketMapType>
}

export enum UpdateModeEnum {
  Automatic = 'AUTOMATIC',
  Passive = 'PASSIVE'
}

export type UpdateNgAssetsMutation = {
  __typename?: 'UpdateNGAssetsMutation'
  assets?: Maybe<Array<Maybe<NgAssetType>>>
}

export type UpdateOnboardingTaskCompletionState = {
  __typename?: 'UpdateOnboardingTaskCompletionState'
  onboardingTaskCompletionState?: Maybe<UserOnboardingTaskCompletionStateType>
}

export type UpdateOrganisationSettings = {
  __typename?: 'UpdateOrganisationSettings'
  settings?: Maybe<OrganisationSettingsType>
}

export type UpdateOrganisationUser = {
  __typename?: 'UpdateOrganisationUser'
  organisationUser?: Maybe<OrganisationUserType>
}

export type UpdateOwnerMutation = {
  __typename?: 'UpdateOwnerMutation'
  owner?: Maybe<OwnerType>
}

export type UpdatePotentialNodesMutation = {
  __typename?: 'UpdatePotentialNodesMutation'
  potentialNodes?: Maybe<Array<Maybe<PotentialNodesType>>>
}

export type UpdatePrioritySloMutation = {
  __typename?: 'UpdatePrioritySLOMutation'
  prioritySlo?: Maybe<PrioritySloType>
}

export type UpdateRuleInputType = {
  actions?: InputMaybe<Array<InputMaybe<UpdateActionInputType>>>
  active?: InputMaybe<Scalars['Boolean']['input']>
  context?: InputMaybe<ContextEnum>
  filter?: InputMaybe<FilterInputType>
  name?: InputMaybe<Scalars['String']['input']>
  sharedWithOrganisation?: InputMaybe<Scalars['Boolean']['input']>
}

export type UpdateRuleMutation = {
  __typename?: 'UpdateRuleMutation'
  rule?: Maybe<RuleType>
}

export type UpdateSloMutation = {
  __typename?: 'UpdateSLOMutation'
  slo?: Maybe<SloType>
}

export type UpdateSamlIntegrationConfigurationMutation = {
  __typename?: 'UpdateSamlIntegrationConfigurationMutation'
  samlIntegrationConfiguration?: Maybe<SamlIntegrationConfigurationType>
}

export type UpdateScan = {
  __typename?: 'UpdateScan'
  scan?: Maybe<ScanType>
}

/** Graphene mutation for updating a scanner. */
export type UpdateScannerMutation = {
  __typename?: 'UpdateScannerMutation'
  scanner?: Maybe<ScannerType>
}

export type UpdateTargetsByFilterMutation = {
  __typename?: 'UpdateTargetsByFilterMutation'
  job?: Maybe<Job>
  targets?: Maybe<Array<Maybe<TargetType>>>
}

export type UpdateTargetsByIdMutation = {
  __typename?: 'UpdateTargetsByIdMutation'
  job?: Maybe<Job>
  targets?: Maybe<Array<Maybe<TargetType>>>
}

export type UpdateTestCredentialsMutation = {
  __typename?: 'UpdateTestCredentialsMutation'
  testCredentials?: Maybe<TestCredentials>
}

export type UpdateTicketMutation = {
  __typename?: 'UpdateTicketMutation'
  ticket?: Maybe<TicketType>
}

export type UpdateUserOrganisationAccess = {
  __typename?: 'UpdateUserOrganisationAccess'
  message?: Maybe<Scalars['String']['output']>
}

export type UrlAssetInputType = {
  urls?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type UrlAssetType = {
  __typename?: 'UrlAssetType'
  id: Scalars['ID']['output']
  scans?: Maybe<Array<Maybe<ScanType>>>
  tags?: Maybe<Array<Maybe<TagsType>>>
  urls: Array<Scalars['String']['output']>
}

export type UrlAssetTypeScansArgs = {
  lastOnly?: InputMaybe<Scalars['Boolean']['input']>
}

/** Onboarding Task Completion State objects. */
export type UserOnboardingTaskCompletionStateType = {
  __typename?: 'UserOnboardingTaskCompletionStateType'
  completionTime?: Maybe<Scalars['DateTime']['output']>
  disabled: Scalars['Boolean']['output']
  isComplete: Scalars['Boolean']['output']
  taskId: Scalars['String']['output']
}

export type UserOnboardingTaskType = {
  __typename?: 'UserOnboardingTaskType'
  action: OnboardingTaskActionType
  category: Scalars['String']['output']
  checkboxText?: Maybe<Scalars['String']['output']>
  isComplete?: Maybe<Scalars['Boolean']['output']>
  isDisabled: Scalars['Boolean']['output']
  linkToDocumentation?: Maybe<Scalars['String']['output']>
  subtitle: Scalars['String']['output']
  taskId: Scalars['String']['output']
  title: Scalars['String']['output']
}

export type VersionInput = {
  end: Scalars['String']['input']
  endInclude: Scalars['Boolean']['input']
  start: Scalars['String']['input']
  startInclude: Scalars['Boolean']['input']
}

export type VersionMatchType = {
  __typename?: 'VersionMatchType'
  end?: Maybe<Scalars['String']['output']>
  endInclude?: Maybe<Scalars['Boolean']['output']>
  start?: Maybe<Scalars['String']['output']>
  startInclude?: Maybe<Scalars['Boolean']['output']>
}

export type VulnerabilitiesType = {
  __typename?: 'VulnerabilitiesType'
  pageInfo?: Maybe<PageInfo>
  vulnerabilities: Array<Maybe<VulnerabilityType>>
}

export type VulnerabilityAiRecommendationType = {
  __typename?: 'VulnerabilityAIRecommendationType'
  id: Scalars['ID']['output']
  recommendation: Scalars['String']['output']
}

export enum VulnerabilityCustomRiskRating {
  /** Critical */
  Critical = 'CRITICAL',
  /** Hardening */
  Hardening = 'HARDENING',
  /** High */
  High = 'HIGH',
  /** Important */
  Important = 'IMPORTANT',
  /** Info */
  Info = 'INFO',
  /** Low */
  Low = 'LOW',
  /** Medium */
  Medium = 'MEDIUM',
  /** Potentially */
  Potentially = 'POTENTIALLY',
  /** Secure */
  Secure = 'SECURE'
}

export type VulnerabilityInputType = {
  detail?: InputMaybe<Scalars['String']['input']>
  dna?: InputMaybe<Scalars['String']['input']>
  kbEntry?: InputMaybe<KnowledgeBaseVulnerabilityInputType>
  messagePath?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  metadata?: InputMaybe<Array<InputMaybe<MapInputType>>>
  riskRating?: InputMaybe<Scalars['String']['input']>
  technicalDetail: Scalars['String']['input']
  technicalDetailFormat?: InputMaybe<TextFormats>
  vulnerabilityLocation?: InputMaybe<VulnerabilityLocationInputType>
}

export type VulnerabilityLocationInputType = {
  asset: NgAssetInputType
  metadata?: InputMaybe<Array<InputMaybe<VulnerabilityLocationMetadataInputType>>>
}

export type VulnerabilityLocationMetadataInputType = {
  metadataType: MetadataType
  metadataValue: Scalars['String']['input']
}

export enum VulnerabilityLocationMetadataMetadataType {
  /** Code Location */
  CodeLocation = 'CODE_LOCATION',
  /** File Path */
  FilePath = 'FILE_PATH',
  /** Port */
  Port = 'PORT',
  /** Url */
  Url = 'URL'
}

export type VulnerabilityLocationMetadataType = {
  __typename?: 'VulnerabilityLocationMetadataType'
  metadataType?: Maybe<VulnerabilityLocationMetadataMetadataType>
  metadataValue?: Maybe<Scalars['String']['output']>
}

export type VulnerabilityLocationType = {
  __typename?: 'VulnerabilityLocationType'
  asset?: Maybe<NgAssetType>
  id: Scalars['ID']['output']
  metadata: Array<VulnerabilityLocationMetadataType>
}

export enum VulnerabilityTechnicalDetailFormat {
  /** HTML */
  Html = 'HTML',
  /** Markdown */
  Markdown = 'MARKDOWN'
}

export type VulnerabilityType = {
  __typename?: 'VulnerabilityType'
  aiRecommendation?: Maybe<VulnerabilityAiRecommendationType>
  customCvssV3BaseScore?: Maybe<Scalars['Float']['output']>
  customCvssV3Vector?: Maybe<Scalars['String']['output']>
  customRiskRating?: Maybe<VulnerabilityCustomRiskRating>
  detail?: Maybe<KnowledgeBaseVulnerabilityType>
  id: Scalars['ID']['output']
  messagePath?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  scan?: Maybe<ScanType>
  technicalDetail: Scalars['String']['output']
  technicalDetailFormat: VulnerabilityTechnicalDetailFormat
  tickets?: Maybe<Array<Maybe<TicketType>>>
  vulnerabilityLocation?: Maybe<VulnerabilityLocationType>
}

export type WebScanMutation = {
  __typename?: 'WebScanMutation'
  scan?: Maybe<ScanType>
}

export type WhoisFilterInputType = {
  address?: InputMaybe<Scalars['String']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  org?: InputMaybe<Scalars['String']['input']>
}
