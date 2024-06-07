<template>
  <NuxtLayout>
    <NotificationsProvider />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import NotificationsProvider from '~/project/common/components/NotificationsProvider.vue'
</script>
