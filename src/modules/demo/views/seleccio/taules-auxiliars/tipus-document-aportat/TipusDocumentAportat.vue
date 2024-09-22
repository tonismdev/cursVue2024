<template>
  <q-card class="my-card" flat bordered>
    <q-item class="bg-grey-3">
      <span class="text-h5"> Tipus de document aportat </span>
    </q-item>

    <q-separator />

    <q-card-section>
      <q-table
        v-model:selected="selected"
        :dense="$q.screen.lt.md"
        class="my-sticky-column-table"
        :rows="tipusDocumentsAportats"
        :columns="columns"
        :filter="filter"
        row-key="id"
        :selected-rows-label="getSelectedString"
        selection="multiple"
      >
        <template #top>
          <q-btn
            color="primary"
            label="Afegir nou element"
            @click="testDialog = true"
          />
          <q-dialog v-model="testDialog" persistent>
            <q-card>
              <q-card-section>
                <div class="text-h6">Aquesta funció no està implementada</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                Testing de Dialogs. <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                repellendus sit voluptate voluptas eveniet porro. Rerum
                blanditiis perferendis totam, ea at omnis vel numquam
                exercitationem aut, natus minima, porro labore.
              </q-card-section>

              <q-card-actions align="right">
                <q-btn v-close-popup flat label="OK" color="primary" />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-space />
          <q-input v-model="filter" dense debounce="300" color="primary">
            <template #append>
              <q-icon name="fas fa-search" />
            </template>
          </q-input>
        </template>
        <template #body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-checkbox v-model="props.selected" dense />
            </q-td>
            <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="nom" :props="props">
              {{ props.row.nom }}
            </q-td>
            <q-td key="nomES" :props="props">
              {{ props.row.nomES }}
            </q-td>

            <q-td key="baixa" :props="props">
              <q-badge v-if="props.row.baixa == false" color="green">
                Alta
              </q-badge>
              <q-badge v-if="props.row.baixa == true" color="red">
                Baixa
              </q-badge>
            </q-td>
            <q-td key="pinball" :props="props">
              <q-badge
                v-if="
                  props.row.permetConsultaPlataformaInteroperabilitat == false
                "
                color="red"
              >
                No disponible
              </q-badge>
              <q-badge
                v-if="
                  props.row.permetConsultaPlataformaInteroperabilitat == true
                "
                color="green"
              >
                Disponible
              </q-badge>
            </q-td>
            <q-td key="actions" :props="props">
              <q-btn round icon="fas fa-edit" color="secondary" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
  import { urls } from '@/config/urls'
  import { imasAxios } from '@/core/api'
  import { parseURLParams } from '@/core/utils/imas'
  import { TipusDocumentAportat } from '@/models'
  import { staticTables } from '@/store/staticTables'
  import { computed, onMounted, ref } from 'vue'

  const pinia = staticTables()
  const selected = ref([])
  const filter = ref('')
  const testDialog = ref(false)

  pinia.breadcrumbsItems = [
    {
      icon: 'fas fa-home',
      to: { name: 'Home' },
    },
    {
      label: 'Tipus document aportat',
    },
  ]

  const columns = [
    {
      name: 'id',
      required: true,
      align: 'left',
      label: 'id',
      sortable: true,
    },
    {
      name: 'nom',
      label: 'Nom en català del tipus document aportat',
      align: 'left',
      field: 'nom',
    },
    {
      name: 'nomES',
      label: 'Nom en castellà del tipus document aportat',
      align: 'left',
      field: 'nomES',
    },
    {
      name: 'baixa',
      label: 'Baixa',
      field: 'baixa',
    },
    {
      name: 'pinball',
      label: 'Pinball',
      field: 'permetConsultaPlataformaInteroperabilitat',
    },
    {
      name: 'actions',
      label: 'Accions',
    },

    // { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
    // { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
    // { name: 'protein', label: 'Protein (g)', field: 'protein' },
    // { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
    // {
    //   name: 'calcium',
    //   label: 'Calcium (%)',
    //   field: 'calcium',
    //   sortable: true,
    //   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
    // },
    // {
    //   name: 'iron',
    //   label: 'Iron (%)',
    //   field: 'iron',
    //   sortable: true,
    //   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
    // },
  ]

  const getSelectedString = () => {
    return selected.value.length === 0
      ? ''
      : `${selected.value.length} record${
          selected.value.length > 1 ? 's' : ''
        } selected of ${tipusDocumentsAportats.value.length}`
  }

  const tipusDocumentsAportats = computed(() => TipusDocumentAportat.all())

  const fetchItems = () => {
    imasAxios
      .get(parseURLParams(urls.TAUX_TIPUS_DOC_APORTAT_GET))
      .then(({ data }) => {
        TipusDocumentAportat.fresh(data)
      })
  }

  onMounted(() => fetchItems())
</script>
