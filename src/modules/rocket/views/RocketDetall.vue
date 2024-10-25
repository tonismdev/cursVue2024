<!-- Vista per a visualitzar el detall d'un coet -->

<template>
  <div>
    <h1>{{ rocket?.name }}</h1>
    <p>{{ rocket?.description }}</p>
    <p>Country: {{ rocket?.country }}</p>
    <p>Company: {{ rocket?.company }}</p>
    <p>Cost per launch: {{ rocket?.cost_per_launch }}</p>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { useFetchRocketById } from '../composables/useFetchRocketById'

  const route = useRoute()
  const { rocket, isFetching } = useFetchRocketById(route.params.id as string)
</script>
