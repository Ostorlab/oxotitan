import axios from 'axios'

export default defineNuxtPlugin(() => {
  const api = axios.create()
  return {
    provide: {
      axios: api
    }
  }
})
