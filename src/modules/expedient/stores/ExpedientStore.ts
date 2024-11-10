import { defineStore } from 'pinia'
import Expedient from '../models/Expedient'

export const useExpedientStore = defineStore('expedient', {
  state: () => ({
    expedients: [] as Expedient[],
  }),
  actions: {
    setExpedients(expedients: Expedient[]) {
      this.expedients = expedients
    },
    setRocket(expedient: Expedient) {
      const index = this.expedients.findIndex((r) => r.id === expedient.id)
      if (index === -1) {
        this.expedients.push(expedient)
      } else {
        this.expedients[index] = expedient
      }
    },
  },
})
