import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import Usuari from '../models/Usuari'
import { useUsuariStore } from '../stores/UsuariStore'

export function useFetchUsuariById(id: string) {
  const store = useUsuariStore()

  const { data, isFetching } = useQuery({
    queryKey: ['usuari', id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/usuari/${id}`)
      console.log('Resposta: ', response)
      const { usuari: usuariData } = response.data // Extreu les dades d'usuari
      const usuari = new Usuari(usuariData) // Passa les dades a un objecte del model creat
      store.setUsuari(usuari)
      console.log('Usuari retornat: ', usuari)
      return usuari
    },
  })

  return {
    usuari: data,
    isFetching,
  }
}
