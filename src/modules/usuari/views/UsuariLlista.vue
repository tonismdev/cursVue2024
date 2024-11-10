<!-- Vista per al llistat de coets -->

<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h4">Llista d'Usuaris</div>
      </q-toolbar-title>
      <q-btn
        label="Crear Usuari"
        color="primary"
        icon="fa-solid fa-plus"
        flat
        @click="openCreateDialog"
      />
    </q-toolbar>

    <q-dialog v-model="isDialogOpen">
      <UsuariForm
        :initialData="{}"
        title="Crear Nou Usuari"
        @submit="createUsuari"
        @cancel="closeDialog"
      />
    </q-dialog>

    <q-dialog v-model="isDialogOpen">
      <UsuariForm
        :initialData="selectedUsuari"
        title="Editar Usuari"
        @submit="editUsuari"
        @cancel="closeDialog"
      />
    </q-dialog>

    <!-- Filtres -->
    <div class="q-pa-md">
      <q-input
        filled
        dense
        v-model="filters.nom"
        label="Filtra per Nom"
        clearable
        debounce="300"
        class="q-mb-md"
      />
      <q-input
        filled
        dense
        v-model="filters.username"
        label="Filtra per Username"
        clearable
        debounce="300"
        class="q-mb-md"
      />
    </div>

    <!-- Spinner de càrrega mentre es carrega la informació -->
    <div v-if="isFetching" class="q-pa-md flex flex-center">
      <q-spinner color="primary" size="50px" />
      <div class="text-caption">Carregant usuaris...</div>
    </div>

    <!-- Taula amb la llista d'usuaris -->
    <q-table
      v-else
      :rows="filteredUsuaris"
      :columns="columns"
      row-key="id"
      flat
      separator="horizontal"
    >
      <template v-slot:body-cell-id="props">
        <q-td :props="props">{{ props.row.id }}</q-td>
      </template>

      <template v-slot:body-cell-nom="props">
        <q-td :props="props">{{ props.row.nom }}</q-td>
      </template>

      <template v-slot:body-cell-username="props">
        <q-td :props="props">{{ props.row.username }}</q-td>
      </template>

      <template v-slot:body-cell-data_naixement="props">
        <q-td :props="props">{{ props.row.data_naixement }}</q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" align="right">
          <q-btn
            :to="{ name: 'UsuariDetall', params: { id: props.row.id } }"
            label="Detalls"
            color="primary"
            flat
          />
          <q-btn
            flat
            label="Editar"
            color="secondary"
            @click="openEditDialog(props.row)"
          />
          <q-btn
            flat
            label="Expedients"
            color="info"
            @click="anarAExpedients(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
  import { useQueryClient } from '@tanstack/vue-query'
  import axios from 'axios'
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import UsuariForm from '../components/UsuariFormulari.vue'
  import { useFetchUsuaris } from '../composables/useFetchUsuaris'
  // Obtenim els coets i l'estat de càrrega
  const { usuaris, isFetching } = useFetchUsuaris()

  // Permet dur el Control del refresc de la llists
  const queryClient = useQueryClient()

  // Formulari de creació: no mostrar-ho per defecte
  const isDialogOpen = ref(false)
  // Funció per activar el formulari de creació
  const openCreateDialog = () => {
    isDialogOpen.value = true
  }
  // Funció per tancar el formulari de creació
  const closeDialog = () => {
    isDialogOpen.value = false
  }

  // Obre el diàleg per editar un usuari
  const selectedUsuari = ref({})
  const openEditDialog = (usuari) => {
    selectedUsuari.value = usuari
    isDialogOpen.value = true
  }

  // Definició de les columnes per a la taula
  const columns = ref([
    { name: 'id', label: 'Identificador', field: 'id', align: 'left' },
    { name: 'nom', label: 'Nom', field: 'nom', align: 'left' },
    {
      name: 'username',
      label: 'Codi Usuari',
      field: 'username',
      align: 'right',
    },
    {
      name: 'actions',
      label: 'Accions',
      align: 'right',
    },
  ])

  // Filtres reactius
  const filters = ref({
    nom: '',
    username: '',
  })

  // Usuaris filtrats
  const filteredUsuaris = computed(() => {
    return usuaris.value.filter((usuari) => {
      const matchesNom =
        !filters.value.nom ||
        usuari.nom.toLowerCase().includes(filters.value.nom.toLowerCase())
      const matchesUsername =
        !filters.value.username ||
        usuari.username
          .toLowerCase()
          .includes(filters.value.username.toLowerCase())
      return matchesNom && matchesUsername
    })
  })

  const createUsuari = async (formData) => {
    try {
      await axios.post('http://localhost:3000/usuari', formData)
      console.log('Usuari creat:', formData)

      // Refresca la llista d'usuaris
      queryClient.invalidateQueries(['usuaris'])

      closeDialog()
    } catch (error) {
      console.error('Error creant usuari:', error)
    }
  }

  const editUsuari = async (formData) => {
    try {
      await axios.put(`http://localhost:3000/usuari/${formData.id}`, formData)
      console.log('Usuari editat:', formData)

      // Refresca la llista d'usuaris
      queryClient.invalidateQueries(['usuaris'])

      closeDialog()
    } catch (error) {
      console.error('Error editant usuari:', error)
    }
  }
  const router = useRouter()
  const anarAExpedients = (usuari) => {
    router.push({ name: 'ExpedientsUsuari', params: { usuari_id: usuari.id } })
  }
</script>
