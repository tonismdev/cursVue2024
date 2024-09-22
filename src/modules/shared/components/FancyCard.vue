<template>
  <div>
    <q-card>
      <q-card-section horizontal>
        <q-card-section
          :class="`bg-${props.icon_bg_color} text-${icon_text_color}`"
        >
          <q-icon :name="props.icon" :size="icon_size" />
        </q-card-section>
        <q-card-section
          :class="`bg-${props.content_bg_color} text-${content_text_color} col`"
        >
          <template v-if="!slots.content">
            <div class="text-center">{{ props.title }}:</div>
            <div :class="props.value_class" :title="props.value">
              {{ props.value }}
            </div>
          </template>

          <slot name="content" />
        </q-card-section>

        <q-separator vertical v-if="slots.actions" />

        <q-card-section class="column q-gutter-sm q-pa-sm" v-if="slots.actions">
          <slot name="actions" />
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
  import { computed, useSlots } from 'vue'

  const slots = useSlots()

  interface Props {
    icon: string
    icon_bg_color: string
    icon_text_color?: string
    icon_size?: string
    content_bg_color?: string
    content_text_color?: string
    title?: string
    value?: string
    value_class?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    value_class: 'text-h5 text-center',
    content_text_color: 'auto',
    icon_text_color: 'auto',
    icon_size: '4em',
  })

  const content_text_color = computed(() => {
    if (props.content_text_color == 'auto') {
      return contrastColor(props.content_bg_color)
    }

    return props.content_text_color || 'black'
  })

  const icon_text_color = computed(() => {
    if (props.icon_text_color == 'auto') {
      return contrastColor(props.icon_bg_color)
    }

    return props.icon_text_color || 'black'
  })

  const contrastColor = (color: string = 'white') => {
    if (color == 'white') {
      return ''
    }

    const colorIndex = color?.match(/(\d)+/i)?.[0]
    return colorIndex && +colorIndex > 5 ? 'white' : ''
  }
</script>

<style scoped></style>
