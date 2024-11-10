import { RouteRecordRaw } from 'vue-router'

//const ExpedientDetall = () => import('../views/ExpedientDetall.vue')
const ExpedientLlista = () => import('../views/ExpedientLlista.vue')

export const expedientRutes: RouteRecordRaw[] = [
  {
    path: 'expedients',
    name: 'ExpedientLlista',
    component: ExpedientLlista,
  },
  {
    path: '/usuari/:usuari_id/expedients',
    name: 'ExpedientsUsuari',
    component: ExpedientLlista,
  },

  /*{
    path: 'usuaris/:id',
    name: 'UsuariDetall',
    component: UsuariDetall,
  },*/
]
