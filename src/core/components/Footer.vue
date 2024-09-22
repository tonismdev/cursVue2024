<template>
  <q-footer elevated class="bg-grey-9 text-white">
    <q-toolbar>
      <q-toolbar-title>
        <div class="flex justify-between q-px-md">
          <div v-if="isProduction()">
            <span v-for="link in linksFooter" :key="link.title">
              <a :href="link.url" class="text-white" target="_blank">{{
                link.title
              }}</a>
              |
            </span>
          </div>
          <div v-else class="q-gutter-x-md">
            <span
              >Env:
              <q-badge
                color="orange"
                text-color="black"
                :label="config.APP_ENV.toUpperCase()"
            /></span>
            <span
              >Vue: <q-badge color="green" text-color="black" :label="version"
            /></span>
            <span
              >Quasar:
              <q-badge color="blue" text-color="black" :label="$q.version"
            /></span>
          </div>
          <div>© Institut Mallorquí d'Afers Socials</div>
        </div>
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>

<script setup lang="ts">
  import { config } from '@/config'
  import { useQuasar } from 'quasar'
  import { version } from 'vue'
  import { isProduction } from '../utils'

  const $q = useQuasar()

  interface typeLink {
    title: string
    url: string
  }

  const linksFooter: typeLink[] = [
    { title: "Web de l'IMAS", url: 'https://www.imasmallorca.net' },
    { title: 'Intranet', url: 'https://intranet.imasmallorca.net' },
  ]
</script>

<style scoped>
  a {
    text-decoration: none;
  }
</style>
