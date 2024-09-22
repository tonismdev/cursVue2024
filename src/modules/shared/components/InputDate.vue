<template>
  <q-input
    v-model="value"
    filled
    :rules="rules"
    :label="props.label"
    :mask="mask"
  >
    <template #append>
      <q-icon name="fa-regular fa-calendar" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="value" :mask="format">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
      <q-icon v-if="time" name="fa-solid fa-clock" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time v-model="value" :mask="format" format24h>
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup lang="ts">
  import { dateFormat } from '@/core/utils/validacionsQuasar'
  import dayjs from 'dayjs'
  import { date, ValidationRule } from 'quasar'
  import { computed, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  interface Props {
    modelValue: Date | null | undefined
    label?: string
    format?: string // Format: https://quasar.dev/quasar-utils/date-utils#format-for-display
    filled?: boolean
    rules?: ValidationRule<any>[]
    time?: boolean
  }

  interface Emits {
    (e: 'update:modelValue', date: Date | null): void
  }

  const props = withDefaults(defineProps<Props>(), {
    label: '',
    filled: false,
    rules: () => [],
    time: false,
  })
  const format = computed(() =>
    props.format || props.time ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY'
  )
  const mask = computed(() => format.value.replaceAll(/\w/g, '#'))

  const emits = defineEmits<Emits>()

  const value = ref<string>('')

  watch(
    () => props.modelValue,
    (newVal) => {
      value.value = newVal != null ? date.formatDate(newVal, format.value) : ''
    },
    {
      immediate: true,
    }
  )

  watch(value, () => {
    if (value.value == '') {
      emits('update:modelValue', null)
    } else if (dayjs(value.value, format.value, true).isValid()) {
      const d = date.extractDate(value.value, format.value)
      emits('update:modelValue', d)
    }
  })

  const rules = computed<ValidationRule<any>[]>(() => {
    return [...props.rules, (val) => dateFormat(val, format.value)]
  })
</script>

<style scoped></style>
