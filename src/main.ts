import { config } from '@/config/index'
import { init } from '@/core/keycloak'
import { VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query'
import mitt from 'mitt'
import { Dialog, Loading, Notify, Quasar } from 'quasar'
import quasarIconSet from 'quasar/icon-set/fontawesome-v6'
import quasarLang from 'quasar/lang/ca'
import { createApp } from 'vue'
import Toast from 'vue-toastification'
import App from './App.vue'
import { i18n } from './core/i18n'
import router from './core/router'
const emitter = mitt()

// Import icon libraries
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css'

// A few examples for animations from Animate.css:
// import @quasar/extras/animate/fadeIn.css
// import @quasar/extras/animate/fadeOut.css

// Import Quasar css
import '@/assets/scss/index.scss'
import 'quasar/src/css/index.sass'

// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'

/**
 * Pinia + Pinia-ORM
 */
import { createPinia } from 'pinia'
import { createORM } from 'pinia-orm'
const pinia = createPinia().use(createORM())

/**
 * Components IMAS
 */
import ImasCalendarComponent from './core/components/imas-calendar/ImasCalendarComponent.vue'

const params = {
  init: {
    // Use 'login-required' to always require authentication
    // If using 'login-required', there is no need for the router guards in router.js
    onLoad: 'check-sso',
    timeSkew: 50,
    silentCheckSsoRedirectUri: config.KC_SSO_URL,
  },
  config: {
    url: config.KEYCLOAK_URL,
    realm: config.KEYCLOAK_REALM,
    clientId: config.KEYCLOAK_CLIENT,
  },
}

const defaultParams = {
  config: window.__BASEURL__ ? `${window.__BASEURL__}/config` : '/config',
  init: { onLoad: 'login-required' },
}
const options = Object.assign({}, defaultParams)

init(options.config, options)

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, //5 min
      },
    },
  },
}

export default createApp(App)
  .use(Quasar, {
    lang: quasarLang,
    iconSet: quasarIconSet,
    plugins: {
      Notify,
      Dialog,
      Loading,
    },
    config: {
      notify: {
        position: 'top-right',
        timeout: 4500,
        progress: true,
        textColor: 'white',
        actions: [{ icon: 'fa-solid fa-xmark', color: 'white' }],
      },
    },
  })
  .use(VueQueryPlugin, vueQueryPluginOptions)
  .use(router)
  .use(pinia)
  .use(Toast)
  .use(i18n)
  .component('imas-calendar-component', ImasCalendarComponent)
  .provide('emitter', emitter)
  .mount('#app')
