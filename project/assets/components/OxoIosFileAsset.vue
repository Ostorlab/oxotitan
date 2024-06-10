<template>
  <v-chip
    label
    color="grey-darken-1"
    variant="tonal"
    class="ma-1"
  >
    <v-icon
      start
      size="24"
    >
      mdi-apple
    </v-icon>
    {{ asset.bundleId }}
  </v-chip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { OxoIosFileAssetType } from '~/graphql/types'

export default defineComponent({
  name: 'OxoIosFileAsset',
  props: {
    asset: {
      type: Object as () => OxoIosFileAssetType,
      default: null
    }
  }
})
</script>

<style scoped>

</style>
