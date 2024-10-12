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
        to: { name: 'Demo' }, // Demo es el name que heu definit dins router
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
        to: { name: 'DemoUseTitle' }, // DemoUseTitle es el name que heu definit dins router
      },
      { isSeparator: true },
      { title: 'Prova2', icon: 'fas fa-clock' },
    ],
  },
  {
    title: tc('tri'),
    to: { name: 'Home' },
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
]
