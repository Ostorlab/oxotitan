<template>
  <v-chip
    v-for="(link, index) in truncatedLinks"
    :key="index"
    class="ma-1"
    label
    variant="tonal"
    color="blue-lighten-1"
  >
    <v-icon
      start
      size="24"
    >
      mdi-web
    </v-icon>
    {{ link.url }}
  </v-chip>
  <v-tooltip v-if="showMore === true">
    <div
      v-for="(link, index) in asset?.links || []"
      :key="index"
    >
      {{ link.url }}
    </div>
    <template #activator="{ props }">
      <v-chip
        v-bind="props"
        color="blue-lighten-1"
      >
        ...
      </v-chip>
    </template>
  </v-tooltip>
</template>

<script lang="ts">
import type { Maybe, OxoLinkAssetType, OxoUrlsAssetType } from '~/graphql/types'

export default defineComponent({
  name: 'OxoUrlAsset',
  props: {
    asset: {
      type: Object as () => OxoUrlsAssetType | null,
      default: null
    }
  },
  computed: {
    /**
     * Truncate the links to show only the first 5.
     * @returns {Array<Maybe<OxoLinkAssetType>>}
     */
    truncatedLinks(): Array<Maybe<OxoLinkAssetType>> {
      return (this.asset?.links || []).slice(0, 5)
    },
    /**
     * Determine if there are more links than the truncated links.
     * @returns {boolean}
     */
    showMore(): boolean {
      return (this.asset?.links?.length || 0) > 5
    }
  }
})
</script>
