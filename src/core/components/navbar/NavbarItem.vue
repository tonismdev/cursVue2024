<template>
  <q-menu fit>
    <q-list style="min-width: 100px">
      <template v-for="item in items" :key="item">
        <q-item
          clickable
          v-close-popup
          v-if="
            isBasicItem(item) && (item.active == undefined || item.active())
          "
          :to="item.to"
        >
          <q-item-section>
            <div>
              <q-icon :name="item.icon" />
              {{ item.title }}
            </div>
          </q-item-section>
        </q-item>
        <q-separator v-else />
      </template>
    </q-list>
  </q-menu>
</template>

<script setup lang="ts">
  import type {
    basicItemInfo,
    ImasNavbarItem,
    separatorItem,
  } from '@/core/typings'
  import { PropType } from 'vue'

  const props = defineProps({
    items: {
      type: Object as PropType<ImasNavbarItem[]>,
      required: true,
    },
  })

  const isBasicItem = (item: basicItemInfo | separatorItem) => {
    //@ts-expect-error
    return <basicItemInfo>item.title !== undefined
  }
</script>
