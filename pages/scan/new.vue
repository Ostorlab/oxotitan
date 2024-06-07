<template>
  <div>
    <DfBreadcrumbs
      :breadcrumbs="breadcrumbs"
      class="mb-5"
    />
    <CreateScanForm />
  </div>
</template>

<script lang="ts">
import { DfBreadcrumbs } from '~/dragonfly/components/Sections/DfBreadcrumbs'
import type { VulnerabilityDetailBreadcrumbsType } from '~/dragonfly/components/Sections/DfBreadcrumbs/types'
import CreateScanForm from '~/project/scans/components/form/CreateScanForm.vue'

interface Data {
  breadcrumbs: VulnerabilityDetailBreadcrumbsType
}

export default defineComponent({
  components: {
    CreateScanForm,
    DfBreadcrumbs
  },
  data(): Data {
    return {
      breadcrumbs: [
        {
          text: 'scanning',
          disabled: true,
          exact: true
        },
        {
          text: 'New Scan',
          disabled: true,
          to: '/scan/new',
          exact: true
        }
      ]
    }
  }
})
</script>
