import type { AggregatedKnowledgeBaseVulnerabilityType, Maybe, ScanType } from '~/graphql/types'

export type VulnerabilityDetailBreadcrumbsType = Array<{
  text: string
  disabled?: boolean
  to?: string
  exact?: boolean
  scans?: Array<ScanType>
  scanId?: string | number
  kbvulnerabilities?: Array<Maybe<AggregatedKnowledgeBaseVulnerabilityType & { key?: string }>>
}>
