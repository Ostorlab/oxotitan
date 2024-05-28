// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  css: ['@/assets/css/main.scss'],
  app: {
    head: {
      title: 'OXO Titan Portal'
    }
  },
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify']
  },
  modules: [
    'nuxt-monaco-editor',
    '@nuxt/eslint',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config?.plugins?.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls
      }
    }
  },
  eslint: {
    checker: true,
    config: {
      stylistic: true
    }
  },
  features: {
    // Some infinite warnings in dev mode blocking the app in browser. So, disabling it. Set it to True for debugging.
    devLogs: false
  }
})
