import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import { computed } from 'vue'
import Expedient from '../models/Expedient'
import { useExpedientStore } from '../stores/ExpedientStore'

export function useFetchExpedients(usuari_id = null) {
  const store = useExpedientStore()

  const { data, isFetching } = useQuery({
    //queryKey: ['expedients', usuari_id], // queryKey amb usuari_id, sinó sempre retornari el mateix
    queryKey: computed(() => ['expedients', usuari_id?.value || 'all']), // Si és null, marca 'all'
    queryFn: async () => {
      const url = usuari_id?.value
        ? `http://localhost:3000/usuari/${usuari_id.value}/expedients`
        : `http://localhost:3000/expedients`

      console.log('URL a la que es crida: ', url)

      const response = await axios.get(url)

      console.log('response: ', response)
      const expedientsArray = response.data.expedients

      console.log('arrayExpedients: ', expedientsArray)

      console.log('WebService retornat')
      /*const expedients = expedientsArray.map(
        (expedient: any) => new Expedient(expedient)
      )*/

      const expedients = expedientsArray.map((expedient: any) => {
        expedient.obert = expedient.obert === 'true' || expedient.obert === true
        return new Expedient(expedient)
      })

      store.setExpedients(expedients)
      return expedients
    },
    staleTime: 0, // Força Vue Query a actualitzar la consulta
  })

  return {
    expedients: data,
    isFetching,
  }
}
