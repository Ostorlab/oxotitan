<template>
  <v-card
    variant="outlined"
    v-bind="$attrs"
    :class="classes"
    class="v-card--material pa-3"
    style="overflow: visible;"
  >
    <div class="d-flex grow flex-wrap">
      <v-avatar
        v-if="avatar"
        size="128"
        class="mx-auto v-card--material__avatar elevation-12"
        :tile="tile"
      >
        <v-img :src="avatar" />
      </v-avatar>

      <v-sheet
        v-else
        :class="{
          'pa-7': !$slots.image
        }"
        :color="color"
        :max-height="icon ? 75 : undefined"
        :width="inline || icon ? 'auto' : '100%'"
        class="text-start v-card--material__heading mb-n6"
        dark
        style="border-radius: 4px"
      >
        <slot
          v-if="$slots.heading"
          name="heading"
        />

        <slot
          v-else-if="$slots.image"
          name="image"
        />

        <p
          v-else-if="title && !icon"
          class="display-1 font-weight-bold"
        >
          {{ title }}
        </p>

        <v-icon
          v-else-if="icon"
          size="24"
        >
          {{ icon }}
        </v-icon>

        <p
          v-if="text"
          class="headline font-weight-thin"
        >
          {{ text }}
        </p>
      </v-sheet>

      <div
        v-if="$slots['after-heading']"
        class="ml-6"
      >
        <slot name="after-heading" />
      </div>

      <v-col
        v-if="hoverReveal"
        cols="12"
        class="text-center py-0 mt-n12"
      >
        <slot name="reveal-actions" />
      </v-col>

      <div
        v-else-if="icon && title"
        class="ml-4 d-flex"
      >
        <div
          class="font-weight-bold"
          style="font-size: 1.3rem;"
        >
          {{ title }}
        </div>
        <div
          class="ml-3 mt-2"
          style="font-size: 0.9rem;"
        >
          <slot name="title-extra-info" />
        </div>
      </div>
    </div>

    <slot />

    <template v-if="$slots.actions">
      <v-divider class="mt-2" />

      <v-card-actions class="pb-0">
        <slot name="actions" />
      </v-card-actions>
    </template>
  </v-card>
</template>

<script lang="ts">
export default defineComponent({
  name: 'MaterialCard',
  props: {
    avatar: {
      type: String,
      default: ''
    },
    tile: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'success'
    },
    hoverReveal: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: undefined
    },
    image: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },

  computed: {
    classes() {
      return {
        'v-card--material--has-heading': this.hasHeading,
        'v-card--material--hover-reveal': this.hoverReveal
      }
    },
    hasHeading() {
      return Boolean(this.$slots.heading || this.title || this.icon)
    },
    hasAltHeading() {
      return Boolean(this.$slots.heading || (this.title && this.icon))
    }
  }
})
</script>

<style lang="sass">
.v-card--material
  &__avatar
    position: relative
    top: -64px
    margin-bottom: -32px

  &__heading
    position: relative
    top: -40px
    transition: .3s ease
    z-index: 1

  &.v-card--material--hover-reveal:hover
    .v-card--material__heading
      transform: translateY(-40px)
ul
  margin-left: 1.2rem
</style>
