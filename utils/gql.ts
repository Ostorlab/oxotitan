export default function gql(literals: TemplateStringsArray, ...values: string[]) {
  let output = ''
  let index
  for (index = 0; index < values.length; index++) {
    output += literals[index] + values[index]
  }

  output += literals[index]
  return output
}
