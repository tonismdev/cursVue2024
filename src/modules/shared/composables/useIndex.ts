import { Ref, computed } from 'vue'

const normalize = (str: string): string => {
  return str
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}
export const useIndex = (rows: Ref, fields: Array<string>) => {
  const index = computed(() =>
    rows.value.map((e) => {
      return {
        id: e.id,
        row: e,
        term: normalize(fields.map((f) => e[f]).join(' ')),
      }
    })
  )

  const search = (text: string, onlyId = true): Array<any> => {
    const searchTerms = normalize(text).split(' ')

    return index.value
      .filter((el) => checkTerm(el.term, searchTerms))
      .map((el) => el.id)
  }

  // Cerca si alguna paraula de cerca es troba al text
  const checkTerm = (text: string, searchTerm: string[]) =>
    searchTerm.reduce((acc, e) => acc && text.indexOf(e) >= 0, true)

  return { index, search }
}
