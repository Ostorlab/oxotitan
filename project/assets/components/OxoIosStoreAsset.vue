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
    {{ appName }}
  </v-chip>
</template>

<script lang="ts">
import type { Maybe, OxoIosStoreAssetType } from '~/graphql/types'

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
     * Whether the asset has an application name or not.
     */
    assetHasApplicationName(): boolean {
      return this.asset?.applicationName !== null && this.asset?.applicationName !== undefined && this.asset?.applicationName?.trim() !== ''
    },
    /**
     * Returns the asset string with the application name and bundle id if available.
     */
    appName(): string {
      let appName: Maybe<string> | undefined = ''
      if (this.assetHasApplicationName === true) {
        appName = this.asset?.applicationName
      }
      if (this.assetHasApplicationName === true && (this.asset?.bundleId || '').trim() !== '') {
        appName = `${appName} (${this.asset.bundleId})`
      } else {
        appName = this.asset.bundleId
      }
      return appName as string
    }
  }
})
</script>

<style scoped>

</style>
