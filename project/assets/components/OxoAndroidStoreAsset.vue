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
      mdi-google-play
    </v-icon>
    {{ appName }}
  </v-chip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { OxoAndroidStoreAssetType } from '~/graphql/types'

export default defineComponent({
  name: 'OxoAndroidStoreAsset',
  props: {
    asset: {
      type: Object as () => OxoAndroidStoreAssetType,
      default: null
    }
  },
  computed: {
    /**
     * Returns the application name or package name if the application name is not available.
     */
    appName(): string {
      if (this.asset.applicationName !== undefined && this.asset.packageName !== undefined && this.asset.applicationName !== null && this.asset.packageName !== null) {
        return `${this.asset.applicationName} (${this.asset.packageName})`
      }
      if (this.asset.applicationName !== null && this.asset.applicationName !== undefined) {
        return this.asset.applicationName
      }
      return this.asset.packageName as string
    }
  }
})
</script>

<style scoped>

</style>
