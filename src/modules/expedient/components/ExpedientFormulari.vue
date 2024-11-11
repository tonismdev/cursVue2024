<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ title }}</div>
    </q-card-section>
    <q-card-section>
      <q-form @submit="onSubmit">
        <q-input
          filled
          v-model="form.num"
          label="Número d'expedient"
          class="q-mb-md"
          required
        />
        <q-input
          filled
          v-model="form.data"
          label="Data"
          type="date"
          class="q-mb-md"
          required
        />
        <q-checkbox v-model="form.obert" label="Obert" class="q-mb-md" />
        <q-card-actions align="right">
          <q-btn flat label="Cancel·lar" color="negative" @click="cancel" />
          <q-btn flat label="Guardar" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
  import { defineEmits, defineProps, ref, watch } from 'vue'

  // Propietats
  const props = defineProps({
    initialData: {
      type: Object,
      required: true,
      default: () => ({
        num: '',
        data: '',
        obert: true,
        usuari_id: null,
      }),
    },
    title: {
      type: String,
      required: true,
      default: 'Formulari',
    },
  })

  // Emits per comunicar amb el component pare
  const emit = defineEmits(['submit', 'cancel'])

  // Form reactiu
  const form = ref({ ...props.initialData })

  watch(
    () => props.initialData,
    (newData) => {
      form.value = { ...newData }
    },
    { deep: true, immediate: true }
  )

  const onSubmit = () => {
    emit('submit', { ...form.value }) // Envia una còpia del formulari
  }

  const cancel = () => {
    emit('cancel')
  }
</script>
