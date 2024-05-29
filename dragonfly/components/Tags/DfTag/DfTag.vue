<template>
  <v-chip
    v-if="cleanName!== null && cleanName !== undefined && cleanName !== ''"
    :closable="close"
    class="font-weight-black"
    :size="size"
    :variant="variant"
    label
    :color="stringToColor"
    @click:close="$emit('removeSelectedTag')"
  >
    <v-icon
      v-if="icon !== undefined && icon !== null"
      start
      :size="size"
    >
      {{ icon }}
    </v-icon>
    <v-icon
      v-if="predefinedIcon !== '' && predefinedIcon !== undefined && predefinedIcon !== null"
      start
      :size="size"
    >
      {{ predefinedIcon }}
    </v-icon>
    {{ cleanName }}<span v-if="cleanValue !== null && cleanValue!== undefined">:</span><span
      v-if="cleanValue"
      :style="valueStyle"
    >{{ cleanValue }}</span>
  </v-chip>
</template>

<script lang="ts">
interface DataType {
  colorsList: Array<string>
  cleanName: string | null
  cleanValue: string | null
}
export default defineComponent({
  name: 'DfTag',
  props: {
    tag: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: null
    },
    valueStyle: {
      type: String,
      default: null
    },
    close: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: null
    },
    size: {
      type: String as () => NonNullable<'small' | 'medium' | 'large'> | undefined,
      default: 'small'
    },
    variant: {
      type: String as () => NonNullable<'flat' | 'outlined' | 'text' | 'elevated' | 'tonal' | 'plain'> | undefined,
      default: 'flat'
    }
  },
  emits: ['removeSelectedTag'],
  data(): DataType {
    return {
      // we need a set of colors
      colorsList: [
        '#78C871',
        '#2c9323',
        '#FEB04E',
        '#bd781c',
        '#EE7765',
        '#c53b26',
        '#4B91CA',
        '#1864a2',
        '#156373',
        '#179db4',
        '#186934',
        '#1bb75b',
        '#344563',
        '#1c294d'
      ],
      cleanName: null,
      cleanValue: null
    }
  },
  computed: {
    /**
     * Convert the string to a color
     */
    stringToColor(): string {
      if (this.color !== null && this.color !== undefined) {
        return this.color
      }
      return this.colorsList[this.hash]
    },
    /**
     * Hash the name to get a color
     * @returns {number}
     */
    hash(): number {
      let hash = 0
      for (let i = 0; i < this.cleanName!.length || 0; i++) {
        hash = this.cleanName!.charCodeAt(i) + ((hash << 5) - hash)
      }
      if (this.cleanValue !== null && this.cleanValue !== undefined) {
        for (let i = 0; i < this.cleanValue.length; i++) {
          hash = this.cleanValue.charCodeAt(i) + ((hash << 5) - hash)
        }
      }
      hash = Math.abs(hash % this.colorsList.length)
      return hash
    },
    /**
     * Get the predefined icon
     */
    predefinedIcon(): string {
      switch (this.cleanName!.toLowerCase()) {
        case 'shared':
          return 'mdi-account-group-outline'
        case 'bug':
          return 'mdi-bug-outline'
        case 'okr':
          return 'mdi-chess-queen'
        case 'track':
          return 'mdi-cube-unfolded'
        case 'ui':
          return 'mdi-view-quilt-outline'
        case 'api':
          return 'mdi-api'
        case 'sales':
          return 'mdi-cash-multiple'
        case 'marketing':
          return 'mdi-youtube'
        case 'privacy':
          return 'mdi-cctv'
        case 'daily':
          return 'mdi-calendar-today'
        case 'support':
          return 'mdi-face-agent'
        case 'designdoc':
          return 'mdi-notebook'
        case 'env':
          return 'mdi-server'
        case 'feature':
          return 'mdi-star-circle-outline'
        case 'status':
          return 'mdi-list-status'
        case 'priority':
          return 'mdi-priority-high'
        case 'me':
          return 'mdi-human-greeting'
        case 'ci/cd':
          return 'mdi-pipe'
        case 'ticketing':
          return 'mdi-ticket-confirmation'
        case 'sso':
          return 'mdi-badge-account-outline'
        case 'appstore':
          return 'mdi-store'
        case 'fixit!':
          return 'mdi-auto-fix'
        case 'tags':
          return 'mdi-tag-outline'
        case 'description':
          return 'mdi-card-text-outline'
        case 'title':
          return 'mdi-pound'
        case 'assigned':
          return 'mdi-account-outline'
        case 'scanner':
          return 'mdi-server-outline'
        default:
          return ''
      }
    }
  },
  watch: {
    $props: {
      immediate: true,
      deep: true,
      handler() {
        this.cleanValue = null
        this.cleanName = null
        this.clean()
      }
    }
  },
  methods: {
    /**
     * Clean the name and value
     */
    clean(): void {
      if (this.name !== null && this.name !== undefined) {
        this.cleanName = this.name
        this.cleanValue = this.value
      } else if (
        this.tag !== null
        && this.tag !== undefined
        && this.tag !== ''
      ) {
        const splitted = this.tag.split(':')
        if (splitted.length > 1) {
          this.cleanName = splitted[0]
          this.cleanValue = splitted[1]
        } else {
          this.cleanName = splitted[0]
          this.cleanValue = null
        }
      } else {
        this.cleanName = '(Empty)'
      }
    }
  }
})
</script>

<style></style>
