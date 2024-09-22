<template>
  <div
    v-if="pinia.breadcrumbsItems != null"
    class="bg-grey-3 q-py-sm q-px-md q-mb-md"
  >
    <q-breadcrumbs>
      <q-breadcrumbs-el
        v-for="item in pinia.breadcrumbsItems"
        :key="item"
        :label="item.label"
        :to="item.to"
        :icon="item.icon"
      />
    </q-breadcrumbs>
  </div>
</template>

<script setup lang="ts">
  import { staticTables } from '@/store/staticTables'

  const pinia = staticTables()
</script>
