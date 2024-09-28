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

<script lang="ts" setup>
  interface Props {
    nom: string
    email: string
    doi?: string
    icon?: string
    color?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    doi: '',
    icon: '/default-icon.png',
    color: '#fff',
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
