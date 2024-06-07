<template>
  <v-app-bar
    app
    variant="flat"
    elevate-on-scroll
    elevation="1"
    color="white"
    class="d-flex align-center px-3"
  >
    <v-btn
      icon="mdi-menu"
      variant="outlined"
      size="20"
      class="mr-4 d-flex align-center"
      style="border-radius: 5px; border-color: #00000036; padding: 1.04rem;"
      @click="navigationStore.toggleDrawer()"
    >
      <v-icon :size="20">
        mdi-menu
      </v-icon>
    </v-btn>
    <img
      src="/logo/oxo.png"
      alt="OXO logo"
      style="height:30px; object-fit: contain"
    >
    <template #append>
      <div class="d-flex align-center ml-2">
        <v-btn
          v-for="(link, index) in menuLinks"
          :key="`menuLink-${link.to}-${index}`"
          :to="link.to"
          variant="outlined"
          size="20"
          class="d-flex align-center mx-1 app-bar-icon"
        >
          <v-icon :size="20">
            {{ link.icon }}
          </v-icon>
          <v-tooltip
            activator="parent"
            location="bottom"
          >
            {{ link.title }}
          </v-tooltip>
        </v-btn>
      </div>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useNavigationStore } from '~/stores/navigation'

const navigationStore = useNavigationStore()
const menuLinks: Array<{
  title: string
  icon: string
  to: string
}> = [
  {
    title: 'New Scan',
    icon: 'mdi-shield-plus-outline',
    to: '/scan/new'
  },
  {
    title: 'Scans',
    icon: 'mdi-shield-outline',
    to: '/scan/list'
  },
  {
    title: 'Scanners',
    icon: 'mdi-engine-outline',
    to: '/scanners'
  }
]
</script>

<style scoped>
.app-bar-icon {
  border-radius: 5px;
  border-color:#00000036;
  padding: 1.04rem;
}
</style>
