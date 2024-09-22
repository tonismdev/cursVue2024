import { config } from '@/config'
import { routes as appRoutes } from '@/config/routes'
import { hasRole, imasKeycloak } from '@/core/keycloak'
import ca from '@/locales/ca.json'
import es from '@/locales/es.json'
import { staticTables } from '@/store/staticTables'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

let pinia

const Layout = () => import('@/core/views/Layout.vue')
const NotFound = () => import('@/core/views/NotFound.vue')
const Login = () => import('@/core/views/Login.vue')
const Error = () => import('@/core/views/Error.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: `/${config.APP_PROJECT_NAME}/`,
  },
  {
    path: `/${config.APP_PROJECT_NAME}/error`,
    component: Error,
    name: 'Error',
  },
  {
    path: `/${config.APP_PROJECT_NAME}/login`,
    component: Login,
    name: 'Login',
    beforeEnter(to, from, next) {
      if (config.CUSTOM_LOGIN) {
        next()
      } else {
        const loginUrl = imasKeycloak.createLoginUrl({
          redirectUri: window.location.href,
        })
        window.location.replace(loginUrl)
      }
    },
  },
  {
    path: `/${config.APP_PROJECT_NAME}/`,
    component: Layout,
    name: 'app-layout',
    children: [
      ...appRoutes,
      {
        path: '404',
        component: NotFound,
      },
    ],
    meta: { requiresAuth: config.FORCE_AUTH },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: `/${config.APP_PROJECT_NAME}/404`,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

router.beforeEach(async (to, from, next) => {
  while (imasKeycloak.ready == false) {
    await sleep(100)
  }

  if (!pinia) pinia = staticTables()
  pinia.breadcrumbsItems = null

  // Validam que la url no requereix rols d'acces
  if (
    Array.isArray(to.meta?.roles) &&
    !to.meta?.roles.some((rol) => hasRole(rol))
  ) {
    next({ name: 'not-found' })
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (imasKeycloak.authenticated) {
      if (!config.APP_LDAP_ROL.some((rol) => hasRole(rol))) {
        imasKeycloak.ldapError =
          'No tens el rol LDAP assignat, consulta amb informàtica'
        if (config.CUSTOM_LOGIN) {
          next({ name: 'Login' })
        } else {
          next({ name: 'Error', query: { code: 403, message: 'noRol' } })
        }
      } else {
        next()
      }
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

const printMessage = (message) => {
  if (!pinia) pinia = staticTables()

  if (pinia.locale == 'ca') {
    return ca[message]
  } else {
    return es[message]
  }
}

router.onError((e) => {
  console.log('Error de dynamic autoload', e)
  /**
   * El codi següent, en resum (és un tema "complex" de la fase de "build" de Vite) el que fa
   * es detectar errors a les rutes i presuposa que hi ha noves versions de codi (el 90% de les vegades és així, s'ha fet un build i no es trobaen
   * els components que es tenen mapejats).
   */
  const confirmReload = confirm(printMessage('detectada_nova_versio'))

  if (confirmReload) {
    location.reload()
  }
})

export default router
