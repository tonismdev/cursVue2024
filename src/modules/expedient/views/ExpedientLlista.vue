<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h4">{{ titol }}</div>
      </q-toolbar-title>
    </q-toolbar>

    <!-- Spinner de càrrega -->
    <div v-if="isFetching" class="q-pa-md flex flex-center">
      <q-spinner color="primary" size="50px" />
      <div class="text-caption">Carregant expedients...</div>
    </div>

    <!-- Taula amb els expedients -->
    <q-table
      v-else
      :rows="expedients"
      :columns="columns"
      row-key="id"
      flat
      separator="horizontal"
    >
      <template v-slot:body-cell-id="props">
        <q-td :props="props">{{ props.row.id }}</q-td>
      </template>

      <template v-slot:body-cell-num="props">
        <q-td :props="props">{{ props.row.num }}</q-td>
      </template>

      <template v-slot:body-cell-data="props">
        <q-td :props="props">{{ props.row.data }}</q-td>
      </template>

      <template v-slot:body-cell-obert="props">
        <q-td :props="props">
          <q-chip :color="props.row.obert ? 'positive' : 'negative'" outline>
            {{ props.row.obert ? 'Obert' : 'Tancat' }}
          </q-chip>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { useFetchExpedients } from '../composables/useFetchExpedients'

  // Obtenim el paràmetre `usuari_id` (si existeix)
  const route = useRoute()
  const usuari_id = route.params.usuari_id || null

  const titol = computed(() => {
    return usuari_id
      ? `Llistat d'expedients de l'usuari ${usuari_id}`
      : 'Llistat de tots els expedients'
  })

  console.log('Usuari del que es volen cercar els expedient:', usuari_id)

  // Carreguem els expedients
  const { expedients, isFetching } = useFetchExpedients(usuari_id)

  // Columnes de la taula
  const columns = ref([
    { name: 'id', label: 'Identificador', field: 'id', align: 'left' },
    { name: 'num', label: 'Número', field: 'num', align: 'left' },
    { name: 'data', label: 'Data', field: 'data', align: 'left' },
    { name: 'obert', label: 'Estat', field: 'obert', align: 'left' },
  ])
</script>
