import { RouteRecordRaw } from 'vue-router'

const RocketDetall = () => import('../views/RocketDetall.vue')
const RocketsList = () => import('../views/RocketsList.vue')

export const rocketRoutes: RouteRecordRaw[] = [
  {
    path: 'rockets',
    name: 'RocketsList',
    component: RocketsList,
  },
  {
    path: 'rockets/:id',
    name: 'RocketDetall',
    component: RocketDetall,
  },
]
