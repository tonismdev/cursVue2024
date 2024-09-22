import { config } from '@/config'
import { imasKeycloak } from '@/core/keycloak'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isBetween from 'dayjs/plugin/isBetween'
import { computed } from 'vue'

export const isTramitsAdmin = computed(() => {
  if (imasKeycloak.authenticated) {
    const rols = imasKeycloak.realmAccess.roles as string[]
    const rolsAdmin = config.ROLS_LDAP_ADMIN.split(',')

    let isAdmin = false

    for (let index = 0; index < rolsAdmin.length; index++) {
      const rol = rolsAdmin[index]
      if (rols.includes(rol)) {
        isAdmin = true
        break
      }
    }

    return isAdmin
  } else return false
})
export const validateEmail = (email) => {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true
  }
  return false
}

export const minLength = (value, min) => {
  const str = String(value)
  return str.length >= min
}

export const minLengthRequired = (value, min) => {
  if (value == null) return false
  const str = String(value)
  return str.length >= min
}

export const canInscriure = ({ tipus, dataInici, dataFi }) => {
  if (!dataInici || !dataFi) return null

  dayjs.extend(isBetween)
  dayjs.extend(customParseFormat)
  const inici = dayjs(dataInici, 'DD/MM/YYYY').startOf('day')
  const fi = dayjs(dataFi, 'DD/MM/YYYY').endOf('day')

  if (
    [
      config.TIPUS_TRAMIT_INSCRIPCIO,
      config.TIPUS_TRAMIT_INSCRIPCIO_SENSE_ARXIUS,
    ].includes(tipus.id)
  ) {
    if (dayjs().isBetween(inici, fi)) return true
    else return false
  }
  return null
}
