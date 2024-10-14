import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useUsuariStore = defineStore('user', () => {
  const codiUsuari = ref('')
  const nom = ref('')
  const correu = ref('')
  const preferencies = reactive({
    idioma: 'ca',
    tema: 'clar',
  })

  function updateDadesUsuari(newData) {
    codiUsuari.value = newData.username || codiUsuari.value
    nom.value = newData.nom || nom.value
    correu.value = newData.correu || correu.value
    Object.assign(preferencies, newData.preferencies || {})
  }

  return {
    codiUsuari,
    nom,
    correu,
    preferencies,
    updateDadesUsuari,
  }
})
