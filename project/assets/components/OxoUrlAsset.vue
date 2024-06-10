<template>
  <v-chip
    v-for="(link, index) in asset.links"
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
    {{ link }}
  </v-chip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { OxoUrlAssetType } from '~/graphql/types'

export default defineComponent({
  name: 'OxoUrlAsset',
  props: {
    asset: {
      type: Object as () => OxoUrlAssetType,
      default: null
    }
  }
})
</script>

<style scoped>

</style>
