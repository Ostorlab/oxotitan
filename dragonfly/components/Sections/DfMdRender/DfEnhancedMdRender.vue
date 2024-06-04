<template>
  <div
    class="html-md-render"
    style="color: black;"
  >
    <div v-if="isEditable === false">
      <div
        v-for="(item, index) in enhancedMarkdown"
        :key="index"
      >
        <DfMdRender
          v-if="item.type === 'text'"
          :format="format"
          :content="item.content"
        />
        <DfMarkdownTabs
          v-else-if="item.type === 'tabs'"
          :tabs-data="item"
          :tabs-data-index="index"
          class="my-3"
        />
        <DfMarkdownCode
          v-else-if="item.type === 'code'"
          :content="item.content"
        />
      </div>
    </div>
    <div
      v-else
      class="hand-pointer"
    >
      <div
        v-show="editDescription === false"
        @dblclick="editDescription = true"
      >
        <div
          v-for="(item, index) in enhancedMarkdown"
          :key="index"
        >
          <DfMdRender
            v-if="item.type === 'text'"
            :format="format"
            :content="item.content"
          />
          <DfMarkdownTabs
            v-else-if="item.type === 'tabs'"
            :format="format"
            :tabs-data="item"
            :tabs-data-index="index"
            class="my-3"
          />
          <DfMarkdownCode
            v-else-if="item.type === 'code'"
            :content="item.content"
          />
        </div>
      </div>
      <v-textarea
        v-show="editDescription === true"
        v-model="editableDescription"
        auto-grow
        full-width
        variant="outlined"
        density="compact"
        rows="15"
        color="accent"
        name="Description"
        label="Description"
        counter
        autofocus
        @keydown.esc="resetDescriptionChanges"
        @keyup.alt.enter="$emit('validateDescription')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import MarkdownEnhancer from '~/dragonfly/components/Sections/DfMdRender/MarkdownEnhancer'
import { DfMarkdownTabs, DfMarkdownCode, DfMdRender } from '~/dragonfly/components/Sections/DfMdRender'
import { TextFormats } from '~/project/types'
import type { Maybe } from '~/graphql/types'

interface Data {
  enhancedMarkdown: Array<{ type: string, content: string }>
  editDescription: boolean
  editableDescription: string
}

export default defineComponent({
  name: 'DfEnhancedMsRender',
  components: {
    DfMarkdownTabs,
    DfMarkdownCode,
    DfMdRender
  },
  props: {
    content: {
      type: String as () => Maybe<string> | undefined,
      default: ''
    },
    format: {
      type: String as () => TextFormats,
      default: TextFormats.Markdown
    },
    isEditable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['validateDescription', 'update:editDescription', 'update:description', 'resetDescriptionChanges'],
  data(): Data {
    return {
      editDescription: false,
      enhancedMarkdown: [],
      editableDescription: this.content
    }
  },
  watch: {
    content: {
      immediate: true,
      handler(newVal) {
        this.enhanceMarkdown(newVal)
        if (this.content === 'No Description') {
          this.editableDescription = ''
        } else {
          this.editableDescription = this.content
        }
        this.editableDescription = this.content
      }
    },
    editableDescription(newVal) {
      this.$emit('update:description', newVal)
    },
    editDescription(newVal) {
      this.$emit('update:editDescription', newVal)
    }
  },
  methods: {
    /**
     * Process the markdown and add custom formatting.
     * @param markdown The raw markdown to enhance.
     */
    enhanceMarkdown(markdown: string): void {
      this.enhancedMarkdown = MarkdownEnhancer.enhanceMarkdown(markdown)
    },
    /**
     * Switch the description component from edit mode to read only mode.
     */
    switchDescriptionToReadOnly(): void {
      this.editDescription = false
    },
    /**
     * Resets the description.
     */
    resetDescriptionChanges(): void {
      this.$emit('resetDescriptionChanges')
    }
  }
})
</script>

<style lang="scss">
.html-md-render {
  p {
    margin-bottom: 0;
  }
  pre {
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  img {
    max-width: 100%;
  }
}
.hand-pointer {
  cursor: pointer;
}

/* custom.css for tables */
/* Add borders to the table */
::v-deep table {
  width: 100%;
  border-spacing: 0;
}
/* Style the table header */
::v-deep th {
  padding: 8px;
}
/* Style the table header */
::v-deep thead {
  @extend .v-data-table-header !optional;
}
/* Style the table cells */
::v-deep td {
  padding: 8px;
  border: 1px solid #ccc;
}
/* Alternate row background color for better readability */
::v-deep tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
