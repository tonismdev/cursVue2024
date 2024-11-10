<!-- Vista per a visualitzar el detall d'un coet -->

<template>
  <q-page padding v-if="rocket">
    <q-card flat bordered class="q-pa-md">
      <q-card-section>
        <div class="text-h4">{{ rocket.name }}</div>
        <div class="text-subtitle1 q-mt-sm">{{ rocket.company }}</div>
      </q-card-section>

      <q-separator />

      <!-- Descripció del coet -->
      <q-card-section>
        <div class="text-h6 q-mb-xs">Descripció</div>
        <p>{{ rocket.description }}</p>
      </q-card-section>

      <q-separator />

      <!-- Altres detalls -->
      <q-card-section>
        <div class="text-h6 q-mb-xs">Detalls del Coet</div>
        <div class="q-gutter-md">
          <div><strong>Pais:</strong> {{ rocket.country }}</div>
          <div><strong>Actiu:</strong> {{ rocket.active }}</div>
          <div>
            <strong>Cost per llançament:</strong> ${{
              rocket.cost_per_launch?.toLocaleString()
            }}
          </div>
        </div>
      </q-card-section>

      <div>
        <q-chip
          outline
          :color="rocket.active ? 'positive' : 'negative'"
          :icon="
            rocket.active ? 'fa-solid fa-star' : 'fa-solid fa-times-circle'
          "
        >
          {{ rocket.active ? 'Actiu' : 'Inactiu' }}
        </q-chip>
      </div>

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

  <!-- Mostra un missatge de càrrega si `rocket` és nul -->
  <div v-else class="q-pa-md text-center">
    <q-spinner color="primary" size="50px" />
    <div class="text-caption q-mt-sm">Carregant detalls del coet...</div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router'
  import { useFetchRocketById } from '../composables/useFetchRocketById'

  const route = useRoute()
  const router = useRouter()
  const { rocket, isFetching } = useFetchRocketById(route.params.id as string)

  console.log('Coet retornat: ', rocket)

  const goBack = () => {
    router.back()
  }
</script>
