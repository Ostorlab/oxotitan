import prettyBytes from 'pretty-bytes'

/**
 * Formats the file size to a human-readable format.
 * @param size The file size to format.
 */
export function formatFileSize(size: number | null): string | null {
  if (size !== null && size !== undefined) {
    return prettyBytes(size)
  } else {
    return size
  }
}
