<template>
  <component
    :is="assetComponent"
    v-if="assetComponent"
    :asset="asset"
  />
</template>

<script lang="ts">
import type { OxoAssetType } from '~/graphql/types'
import OxoUrlAsset from '~/project/assets/components/OxoUrlAsset.vue'
import OxoDomainAsset from '~/project/assets/components/OxoDomainAsset.vue'
import OxoNetworkAsset from '~/project/assets/components/OxoNetworkAsset.vue'
import OxoIosStoreAsset from '~/project/assets/components/OxoIosStoreAsset.vue'
import OxoIosFileAsset from '~/project/assets/components/OxoIosFileAsset.vue'
import OxoAndroidStoreAsset from '~/project/assets/components/OxoAndroidStoreAsset.vue'
import OxoAndroidFileAsset from '~/project/assets/components/OxoAndroidFileAsset.vue'

export default defineComponent({
  name: 'OXOAsset',
  props: {
    asset: {
      type: Object as () => OxoAssetType,
      default: null
    }
  },

  computed: {
    /**
     * Returns the component to render based on the asset type.
     */
    assetComponent(): ReturnType<typeof defineComponent> | null {
      switch (this.asset.__typename) {
        case 'OxoAndroidFileAssetType':
          return OxoAndroidFileAsset
        case 'OxoAndroidStoreAssetType':
          return OxoAndroidStoreAsset
        case 'OxoIOSFileAssetType':
          return OxoIosFileAsset
        case 'OxoIOSStoreAssetType':
          return OxoIosStoreAsset
        case 'OxoNetworkAssetType':
          return OxoNetworkAsset
        case 'OxoUrlsAssetType':
          return OxoUrlAsset
        case 'OxoDomainNameAssetsType':
          return OxoDomainAsset
        default:
          return null
      }
    }
  }
})
</script>
