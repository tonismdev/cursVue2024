import { config } from '@/config'
import { defineStore } from 'pinia'
import { ImasBreadCrumbsItem } from './../core/typings.d'

export type RootState = {
  axiosCount: number
  indexAccordion: number | number[]
  locale: string
  appTitle: string
  isPreview: boolean
  showSaveModal: boolean

  // Taules estàtiques
  breadcrumbsItems: ImasBreadCrumbsItem[] | null
}

export const staticTables = defineStore({
  id: 'static',
  state: () =>
    ({
      axiosCount: 0,
      indexAccordion: 0,
      locale: 'ca',
      appTitle: config.APP_PROJECT_TITLE,
      isPreview: false,
      showSaveModal: false,

      // Taules estàtiques
      breadcrumbsItems: null,
    } as RootState),
})
