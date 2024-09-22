<template>
  <div :style="{ backgroundColor: color }" class="persona-card">
    <div class="icona">
      <img :src="icon" alt="Icona de la Persona" />
    </div>
    <div class="details">
      <h2>
        {{ persona.nom }} {{ persona.llinatge1 }} {{ persona.llinatge2 || '' }}
      </h2>
      <p>{{ persona.email }}</p>
      <p v-if="showDoi">DOI: {{ persona.doi }}</p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { Persona } from '../models/Persona' // Importa el model Persona

  export default defineComponent({
    name: 'PersonaCard',
    props: {
      persona: {
        type: Object as PropType<Persona>,
        required: true,
      },
      color: {
        type: String,
        default: '#fff',
      },
      icon: {
        type: String,
        default: '/default-icon.png',
      },
      showDoi: {
        type: Boolean,
        default: false,
      },
    },
  })
</script>

<style scoped>
  .persona-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    align-items: center;
  }

  .icon img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 16px;
  }

  .details h2 {
    margin: 0;
    font-size: 1.5em;
  }

  .details p {
    margin: 0;
    color: #666;
  }
</style>
