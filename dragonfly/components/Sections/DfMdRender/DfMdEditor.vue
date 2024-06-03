<template>
  <v-tabs
    v-model="tab"
    :height="35"
    color="primary"
  >
    <v-tab
      value="write"
      class="text-capitalize"
    >
      <v-icon start>
        mdi-pencil-outline
      </v-icon>
      Write
    </v-tab>
    <v-tab
      value="preview"
      class="text-capitalize"
    >
      <v-icon start>
        mdi-eye
      </v-icon>
      Preview
    </v-tab>
  </v-tabs>
  <v-tabs-window v-model="tab">
    <v-tabs-window-item
      value="write"
      eager
      class="pa-1"
      :transition="false"
    >
      <v-textarea
        ref="writeTextArea"
        v-model="localValue"
        style="border-top: none;"
        :rows="editorNumberOfRows"
        class="pt-2"
        variant="outlined"
        color="primary"
        placeholder="Supports Markdown"
        v-bind="$attrs"
      />
    </v-tabs-window-item>
    <v-tabs-window-item
      value="preview"
      class="pa-1 pb-3"
      :transition="false"
    >
      <DfMdRender
        :content="localValue || 'Nothing to preview'"
        :style="{ minHeight: `${mdRendererHeight}px` }"
      />
    </v-tabs-window-item>
  </v-tabs-window>
</template>

<script  lang="ts">
import { DfMdRender } from '~/dragonfly/components/Sections/DfMdRender'

const DEFAULT_MD_RENDERER_HEIGHT = 126

interface dataType {
  localValue: string
  mdRendererHeight: number
  tab: string | null
}
export default defineComponent(
  {
    name: 'DfMdEditor',
    components: { DfMdRender },
    props: {
      modelValue: {
        type: String,
        required: true
      },
      editorNumberOfRows: {
        type: Number,
        default: 5
      }
    },
    emits: ['update:modelValue'],
    data(): dataType {
      return {
        localValue: this.modelValue,
        mdRendererHeight: DEFAULT_MD_RENDERER_HEIGHT,
        tab: 'write'
      }
    },
    watch: {
      modelValue: {
        handler(newVal: string) {
          this.localValue = newVal || ''
        },
        immediate: true
      },
      /**
       * When the value is updated emit the input event.
       */
      localValue(): void {
        this.$emit('update:modelValue', this.localValue)
        const textAreaRef = this?.$refs?.writeTextArea
        if (textAreaRef !== undefined && (this.mdRendererHeight !== textAreaRef?.$el?.offsetHeight)) {
          this.mdRendererHeight = (textAreaRef?.$el?.offsetHeight || DEFAULT_MD_RENDERER_HEIGHT) - 8
        }
      }
    }
  }
)
</script>
