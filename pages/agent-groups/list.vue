<template>
  <div>
    <DfBreadcrumbs
      :breadcrumbs="breadcrumbs"
      class="mb-5"
    />
    <v-card
      variant="outlined"
      class="my-4"
    >
      <v-card-text>
        <v-btn
          color="accent"
          prepend-icon="mdi-plus"
          to="/agent-groups/new"
        >
          New
        </v-btn>
      </v-card-text>
    </v-card>
    <SvgLoader v-if="loading === true" />
    <template v-else-if="loading === false && scanners.length > 0">
      <AgentGroupsList />
    </template>
    <v-col
      v-else-if="loading === false && scanners.length === 0"
      content="center"
      align-self="center"
    >
      <v-card variant="outlined">
        <v-card-title>No scanners found</v-card-title>
        <v-card-actions>
          <v-btn
            variant="elevated"
            color="accent"
            to="/scanners"
          >
            Add Scanner
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </div>
</template>

<script lang="ts">
import { mapState } from 'pinia'
import { DfBreadcrumbs } from '~/dragonfly/components/Sections/DfBreadcrumbs'
import type { VulnerabilityDetailBreadcrumbsType } from '~/dragonfly/components/Sections/DfBreadcrumbs/types'
import AgentGroupsList from '~/project/agent-groups/components/AgentGroupsList.vue'
import SvgLoader from '~/project/common/components/SvgLoader.vue'

interface Data {
  breadcrumbs: VulnerabilityDetailBreadcrumbsType
  loading: boolean
  showForm: boolean
}

export default defineComponent({
  components: {
    AgentGroupsList,
    DfBreadcrumbs,
    SvgLoader
  },
  data(): Data {
    return {
      loading: true,
      breadcrumbs: [
        {
          text: 'Agent Groups',
          to: '/agent-groups/list',
          exact: true,
          disabled: true
        }
      ],
      showForm: false
    }
  },
  computed: {
    ...mapState(useScannersStore, ['scanners'])
  },
  mounted() {
    this.loading = false
  }
})
</script>
