<template>
  <div class="row q-col-gutter-md" v-if="persona">
    <div class="col-12">
      <h1>{{ Persona.nomComplet(persona, true) }}</h1>
    </div>

    <FancyListVue
      class="col-12"
      :bordered="true"
      :separator="true"
      :items="persona_data"
    >
      <template v-slot:actions>
        <q-btn
          dense
          flat
          color="primary"
          icon="fa-solid fa-pen"
          @click="personaFormDialog.open(persona)"
        />
      </template>
    </FancyListVue>

    <pre class="col-12 pre-fancy">
      <span class="text-caption">{{ t('per.observacions') }}:</span>
      {{ persona?.observacions }}
    </pre>
  </div>

  <PersonaFormDialog ref="personaFormDialog" />
</template>

<script setup lang="ts">
  import useBreadcrumbs from '@/core/composables/useBreadcrumbs'
  import useLoading from '@/core/composables/useLoading'
  import FancyListVue, {
    FancyItem,
  } from '@/modules/shared/components/FancyList.vue'
  import { computed, onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'
  import PersonaFormDialog from '../components/PersonaFormDialog.vue'
  import { usePersona } from '../composables/usePersona'
  import { Persona } from '../models/Persona'

  const { t } = useI18n()
  const route = useRoute()

  // Referencia al dialog per editar la persona
  const personaFormDialog = ref()

  // Paràmetre de la url amb l'id
  const { id } = route.params

  // Obtenim la persona amb el composable
  const { persona, isFetching } = usePersona(+id)

  // Definició de la informació per al component FancyList que hi ha a shared
  const persona_data = computed<FancyItem[]>(() => [
    {
      label: t('per.telefon'),
      value: persona.value?.telefon,
    },
    {
      label: t('per.email'),
      value: persona.value?.email,
    },
  ])

  // Composable que ens mostra un loading durant la carrega de la persona
  useLoading(isFetching, persona)

  // Element reactiu per calcular la miga de pan al tenir el nom de la persona
  const bcPersona = computed(() => {
    return {
      label: Persona.nomComplet(persona.value!),
    }
  })

  // Definim la miga de pan amb el component reactiu del nom de la persona
  onMounted(() => {
    useBreadcrumbs([
      {
        label: t('per.persona', 2),
        to: { name: 'PersonaList' },
      },
      bcPersona,
    ])
  })
</script>

<style scoped></style>
