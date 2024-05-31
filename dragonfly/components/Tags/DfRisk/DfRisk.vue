<template>
  <v-chip
    v-if="reverse === false"
    :color="colorText.color"
    :size="size"
    :variant="variant"
    label
    :close="close"
    @click:close="$emit('closeRiskRating', risk)"
  >
    {{ colorText.text }}
    <template v-if="cvssScore !== null">
      <span class="mx-2">|</span>{{ cvssScore }}
    </template>
  </v-chip>
  <v-chip
    v-else
    color="white"
    :size="size"
    :variant="variant"
    var
    label
    :class="[`${colorText.color}-text`]"
    :close="close"
    @click:close="$emit('closeRiskRating', risk)"
  >
    {{ colorText.text }}<template
      v-if="cvssScore !== null"
    >
      <span class="mx-2">|</span>{{ cvssScore }}
    </template>
  </v-chip>
</template>

<script lang="ts">
import type { Maybe, RiskRating } from '~/graphql/types'

export default defineComponent({
  name: 'DfRisk',
  props: {
    risk: {
      type: String as () => Maybe<RiskRating>,
      required: true
    },
    size: {
      type: String as () => string | number,
      default: 'small'
    },
    cvssScore: {
      type: Number as () => Maybe<number>,
      default: null
    },
    variant: {
      type: String as () => 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain',
      default: 'flat'
    },
    close: {
      type: Boolean,
      default: false
    },
    reverse: {
      type: Boolean,
      default: false
    }
  },
  emits: ['closeRiskRating'],
  computed: {
    colorText(): { color: string, text: string } {
      if (this.risk) {
        switch (this.risk.toLowerCase()) {
          case 'critical':
            return { color: 'grey-darken-4', text: 'Critical' }
          case 'high':
            return { color: 'red', text: 'High' }
          case 'medium':
            return { color: 'orange-darken-1', text: 'Medium' }
          case 'low':
            return {
              color: 'yellow-darken-1',
              text: 'Low'
            }
          case 'potentially':
            return {
              color: 'grey',
              text: 'Potentially'
            }
          case 'hardening':
            return {
              color: 'purple',
              text: 'Hardening'
            }
          case 'secure':
            return {
              color: 'green-darken-4',
              text: 'Secure'
            }
          case 'info':
            return {
              color: 'blue-lighten-1',
              text: 'Info'
            }
          case 'important':
            return {
              color: 'green-darken-1',
              text: 'Important'
            }
        }
      }
      return {
        color: 'grey-lighten',
        text: 'Unknown'
      }
    }
  }
})
</script>

<style scoped lang="scss">
* >>> .v-chip__content {
  color: #fff;
}
</style>
