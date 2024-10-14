<template>
  <div class="perfil-usuari">
    <h1>Perfil de l'usuari</h1>
    <div class="info-usuari">
      <p><strong>Nom:</strong> {{ usuariStore.nom }}</p>
      <p><strong>Correu:</strong> {{ usuariStore.correu }}</p>
      <p>
        <strong>Idioma preferit:</strong> {{ usuariStore.preferencies.idioma }}
      </p>
      <p><strong>Tema preferit:</strong> {{ usuariStore.preferencies.tema }}</p>
    </div>

    <!-- Formulari per modificar les preferències -->
    <fieldset class="formulari">
      <legend>Modificar les dades</legend>

      <div class="entrada">
        <label for="nom">Nom:</label>
        <input id="nom" v-model="usuariStore.nom" />
      </div>

      <div class="entrada">
        <label for="idioma">Idioma:</label>
        <input id="idioma" v-model="usuariStore.preferencies.idioma" />
      </div>

      <div class="entrada">
        <label for="tema">Tema:</label>
        <input id="tema" v-model="usuariStore.preferencies.tema" />
      </div>
    </fieldset>
  </div>
  <div>
    <h1>Peticions Pendents</h1>
    <ul>
      <li v-for="peticio in peticionsNoEntregades" :key="peticio.id">
        <strong>Element:</strong> {{ peticio.element }} -
        <strong>Destinatari:</strong> {{ peticio.destinatari }}
        <button @click="marcarComEntregat(peticio.id)">
          Marcar com entregat
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { usePeticionsStore } from '@/store/peticionsStore'
  import { useUsuariStore } from '@/store/usuariStore'
  import { computed } from 'vue'

  // Utilitza la store
  const usuariStore = useUsuariStore()
  const peticionsStore = usePeticionsStore()

  const peticionsNoEntregades = computed(() =>
    peticionsStore.peticions.filter((p) => !p.entregat)
  )

  function marcarComEntregat(id: number) {
    const dataActual = new Date().toISOString().split('T')[0]
    peticionsStore.marcarComEntregat(id, dataActual)
  }
</script>

<style scoped>
  .perfil-usuari {
    max-width: 600px;
    margin: auto;
  }

  .info-usuari {
    margin-bottom: 20px;
  }

  .formulari {
    border: 1px solid #ccc;
    padding: 15px;
    border-radius: 5px;
  }

  .entrada {
    margin-bottom: 10px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }

  /* Peticions Store*/

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 8px;
  }

  button {
    margin-left: 12px;
  }
</style>
