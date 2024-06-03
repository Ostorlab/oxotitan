/**
 * Represents a Scanner object.
 */
export interface Scanner {
  endpoint: string
  apiKey: string
  name: string
}

export enum TextFormats {
  Html = 'HTML',
  Markdown = 'MARKDOWN'
}
