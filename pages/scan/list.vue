<template>
  <v-row justify="center">
    <template v-if="scanners.length>0">
      <v-col
        v-for="scanner in scanners"
        :key="scanner.endpoint"
        cols="12"
      >
        <scan-list :scanner="scanner" />
      </v-col>
    </template>
    <v-col
      v-else-if="scanners.length===0"
      content="center"
      cols="6"
      align-self="center"
    >
      <v-card variant="outlined">
        <v-card-title>No scanners found</v-card-title>
        <v-card-actions>
          <v-btn
            variant="elevated"
            color="primary"
            to="/scanners"
          >
            Add Scanner
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { mapState } from 'pinia'
import ScanList from '~/pages/scan/scanList.vue'

definePageMeta({
  title: 'Scans',
  layout: 'default'
})
export default defineComponent({
  components: {
    ScanList
  },
  computed: {
    ...mapState(useScannersStore, ['scanners'])
  }
})
</script>
