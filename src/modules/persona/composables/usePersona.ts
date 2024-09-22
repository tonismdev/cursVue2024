import { useQuery } from '@tanstack/vue-query'
import { computed, ref } from 'vue'
import { PersonaRepo } from '../models'
import { Persona } from '../models/Persona'

export const usePersona = (_id?: number) => {
  // Valor de l'id de la persona, si sabem segur que tendrem id no faria falta
  const id = ref(_id)

  // Habilitam la petició a bd únicament si tenim id
  const enabled = computed<boolean>(() => !!id.value)

  // Recuperam la persona de Pinia ORM
  const persona = computed(() =>
    id.value ? PersonaRepo.find(id.value) : undefined
  )

  // Petició amb cache, unicament estarà activa si tenim id
  const { isFetching, isError } = useQuery<Persona>(
    ['persona', id],
    async () => {
      // const data = await get<Persona>(`/persona/${id.value}`, 'persona')
      // PersonaRepo.save(data)
      // return data
      return PersonaRepo.find(id.value!)!
    },
    {
      enabled: enabled,
    }
  )

  // Habilitam un mètode per setejar l'id
  const setId = (_id: number) => {
    id.value = _id
  }

  return {
    persona,

    isFetching,
    isError,

    setId,
  }
}
