<template>
  <v-item-group
    v-for="(asset, index) in assets"
    :key="index"
  >
    <OXOAsset
      :asset="asset"
    />
  </v-item-group>
</template>

<script lang="ts">
import OXOAsset from '~/project/assets/components/Asset.vue'
import type { OxoAssetType } from '~/graphql/types'

export default defineComponent({
  name: 'OXOAssets',
  components: { OXOAsset },
  props: {
    assets: {
      type: Array as () => Array<OxoAssetType>,
      default: () => []
    }
  }
})
</script>
