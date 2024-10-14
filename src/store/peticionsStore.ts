import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const usePeticionsStore = defineStore('peticions', () => {
  const peticions = reactive([
    {
      id: 1,
      element: 'Ordinador portàtil',
      entregat: false,
      dataEntrega: null,
      destinatari: 'Joan Pérez',
    },
    {
      id: 2,
      element: 'Telèfon mòbil',
      entregat: true,
      dataEntrega: '2024-10-01',
      destinatari: 'Maria Llull',
    },
  ])

  function marcarComEntregat(id: number, data: string) {
    const peticio = peticions.find((p) => p.id === id)
    if (peticio) {
      peticio.entregat = true
      peticio.dataEntrega = data
    }
  }

  function afegirPeticio(novaPeticio: {
    element: string
    entregat: boolean
    dataEntrega: string | null
    destinatari: string
  }) {
    peticions.push({
      id: peticions.length + 1,
      ...novaPeticio,
    })
  }

  return {
    peticions,
    marcarComEntregat,
    afegirPeticio,
  }
})
