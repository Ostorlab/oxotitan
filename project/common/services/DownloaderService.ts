export default class Downloader {
  /**
   * Method to download a file from a URL
   * @param filename
   * @param buffer
   */
  downloadArrayBuffer(filename: string, buffer: ArrayBuffer): void {
    const blob = new Blob([new Uint8Array(buffer).buffer])
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
  }
}
