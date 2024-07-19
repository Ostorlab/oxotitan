<template>
  <v-chip
    v-for="(domain, index) in truncatedDomains"
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
    {{ domain.name }}
  </v-chip>
  <v-tooltip v-if="showMore === true">
    <div
      v-for="(domain, index) in asset?.domainNames || []"
      :key="index"
    >
      {{ domain.name }}
    </div>
    <template #activator="{ props }">
      <v-chip
        v-bind="props"
        color="blue-lighten-1"
      >
        ...
      </v-chip>
    </template>
  </v-tooltip>
</template>

<script lang="ts">
export default defineComponent({
  name: 'OxoDomainAsset',
  props: {
    asset: {
      type: Object,
      default: null
    }
  },
  computed: {
    /**
     * Truncate the domains to show only the first 5.
     * @returns {Array<{ name: string }>}
     */
    truncatedDomains(): Array<{ name: string }> {
      return (this.asset?.domainNames || []).slice(0, 5)
    },
    /**
     * Determine if there are more domains than the truncated domains.
     * @returns {boolean}
     */
    showMore(): boolean {
      return (this.asset?.domainNames?.length || 0) > 5
    }
  }
})
</script>
