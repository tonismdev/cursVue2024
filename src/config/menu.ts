import { i18n } from '@/core/i18n'
import { ImasNavbarItemHeader } from '@/core/typings'

const { tc } = i18n.global

export const navbarItems: ImasNavbarItemHeader[] = [
  {
    title: () => tc('home'),
    to: { name: 'Home' },
    icon: 'fas fa-home',
  },
  {
    title: 'Demo',
    icon: 'fa-solid fa-magnifying-glass',
    children: [
      {
        title: 'Taula',
        icon: 'fas fa-clock',
        to: { name: 'Demo' },
      },
      {
        title: 'Taules auxiliars',
        icon: 'fas fa-clock',
        to: { name: 'TipusDocumentAportat' },
      },
      { isSeparator: true },
      {
        title: 'Demo useMeta',
        icon: 'fas fa-heading',
        to: { name: 'DemoUseTitle' },
      },
      { isSeparator: true },
      { title: 'Prova2', icon: 'fas fa-clock' },
    ],
  },
  {
    title: tc('Dades'),
    to: { name: 'Dades' },
    icon: 'fa-solid fa-children',
    active: () => {
      return true
    },
  },
  {
    title: 'Activitats',
    icon: 'fas fa-clock',
    to: { name: 'Activitats' },
  },
  {
    title: 'Rockets List',
    icon: 'fa-solid fa-rocket',
    to: { name: 'RocketsList' },
  },
  {
    title: 'Usuaris',
    icon: 'fa-solid fa-rocket',
    to: { name: 'UsuariLlista' },
  },
  {
    title: 'Expedients',
    icon: 'fa-solid fa-rocket',
    to: { name: 'ExpedientLlista' },
  },
]
