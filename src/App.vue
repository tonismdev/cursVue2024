<template>
  <router-view />
  <ImasLoading />

  <h1>Curs Vue 2024 - Exercici 2</h1>
  Prova de la creació de dos components amb Vue 3:
  <h5>Component genèric</h5>
  <GenericCard
    :icon="rutaIcona"
    :color="'#f0f0f0'"
    :nom="'Toni Sánchez Magraner'"
    :email="'asanchez@imas.conselldemallorca.net'"
    :doi="'37347777D'"
  />
  <h5>Component específic</h5>

  <PersonaCard
    :persona="{
      nom: 'Toni',
      llinatge1: 'Sánchez',
      llinatge2: 'Magraner',
      email: 'asanchez@imas.conselldemallorca.net',
      doi: '37342577D',
    }"
    :color="'#f0f0f0'"
    :icon="rutaIcona"
    :showDoi="true"
    @persona-click="gestionaClickPersona"
  ></PersonaCard>

  <h5>Component específic amb emit</h5>
  <PersonaCardEmit
    ref="personaCardRef"
    :persona="{
      nom: 'Toni',
      llinatge1: 'Sánchez',
      llinatge2: 'Magraner',
      email: 'asanchez@imas.conselldemallorca.net',
      doi: '37342577D',
    }"
    :color="'#f0f0f0'"
    :icon="rutaIcona"
    :showDoi="true"
    @persona-click="gestionaClickPersona"
  >
    <template #contingutExtra>
      <div>ContingutSlot</div>
    </template>
  </PersonaCardEmit>
  <button @click="canviaPersonaCardColor">Fitxa vermella</button>
  <h5>Prova d'ús d'un composable: comptador</h5>
  <p>El valor és: {{ valor }}</p>
  <button @click="incrementar">Incrementar</button>
  <button @click="decrementar">Decrementar</button>

  <h5>Prova d'ús d'un composable: toggle</h5>
  <p>{{ estat ? 'És cert' : 'És fals' }}</p>
  <p v-if="estat">Sí, que és cert</p>
  <button @click="toggle">Canviar estat</button>
</template>

<script lang="ts" setup>
  import rutaIcona from '@/assets/img/Logo_IMAS_blanc_back.png'
  import PersonaCard from '@/modules/persona/components/PersonaCard.vue'
  import PersonaCardEmit from '@/modules/persona/components/PersonaCardEmit.vue'
  import GenericCard from '@/modules/shared/components/GenericCard.vue'
  import { staticTables } from '@/store/staticTables'
  import { useMeta } from 'quasar'
  import { ref } from 'vue'
  import ImasLoading from './core/components/ImasLoading.vue'
  import { useComptador } from './modules/shared/composables/useComptador'
  import { useToggle } from './modules/shared/composables/useToggle'

  const pinia = staticTables()
  const { valor, incrementar, decrementar } = useComptador(7)
  const { estat, toggle } = useToggle(false)
  useMeta(() => {
    return {
      // whenever "title" from above changes, your meta will automatically update
      title: `IMAS | ${pinia.appTitle}`,
    }
  })

  const gestionaClickPersona = (personaSeleccionada) => {
    console.log('Persona triada:', personaSeleccionada)
  }

  const personaCardRef = ref<typeof PersonaCardEmit>(null)
  const canviaPersonaCardColor = () => {
    personaCardRef.value?.canviaColor('#ff0000')
  }
</script>
