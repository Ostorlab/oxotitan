<template>
  <v-card
    v-if="tabsData !== null"
    variant="outlined"
    flat
    class="markdown-tabs"
  >
    <v-tabs
      v-model="tabs[tabsDataIndex]"
    >
      <v-tab
        v-for="tabHeader in tabsData.tabsHeaders"
        :key="tabHeader"
        style="text-transform: none"
        :value="tabs[tabsDataIndex]"
      >
        <div class="d-flex align-center">
          <v-img
            eager
            :src="`/technologies/blackandwhite/${tabHeader.split(' ').join('_').toLowerCase()}.png`"
            width="15"
            class="mr-2"
          />
          <p class="mb-0">
            {{ tabHeader }}
          </p>
        </div>
      </v-tab>
    </v-tabs>
    <v-tabs-window v-model="tabs[tabsDataIndex]">
      <v-tabs-window-item
        v-for="tabItems in tabsData.tabsContent"
        :key="`tabItem-${tabItems.length}`"
        :transition="false"
        :reverse-transition="false"
        :value="tabs[tabsDataIndex]"
      >
        <div
          v-for="tabContent in tabItems"
          :key="`tabContent-${tabContent.type}`"
        >
          <DfMdRender
            v-if="tabContent.type === 'text'"
            :format="format"
            :content="tabContent.content"
          />
          <DfMarkdownCode
            v-else-if="tabContent.type === 'code'"
            :content="tabContent.content"
          />
        </div>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script lang="ts">
import { DfMdRender, DfMarkdownCode } from '~/dragonfly/components/Sections/DfMdRender'
import { TextFormats } from '~/project/types'

export default defineComponent({
  name: 'DfMarkdownTabs',
  components: { DfMdRender, DfMarkdownCode },
  props: {
    tabsData: {
      type: Object,
      default: null
    },
    tabsDataIndex: {
      type: Number,
      default: 0
    },
    format: {
      type: String as () => TextFormats,
      default: TextFormats.Markdown
    }
  },
  data() {
    return {
      tabs: []
    }
  }
})
</script>

<style lang="scss">
.markdown-tabs {
  pre {
    margin: 0 !important;
  }
}
</style>
