import { demoRoutes } from '@/modules/demo/routes'
import { quatreRoutes } from '@/modules/quatre/router'
import { rocketRoutes } from '@/modules/rocket/router'
import { RouteRecordRaw } from 'vue-router'

/**
 * FITXER DE RUTES
 *
 * A dins aquest fitxer el desenvolupador anirà afegint les rutes que ha de tenir la seva aplicació i també
 * els components necessàris.
 *
 * Aquest fitxer de configuració és consumit després per el Router de l'Aplicació de dins la carpeta "core".
 */
/**
 * A aquesta secció s'importaran de manera "lazy load" (https://router.vuejs.org/guide/advanced/lazy-loading.html) els components a emprar
 */

const Home = () => import('@/modules/shared/views/Home.vue')

export const routes: RouteRecordRaw[] = [
  {
    //path: '/',
    //path: `/${config.APP_PROJECT_NAME}/`, // Cambia aquí
    path: 'home',
    component: Home,
    name: 'Home',
  },
  ...demoRoutes,
  ...quatreRoutes,
  ...rocketRoutes,
]
