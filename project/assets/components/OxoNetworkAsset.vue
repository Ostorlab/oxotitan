<template>
  <v-chip
    v-for="(network, index) in truncatedNetworks"
    :key="index"
    label
    color="grey-darken-2"
    variant="tonal"
    class="ma-1"
  >
    <v-icon
      start
      size="24"
    >
      mdi-ip
    </v-icon>
    <span v-if="(network.mask || '').trim() !== ''">
      {{ network.host }}/{{ network.mask }}
    </span>
    <span v-else>{{ network.host }}</span>
  </v-chip>

  <v-tooltip v-if="showMore === true">
    <div
      v-for="(network, index) in asset?.networks || []"
      :key="index"
    >
      <span v-if="(network.mask || '').trim() !== ''">
        {{ network.host }}/{{ network.mask }}
      </span>
      <span v-else>
        {{ network.host }}
      </span>
    </div>
    <template #activator="{ props }">
      <v-chip
        v-bind="props"
        color="grey-darken-2"
      >
        ...
      </v-chip>
    </template>
  </v-tooltip>
</template>

<script lang="ts">
import type { Maybe, OxoIpRangeAssetType, OxoNetworkAssetType } from '~/graphql/types'

export default defineComponent({
  name: 'OxoNetworkAsset',
  props: {
    asset: {
      type: Object as () => OxoNetworkAssetType,
      default: null
    }
  },
  computed: {
    /**
     * Truncate the networks to show only the first 5.
     * @returns {Array<Maybe<OxoIpRangeAssetType>>}
     */
    truncatedNetworks(): Array<Maybe<OxoIpRangeAssetType>> {
      return (this.asset?.networks || []).slice(0, 5)
    },
    /**
     * Determine if there are more networks than the truncated networks.
     * @returns {boolean}
     */
    showMore(): boolean {
      return (this.asset?.networks?.length || 0) > 5
    }
  }
})
</script>
