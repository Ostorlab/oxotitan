<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
  >
    <div class="d-flex align-center pa-3">
      <img
        src="/logo/oxo.png"
        alt="OXO logo"
        style="height:40px; object-fit: contain"
      >
      <v-btn
        size="small"
        variant="tonal"
        class="ml-auto px-1"
        @click="toggleDrawer"
      >
        <v-icon :size="20">
          mdi-close
        </v-icon>
      </v-btn>
    </div>

    <v-divider />

    <v-list
      density="compact"
      nav
    >
      <v-list-item
        v-for="drawerItem in drawerItems"
        :key="drawerItem.to"
        :value="drawerItem.value"
        :to="drawerItem.to"
        :active="drawerItem.to === fullRoutePath"
        color="primary"
        style="color: black;"
      >
        <div class="d-flex align-center">
          <v-icon>
            {{ drawerItem.icon }}
          </v-icon>
          <p class="mb-0 ml-2">
            {{ drawerItem.title }}
          </p>
        </div>
      </v-list-item>
    </v-list>
    <AppFooter />
  </v-navigation-drawer>
</template>

<script lang="ts">
import { mapStores, mapActions } from 'pinia'
import { useNavigationStore } from '~/stores/navigation'
import AppFooter from '~/project/common/components/AppFooter.vue'

export default defineComponent({
  components: { AppFooter },
  data() {
    return {
      drawerItems: [
        {
          title: 'New Scan',
          to: '/scan/new',
          icon: 'mdi-shield-plus-outline',
          value: 'new-scan'
        },
        {
          title: 'Import Scan',
          to: '/scan/import',
          icon: 'mdi-shield-link-variant-outline',
          value: 'import-scan'
        },
        {
          title: 'Scanners',
          to: '/scanners',
          icon: 'mdi-shield-search',
          value: 'scanners'
        },
        {
          title: 'Scans',
          to: '/scan/list',
          icon: 'mdi-shield-outline',
          value: 'scans'
        },
        {
          title: 'Devices',
          to: '/devices',
          icon: 'mdi-cellphone',
          value: 'devices'
        }
      ]
    }
  },
  computed: {
    ...mapStores(useNavigationStore),
    drawer: {
      get(): boolean {
        return this.navigationStore.drawer
      },
      set(): void {
        this.toggleDrawer()
      }
    },
    fullRoutePath(): string {
      return this.$route.fullPath
    }
  },
  methods: {
    ...mapActions(useNavigationStore, ['toggleDrawer'])
  }
})
</script>

<style scoped lang="scss">
.footer {
    position: absolute;
    bottom: 0;
    font-size: 14px;
    color: #474747;

    &-link {
        color: inherit !important;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>
