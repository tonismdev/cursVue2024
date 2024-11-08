<!-- Vista per al llistat de coets -->

<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h4">Llista de Coets</div>
      </q-toolbar-title>
    </q-toolbar>

    <!-- Spinner de càrrega mentre es carrega la informació -->
    <div v-if="isFetching" class="q-pa-md flex flex-center">
      <q-spinner color="primary" size="50px" />
      <div class="text-caption">Carregant coets...</div>
    </div>

    <!-- Taula amb la llista de coets -->
    <q-table
      v-else
      :rows="rockets"
      :columns="columns"
      row-key="id"
      flat
      separator="horizontal"
    >
      <template v-slot:body-cell-name="props">
        <q-td :props="props">{{ props.row.name }}</q-td>
      </template>

      <template v-slot:body-cell-company="props">
        <q-td :props="props">{{ props.row.company }}</q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" align="right">
          <q-btn
            :to="{ name: 'RocketDetall', params: { id: props.row.id } }"
            label="Detalls"
            color="primary"
            flat
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useFetchRockets } from '../composables/useFetchRockets'

  // Obtenim els coets i l'estat de càrrega
  const { rockets, isFetching } = useFetchRockets()

  // Definició de les columnes per a la taula
  const columns = ref([
    { name: 'name', label: 'Nom', field: 'name', align: 'left' },
    { name: 'company', label: 'Companyia', field: 'company', align: 'left' },
    { name: 'actions', label: 'Accions', align: 'right' },
  ])
</script>
