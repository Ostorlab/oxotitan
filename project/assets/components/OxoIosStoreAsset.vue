<template>
  <v-chip
    label
    color="grey-darken-1"
    variant="tonal"
    class="ma-1"
  >
    <v-avatar
      start
      rounded="0"
      size="24"
    >
      <v-img
        src="/apps.png"
      />
    </v-avatar>
    {{ assetString }}
  </v-chip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { OxoIosStoreAssetType } from '~/graphql/types'

export default defineComponent({
  name: 'OxoIosStoreAsset',
  props: {
    asset: {
      type: Object as () => OxoIosStoreAssetType,
      default: null
    }
  },
  computed: {
    /**
     * Returns the asset string with the application name and bundle id if available.
     */
    assetString(): string {
      if (this.asset.bundleId !== null && this.asset.bundleId !== undefined) {
        return `${this.asset.applicationName} (${this.asset.bundleId})`
      }
      return this.asset.applicationName as string
    }
  }
})
</script>

<style scoped>

</style>
