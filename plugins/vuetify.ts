import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as labsComponents from 'vuetify/labs/components'
import { colors } from 'assets/css/colors'

const myCustomTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: colors.primary,
    accent: colors.accent,
    secondary: colors.accent,
    info: colors.info,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    background: colors.background
  }
}

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components: {
      ...labsComponents
    },
    theme: {
      defaultTheme: 'myCustomTheme',
      themes: {
        myCustomTheme
      }
    }
  })
  app.vueApp.use(vuetify)
})
