<template>
  <v-chip
    :color="colorText.color"
    label
    :size="size"
    variant="text"
  >
    <v-img
      v-if="isIcon===false"
      eager
      :src="colorText.icon"
      width="25"
      style="margin-left: -6px;  margin-right: 6px;"
    />
    <template
      v-if="isIcon===true"
      #prepend
    >
      <v-icon
        start
        :color="colorText.color"
      >
        {{ colorText.icon }}
      </v-icon>
    </template>

    {{ colorText.text }}
  </v-chip>
</template>

<script lang="ts">
import { assetPlatformRenderConfig } from '~/project/utils/asset'

export default defineComponent({
  name: 'DfPlatform',
  props: {
    platform: {
      type: String || null,
      default: null
    },
    size: {
      type: String || null,
      default: 'default'
    }
  },
  computed: {
    colorText(): { icon: string, text: string, color: string } {
      return assetPlatformRenderConfig(this.platform)
    },
    isIcon(): boolean {
      return this.colorText?.icon?.startsWith('mdi')
    }
  }
})
</script>

<style scoped></style>
