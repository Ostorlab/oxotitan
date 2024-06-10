<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    class="html-md-render"
    v-html="$md.render(content)"
  />
  <!-- eslint-enable -->
</template>

<script setup lang="ts">
import Prism from 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-kotlin'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-swift'
import 'prismjs/components/prism-dart'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-yaml'

import 'assets/themes/prism/prism-tomorrow.css'

const { $md } = useNuxtApp()

defineProps({
  content: {
    type: String,
    default: ''
  }
})

onMounted(() => {
  Prism.highlightAll()
})

onUpdated(() => {
  Prism.highlightAll()
})
</script>

<style scoped lang="scss">
#renderer-margin p {
  margin-bottom: 0;
}
.html-md-render {
  overflow-x: auto;

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
