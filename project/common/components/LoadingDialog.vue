<template>
  <v-dialog
    v-model="loadingDialog"
    persistent
    :max-width="400"
  >
    <v-card
      color="primary"
      dark
    >
      <v-card-text>
        {{ message }}
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
export default defineComponent({
  name: 'LoadingDialog',
  props: {
    modelValue: {
      default: false,
      type: Boolean
    },
    message: {
      default: 'Please stand while processing your request',
      type: String
    }
  },
  emits: ['update:model-value'],
  data() {
    return {
      loadingDialog: false
    }
  },
  watch: {
    modelValue(newVal) {
      this.loadingDialog = newVal
    },
    loadingDialog(newVal) {
      this.$emit('update:model-value', newVal)
    }
  }
})
</script>
