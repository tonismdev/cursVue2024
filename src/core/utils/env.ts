import { config } from '@/config/index'
/**
 * Aquesta funció s'encarrega de determinar si estam a un entorn de producció o no (és a dir, estam a PRE o LOCAL)
 *
 * @returns Boolean
 */
export const isProduction = (): boolean => {
  if (['pro', 'prod', 'production'].includes(config.APP_ENV.toLowerCase()))
    return true
  return false
}
