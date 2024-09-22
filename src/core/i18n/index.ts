import { createI18n } from 'vue-i18n'

import ca from '@/locales/ca.json'
import es from '@/locales/es.json'
import dayjs from 'dayjs'
import 'dayjs/locale/ca'
import 'dayjs/locale/es'

export function setupI18n(locale = 'ca') {
  const i18n = createI18n({
    locale,
    allowComposition: true, // you need to specify that!
    fallbackLocale: 'ca',
    messages: {
      ca,
      es,
    },
  })
  setI18nLanguage(i18n, locale)
  return i18n
}

export function setI18nLanguage(i18n, locale) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    i18n.global.locale.value = locale
  }
  dayjs.locale(locale)
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector('html')!.setAttribute('lang', locale)
}

export const i18n = setupI18n()
