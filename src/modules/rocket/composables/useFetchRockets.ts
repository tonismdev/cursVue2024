import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import Rocket from '../models/Rocket'
import { useRocketStore } from '../stores/rocketStore'

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function useFetchRockets() {
  const store = useRocketStore()

  const { data, isFetching } = useQuery({
    queryKey: ['rockets'],
    queryFn: async () => {
      const response = await axios.get('https://api.spacexdata.com/v4/rockets')
      console.log('WebService retornat')
      const rockets = response.data.map((rocket: any) => new Rocket(rocket))
      store.setRockets(rockets)
      sleep(0).then(() => {
        console.log('Espera acabada...')
      })
      console.log('Consulta efectuada')
      return rockets
    },
  })

  return {
    rockets: data,
    isFetching,
  }
}
