import { RouteRecordRaw } from 'vue-router'

const UsuariDetall = () => import('../views/UsuariDetall.vue')
const UsuariLlista = () => import('../views/UsuariLlista.vue')

export const usuariRoutes: RouteRecordRaw[] = [
  {
    path: 'usuaris',
    name: 'UsuariLlista',
    component: UsuariLlista,
  },
  {
    path: 'usuaris/:id',
    name: 'UsuariDetall',
    component: UsuariDetall,
  },
]
