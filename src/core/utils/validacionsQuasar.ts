import { i18n } from '@/core/i18n'
import { validateEmail } from '@/core/utils'
import dayjs from 'dayjs'
import { validateSpanishId } from 'spain-id'
const { t } = i18n.global

export const obligatori = (val) =>
  checkObligatori(val) || t('ui.val.obligatori')

export const dateFormat = (val, format) =>
  !val ||
  dayjs(val, format, true).isValid() ||
  t('ui.val.dateFormat', { format })

export const validDni = (val) =>
  !val || validateSpanishId(val) || t('ui.val.nieFormat')

export const minLength = (val, min: number) =>
  !val || val.length >= min || t('ui.val.minLenght', { min })

export const maxLength = (val, max: number) =>
  !val || val.length <= max || t('ui.val.maxLenght', { max })

export const email = (val) => !val || validateEmail(val) || t('ui.val.email')

const checkObligatori = (val: any) => {
  if (typeof val == 'string' || Array.isArray(val)) {
    return val.length > 0
  }
  return !!val
}
