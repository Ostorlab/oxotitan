<template>
  <v-chip
    label
    color="success"
    variant="tonal"
    class="ma-1"
  >
    <v-icon
      start
      size="24"
    >
      mdi-android
    </v-icon>
    {{ asset.packageName || 'Android File' }}
  </v-chip>
</template>

<script lang="ts">
import type { OxoAndroidFileAssetType } from '~/graphql/types'

export default defineComponent({
  name: 'OxoAndroidStoreAsset',
  props: {
    asset: {
      type: Object as () => OxoAndroidFileAssetType,
      default: null
    }
  }
})
</script>

<style scoped>

</style>
