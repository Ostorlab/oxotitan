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
      <v-card-title>
        Add a new Agent group
      </v-card-title>
      <v-card-text>
        <AgentGroupForm
          @close-form="closeForm"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { DfBreadcrumbs } from '~/dragonfly/components/Sections/DfBreadcrumbs'
import type { VulnerabilityDetailBreadcrumbsType } from '~/dragonfly/components/Sections/DfBreadcrumbs/types'
import AgentGroupForm from '~/project/agent-groups/components/AgentGroupForm.vue'

const router = useRouter()

onMounted(() => {
})

const breadcrumbs: VulnerabilityDetailBreadcrumbsType = [
  {
    text: 'AGENT GROUPS',
    disabled: false,
    to: '/agent-groups/list',
    exact: true
  },
  {
    text: 'New',
    disabled: true,
    to: '/agent-groups/new',
    exact: true
  }
]

/**
 * Close the form and reset the current scanner.
 */
function closeForm() {
  router.push({ path: '/agent-groups/list' })
}
</script>
