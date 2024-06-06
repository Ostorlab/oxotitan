<template>
  <v-card variant="outlined">
    <v-breadcrumbs
      :items="filteredBreadcrumbs"
      divider=">"
      class="pa-1 ml-0"
    >
      <template #item="{ item }">
        <v-breadcrumbs-item
          :href="item.href"
          :disabled="item.disabled"
          class="pa-0"
        >
          <v-menu
            v-if="(item.scans || []).length > 0"
            offset-y
            max-height="680"
          >
            <template #activator="{ props }">
              <v-btn
                color="primary"
                v-bind="props"
                variant="text"
                active-class="no-active"
              >
                {{ item.text }}
                <v-icon
                  end
                >
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list density="compact">
              <div
                v-for="(subitem, i) in item.scans"
                :key="`scan-${i}`"
              >
                <v-list-item :to="constructScanDetailLink(subitem)">
                  <!-- TODO (Rabson) Update to add support for assets -->
                  <v-list-item-title>
                    <code>{{ getScanTitle(subitem) }}</code>
                  </v-list-item-title>
                  <template
                    v-if="
                      subitem.assetType === 'android'
                        || subitem.assetType === 'ios'
                    "
                  >
                    <v-img
                      v-if="subitem.b64Icon !== undefined && subitem.b64Icon.length > 0"
                      :src="`data:image/png;base64,${subitem.b64Icon}`"
                      alt="Icon"
                    />
                    <v-list-item-title>
                      <code>{{ getScanTitle(subitem) }}</code>
                    </v-list-item-title>
                  </template>
                  <template
                    v-else-if="
                      subitem.assetType === 'android_store'
                        || subitem.assetType === 'ios_store'
                    "
                  >
                    <v-img
                      v-if="subitem.b64Icon !== undefined && subitem.b64Icon.length > 0"
                      :src="`data:image/png;base64,${subitem.b64Icon}`"
                      alt="Icon"
                    />
                    <v-list-item-title>
                      <code>{{ getScanTitle(subitem) }}</code>
                    </v-list-item-title>
                  </template>
                  <template v-else-if="subitem.assetType === 'web'">
                    <v-icon>mdi-web</v-icon>
                    <v-list-item-title>
                      <code>{{ subitem.asset.urls.join(',') }}</code>
                    </v-list-item-title>
                  </template>
                  <template v-else-if="subitem.assetType === 'network'">
                    <v-icon>mdi-ip</v-icon>
                    <v-list-item-title>
                      <code>{{ subitem.asset.networks.join(',') }}</code>
                    </v-list-item-title>
                  </template>
                </v-list-item>
                <v-divider
                  v-if="i === 0 && (item.scans || []).length > 1"
                  class="mb-2"
                />
              </div>
            </v-list>
          </v-menu>
          <v-menu
            v-else-if="(item.kbvulnerabilities || []).length > 0"
            offset-y
            max-height="680"
          >
            <template #activator="{ props }">
              <v-btn
                color="primary"
                v-bind="props"
                variant="text"
                active-class="no-active"
              >
                {{ item.text }}<v-icon
                  end
                >
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list density="compact">
              <div
                v-for="(subitem, i) in item.kbvulnerabilities"
                :key="`vuln-${i}`"
              >
                <v-list-item
                  :key="i"
                  :to="constructVulnDetailLink(subitem)"
                >
                  <div class="d-flex align-center">
                    <DfRisk
                      :risk="subitem.risk"
                      small
                    />
                    <v-list-item-title class="ml-2">
                      {{ subitem.title }}
                    </v-list-item-title>
                  </div>
                </v-list-item>
                <v-divider
                  v-if="i === 0"
                  class="mb-2"
                />
              </div>
            </v-list>
          </v-menu>
          <v-btn
            v-else
            color="primary"
            variant="text"
            :to="item.to"
            active-class="no-active"
          >
            {{ item.text }}
          </v-btn>
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </v-card>
</template>

<script lang="ts">
import crc32 from 'crc32/lib/crc32'
import { DfRisk } from '~/dragonfly/components/Tags/DfRisk'
import type { VulnerabilityDetailBreadcrumbsType } from '~/dragonfly/components/Sections/DfBreadcrumbs/types'
import type { OxoScanType } from '~/graphql/types'
import type { FormattedVulnz, Scanner } from '~/project/types'

export default defineComponent({
  name: 'DfBreadcrumbs',
  components: { DfRisk },
  props: {
    breadcrumbs: {
      type: Array as () => VulnerabilityDetailBreadcrumbsType,
      default: () => []
    },
    scanId: {
      type: String as () => string | null,
      default: null
    },
    vulnTitle: {
      type: String as () => string | null,
      default: null
    },
    scanner: {
      type: Object as () => Scanner | null,
      default: null
    }
  },
  computed: {
    /**
     * Updated breadcrumbs list depending on whether scans or vulnerabilities are present or not.
     */
    filteredBreadcrumbs(): VulnerabilityDetailBreadcrumbsType {
      return (this.breadcrumbs || []).map((item) => {
        if (Object.keys(item).includes('scans') === true) {
          const currentScanIndex = (item?.scans || []).findIndex((scan) => scan.id === this.scanId)
          if (currentScanIndex !== 0 && currentScanIndex !== -1) {
            const currentScan = (item?.scans || []).splice(currentScanIndex, 1)[0];
            (item?.scans || []).unshift(currentScan)
          }
        }
        if (Object.keys(item).includes('kbvulnerabilities') === true) {
          const currentVulnIndex = (item?.kbvulnerabilities || []).findIndex((vuln) => vuln?.key === this.vulnTitle || vuln?.kb?.id === this.vulnTitle)
          if (currentVulnIndex !== 0 && currentVulnIndex !== -1) {
            const currentScan = (item?.kbvulnerabilities || []).splice(currentVulnIndex, 1)[0];
            (item?.kbvulnerabilities || []).unshift(currentScan)
          }
        }
        return item
      })
    }
  },
  methods: {
    /**
     * Construct the link for the scan page.
     * @param scan The scan whose link to construct.
     */
    constructScanDetailLink(scan: OxoScanType): string {
      if (this.scanner !== null) {
        return `/scan/${crc32(this.scanner.endpoint)}/${scan.id}`
      }
      return `/scan/${scan.id}`
    },
    /**
     * Construct the link for the vulnerability detail page.
     * @param vuln The vulnerability whose link to construct.
     */
    constructVulnDetailLink(vuln: FormattedVulnz): string {
      if (this.scanner !== null) {
        return `/scan/${crc32(this.scanner.endpoint)}/${this.scanId}/vuln/${vuln.key ?? vuln.kb.id}`
      } else if (vuln.goToVulnId === true) {
        return `/scan/${this.scanId}/vuln/id/${vuln.key}`
      } else {
        return `/scan/${this.scanId}/vuln/${vuln.kb.id}`
      }
    },
    /**
     * Get the scan title.
     * @param scan The scan whose title to get.
     */
    getScanTitle(scan: OxoScanType): string {
      if (scan?.packageName !== null && scan?.packageName !== undefined) {
        return scan?.version === null ? scan.packageName : `${scan.packageName}:${scan.version}`
      } else if ((scan?.asset as any)?.packageName !== null && (scan?.asset as any)?.packageName !== undefined) {
        return (scan?.asset as any)?.packageName
      } else if (scan?.assetType !== null && scan?.assetType !== undefined) {
        return scan?.assetType
      } else if (scan?.title !== undefined && scan?.title !== null) {
        return scan.title
      } else {
        return `Scan ${scan.id}`
      }
    }
  }
})
</script>

<style scoped>
.v-btn--active.no-active::before {
  opacity: 0 !important;
}
</style>
