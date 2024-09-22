import { config } from '@/config'
import { RouteRecordRaw } from 'vue-router'

const Demo = () => import('@/modules/demo/views/Demo.vue')
const DemoUseTitle = () =>
  import('@/modules/demo/views/demo-use-title/DemoUseTitle.vue')
const TipusDocumentAportat = () =>
  import(
    '@/modules/demo/views/seleccio/taules-auxiliars/tipus-document-aportat/TipusDocumentAportat.vue'
  )

export const demoRoutes: RouteRecordRaw[] = [
  {
    path: 'demo',
    component: Demo,
    name: 'Demo',
  },
  {
    path: 'demo-use-title',
    component: DemoUseTitle,
    name: 'DemoUseTitle',
  },
  {
    path: 'tipusDocumentAportat',
    component: TipusDocumentAportat,
    name: 'TipusDocumentAportat',
  },
  {
    // Exemple validació url per rol
    path: 'rolecheck',
    component: DemoUseTitle,
    name: 'RoleCheck',
    meta: {
      roles: [config.APP_LDAP_ROL],
    },
  },
]


