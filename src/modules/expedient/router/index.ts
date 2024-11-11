import { RouteRecordRaw } from 'vue-router'

//const ExpedientDetall = () => import('../views/ExpedientDetall.vue')
const ExpedientLlista = () => import('../views/ExpedientLlista.vue')

export const expedientRutes: RouteRecordRaw[] = [
  // Per consultar tots els expedients
  {
    path: 'expedients',
    name: 'ExpedientLlista',
    component: ExpedientLlista,
  },
  // Per consultar els expedients d'un usuari
  {
    path: '/usuari/:usuari_id/expedients',
    name: 'ExpedientsUsuari',
    component: ExpedientLlista,
  },
]
