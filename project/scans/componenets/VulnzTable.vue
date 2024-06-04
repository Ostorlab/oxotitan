<template>
  <div>
    <v-data-table
      hover
      :headers="headers"
      :items="kbVulnerabilities"
      :items-per-page="-1"
    >
      <template #[`item.risk`]="{ item }">
        <DfRisk
          :cvss-score="item.cvssV3"
          :risk="item.risk"
        />
      </template>
      <template #[`item.title`]="{ item }">
        {{ item.title }}
      </template>
      <template #[`item.description`]="{ item }">
        {{ item.description }}
      </template>
      <template #[`item.show`]="{ item }">
        <v-btn
          size="small"
          variant="flat"
          icon="mdi-arrow-expand"
          @click="showVulnDetails(item)"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { sort } from 'fast-sort'
import { DfRisk } from '~/dragonfly/components/Tags/DfRisk'
import type { Maybe, RiskRating } from '~/graphql/types'

const Risks = {
  info: 1,
  important: 2,
  secure: 3,
  hardening: 4,
  potentially: 5,
  low: 6,
  medium: 7,
  high: 8,
  critical: 9
}

type FormattedVulnz = {
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

export default defineComponent({
  name: 'VulnzTable',
  components: {
    DfRisk
  },
  props: {
    vulnz: {
      type: Array as () => Array<any>,
      required: true,
      default: () => []
    }
  },
  emits: ['goToDetail', 'goToDetailNewTab', 'showVulnDetails'],
  data() {
    return {
      headers: [
        {
          title: 'Show',
          value: 'show',
          align: 'left'
        },
        {
          title: 'Risk | CVSS',
          value: 'risk',
          align: 'left'
        },
        {
          title: 'Title',
          value: 'title',
          align: 'left'
        },
        {
          title: 'Short description',
          value: 'description',
          align: 'left'
        }
      ]
    }
  },
  computed: {
    /***
      * Returns the vulnerabilities sorted by risk and CVSS score.
      */
    kbVulnerabilities(): Array<FormattedVulnz> {
      const formattedVulnz: Array<FormattedVulnz> = []

      for (const v of this.vulnz) {
        if (v?.kb?.title === 'Use of Outdated Vulnerable Component') {
          let knownVulnzAddedWithoutMetadata: boolean = false
          for (const individualVulnerability of v!.vulnerabilities!.vulnerabilities) {
            if (
              individualVulnerability?.metadata === null
              || individualVulnerability?.metadata === undefined
            ) {
              if (!knownVulnzAddedWithoutMetadata) {
                formattedVulnz.push({
                  key: individualVulnerability?.id as string,
                  goToVulnId: false,
                  risk: individualVulnerability?.customRiskRating,
                  title: v.kb.title,
                  securityIssue: v.kb.securityIssue,
                  privacyIssue: v.kb.privacyIssue,
                  targetedByMalware: v.kb.targetedByMalware,
                  targetedByRansomware: v.kb.targetedByRansomware,
                  targetedByNationState: v.kb.targetedByNationState,
                  hasPublicExploit: v.kb.hasPublicExploit,
                  cvssV3: v.highestCvssV3BaseScore,
                  description: v.kb.shortDescription,
                  descriptionFormat: v.kb.shortDescriptionFormat,
                  kb: v.kb
                })
                knownVulnzAddedWithoutMetadata = true
              }
            } else {
              const dependencyName = (individualVulnerability as any)?.metadata?.find(
                (i) => i.name === 'dependency_name'
              ).value
              const dependencyVersion = (individualVulnerability as any)?.metadata?.find(
                (i) => i.name === 'dependency_version'
              ).value

              formattedVulnz.push({
                key: individualVulnerability.id,
                goToVulnId: true,
                risk: individualVulnerability.customRiskRating,
                cvssV3: individualVulnerability.customCvssV3BaseScore,
                title: `${v.kb.title} for ${dependencyName} version ${dependencyVersion}`,
                securityIssue: v.kb.securityIssue,
                privacyIssue: v.kb.privacyIssue,
                targetedByMalware: v.kb.targetedByMalware,
                targetedByRansomware: v.kb.targetedByRansomware,
                targetedByNationState: v.kb.targetedByNationState,
                hasPublicExploit: v.kb.hasPublicExploit,
                description: v.kb.shortDescription,
                descriptionFormat: v.kb.shortDescriptionFormat,
                kb: v.kb
              })
            }
          }
        } else {
          formattedVulnz.push({
            key: v?.kb?.title as string,
            goToVulnId: false,
            risk: v.highestRiskRating,
            title: v?.kb?.title as string,
            securityIssue: v?.kb?.securityIssue as boolean,
            privacyIssue: v?.kb?.privacyIssue as boolean,
            targetedByMalware: v?.kb?.targetedByMalware as boolean,
            targetedByRansomware: v?.kb?.targetedByRansomware as boolean,
            targetedByNationState: v?.kb?.targetedByNationState as boolean,
            hasPublicExploit: v?.kb?.hasPublicExploit as boolean,
            cvssV3: v.highestCvssV3BaseScore,
            description: v?.kb?.shortDescription,
            descriptionFormat: v?.kb?.shortDescriptionFormat as KnowledgeBaseVulnerabilityShortDescriptionFormat,
            kb: v.kb
          })
        }
      }

      return sort(formattedVulnz).by([
        {
          desc: (v) => Risks[v?.risk?.toLocaleLowerCase() || '']
        },
        { desc: (v) => v.cvssV3 }
      ])
    }
  },
  methods: {
    /**
     * Emits an event to open the vulnerability page.
     */
    goToDetail(item): void {
      this.$emit('goToDetail', item)
    },
    /**
     * Emits an event to open the vulnerability page in a new tab.
     */
    goToDetailNewTab(item): void {
      this.$emit('goToDetailNewTab', item)
    },
    /**
     * Emits an event to show the vulnerability details.
     */
    showVulnDetails(item): void {
      this.$emit('showVulnDetails', item)
    }
  }
})
</script>
