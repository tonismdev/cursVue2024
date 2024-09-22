import { config } from '@/config/index'
import { staticTables } from '@/store/staticTables'
import axios, { AxiosError } from 'axios'
import { useToast } from 'vue-toastification'

import ca from '@/locales/ca.json'
import es from '@/locales/es.json'

const toast = useToast()

import { i18n } from '../i18n'
const { t } = i18n.global

let pinia

interface errorImasApi {
  message?: string
  error?: string
  errorCode?: number
  entitat?: string
  errors?: object
}

const printMessage = (message) => {
  if (pinia.locale == 'ca') {
    return ca[message]
  } else {
    return es[message]
  }
}

export const imasAxios = axios.create({
  baseURL: config.API_URL as string,
})

imasAxios.interceptors.request.use(
  function (config) {
    if (!pinia) pinia = staticTables()
    // Do something before request is sent
    pinia.axiosCount++
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

imasAxios.interceptors.response.use(
  function (response) {
    if (!pinia) pinia = staticTables()
    pinia.axiosCount--
    return response
  },
  function (error: AxiosError) {
    if (!pinia) pinia = staticTables()
    pinia.axiosCount--

    if (error.response) {
      if (error.response.data) {
        const errorData: errorImasApi = error.response.data
        if (errorData.message && errorData.errorCode)
          return Promise.reject(error)

        if (errorData.message) {
          if (errorData.errors) {
            Object.keys(errorData.errors).forEach((err) => {
              if (Array.isArray(errorData.errors![err])) {
                errorData.errors![err].forEach((el) => {
                  toast.error(
                    t(`errors.${el}`, {
                      entitat: t(`ent.${err}`),
                    })
                  )
                })
              } else {
                toast.error(
                  t(`errors.${errorData.errors![err]}`, {
                    entitat: t(`ent.${err}`),
                  })
                )
              }
            })
          } else {
            toast.error(errorData.message)
            return Promise.reject(error)
          }
        }

        if (
          error.response.status >= 400 &&
          error.response.status < 500 &&
          errorData.error
        ) {
          toast.error(
            t(`errors.${errorData.error}`, {
              entitat: t(`ent.${errorData.entitat}`),
            })
          )
          return Promise.reject(error)
        } else if (error.response.status == 500 && errorData.message) {
          toast.error(errorData.message)
          return Promise.reject(error)
        }
      }

      if (500 === error.response.status) {
        toast.error(printMessage('unknownError'))
        return Promise.reject(error)
      }
    } else if (error.request) {
      toast.error(printMessage('netError'))
      return Promise.reject(error)
    } else {
      toast.error(printMessage('unknownError'))
      return Promise.reject(error)
    }
  }
)
