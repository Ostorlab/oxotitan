<template>
  <v-chip
    label
    :color="platformIconAndText.color"
    size="small"
  >
    <v-icon
      start
      size="24"
      class="ml-0"
    >
      {{ platformIconAndText.icon }}
    </v-icon>
    {{ platformIconAndText.text }}
  </v-chip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Platform } from '~/project/types'

export default defineComponent({
  name: 'DevicePlatform',
  props: {
    platform: {
      type: String as () => Platform,
      required: true
    }
  },
  computed: {
    platformIconAndText(): { icon: string, text: string, color: string } {
      switch (this.platform) {
        case Platform.Android:
          return { icon: 'mdi-android', text: 'Android', color: 'success' }
        case Platform.Ios:
          return { icon: 'mdi-apple', text: 'IPhone', color: 'grey-darken-1' }
        case Platform.IosIpad:
          return { icon: 'mdi-tablet', text: 'IPad', color: 'grey-darken-1' }
        default:
          return { icon: 'mdi-help', text: 'Unknown', color: 'grey-lighten' }
      }
    }
  }
})
</script>

<style scoped>

</style>
