<template>
  <v-chip
    v-for="(link, index) in (asset.domainNames || [])"
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
    {{ link.name }}
  </v-chip>
</template>

<script lang="ts">
export default defineComponent({
  name: 'OxoDomainAsset',
  props: {
    asset: {
      type: Object,
      default: null
    }
  }
})
</script>
