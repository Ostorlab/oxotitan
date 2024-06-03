import markdownit from 'markdown-it'

export default defineNuxtPlugin(() => {
  const md = markdownit({
    html: false,
    linkify: false
  })
  return {
    provide: {
      md
    }
  }
})
