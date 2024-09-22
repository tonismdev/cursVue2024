export const parseURLParams = (url: string, params: Object | null = null) => {
  let ret = url
  if (params) {
    Object.keys(params).forEach((key) => {
      ret = ret.replaceAll(`:${key}`, params[key])
    })
  }

  return ret
}

/**
 * Elimina accents i posa en majuscula
 * @param str
 */
export const normalize = (str: string): string => {
  return str
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}
