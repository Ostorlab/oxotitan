<template>
  <v-dialog
    v-model="toggleDialog"
    max-width="400"
  >
    <v-card>
      <div class="d-flex flex-column align-center px-4 py-6">
        <div class="icon-container mb-4">
          <div class="icon-background" />
          <v-icon
            class="icon-position"
            :size="30"
          >
            {{ cardIcon }}
          </v-icon>
        </div>
        <p class="text-center mb-0 font-weight-bold">
          {{ title }}
        </p>
        <v-card-text class="text-center pb-0 pt-2">
          {{ description }}
        </v-card-text>
      </div>
      <v-divider />
      <div class="d-flex justify-space-around py-3">
        <v-btn
          style="width: 47%"
          @click="cancel"
        >
          <v-icon
            dark
            start
          >
            {{ cancelIcon }}
          </v-icon>
          {{ cancelButtonText }}
        </v-btn>
        <v-btn
          :color="confirmButtonColor"
          style="width: 47%"
          @click="confirm"
        >
          <v-icon start>
            {{ confirmIcon }}
          </v-icon>
          {{ confirmButtonText }}
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
interface Data {
  dontShowWarning: boolean
  toggleDialog: boolean
}

export default defineComponent({
  name: 'DfConfirmationModal',
  props: {
    modelValue: {
      type: Boolean
    },
    title: {
      type: String,
      default: null
    },
    cardIcon: {
      type: String,
      default: 'mdi-information'
    },
    description: {
      type: String,
      default: null
    },
    cancelButtonText: {
      type: String,
      default: 'Add'
    },
    cancelIcon: {
      type: String,
      default: 'mdi-lock'
    },
    confirmButtonText: {
      type: String,
      default: 'Proceed'
    },
    confirmButtonColor: {
      type: String,
      default: 'success'
    },
    confirmIcon: {
      type: String,
      default: 'mdi-arrow-right'
    }
  },
  emits: ['cancel', 'confirm', 'update:modelValue'],
  data(): Data {
    return {
      toggleDialog: false,
      dontShowWarning: false
    }
  },
  watch: {
    modelValue(val: boolean): void {
      this.toggleDialog = val
    },
    toggleDialog(val: boolean): void {
      this.$emit('update:modelValue', val)
    }
  },
  mounted(): void {
    this.toggleDialog = this.modelValue
  },
  methods: {
    confirm(): void {
      this.toggleDialog = false
      this.$emit('confirm')
    },
    cancel(): void {
      this.toggleDialog = false
      this.$emit('cancel')
    }
  }
})
</script>

<style scoped lang="scss">
.icon {

  &-container {
    position: relative;
    height: 65px;
    width: 65px;
  }

  &-position {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &-background {
    height: 100%;
    width: 100%;
    background-color: #d2d2d2;
    border: 7px solid #eeeeee;
    border-radius: 50%;
    opacity: 0.5;
    position: absolute;
  }
}
</style>
