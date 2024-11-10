import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import Usuari from '../models/Usuari'
import { useUsuariStore } from '../stores/UsuariStore'

export function useFetchUsuaris() {
  const store = useUsuariStore()

  const { data, isFetching } = useQuery({
    queryKey: ['usuaris'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/usuaris')
      const usuarisArray = response.data.usuaris

      if (!Array.isArray(usuarisArray)) {
        throw new Error("La resposta de l'API no conté un array d'usuaris.")
      }

      const usuaris = usuarisArray.map((usuari: any) => new Usuari(usuari))
      store.setUsuaris(usuaris)
      console.log('Usuaris obtinguts: ', usuaris)
      return usuaris
    },
  })

  return {
    usuaris: data,
    isFetching,
  }
}
