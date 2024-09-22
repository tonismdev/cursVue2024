import { imasAxios } from '@/core/api'
import Keycloak, {
  KeycloakInstance,
  KeycloakLoginOptions,
  KeycloakProfile,
  KeycloakPromise,
  KeycloakResourceAccess,
  KeycloakRoles,
  KeycloakTokenParsed,
} from 'keycloak-js'
import { reactive } from 'vue'

export interface VueKeycloakTokenParsed extends KeycloakTokenParsed {
  preferred_username?: string
  name?: string
}

interface VueKeycloakInstance {
  ready: boolean // Flag indicating whether Keycloak has initialised and is ready
  authenticated: boolean
  userName?: string // Username from Keycloak. Collected from tokenParsed['preferred_username']
  fullName?: string // Full name from Keycloak. Collected from tokenParsed['name']
  login?(options?: KeycloakLoginOptions): KeycloakPromise<void, void> // [Keycloak] login function
  loginFn?(options?: KeycloakLoginOptions): KeycloakPromise<void, void> // Alias for login
  // This is not defined in keycloak
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logoutFn?(options?: any): KeycloakPromise<void, void> | void // Keycloak logout function
  createLoginUrl?(options?: KeycloakLoginOptions): string // Keycloak createLoginUrl function
  // This is not defined in keycloak
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createLogoutUrl?(options?: any): string // Keycloak createLogoutUrl function
  createRegisterUrl?(options?: KeycloakLoginOptions): string // Keycloak createRegisterUrl function
  register?(options?: KeycloakLoginOptions): KeycloakPromise<void, void> // Keycloak register function
  accountManagement?(): KeycloakPromise<void, void> // Keycloak accountManagement function
  createAccountUrl?(): string // Keycloak createAccountUrl function
  loadUserProfile?(): KeycloakPromise<KeycloakProfile, void> // Keycloak loadUserProfile function
  loadUserInfo?(): KeycloakPromise<{}, void> // Keycloak loadUserInfo function
  subject?: string // The user id
  idToken?: string // The base64 encoded ID token.
  idTokenParsed?: VueKeycloakTokenParsed // The parsed id token as a JavaScript object.
  realmAccess?: KeycloakRoles // The realm roles associated with the token.
  resourceAccess?: KeycloakResourceAccess // The resource roles associated with the token.
  refreshToken?: string // The base64 encoded refresh token that can be used to retrieve a new token.
  refreshTokenParsed?: VueKeycloakTokenParsed // The parsed refresh token as a JavaScript object.
  timeSkew?: number // The estimated time difference between the browser time and the Keycloak server in seconds. This value is just an estimation, but is accurate enough when determining if a token is expired or not.
  responseMode?: string // Response mode passed in init (default value is fragment).
  responseType?: string // Response type sent to Keycloak with login requests. This is determined based on the flow value used during initialization, but can be overridden by setting this value.
  hasRealmRole?(role: string): boolean // Keycloak hasRealmRole function
  hasResourceRole?(role: string, resource?: string): boolean // Keycloak hasResourceRole function
  token?: string // The base64 encoded token that can be sent in the Authorization header in requests to services
  tokenParsed?: VueKeycloakTokenParsed // The parsed token as a JavaScript object
  keycloak?: KeycloakInstance // The original keycloak instance 'as is' from keycloak-js adapter
  ldapError?: string | null
}

export const imasKeycloak = reactive<VueKeycloakInstance>({
  ready: false,
  authenticated: false,
  userName: undefined,
  fullName: undefined,
  token: undefined,
  tokenParsed: undefined,
  logoutFn: undefined,
  loginFn: undefined,
  login: undefined,
  createLoginUrl: undefined,
  createLogoutUrl: undefined,
  createRegisterUrl: undefined,
  register: undefined,
  accountManagement: undefined,
  createAccountUrl: undefined,
  loadUserProfile: undefined,
  loadUserInfo: undefined,
  subject: undefined,
  idToken: undefined,
  idTokenParsed: undefined,
  realmAccess: undefined,
  resourceAccess: undefined,
  refreshToken: undefined,
  refreshTokenParsed: undefined,
  timeSkew: undefined,
  responseMode: undefined,
  responseType: undefined,
  hasRealmRole: undefined,
  hasResourceRole: undefined,
  keycloak: undefined,
  ldapError: null,
})

export function init(config, options) {
  const ctor = sanitizeConfig(config)
  const keycloak = Keycloak(ctor)

  keycloak.onReady = function (authenticated) {
    updatekWatchVariables(authenticated)
    imasKeycloak.ready = true
    typeof options.onReady === 'function' && options.onReady(keycloak)
  }
  keycloak.onAuthSuccess = function () {
    // Check token validity every 10 seconds (10 000 ms) and, if necessary, update the token.
    // Refresh token if it's valid for less then 60 seconds
    const updateTokenInterval = setInterval(
      () =>
        keycloak
          .updateToken(60)
          .then(function (refreshed) {
            if (refreshed) {
              updatekWatchVariables(true)
            }
          })
          .catch(() => {
            keycloak.clearToken()
          }),
      10000
    )
    imasKeycloak.logoutFn = () => {
      clearInterval(updateTokenInterval)
      keycloak.logout(
        options.logout || { redirectUri: config['logoutRedirectUri'] }
      )
    }
  }
  keycloak.onAuthRefreshSuccess = function () {
    updatekWatchVariables(true)
  }
  keycloak.onAuthRefreshError = function () {
    updatekWatchVariables(false)
    typeof options.onAuthRefreshError === 'function' &&
      options.onAuthRefreshError(keycloak)
  }

  keycloak
    .init(options.init)
    .then((authenticated) => {
      updatekWatchVariables(authenticated)
      typeof options.onInitSuccess === 'function' &&
        options.onInitSuccess(authenticated)
    })
    .catch(() => {
      updatekWatchVariables(false)
      const error = Error('Could not initialized keycloak-js adapter')
      typeof options.onInitError === 'function'
        ? options.onInitError(error)
        : console.error(error)
    })

  function updatekWatchVariables(isAuthenticated = false) {
    imasKeycloak.authenticated = isAuthenticated
    imasKeycloak.loginFn = keycloak.login
    imasKeycloak.login = keycloak.login
    imasKeycloak.createLoginUrl = keycloak.createLoginUrl
    imasKeycloak.createLogoutUrl = keycloak.createLogoutUrl
    imasKeycloak.createRegisterUrl = keycloak.createRegisterUrl
    imasKeycloak.register = keycloak.register
    imasKeycloak.keycloak = keycloak
    if (isAuthenticated) {
      imasKeycloak.accountManagement = keycloak.accountManagement
      imasKeycloak.createAccountUrl = keycloak.createAccountUrl
      imasKeycloak.hasRealmRole = keycloak.hasRealmRole
      imasKeycloak.hasResourceRole = keycloak.hasResourceRole
      imasKeycloak.loadUserProfile = keycloak.loadUserProfile
      imasKeycloak.loadUserInfo = keycloak.loadUserInfo
      imasKeycloak.token = keycloak.token
      imasKeycloak.subject = keycloak.subject
      imasKeycloak.idToken = keycloak.idToken
      imasKeycloak.idTokenParsed = keycloak.idTokenParsed
      imasKeycloak.realmAccess = keycloak.realmAccess
      imasKeycloak.resourceAccess = keycloak.resourceAccess
      imasKeycloak.refreshToken = keycloak.refreshToken
      imasKeycloak.refreshTokenParsed = keycloak.refreshTokenParsed
      imasKeycloak.timeSkew = keycloak.timeSkew
      imasKeycloak.responseMode = keycloak.responseMode
      imasKeycloak.responseType = keycloak.responseType
      imasKeycloak.tokenParsed = keycloak.tokenParsed
      imasKeycloak.userName = keycloak.tokenParsed['preferred_username']
      imasKeycloak.fullName = keycloak.tokenParsed['name']

      imasAxios.defaults.headers.common['Authorization'] =
        'Bearer ' + keycloak.token
    }
  }
}

export function hasRole(role) {
  const rols = imasKeycloak.tokenParsed.realm_access.roles
  return rols.includes(role)
}

function sanitizeConfig(config) {
  const renameProp = (oldProp, newProp, { [oldProp]: old, ...others }) => {
    return {
      [newProp]: old,
      ...others,
    }
  }
  return Object.keys(config).reduce(function (previous, key) {
    if (['authRealm', 'authUrl', 'authClientId'].includes(key)) {
      const cleaned = key.replace('auth', '')
      const newKey = cleaned.charAt(0).toLowerCase() + cleaned.slice(1)
      return renameProp(key, newKey, previous)
    }
    return previous
  }, config)
}
