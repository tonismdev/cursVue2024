<template>
  <q-page padding v-if="usuari">
    <q-card flat bordered class="q-pa-md">
      <q-card-section>
        <div class="text-h4">{{ usuari.nom }}</div>
        <div class="text-subtitle1 q-mt-sm">{{ usuari.username }}</div>
      </q-card-section>

      <q-separator />

      <!-- Descripció de l'usuari -->
      <q-card-section>
        <div class="text-h6 q-mb-xs">Informació Personal</div>
        <div class="q-gutter-md">
          <div><strong>ID:</strong> {{ usuari.id }}</div>
          <div><strong>Nom complet:</strong> {{ usuari.nom }}</div>
          <div><strong>Codi Usuari:</strong> {{ usuari.username }}</div>
          <div>
            <strong>Data de naixement:</strong> {{ usuari.data_naixement }}
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn
          label="Tornar"
          color="primary"
          flat
          icon="fa-solid fa-backward"
          @click="goBack"
        />
      </q-card-actions>
    </q-card>
  </q-page>

  <!-- Mostra un missatge de càrrega si `usuari` és nul -->
  <div v-else class="q-pa-md text-center">
    <q-spinner color="primary" size="50px" />
    <div class="text-caption q-mt-sm">Carregant detalls de l'usuari...</div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router'
  import { useFetchUsuariById } from '../composables/useFetchUsuariById'

  const route = useRoute()
  const router = useRouter()
  const { usuari, isFetching } = useFetchUsuariById(route.params.id as string)

  console.log('Usuari de la vista: ', usuari)

  const goBack = () => {
    router.back()
  }
</script>
