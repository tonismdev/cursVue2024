import { RouteRecordRaw } from 'vue-router'

const PersonaList = () => import('../views/PersonaList.vue')
const PersonaView = () => import('../views/PersonaView.vue')

export const personaRoutes: RouteRecordRaw[] = [
  {
    path: 'persones',
    component: PersonaList,
    name: 'PersonaList',
  },
  {
    path: 'persona/:id',
    component: PersonaView,
    name: 'PersonaView',
  },
]
