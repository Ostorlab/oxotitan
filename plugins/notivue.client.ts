import { createNotivue } from 'notivue'
import 'notivue/notification.css'
import 'notivue/animations.css'

export default defineNuxtPlugin((app) => {
  const notivue = createNotivue({
    position: 'top-center'
  })
  app.vueApp.use(notivue)
})