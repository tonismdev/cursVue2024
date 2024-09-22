import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(customParseFormat)
dayjs.extend(relativeTime)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(isBetween)

export const isPastDate = (
  dataInicial: string | null,
  dataFinal: string | null
) => {
  dayjs.extend(customParseFormat)
  if (!dataInicial || !dataFinal) return true

  const diaA = dayjs(dataInicial, 'DD/MM/YYYY')
  const diaB = dayjs(dataFinal, 'DD/MM/YYYY')

  return diaB.isAfter(diaA) || diaB.isSame(diaA)
}

export const formDate = (date, format: string): string | null => {
  if (date == null) return null
  dayjs.extend(customParseFormat)
  return dayjs(date).format(format)
}

export const formatDate = (date) => {
  return formDate(date, 'DD/MM/YYYY')
}

/**
 * Funció emprada per fer el Sort de les Taules de Quasar quan la columna és una data.
 *
 * S'empra així:
 * ```js
 * sort: (a, b) => qtableSortDates(a, b)
 * ```
 *
 * https://quasar.dev/vue-components/table#defining-the-columns
 *
 * @param date1
 * @param date2
 * @returns Number
 */
export const qtableSortDates = (date1: Date, date2: Date): number => {
  let r: number
  if (dayjs(date1).isSame(date2)) r = 0
  else {
    if (dayjs(date1).isBefore(date2)) r = -1
    else r = 1
  }
  return r
}

export const formatFullDate = (date) => {
  return formDate(date, 'DD/MM/YYYY HH:mm:ss')
}

export enum TipusRestriccioDatesValides {
  ANTERIOR = 'ANTERIOR',
  ANTERIOR_IGUAL = 'ANTERIOR_IGUAL',
  POSTERIOR = 'POSTERIOR',
  POSTERIOR_IGUAL = 'POSTERIOR_IGUAL',
}

export const isValidDate = (
  dateString,
  restriccio?: TipusRestriccioDatesValides
) => {
  dayjs.extend(customParseFormat)

  if (!dayjs(dateString, 'DD/MM/YYYY', true).isValid()) return false

  const diaProposat = dayjs(dateString, 'DD/MM/YYYY', true).startOf('day')
  const avui = dayjs().startOf('day')

  if (restriccio) {
    switch (restriccio) {
      case TipusRestriccioDatesValides.ANTERIOR:
        return diaProposat.isBefore(avui)
        break
      case TipusRestriccioDatesValides.POSTERIOR:
        return diaProposat.isAfter(avui)
        break

      case TipusRestriccioDatesValides.ANTERIOR_IGUAL:
        return diaProposat.isBefore(avui) || diaProposat.isSame(avui)
        break

      case TipusRestriccioDatesValides.POSTERIOR_IGUAL:
        return diaProposat.isAfter(avui) || diaProposat.isSame(avui)
        break
    }
  }

  return true
}

export const age = (dob: string) => {
  if (dob) {
    dayjs.extend(customParseFormat)
    const age = dayjs().diff(dayjs(dob, 'DD/MM/YYYY', true), 'year')
    if (Number.isInteger(age)) return age
  }
  return null
}
