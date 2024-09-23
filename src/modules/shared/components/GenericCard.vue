<template>
  <div :style="{ backgroundColor: color }" class="generic-card">
    <div class="icona">
      <img :src="icon" alt="Icona" />
    </div>
    <div class="details">
      <h2>{{ nom }}</h2>
      <p>{{ email }}</p>
      <p>{{ doi }}</p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'GenericCard',
    props: {
      nom: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      doi: {
        type: String,
        default: '',
      },
      icon: {
        type: String,
        default: '/default-icon.png',
      },
      color: {
        type: String,
        default: '#fff',
      },
    },
  })
</script>

<style scoped>
  .generic-card {
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
