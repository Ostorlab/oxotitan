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
  <v-chip
    v-if="showMore"
    color="blue-lighten-1"
  >
    ...
  </v-chip>
</template>

<script lang="ts">
import type { OxoUrlsAssetType } from '~/graphql/types'

export default defineComponent({
  name: 'OxoUrlAsset',
  props: {
    asset: {
      type: Object as () => OxoUrlsAssetType,
      default: null
    }
  },
  computed: {
    truncatedLinks() {
      return (this.asset?.links || []).slice(0, 5)
    },
    showMore(): boolean {
      return (this.asset?.links?.length || 0) > 5
    }
  }
})
</script>
