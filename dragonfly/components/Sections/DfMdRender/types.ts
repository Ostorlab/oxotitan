export enum CustomBlockSyntax {
  StartTabs = '===',
  StartCode = '```'
}

export const SYNTAX_PAIRS = {
  [CustomBlockSyntax.StartTabs]: /^(?!\t)(?!===)\S+(?:\s+\S*)*$/,
  [CustomBlockSyntax.StartCode]: /^```\s*$/
}
