<template>
  <q-page padding v-if="rocket">
    <q-card flat bordered class="q-pa-md">
      <q-card-section>
        <div class="text-h4">{{ rocket.name }}</div>
        <div class="text-subtitle1 q-mt-sm">{{ rocket.company }}</div>
      </q-card-section>

      <q-separator />

      <!-- Imatge del coet només si `flickr_images` està definit i té elements -->
      <q-card-section
        v-if="rocket.flickr_images && rocket.flickr_images.length > 0"
      >
        <q-img
          :src="rocket.flickr_images[0]"
          alt="Rocket Image"
          class="rocket-image"
          ratio="16:9"
        />
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
          <div><strong>Altura:</strong> {{ rocket.height?.meters }} m</div>
          <div><strong>Actiu:</strong> {{ rocket.active }} kg</div>
          <div><strong>Nombre d'etapes:</strong> {{ rocket.stages }}</div>
          <div>
            <strong>Cost per llançament:</strong> ${{
              rocket.cost_per_launch?.toLocaleString()
            }}
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <!-- Botó per tornar enrere -->
      <q-card-actions align="right">
        <q-btn label="Tornar" color="primary" flat @click="goBack" />
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
  import { onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useFetchRocketById } from '../composables/useFetchRocketById'

  const route = useRoute()
  const router = useRouter()
  const rocket = ref(null)
  const isFetching = ref(true)

  // Funció per obtenir les dades del coet pel seu ID
  /*const fetchRocket = async () => {
    console.log('Iniciant la recuperació del coet...')

    try {
      // Cridem a la funció per obtenir les dades del coet
      const { data: rocketData } = await useFetchRocketById(route.params.id) // accedim a data directament
      rocket.value = rocketData // Assignem només les dades del coet

      console.log("Valor de rocket després de l'assignació:", rocket.value)
    } catch (error) {
      console.error('Error recuperant les dades del coet:', error)
    }
  }

*/
  /*
  const fetchRocket = async () => {
    isFetching.value = true
    console.log('fetch getting started...')

    // Destructure `rocket` instead of `data`
    const { rocket, isFetching: fetching } = await useFetchRocketById(
      route.params.id as string
    )
    console.log('valor de rocket', rocket.value)

    // Assign the fetched rocket to your local reactive variable
    rocket.value = rocket || null
    isFetching.value = fetching

    console.log('valor de rocket after assignment', rocket.value)

    isFetching.value = false
  }
*/

  const fetchRocket = async () => {
    isFetching.value = true
    console.log('fetch getting started...')

    const { rocket: fetchedRocket, isFetching: fetching } = useFetchRocketById(
      route.params.id as string
    )

    // Access the actual Rocket object by using `fetchedRocket.value`
    rocket.value = fetchedRocket.value || null
    isFetching.value = fetching.value

    console.log('valor de rocket after assignment', rocket.value)
  }

  onMounted(fetchRocket)

  // Funció per tornar a la pàgina anterior
  const goBack = () => {
    router.back()
  }
</script>

<style scoped>
  .rocket-image {
    max-height: 400px;
    object-fit: cover;
  }
</style>
