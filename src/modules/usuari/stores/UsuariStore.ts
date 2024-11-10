import { defineStore } from 'pinia'
import Usuari from '../models/Usuari'

export const useUsuariStore = defineStore('usuari', {
  state: () => ({
    usuaris: [] as Usuari[],
  }),
  actions: {
    setUsuaris(usuaris: Usuari[]) {
      this.usuaris = usuaris
    },
    setUsuari(usuari: Usuari) {
      const index = this.usuaris.findIndex((r) => r.id === usuari.id)
      if (index === -1) {
        this.usuaris.push(usuari)
      } else {
        this.usuaris[index] = usuari
      }
    },
  },
})
