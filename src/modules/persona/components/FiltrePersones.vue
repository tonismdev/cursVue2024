<template>
  <div>
    <q-form greedy class="row q-col-gutter-md" @submit="cercar">
      <q-input
        dense
        filled
        v-model="filtre.text"
        :class="props.inputClass"
        :label="t('ui.btn.search')"
        :rules="[(val) => minLength(val, 3)]"
      />
      <InputButton
        v-model="filtre.sexe"
        :class="props.inputClass"
        :label="t('per.sexe')"
        :options="sexes"
        clearable
      />

      <div>
        <q-btn
          type="submit"
          color="teal"
          icon="fas fa-magnifying-glass"
          :title="t('ui.btn.search')"
          :disable="isFetching"
          :loading="isFetching"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
  import { minLength } from '@/core/utils/validacionsQuasar'
  import InputButton from '@/modules/shared/components/InputButton.vue'
  import { computed, ref, toRef } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { FiltrePersones } from '../composables/usePersones'
  import { Sexe } from '../models/Persona'

  const { t } = useI18n()

  interface Props {
    modelValue: FiltrePersones
    isFeching?: boolean
    inputClass?: string
  }

  // Establim valors per defecte d'algunes propietat no obligatories
  const props = withDefaults(defineProps<Props>(), {
    inputClass: 'col-12 col-sm-6 col-md-2 col-lg-2',
  })

  // El filtre que ens arriba com a paràmetre el clonam per evitar usar la mateixa referencia de l'objecte
  const filtre = ref({ ...props.modelValue })

  // La propietat fetching ha de ser reactiva, sino no s'actualitzaria, l'usarem per bloquejar el filtre si s'esta fent una petició
  const isFetching = toRef(props, 'isFeching')

  interface Emits {
    (e: 'update:modelValue', data: FiltrePersones): void
  }

  const emit = defineEmits<Emits>()

  // Al fer click al boto cercar emetrem una copia del filtre al pare.
  const cercar = () => {
    emit('update:modelValue', { ...filtre.value })
  }

  // Valors desplegables
  const sexes = computed(() =>
    Object.values(Sexe).map((s) => {
      return {
        label: t('per.sex.' + s),
        value: s,
      }
    })
  )
</script>

<style scoped></style>
