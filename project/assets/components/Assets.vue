<template>
  <div
    v-for="(asset, index) in assets"
    :key="index"
    class="d-inline"
  >
    <OXOAsset
      :asset="asset"
    />
  </div>
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
