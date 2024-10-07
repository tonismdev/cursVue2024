<template>
  <router-view />
  <ImasLoading />
</template>

<script lang="ts" setup>
  import { staticTables } from '@/store/staticTables'
  import { useMeta } from 'quasar'
  import ImasLoading from './core/components/ImasLoading.vue'

  const pinia = staticTables()

  useMeta(() => {
    return {
      // whenever "title" from above changes, your meta will automatically update
      title: `IMAS | ${pinia.appTitle}`,
    }
  })
</script>
