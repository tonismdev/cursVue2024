<template>
  <div>
    <q-list :bordered="props.bordered" class="row justify-between list">
      <template v-for="(item, index) of items" :key="index">
        <template v-if="!(props.hideEmpty && !item.value)">
          <q-item>
            <q-item-section>
              <q-item-label caption>{{ item.label }}</q-item-label>
              <q-item-label>{{ item.value }}&nbsp;</q-item-label>
            </q-item-section>

            <q-item-section side v-if="item.side != undefined">
              <template v-if="!slots['side-' + item.slot_key]">
                {{ item.side }}
              </template>

              <slot
                v-if="slots['side-' + item.slot_key]"
                :name="'side-' + item.slot_key"
                :val="item.side"
              />
            </q-item-section>
          </q-item>

          <div v-if="separator" class="separator"></div>
        </template>
      </template>

      <q-item v-if="slots.actions" class="q-gutter-md">
        <slot name="actions" />
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
  import { toRefs, useSlots } from 'vue'

  const slots = useSlots()

  export interface FancyItem {
    label: string
    value: any
    side?: any
    slot_key?: string
  }

  interface Props {
    items: FancyItem[]
    bordered?: boolean
    separator?: boolean
    hideEmpty?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    bordered: false,
    separator: false,
    hideEmpty: false,
  })

  const { items } = toRefs(props)
</script>

<style scoped>
  .list .separator:not(:last-child) {
    border-right-style: solid;
    border-color: rgba(0, 0, 0, 0.2);
    border-width: 1px;
    margin: 0.7em 0px;
  }
</style>
