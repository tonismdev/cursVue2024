import { RouteRecordRaw } from 'vue-router'

const Home = () => import('@/modules/quatre/views/Home.vue')
const Dades = () => import('@/modules/quatre/views/Dades.vue')
const Activitats = () => import('@/modules/quatre/views/Activitats.vue')

export const quatreRoutes: RouteRecordRaw[] = [
  {
    path: 'home',
    name: 'Home',
    component: Home,
  },
  {
    path: 'dades',
    name: 'Dades',
    component: Dades,
  },
  {
    path: 'activitats',
    name: 'Activitats',
    component: Activitats,
  },
]
