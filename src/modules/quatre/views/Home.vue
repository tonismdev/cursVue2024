<template>
  <div>
    <h1>Home</h1>
    <h2>Usuari connectat</h2>
    <p>
      Benvingut a la pàgina principal {{ usuariStore.nom }} ({{
        usuariStore.codiUsuari
      }}) - {{ usuariStore.correu }}.
    </p>
    <p>
      Empra una store pinia per emmagatzemar les dades de l'usuari connectat, a
      la pestanya Dades es permet modificar algunes dades.
    </p>
  </div>
  <div>
    <h2>Gestió de Peticions</h2>
    <p>
      Empra model pinia ORM, per guardar una llista de comandes, a la pestanya
      Dades es permet indicar que ja s'han servit les comandes pendents.
    </p>
    <h5>Llista de Peticions</h5>
    <ul>
      <li v-for="peticio in peticionsStore.peticions" :key="peticio.id">
        <strong>Element:</strong> {{ peticio.element }} -
        <strong>Destinatari:</strong> {{ peticio.destinatari }} -
        <strong>Entregat:</strong> {{ peticio.entregat ? 'Sí' : 'No' }} -
        <strong>Data d'entrega:</strong>
        {{ peticio.dataEntrega || 'No entregat' }}
      </li>
    </ul>

    <h5>Afegir nova petició</h5>
    <div>
      <label for="element">Element:</label>
      <input id="element" v-model="novaPeticio.element" />

      <label for="destinatari">Destinatari:</label>
      <input id="destinatari" v-model="novaPeticio.destinatari" />

      <button @click="afegirNovaPeticio">Afegir Petició</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { usePeticionsStore } from '@/store/peticionsStore'
  import { useUsuariStore } from '@/store/usuariStore'
  import { ref } from 'vue'

  // Utilitza la store
  const usuariStore = useUsuariStore()

  // Emplena manualment les dades de l'usuari
  // Comprova si el nom no està definit abans d'emplenar les dades
  if (!usuariStore.nom) {
    usuariStore.updateDadesUsuari({
      username: 'u123456',
      nom: 'Toni Sánchez Magraner',
      correu: 'asanchez@consell.net',
      preferencies: {
        idioma: 'ca',
        tema: 'fosc',
      },
    })
  }

  const peticionsStore = usePeticionsStore()

  const novaPeticio = ref({
    element: '',
    entregat: false,
    dataEntrega: null,
    destinatari: '',
  })

  function afegirNovaPeticio() {
    if (novaPeticio.value.element && novaPeticio.value.destinatari) {
      peticionsStore.afegirPeticio({ ...novaPeticio.value })
      novaPeticio.value.element = ''
      novaPeticio.value.destinatari = ''
    }
  }
</script>

<style scoped>
  /* Estils bàsics */
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 8px;
  }

  label {
    display: block;
    margin: 8px 0 4px;
  }
</style>
