import type { Maybe } from '~/graphql/types'
import {
  SYNTAX_PAIRS,
  CustomBlockSyntax
} from '~/dragonfly/components/Sections/DfMdRender/types'

enum MarkdownTypes {
  Text = 'text',
  Custom = 'custom'
}

const END_OF_CUSTOM_CONTENT_PATTERNS = [/^\t/, /^```/]

export default class MarkdownEnhancer {
  static enhanceMarkdown(markdown: string) {
    const output: Array<{ type: string, content: string }> = []

    const CUSTOM_SYNTAX_FUNCTION_MAPPING = {
      [CustomBlockSyntax.StartTabs]: MarkdownEnhancer.formatToTabs,
      [CustomBlockSyntax.StartCode]: MarkdownEnhancer.formatToCode
    }

    const startSyntaxes = Object.keys(SYNTAX_PAIRS)
    const lines = markdown?.split('\n')
    let currentType = MarkdownTypes.Text
    let currentContent = ''
    let currentSpecialSyntax: Maybe<string> | undefined = null;

    (lines || []).forEach((line, index) => {
      const isBlockStart = currentType !== MarkdownTypes.Custom && startSyntaxes.some((customSyntax) => line.startsWith(customSyntax) === true)
      const isBlockEnd = currentType === MarkdownTypes.Custom && SYNTAX_PAIRS[currentSpecialSyntax || ''].test(line) === true

      if (isBlockStart === true) {
        if (currentType === MarkdownTypes.Text && currentContent.trim() !== '') {
          output.push({ type: MarkdownTypes.Text, content: currentContent })
          currentContent = ''
        }
        currentSpecialSyntax = startSyntaxes.find((customSyntax) => line.includes(customSyntax))
        currentType = MarkdownTypes.Custom
        currentContent += line + '\n'
      } else if (isBlockEnd === true || (currentType === MarkdownTypes.Custom && index === lines.length - 1)) {
        if (index === lines.length - 1 && END_OF_CUSTOM_CONTENT_PATTERNS.some((pattern) => pattern.test(line) === true) === true) {
          currentContent += line + '\n'
        } else if (index !== lines.length - 1 && END_OF_CUSTOM_CONTENT_PATTERNS.some((pattern) => pattern.test(line) === true) === true) {
          currentContent += line
        }
        const formattedContent = CUSTOM_SYNTAX_FUNCTION_MAPPING[currentSpecialSyntax || ''](currentContent)
        output.push({ type: formattedContent.type, ...formattedContent.content })
        currentType = MarkdownTypes.Text
        currentContent = ''
        currentSpecialSyntax = null
        if (END_OF_CUSTOM_CONTENT_PATTERNS.some((pattern) => pattern.test(line)) === false) {
          currentContent += line + '\n'
        }
      } else {
        currentContent += line + '\n'
      }

      if (index === lines.length - 1) {
        if (currentType === MarkdownTypes.Text && currentContent.trim() !== '') {
          output.push({ type: MarkdownTypes.Text, content: currentContent })
        }
      }
    })

    return output
  }

  /**
   * Formats text into tabs format.
   * @param text
   */
  static formatToTabs(text: string) {
    const lines = text?.split('\n')
    let currentTabId: null | string = null
    const tabsHeaders: Array<string> = []
    const tabsContent: Array<Array<{ type: string, content: string }>> = []
    let currentContent = '';

    (lines || []).forEach((line) => {
      if (line.startsWith(CustomBlockSyntax.StartTabs) === true) {
        if (currentTabId !== null && currentTabId !== undefined && currentContent.trim() !== '') {
          tabsHeaders.push(currentTabId)
          tabsContent.push(MarkdownEnhancer.enhanceMarkdown(currentContent))
        }
        currentTabId = MarkdownEnhancer.formatTabId(line?.split(CustomBlockSyntax.StartTabs)[1])
        currentContent = ''
      } else {
        currentContent += line.replace(/^\t/, '') + '\n'
      }
    })

    if (currentTabId !== null && currentTabId !== undefined && currentContent.trim() !== '') {
      tabsHeaders.push(currentTabId)
      tabsContent.push(MarkdownEnhancer.enhanceMarkdown(currentContent))
    }

    return {
      type: 'tabs',
      content: { tabsHeaders, tabsContent }
    }
  }

  /**
   * Formats text into code format.
   * @param text
   */
  static formatToCode(text: string) {
    return { type: 'code', content: { content: text } }
  }

  /**
   * Removes extra quotes from the tab id.
   * @param tabId The tab id to format.
   */
  static formatTabId(tabId: string): string {
    return tabId?.trim()?.replace(/^['"](.*)['"]$/, '$1')
  }
}
