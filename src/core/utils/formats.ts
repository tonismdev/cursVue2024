export const formatKBytes = (kbytes, decimals = 2) => {
  const bytes = kbytes * 1024
  if (kbytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export const toTitleCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.substring(1).toLocaleLowerCase()
}

export const truncateText = (text: string, MAX_LEN = 100) => {
  if (text.length >= MAX_LEN) {
    return text.substring(0, MAX_LEN) + '...'
  }
  return text
}
