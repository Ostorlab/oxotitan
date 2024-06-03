import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    stylistic: {
      commaDangle: 'never',
      arrowParens: true,
      braceStyle: '1tbs'
    }
  }
}).append(
  {
    rules: {
      '@typescript-eslint/no-extraneous-class': 'off'
    }
  }
)
