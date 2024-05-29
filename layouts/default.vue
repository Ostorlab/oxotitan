<template>
  <v-app>
    <v-btn
      icon="mdi-menu"
      variant="outlined"
      size="20"
      class="mx-4 mt-3 d-flex align-center"
      style="border-radius: 5px; border-color: #00000036; padding: 1.04rem;"
      @click="drawer = !drawer"
    >
      <v-icon :size="20">
        mdi-menu
      </v-icon>
    </v-btn>
    <!--    <v-navigation-drawer -->
    <!--      v-model="drawer" -->
    <!--      temporary -->
    <!--    > -->
    <!--      <div class="d-flex align-center pa-3"> -->
    <!--        <img -->
    <!--          src="/logo/oxo.png" -->
    <!--          alt="Ostorlab logo" -->
    <!--          style="height:40px; object-fit: contain" -->
    <!--        > -->
    <!--        <v-btn -->
    <!--          size="small" -->
    <!--          variant="tonal" -->
    <!--          class="ml-auto px-1" -->
    <!--          @click="drawer = !drawer" -->
    <!--        > -->
    <!--          <v-icon :size="20"> -->
    <!--            mdi-close -->
    <!--          </v-icon> -->
    <!--        </v-btn> -->
    <!--      </div> -->

    <!--      <v-divider /> -->

    <!--      <v-list -->
    <!--        density="compact" -->
    <!--        nav -->
    <!--      > -->
    <!--        <v-list-item -->
    <!--          v-for="drawerItem in drawerItems" -->
    <!--          :key="drawerItem.to" -->
    <!--          :value="drawerItem.value" -->
    <!--          :to="drawerItem.to" -->
    <!--        > -->
    <!--          <div class="d-flex align-center"> -->
    <!--            <v-icon> -->
    <!--              {{ drawerItem.icon }} -->
    <!--            </v-icon> -->
    <!--            <p class="mb-0 ml-2"> -->
    <!--              {{ drawerItem.title }} -->
    <!--            </p> -->
    <!--          </div> -->
    <!--        </v-list-item> -->
    <!--      </v-list> -->
    <!--    </v-navigation-drawer> -->
    <v-main>
      <div class="mx-4 mt-2">
        <slot />
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
export default defineComponent({
  data() {
    return {
      drawer: false,
      drawerItems: [
        {
          title: 'New Scan',
          to: '/scan/new',
          icon: 'mdi-shield-plus-outline',
          value: 'new-scan'
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
        }
      ]
    }
  }
})
</script>
