import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import Expedient from '../models/Expedient'
import { useExpedientStore } from '../stores/ExpedientStore'

export function useFetchExpedients(usuari_id = null) {
  const store = useExpedientStore()

  const { data, isFetching } = useQuery({
    queryKey: ['expedients', usuari_id], // queryKey amb usuari_id, sinó sempre retornari el mateix
    queryFn: async () => {
      const url = usuari_id
        ? `http://localhost:3000/usuari/${usuari_id}/expedients`
        : `http://localhost:3000/expedients`

      console.log('URL a la que es crida: ', url)

      const response = await axios.get(url)

      console.log('response: ', response)
      const expedientsArray = response.data.expedients

      console.log('arrayExpedients: ', expedientsArray)

      console.log('WebService retornat')
      const expedients = expedientsArray.map(
        (expedient: any) => new Expedient(expedient)
      )
      store.setExpedients(expedients)
      return expedients
    },
  })

  return {
    expedients: data,
    isFetching,
  }
}
