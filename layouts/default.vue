<template>
  <v-app>
    <NavigationDrawer />
    <NavigationAppBar />
    <v-main>
      <div class="mx-4 mt-5">
        <slot />
      </div>
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup lang="ts">
import NavigationDrawer from '~/project/common/components/NavigationDrawer.vue'
import NavigationAppBar from '~/project/common/components/NavigationAppBar.vue'
import Footer from '~/project/common/components/AppFooter.vue'
</script>
