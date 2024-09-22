import { Notify, QNotifyCreateOptions } from 'quasar'

/**
 * Mostra un Toast amb un missatge de confirmació (success).
 *
 *
 * @param textMessage - El missatge a mostrar
 * @param customOptions - (Opcional) opcions de Notify per sobreescriure els valors de la funció
 * @returns void
 */
export const showSuccessMessage = (
  textMessage: string,
  customOptions: QNotifyCreateOptions | null = null
) => {
  Notify.create({
    message: textMessage,
    color: 'positive',
    icon: 'fa-solid fa-face-smile',
    ...customOptions,
  })
}

/**
 * Mostra un Toast amb un missatge d'error.
 *
 *
 * @param textMessage - El missatge a mostrar
 * @param customOptions - (Opcional) opcions de Notify per sobreescriure els valors de la funció
 * @returns void
 */
export const showErrorMessage = (
  textMessage: string,
  customOptions: QNotifyCreateOptions | null = null
) => {
  Notify.create({
    message: textMessage,
    color: 'negative',
    icon: 'fa-solid fa-face-frown',
    ...customOptions,
  })
}
