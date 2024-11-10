import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import Rocket from '../models/Rocket'
import { useRocketStore } from '../stores/rocketStore'

export function useFetchRocketById(id: string) {
  const store = useRocketStore()

  const { data, isFetching } = useQuery({
    queryKey: ['rocket', id],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.spacexdata.com/v4/rockets/${id}`
      )
      const rocket = new Rocket(response.data)
      store.setRocket(rocket)
      console.log('Rocket retornat: ', rocket)

      return rocket
    },
  })

  return {
    rocket: data,
    isFetching,
  }
}
