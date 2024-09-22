const projectCodename = 'vue3-skeleton'
const projectTitle = 'Vue3 Skeleton'
const rolLDAP = ['rol-portal']

export const config = {
  APP_LDAP_ROL: rolLDAP,
  APP_ENV: import.meta.env.VITE_APP_ENV as string,
  APP_PROJECT_NAME: projectCodename,
  APP_PROJECT_TITLE: projectTitle,
  API_URL: import.meta.env.VITE_APP_API_URL
    ? import.meta.env.VITE_APP_API_URL
    : null,
  KC_SSO_URL:
    window.location.protocol +
    '//' +
    window.location.host +
    '/' +
    projectCodename +
    '/silent-check-sso.html',

  ROLS_LDAP_ADMIN: 'rol-sirh-admin,rol-sirh-pse-admin,rol-sirh-pse-gestio',

  URL_SECIM_TRAMIT: import.meta.env.VITE_APP_SECIM_URL as string,
  KEYCLOAK_URL: import.meta.env.VITE_APP_KEYCLOAK_URL as string,
  KEYCLOAK_REALM: import.meta.env.VITE_APP_KEYCLOAK_REALM as string,
  KEYCLOAK_CLIENT: import.meta.env.VITE_APP_KEYCLOAK_CLIENT as string,

  FORCE_AUTH: false,
  CUSTOM_LOGIN: false,

  // Aquí hi van les variables estàtiques del vostre projecte
}
