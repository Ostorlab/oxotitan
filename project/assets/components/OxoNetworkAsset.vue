<template>
  <v-chip
    v-for="(network, index) in asset.networks"
    :key="index"
    label
    color="grey-darken-2"
    variant="tonal"
    class="ma-1"
  >
    <v-icon
      start
      size="24"
    >
      mdi-ip
    </v-icon>
    <span v-if="(network.mask || '').trim() !== ''">
      {{ network.host }}/{{ network.mask }}
    </span>
    <span v-else>{{ network.host }}</span>
  </v-chip>
</template>

<script lang="ts">
import type { OxoNetworkAssetType } from '~/graphql/types'

export default defineComponent({
  name: 'OxoNetworkAsset',
  props: {
    asset: {
      type: Object as () => OxoNetworkAssetType,
      default: null
    }
  }
})
</script>
