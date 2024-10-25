<!-- Vista per al llistat de coets -->

<template>
  <div>
    <h1>Llista de coets</h1>
    <div v-if="isFetching">Carregant...</div>
    <ul v-else>
      <li v-for="rocket in rockets" :key="rocket.id">
        <router-link :to="{ name: 'RocketDetall', params: { id: rocket.id } }">
          {{ rocket.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { useFetchRockets } from '../composables/useFetchRockets'

  console.log('previ a cridar')
  const { rockets, isFetching } = useFetchRockets()
  console.log('posterior a cridar')
  console.log('Rockets data:', rockets.value)
</script>
