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
          class="cursor-pointer"
          @click="goToDetail(item)"
          @click.middle="goToDetailNewTab(item)"
        />
      </template>
      <template #[`item.title`]="{ item }">
        <div
          class="cursor-pointer"
          @click="goToDetail(item)"
          @click.middle="goToDetailNewTab(item)"
        >
          {{ item.title }}
        </div>
      </template>
      <template #[`item.description`]="{ item }">
        <div
          class="cursor-pointer"
          @click="goToDetail(item)"
          @click.middle="goToDetailNewTab(item)"
        >
          {{ item.description }}
        </div>
      </template>
      <template #[`item.show`]="{ item }">
        <v-btn
          size="small"
          variant="text"
          :disabled="vulnerabilityPreviewLoading === true && (item.key !== selectedVulnerabilityKey)"
          :loading="vulnerabilityPreviewLoading === true && (item.key === selectedVulnerabilityKey)"
          icon="mdi-magnify"
          @click="showVulnDetails(item)"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { sort } from 'fast-sort'
import { DfRisk } from '~/dragonfly/components/Tags/DfRisk'
import type { OxoVulnerabilityType } from '~/graphql/types'
import { type FormattedVulnz } from '~/project/types'

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

export default defineComponent({
  name: 'VulnzTable',
  components: {
    DfRisk
  },
  props: {
    vulnz: {
      type: Array as () => Array<OxoVulnerabilityType>,
      required: true,
      default: () => []
    },
    vulnerabilityPreviewLoading: {
      type: Boolean,
      default: false
    },
    selectedVulnerabilityKey: {
      type: String as () => string | null,
      required: true
    }
  },
  emits: ['goToDetail', 'goToDetailNewTab', 'showVulnDetails'],
  data() {
    return {
      headers: [
        {
          title: 'Show',
          value: 'show',
          align: 'left',
          width: '4%'
        },
        {
          title: 'Risk | CVSS',
          value: 'risk',
          align: 'left',
          width: '7%'
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
    goToDetail(vuln: FormattedVulnz): void {
      this.$emit('goToDetail', vuln)
    },
    /**
     * Emits an event to open the vulnerability page in a new tab.
     */
    goToDetailNewTab(vuln: FormattedVulnz): void {
      this.$emit('goToDetailNewTab', vuln)
    },
    /**
     * Emits an event to show the vulnerability details.
     */
    showVulnDetails(vuln: FormattedVulnz): void {
      this.$emit('showVulnDetails', vuln)
    }
  }
})
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}
</style>
