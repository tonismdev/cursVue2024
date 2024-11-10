<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ title }}</div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-form @submit.prevent="onSubmit">
        <q-input
          v-model="form.nom"
          label="Nom"
          dense
          clearable
          required
          class="q-mb-md"
        />
        <q-input
          v-model="form.username"
          label="Codi Usuari"
          dense
          clearable
          required
          class="q-mb-md"
        />
        <q-input
          v-model="form.data_naixement"
          label="Data de Naixement"
          type="date"
          dense
          required
          class="q-mb-md"
        />
      </q-form>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn flat label="Cancel·la" color="negative" @click="onCancel" />
      <q-btn flat label="Desa" color="positive" @click="onSubmit" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
  import { defineEmits, defineProps, ref, watch } from 'vue'

  const props = defineProps({
    initialData: {
      type: Object,
      default: () => ({ nom: '', username: '', data_naixement: '' }),
    },
    title: {
      type: String,
      default: "Formulari d'Usuari",
    },
  })

  const emit = defineEmits(['submit', 'cancel'])

  const form = ref({ ...props.initialData })

  watch(
    () => props.initialData,
    (newVal) => {
      form.value = { ...newVal }
    },
    { deep: true, immediate: true }
  )

  const onSubmit = () => {
    emit('submit', form.value)
  }

  const onCancel = () => {
    emit('cancel')
  }
</script>
