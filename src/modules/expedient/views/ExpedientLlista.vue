<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h4">{{ titol }}</div>
      </q-toolbar-title>
      <q-btn
        v-if="usuari_id"
        label="Crear Expedient"
        color="primary"
        icon="fa-solid fa-plus"
        flat
        @click="openCreateDialog"
      />
    </q-toolbar>

    <div class="q-pa-md">
      <q-input
        filled
        dense
        v-model="filters.num"
        label="Filtra per número d'expedient"
        clearable
        debounce="300"
        class="q-mb-md"
      />
      <q-checkbox
        v-model="filters.mostraTancats"
        label="Incloure expedients tancats"
        class="q-mb-md"
      />
    </div>

    <!-- Spinner de càrrega -->
    <div v-if="isFetching" class="q-pa-md flex flex-center">
      <q-spinner color="primary" size="50px" />
      <div class="text-caption">Carregant expedients...</div>
    </div>

    <!-- Taula amb els expedients -->
    <q-table
      v-else
      :rows="expedientsFiltrats"
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

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" align="right">
          <!-- Botó per veure la fitxa de l'usuari -->
          <q-btn
            flat
            dense
            color="primary"
            icon="fa-solid fa-user"
            label="Veure Usuari"
            :disable="!props.row.usuari_id"
            @click="
              props.row.usuari_id && goToUsuariDetall(props.row.usuari_id)
            "
          />
          <!-- Botó per editar l'expedient -->
          <q-btn
            flat
            dense
            color="info"
            icon="fa-solid fa-edit"
            label="Editar"
            @click="openEditDialog(props.row)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- Formulari per Crear o Editar -->
    <q-dialog v-model="isDialogOpen">
      <ExpedientFormulari
        :initialData="selectedExpedient"
        :title="dialogTitle"
        @submit="handleSubmit"
        @cancel="closeDialog"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
  import { useQueryClient } from '@tanstack/vue-query'
  import axios from 'axios'
  import { computed, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import ExpedientFormulari from '../components/ExpedientFormulari.vue'
  import { useFetchExpedients } from '../composables/useFetchExpedients'

  const router = useRouter()
  const queryClient = useQueryClient() // Per invalidar les queries
  // Funció per navegar a la vista de detall de l'usuari
  const goToUsuariDetall = (usuari_id: number) => {
    router.push({ name: 'UsuariDetall', params: { id: usuari_id } })
  }

  // Obtenim el paràmetre `usuari_id` (si existeix)
  const route = useRoute()
  //const usuari_id = route.params.usuari_id || null
  // Faig usuari_id computed, per tal de poder refrescar
  const usuari_id = computed(() => route.params.usuari_id || null)

  const titol = computed(() => {
    return usuari_id.value
      ? `Llistat d'expedients de l'usuari ${usuari_id.value}`
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
    { name: 'usuari_id', label: 'Usuari', field: 'usuari_id', align: 'left' },
    { name: 'obert', label: 'Estat', field: 'obert', align: 'left' },
    { name: 'actions', label: 'Accions', align: 'right' },
  ])

  const filters = ref({
    num: '', // Filtra pel número d'expedient
    mostraTancats: false, // Per defecte, només mostra oberts
  })

  // Expedients filtrats
  const expedientsFiltrats = computed(() => {
    console.log('Filtres aplicats:', filters.value)
    console.log('Expedients disponibles:', expedients.value)

    return expedients.value.filter((expedient) => {
      // Filtre per número d'expedient
      const matchesNum =
        !filters.value.num ||
        expedient.num.toString().includes(filters.value.num)

      // Filtre per estat (si `mostraTancats` està desmarcat, només mostra oberts)
      const matchesEstat =
        filters.value.mostraTancats || expedient.obert === true

      console.log(
        `Filtrant expedient ${expedient.id}: num(${matchesNum}), estat(${matchesEstat})`
      )

      return matchesNum && matchesEstat
    })
  })

  // Diàleg
  const isDialogOpen = ref(false)
  //const selectedExpedient = ref(null)
  const selectedExpedient = ref({
    num: '',
    data: '',
    obert: true,
    usuari_id: usuari_id.value,
  }) // Valors per defecte

  const dialogTitle = ref('')

  // Obrir el formulari per crear
  const openCreateDialog = () => {
    //selectedExpedient.value = { num: '', data: '', obert: true }
    selectedExpedient.value = {
      num: '',
      data: '',
      obert: true,
      usuari_id: usuari_id.value,
    }
    dialogTitle.value = 'Crear Nou Expedient'
    isDialogOpen.value = true
  }

  // Obrir el formulari per editar
  const openEditDialog = (expedient) => {
    selectedExpedient.value = { ...expedient } // Carrega l'expedient seleccionat
    dialogTitle.value = 'Editar Expedient'
    isDialogOpen.value = true
  }

  // Tancar el formulari
  const closeDialog = () => {
    isDialogOpen.value = false
  }

  // Guardar (crear o editar)
  const handleSubmit = async (formData) => {
    console.log('formData: ', formData)
    try {
      if (selectedExpedient.value.id) {
        // Editar
        await axios.put(
          `http://localhost:3000/expedient/${selectedExpedient.value.id}`,
          formData
        )
      } else {
        // Crear
        await axios.post(`http://localhost:3000/expedient`, formData)
      }

      // Refresca la llista d'expedients, una vegada creat
      queryClient.invalidateQueries(['expedients', usuari_id.value])

      closeDialog()
    } catch (error) {
      console.error('Error guardant expedient:', error)
    }
  }
</script>
