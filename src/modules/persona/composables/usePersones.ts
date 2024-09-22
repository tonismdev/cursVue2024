import { useQuery } from '@tanstack/vue-query'
import { computed, ref } from 'vue'
import { PersonaRepo } from '../models'
import { Persona, Sexe } from '../models/Persona'
import persones from '../models/persones.json'
import { usePersonaIndex } from '../store/personaIndexStore'

export interface FiltrePersones {
  sexe?: Sexe
  text?: string
}
export const usePersones = (_filtre: FiltrePersones = {}) => {
  const filtre = ref<FiltrePersones>(_filtre)

  const enabled = computed(() => true)

  const personaIndex = usePersonaIndex()

  const rows = computed(() => {
    if (!enabled.value || !data.value) {
      return []
    }

    const query = PersonaRepo.query()

    if (filtre.value.sexe) {
      query.where('sexe', filtre.value.sexe)
    }

    if (filtre.value.text) {
      query.whereId(personaIndex.search(filtre.value.text))
    }

    return query.get()
  })

  const { data, isFetching, isFetched, isError } = useQuery<Persona[]>(
    ['persones', filtre],
    async () => {
      // const data = await get<Persona[]>(`/persones`, 'persones', filtre.value)
      const data: Persona[] = persones

      PersonaRepo.save(data)
      return data
    },
    {
      enabled: enabled,
    }
  )

  return {
    persones: rows,
    filtrePersones: filtre,

    isFetching,
    isFetched,
    isError,
  }
}
