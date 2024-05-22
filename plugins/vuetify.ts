import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as labsComponents from 'vuetify/labs/components'

const myCustomTheme: ThemeDefinition = {
    dark: false,
    colors: {
        primary: '#00415d',
        accent: '#0081ba',
        secondary: '#d9534f',
        info: '#4078c0',
        success: '#1f883d',
        warning: '#c9510c',
        error: '#bd2c00',
        background: '#fff'
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
