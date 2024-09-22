<template>
  <q-dialog v-if="persona" v-model="dialog" persistent>
    <q-card style="width: 1280px; max-width: 90vw">
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>
          {{ persona.id ? t('ui.update') : t('ui.create') }}
          {{ t('per.persona').toLowerCase() }}
        </q-toolbar-title>

        <q-space />

        <q-btn v-close-popup dense flat icon="fa-solid fa-xmark" />
      </q-toolbar>

      <q-card-section>
        <q-form
          class="row q-col-gutter-md"
          greedy
          @submit="() => update(persona!)"
        >
          <q-select
            v-model="persona.tipus_doi"
            emit-value
            map-options
            class="col-12 col-sm-6 col-md-4 col-lg-3"
            filled
            :options="tipus_doi"
            :label="t('per.tipus_doi')"
            clearable
            :rules="[obligatori]"
            @update:model-value="() => inputDoi?.validate()"
          />

          <q-input
            ref="inputDoi"
            v-model="persona.doi"
            class="col-12 col-sm-6 col-md-4 col-lg-3"
            filled
            :label="t('per.doi')"
            :rules="[validacioDoi]"
            maxlength="10"
          />

          <q-input
            v-model="persona.nom"
            class="col-12 col-sm-6 col-md-4 col-lg-3"
            filled
            :label="t('per.nom')"
            :rules="[obligatori]"
            maxlength="30"
          />

          <q-input
            v-model="persona.llinatge1"
            class="col-12 col-sm-6 col-md-4 col-lg-3"
            filled
            :label="t('per.llinatge1')"
            :rules="[obligatori]"
            maxlength="30"
          />

          <q-input
            v-model="persona.llinatge2"
            class="col-12 col-sm-6 col-md-4 col-lg-3"
            filled
            :label="t('per.llinatge2')"
            maxlength="30"
          />

          <InputDate
            v-model="persona.data_naixement"
            class="col-12 col-sm-6 col-md-4 col-lg-3"
            filled
            :label="t('per.data_naixement')"
            clearable
          />

          <div class="col-12 col-sm-6 col-md-4 col-lg-3 q-field--with-bottom">
            <label>{{ t('per.sexe') }}</label>
            <q-btn-toggle
              v-model="persona.sexe"
              spread
              toggle-color="primary"
              :options="sexes"
            />
          </div>

          <q-input
            v-model="persona.telefon"
            class="col-12 col-sm-6 col-md-4 col-lg-3"
            filled
            :label="t('per.telefon')"
            maxlength="20"
          />

          <q-input
            v-model="persona.email"
            class="col-12 col-sm-6 col-md-4 col-lg-3"
            filled
            :label="t('per.email')"
            maxlength="160"
          />

          <q-input
            v-model="persona.observacions"
            type="textarea"
            class="col-12"
            filled
            autogrow
            :label="t('per.observacions')"
          />

          <FormButtons
            class="col-12"
            :is-update="!!persona.id"
            :show-delete="!!persona.id"
            :nom-entitat="t('per.lpersona').toLowerCase()"
            @delete="esborra(persona.id)"
            :is-deleting="isDeleting"
            :is-updating="isUpdating"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import { obligatori } from '@/core/utils/validacionsQuasar'
  import FormButtons from '@/modules/shared/components/FormButtons.vue'
  import InputDate from '@/modules/shared/components/InputDate.vue'
  import { QInput } from 'quasar'
  import { validDNI, validNIE } from 'spain-id'
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'
  import { usePersonaUpdate } from '../composables/usePersonaUpdate'
  import { Persona, Sexe, TipusDoi } from '../models/Persona'

  const { t } = useI18n()
  const router = useRouter()

  const inputDoi = ref<QInput>()

  // Establim una variable reactiva buida de l'objecte que editam al formulari
  const persona = ref<Persona>()

  // Variable que ens indica si es mostra o no el dialog
  const dialog = ref<boolean>(false)

  // Definim un expose que establirà la persona a editar i obrirà el dialog quant la cridem
  const open = (_persona?: Persona) => {
    persona.value = Persona.from(_persona)

    dialog.value = true
  }

  defineExpose({ open })

  // Composable per realitzar pes peticions a api
  const { isUpdating, update, isDeleting, esborra } = usePersonaUpdate({
    onSuccess: (data, variables) => {
      // Si es correcte i es edició tancarem el dialog i si es creació anirem a la pàgina de la vista
      if (variables.id) {
        dialog.value = false
      } else {
        router.push({ name: 'PersonaView', params: { id: data.id } })
      }
    },
    onDelete: () => {
      // En cas d'eliminació anirem a la vista de la llista
      router.push({ name: 'PersonaList' })
    },
  })

  // Valors desplegable si botons
  const tipus_doi = computed(() =>
    Object.values(TipusDoi).map((td) => {
      return {
        value: td,
        label: t('per.t_doi.' + td),
      }
    })
  )

  const sexes = computed(() =>
    Object.values(Sexe).map((s) => {
      return {
        value: s,
        label: t('per.sex.' + s),
      }
    })
  )

  // Validació del tipus de document, es un poc més complexe ja que implica dos camps, el tipus i el valor
  const validacioDoi = (val) => {
    if (persona.value?.tipus_doi) {
      if (persona.value.tipus_doi == TipusDoi.nif) {
        return validDNI(val) || t('ui.val.nieFormat')
      } else if (persona.value.tipus_doi == TipusDoi.nie) {
        return validNIE(val) || t('ui.val.nieFormat')
      }
    }

    return true
  }
</script>

<style scoped></style>
