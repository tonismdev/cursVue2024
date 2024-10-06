import { RouteRecordRaw } from 'vue-router'
import Dades from '../views/Dades.vue'
import Home from '../views/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dades',
    name: 'Dades',
    component: Dades,
  },
]

export default routes
