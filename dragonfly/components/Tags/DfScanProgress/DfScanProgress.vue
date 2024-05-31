<template>
  <v-tooltip
    bottom
    :disabled="!messageStatus"
  >
    <template #activator="{ props }">
      <v-chip
        :color="iconColor.color"
        size="small"
        label
        variant="flat"
        v-bind="props"
      >
        <v-icon
          size="small"
          start
          color="white"
        >
          {{ iconColor.icon }}
        </v-icon>
        {{ iconColor.text }}
      </v-chip>
    </template>
    <span>{{ messageStatus }}</span>
  </v-tooltip>
</template>

<script lang="ts">
export default defineComponent({
  name: 'DfScanProgress',
  props: {
    progress: {
      type: String,
      default: undefined
    },
    messageStatus: {
      type: String as () => string | undefined,
      default: undefined
    }
  },
  computed: {
    iconColor() {
      if (this.progress) {
        switch (this.progress.toLowerCase()) {
          case 'done':
            return { icon: 'mdi-check', color: 'success', text: 'Done' }
          case 'in_progress':
            return { icon: 'mdi-autorenew', color: 'info', text: 'Running' }
          case 'not_started':
            return {
              icon: 'mdi-timeline-plus-outline',
              color: 'orange',
              text: 'Queued'
            }
          case 'stopped':
            return { icon: 'mdi-stop-circle', color: 'red', text: 'Stopped' }
          case 'error':
            return {
              icon: 'mdi-exclamation-thick',
              color: 'purple',
              text: 'Error'
            }
          case 'disabled':
            return {
              icon: 'mdi-stop-circle-outline',
              color: 'grey',
              text: 'Stopped'
            }
        }
      }
      return { icon: 'mdi-exclamation', color: 'warning', text: '' }
    }
  }
})
</script>

<style scoped></style>
