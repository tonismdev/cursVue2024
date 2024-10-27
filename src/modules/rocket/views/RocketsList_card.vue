<!-- Vista per al llistat de coets -->

<!--template>
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
</!--template-->

<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h5">Llista de Coets</div>
      </q-toolbar-title>
    </q-toolbar>

    <div v-if="isFetching" class="q-pa-md flex flex-center">
      <q-spinner color="primary" size="50px" />
      <div class="text-caption">Carregant coets...</div>
    </div>

    <div v-else class="q-gutter-md row">
      <q-card
        v-for="rocket in rockets"
        :key="rocket.id"
        class="col-xs-12 col-sm-6 col-md-4"
        bordered
        flat
      >
        <q-card-section>
          <div class="text-h6">{{ rocket.name }}</div>
          <div class="text-subtitle2 q-mt-sm">{{ rocket.company }}</div>
        </q-card-section>

        <q-card-section>
          <p>{{ rocket.description }}</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            :to="{ name: 'RocketDetall', params: { id: rocket.id } }"
            label="Veure Detalls"
            color="primary"
            flat
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useFetchRockets } from '../composables/useFetchRockets'
  const { rockets, isFetching } = useFetchRockets()

  const rocketsList = ref(rockets.value || []) // Set rocketsList to an empty array initially

  // Watch for changes in rockets data
  watch(
    () => rockets.value,
    (newVal) => {
      if (newVal) rocketsList.value = newVal
    }
  )

  console.log('Rockets data:', rockets.value)
</script>

<style scoped>
  .q-card__image {
    max-height: 200px;
    object-fit: cover;
  }
</style>
