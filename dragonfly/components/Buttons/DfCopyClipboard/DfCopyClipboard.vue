<template>
  <v-btn
    :size="size"
    @click="copyText"
  >
    <v-icon
      :size="size"
      :end="end"
      :start="start"
      :color="localColor"
    >
      {{ icon }}
    </v-icon>
  </v-btn>
</template>

<script lang="ts">
import type { VBtnProps } from '~/dragonfly/components/Buttons/types'

interface Data {
  icon: string
  localColor: string | null
}

const SUCCESS_ICON = 'mdi-checkbox-marked-circle'
const DEFAULT_ICON = 'mdi-content-copy'
export default defineComponent({
  name: 'DfCopyClipboard',
  props: {
    text: {
      type: String,
      default: null
    },
    color: {
      type: String as () => string | null,
      default: null
    },
    end: {
      type: Boolean,
      default: false
    },
    start: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as () => VBtnProps['size'],
      default: 'small'
    }
  },
  data(): Data {
    return {
      icon: DEFAULT_ICON,
      localColor: null
    }
  },
  watch: {
    color: {
      immediate: true,
      handler(newVal: string) {
        this.localColor = newVal
      }
    }
  },
  methods: {
    /**
     * Copy text to clipboard and trigger update of icons.
     */
    copyText(): void {
      this.icon = SUCCESS_ICON
      this.localColor = 'success'
      navigator.clipboard.writeText(this.text)
      setTimeout(this.reset, 1000)
    },
    /**
     * Reset icon and color.
     */
    reset(): void {
      this.icon = DEFAULT_ICON
      this.localColor = this.color
    }
  }
})
</script>
