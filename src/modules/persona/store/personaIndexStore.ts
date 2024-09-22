import { useIndex } from '@/modules/shared/composables/useIndex'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { PersonaRepo } from '../models'

export const usePersonaIndex = defineStore('personaIndex', () => {
  const persones = computed(() => PersonaRepo.all())

  const { index, search } = useIndex(persones, [
    'doi',
    'nom',
    'llinatge1',
    'llinatge2',
  ])

  return {
    index,
    search,
  }
})
