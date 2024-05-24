<template>
  <v-item-group
    v-model="selectedItem"
    mandatory
    :multiple="multiple"
    selected-class="active-card"
  >
    <v-row
      v-for="(group, index) in items"
      :key="index"
      no-gutters
    >
      <v-col>
        <v-row no-gutters>
          <p class="text-grey">
            {{ group.group }}
          </p>
        </v-row>
        <v-row no-gutters>
          <v-col
            v-for="(asset, assetIndex) in group.assets"
            :key="assetIndex"
            class="ma-1"
            cols="auto"
          >
            <v-item
              v-slot="{ isSelected, selectedClass, toggle }"
              :value="asset"
            >
              <v-card
                :class="isSelected ? selectedClass : ''"
                :color="isSelected ? 'rgb(229, 242, 252)' : ''"
                align="center"
                density="compact"
                height="240px"
                variant="outlined"
                width="220px"
                :ripple="{ class: 'accent--text' }"
                :disabled="asset.disabled"
                @click="() => { toggle(); $emit('click') }"
              >
                <v-card-text class="justify-center pa-2">
                  <v-img
                    v-if="asset.image"
                    :src="asset.image"
                    class="pa-1"
                    height="90px"
                    width="90px"
                    contain
                  />
                  <v-icon
                    v-else
                    :color="asset.color"
                    size="90px"
                  >
                    {{ asset.icon }}
                  </v-icon>

                  <v-card-title
                    align="center"
                    class="pa-0 justify-center font-weight-bold"
                    :class="{ 'active-card-text': isSelected }"
                  >
                    {{ asset.title }}
                  </v-card-title>
                  <v-card-text
                    class="text-center font-weight-medium"
                    :class="{ 'active-card-text': isSelected }"
                  >
                    {{ asset.description }}
                  </v-card-text>
                  <v-chip
                    v-if="asset.tag"
                    color="grey"
                    size="small"
                    dark
                  >
                    {{
                      asset.tag
                    }}
                  </v-chip>
                </v-card-text>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-item-group>
</template>

<script lang="ts">
import type { AssetEnum, AssetItem, Group } from '~/scan/types'

interface Data {
  selectedItem: AssetItem | string
}

export default defineComponent({
  name: 'AssetTypeSelector',
  props: {
    items: {
      type: Array as () => Array<Group>,
      default: () => []
    },
    modelValue: {
      type: String,
      default: null
    },
    returnObject: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click', 'update:model-value'],
  data(): Data {
    return {
      selectedItem: this.modelValue
    }
  },
  watch: {
    selectedItem: {
      deep: true,
      handler(selectedItem: AssetItem): void {
        this.$emit(
          'update:model-value',
          this.returnObject ? selectedItem : selectedItem.value
        )
      }
    },
    modelValue: {
      immediate: true,
      deep: true,
      handler(newVal: AssetEnum): void {
        const selected = this.items
          .flatMap((v) => {
            return v.assets
          })
          .find((v) => v.value === newVal)
        if (selected !== undefined) {
          this.selectedItem = selected
        }
      }
    }
  }
})
</script>

<style scoped lang="scss">
  .active-card {
    background-color: #e5f2fc;
    border: 1px solid rgb(31, 143, 235) !important;

    &-text {
      color: #0086CF;
    }
}
  </style>
