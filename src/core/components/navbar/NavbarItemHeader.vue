<template>
  <q-btn
    v-if="item.active == undefined || item.active()"
    :to="item.to"
    flat
    :icon="item.icon"
    :label="typeof item.title == 'function' ? item.title() : item.title"
  >
    <template v-if="item.children?.length">
      <NavbarItem :items="item.children" />
    </template>
  </q-btn>
</template>

<script setup lang="ts">
  import { ImasNavbarItemHeader } from '@/core/typings'
  import { PropType } from 'vue'
  import NavbarItem from './NavbarItem.vue'

  const props = defineProps({
    item: {
      type: Object as PropType<ImasNavbarItemHeader>,
      required: true,
    },
  })
</script>
