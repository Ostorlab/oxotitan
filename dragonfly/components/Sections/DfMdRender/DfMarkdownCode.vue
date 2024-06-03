<template>
  <div style="position: relative">
    <DfMdRender
      format="MARKDOWN"
      :content="localContent"
    />
    <div
      style="position: absolute; top: 0; right: 0"
      class="d-flex align-center mt-3 mr-3"
    >
      <div
        v-if="showExpandContentButtons"
        class="mr-2"
      >
        <v-btn
          v-if="contentExpanded === false"
          size="x-small"
          style="margin-top: -2px"
          @click="expandContent"
        >
          <v-icon
            size="x-small"
            color="black"
          >
            mdi-arrow-expand
          </v-icon>
        </v-btn>
        <v-btn
          v-else
          size="x-small"
          style="margin-top: -2px"
          @click="collapseContent"
        >
          <v-icon
            size="x-small"
            color="black"
          >
            mdi-arrow-collapse
          </v-icon>
        </v-btn>
      </div>
      <DfCopyClipboard
        :text="formattedContent"
        size="x-small"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { DfMdRender } from '~/dragonfly/components/Sections/DfMdRender'
import { DfCopyClipboard } from '~/dragonfly/components/Buttons/DfCopyClipboard'

interface Data {
  localContent: string
  maxNumberOfContentLines: number
  contentExpanded: boolean
}

export default defineComponent({
  name: 'DfMarkdownCode',
  components: { DfMdRender, DfCopyClipboard },
  props: {
    content: {
      type: String,
      required: true
    }
  },
  data(): Data {
    return {
      localContent: '',
      maxNumberOfContentLines: 20,
      contentExpanded: false
    }
  },
  computed: {
    /**
     * The formatted string without the markdown code syntax (```).
     */
    formattedContent(): string {
      return this.content?.replace(/^```[^\n]*\n?|```\s*$/g, '')
    },
    /**
     * Whether to show the expand content buttons or not.
     */
    showExpandContentButtons(): boolean {
      return this.formattedContent?.split('\n')?.length > this.maxNumberOfContentLines
    }
  },
  watch: {
    content: {
      immediate: true,
      handler(newVal: string): void {
        this.localContent = newVal
        this.collapseContent()
      }
    }
  },
  methods: {
    /**
     * Expands the content.
     */
    expandContent(): void {
      this.localContent = this.content
      this.contentExpanded = true
    },
    /**
     * Collapses the content.
     */
    collapseContent(): void {
      if (this.showExpandContentButtons === true) {
        this.localContent = this.localContent?.split('\n')?.slice(0, this.maxNumberOfContentLines).join('\n') + '\n...\n```'
        this.contentExpanded = false
      }
    }
  }
})
</script>
