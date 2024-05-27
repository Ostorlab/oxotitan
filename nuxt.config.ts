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
    '@nuxt/eslint',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config?.plugins?.push(vuetify({ autoImport: true }))
      })
    }
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
    // Set this to false if the UI is freezing with infinite logs.
    devLogs: true
  }
})
