<template>
  <q-input
    v-model="imasDate"
    dense
    outlined
    mask="##/##/####"
    @blur="validarDate"
  >
    <template #append>
      <q-icon name="fa-regular fa-calendar" class="cursor-pointer">
        <q-popup-proxy
          ref="qDateProxy"
          cover
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            v-model="imasDate"
            :options="isInValidRange"
            mask="DD/MM/YYYY"
            @update:model-value="qDateProxy.hide()"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Tancar" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup lang="ts">
  /**
 * Exemple d'ús:
 * 
 * <ImasCalendarComponent
              v-model:date="nouElement.dataElement"
              :init-date="nouElement.dataElement"
              :min-date="dayjs('2023-01-02').toDate()"  -- Paràmetre opcional
              :max-date="new Date()"                    -- Paràmetre opcional
            />
 */
  import { formatDate, isValidDate } from '@/core/utils'
  import dayjs from 'dayjs'
  import customParseFormat from 'dayjs/plugin/customParseFormat'
  import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
  import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
  import { onMounted, PropType, ref } from 'vue'
  dayjs.extend(isSameOrBefore)
  dayjs.extend(isSameOrAfter)
  dayjs.extend(customParseFormat)

  const imasDate = ref()
  const emit = defineEmits(['update:date'])
  const props = defineProps({
    initDate: {
      type: String as PropType<Date | string | null>,
      default: null,
    },
    maxDate: {
      type: Date,
      default: null,
    },
    minDate: {
      type: Date,
      default: null,
    },
  })

  const qDateProxy = ref()

  const isInValidRange = (date) => {
    if (props.maxDate == null && props.minDate == null) return true
    else {
      if (props.maxDate != null && props.minDate != null) {
        return (
          dayjs(date).isSameOrAfter(dayjs(props.minDate).startOf('day')) &&
          dayjs(date).isSameOrBefore(dayjs(props.maxDate).startOf('day'))
        )
      } else {
        if (props.maxDate) {
          return dayjs(date).isSameOrBefore(dayjs(props.maxDate).startOf('day'))
        }
        if (props.minDate) {
          return dayjs(date).isSameOrAfter(dayjs(props.minDate).startOf('day'))
        }
      }
    }
  }

  const validarDate = () => {
    if (!isValidDate(imasDate.value)) {
      imasDate.value = null
      emit('update:date', imasDate.value)
    } else {
      const df = dayjs(imasDate.value, 'DD/MM/YYYY').format('YYYY/MM/DD')
      if (isInValidRange(df) == false) {
        imasDate.value = null
        emit('update:date', imasDate.value)
      } else {
        emit('update:date', imasDate.value)
      }
    }
  }

  onMounted(() => {
    if (props.initDate) imasDate.value = formatDate(props.initDate)
  })
</script>
