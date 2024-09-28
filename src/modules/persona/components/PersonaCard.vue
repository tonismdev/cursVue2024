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
      <p>{{ persona.doi }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Persona } from '../models/Persona' // Importa el model Persona

  interface Props {
    persona: Persona
    color?: string
    icon?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    color: '#fff',
    icon: '/default-icon.png',
  })
</script>

<style scoped>
  .persona-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    align-items: center;
    max-width: 40em;
    margin-left: 2em;
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
