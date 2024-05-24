import axios from 'axios'

export default defineNuxtPlugin(() => {
  const api = axios.create({
    baseURL: 'https://api.ostorlab.co'
  })
  return {
    provide: {
      axios: api
    }
  }
})
