<template>
  <h6>Comptador: {{ counter }}</h6>
  <q-btn
    no-caps
    color="primary"
    label="Incrementar valor comptador"
    @click="incrementarComptador"
  />
</template>

<script setup lang="ts">
  import { config } from '@/config'
  import { staticTables } from '@/store/staticTables'
  import { ref, watch } from 'vue'

  const pinia = staticTables()
  const counter = ref(0)

  const incrementarComptador = (): void => {
    counter.value++
  }

  /**
   * Aquest codi actualitza el valor de la variable "appTitle" de StaticTables,
   * el qual actualitza el valor del títol de la navbar.
   *
   * Exemple útil per mostrar notificacions a l'usuari.
   */

  watch(
    counter,
    (val) => (pinia.appTitle = `${config.APP_PROJECT_TITLE} (${val})`)
  )
</script>
