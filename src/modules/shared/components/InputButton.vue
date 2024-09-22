<template>
  <div>
    <div class="row">
      <label
        v-if="title"
        :class="{
          'text-caption': true,
          'text-grey-8': true,
          'label-dense': dense,
        }"
      >
        {{ title }}
      </label>
    </div>
    <div class="row q-gutter-xs">
      <q-btn-toggle
        class="col-grow"
        :size="dense ? 'sm' : 'md'"
        v-model="value"
        spread
        :toggle-color="color"
        :options="options || defaultOpcions"
      />
      <q-btn
        v-if="clearable"
        :size="dense ? 'sm' : 'md'"
        dense
        flat
        icon="fas fa-circle-xmark"
        color="grey-6"
        @click="() => (value = null)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, toRefs } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  interface Option {
    label: string
    value: any
  }

  interface Props {
    modelValue: any
    title?: string
    options?: Option[]
    color?: string
    clearable?: boolean
    dense?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    color: 'primary',
  })

  const { title, options, color } = toRefs(props)

  interface Emits {
    (e: 'update:modelValue', data: any): void
  }

  const emit = defineEmits<Emits>()

  const value = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })

  const defaultOpcions = ref<Option[]>([])

  onMounted(() => {
    defaultOpcions.value.push(
      { label: t('ui.bools.true'), value: true },
      { label: t('ui.bools.false'), value: false }
    )
  })
</script>

<style scoped>
  .label-dense {
    font-size: 0.8em;
    display: flex;
    line-height: 1.2em;
  }
</style>
