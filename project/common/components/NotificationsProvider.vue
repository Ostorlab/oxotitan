<template>
  <Notivue v-slot="item">
    <Notification
      :item="item"
      :theme="notivueTheme"
    />
  </Notivue>
</template>

<script setup lang="ts">
import { Notification, Notivue, type NotivueTheme } from 'notivue'
import { colors } from 'assets/css/colors'

const notivueTheme: NotivueTheme = {
  ...materialTheme,
  '--nv-success-bg': colors.success,
  '--nv-error-bg': colors.error,
  '--nv-info-bg': colors.info,
  '--nv-warning-bg': colors.warning,
  '--nv-radius': '0.4rem'
}
</script>
