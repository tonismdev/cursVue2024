import { defineStore } from 'pinia'
import Rocket from '../models/Rocket'

export const useRocketStore = defineStore('rocketStore', {
  state: () => ({
    rockets: [] as Rocket[],
  }),
  actions: {
    setRockets(rockets: Rocket[]) {
      this.rockets = rockets
    },
    setRocket(rocket: Rocket) {
      const index = this.rockets.findIndex((r) => r.id === rocket.id)
      if (index === -1) {
        this.rockets.push(rocket)
      } else {
        this.rockets[index] = rocket
      }
    },
  },
})
