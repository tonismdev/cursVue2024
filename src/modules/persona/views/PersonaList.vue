<template>
  <div class="row">
    <div class="col-12">
      <h1>{{ t('per.persona', 2) }}</h1>
    </div>

    <div class="col-12">
      <q-table
        :rows="persones"
        :columns="columns"
        row-key="id"
        :loading="isFetching"
      >
        <template #top>
          <FiltrePersones
            class="col-grow"
            v-model="filtrePersones"
            :is-feching="isFetching"
          />

          <q-btn
            round
            color="positive"
            icon="fa-solid fa-plus"
            @click="novaPersona"
          />
        </template>

        <template #body-cell-estat="props">
          <q-td :props="props">
            <q-chip
              :color="props.value ? 'positive' : 'negative'"
              text-color="white"
              :label="t('sol.est.' + props.value)"
            />
          </q-td>
        </template>

        <template #body-cell-accions="props">
          <q-td :props="props">
            <q-btn
              flat
              dense
              color="primary"
              icon="fa-solid fa-eye"
              :to="{ name: 'PersonaView', params: { id: props.value } }"
            />
          </q-td>
        </template>
      </q-table>
    </div>

    <PersonaFormDialog ref="personaFormDialog" />
  </div>
</template>

<script setup lang="ts">
  import useBreadcrumbs from '@/core/composables/useBreadcrumbs'
  import { QTableColumn } from 'quasar'
  import { computed, onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import FiltrePersones from '../components/FiltrePersones.vue'
  import PersonaFormDialog from '../components/PersonaFormDialog.vue'
  import { usePersones } from '../composables/usePersones'
  import { Persona, Sexe, TipusDoi } from '../models/Persona'

  const { t } = useI18n()

  // Referencia al formulari per poder executar la funció expose
  const personaFormDialog = ref()

  // Obtenim les dades del composable de forma senzilla
  const { persones, isFetching, filtrePersones } = usePersones()

  // Metode per a la creació d'una nova persona, establim els valors per defecte i cridam al dialog
  const novaPersona = () => {
    const _persona = Persona.from()
    _persona.sexe = Sexe.D
    _persona.tipus_doi = TipusDoi.nif
    personaFormDialog.value.open(_persona)
  }

  // Establim migas de pan
  onMounted(() => {
    useBreadcrumbs([
      {
        label: t('per.persona', 2),
      },
    ])
  })

  // Definició de les columnes per a una taula quasar
  const columns = computed<QTableColumn[]>(() => [
    {
      name: 'id',
      label: t('per.id'),
      field: 'id',
      sortable: true,
    },
    {
      name: 'doi',
      label: t('per.doi'),
      field: 'doi',
      sortable: true,
    },
    {
      name: 'nom',
      label: t('per.nom'),
      field: (row) => Persona.nomComplet(row),
      sortable: true,
    },
    {
      name: 'accions',
      label: '',
      field: 'id',
    },
  ])
</script>

<style scoped></style>
