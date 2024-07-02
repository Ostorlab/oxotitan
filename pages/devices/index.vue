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
          v-if="showForm === false"
          color="accent"
          prepend-icon="mdi-plus"
          @click="showForm = !showForm"
        >
          New Device
        </v-btn>
        <DeviceForm
          v-else
          @close-form="showForm = false"
        />
      </v-card-text>
    </v-card>
    <DevicesList />
  </div>
</template>

<script setup lang="ts">
import DeviceForm from '~/project/devices/DeviceForm.vue'
import DevicesList from '~/project/devices/DevicesList.vue'
import { DfBreadcrumbs } from '~/dragonfly/components/Sections/DfBreadcrumbs'
import type { VulnerabilityDetailBreadcrumbsType } from '~/dragonfly/components/Sections/DfBreadcrumbs/types'

const showForm = ref(false)

const breadcrumbs: VulnerabilityDetailBreadcrumbsType = [
  {
    text: 'Devices',
    disabled: true,
    to: '/devices',
    exact: true
  }
]
</script>
