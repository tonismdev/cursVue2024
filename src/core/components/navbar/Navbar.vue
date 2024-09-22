<template>
  <q-header
    elevated
    class="text-white"
    :class="isProduction() ? 'bg-light-blue-6' : 'bg-grey-10'"
  >
    <q-toolbar>
      <img src="@/assets/img/imas_off.png" alt="IMAS Logo" />

      <q-toolbar-title shrink>
        <RouterLink :to="{ name: 'Home' }" class="title-link">
          IMAS | {{ config.APP_PROJECT_TITLE }}
        </RouterLink>
      </q-toolbar-title>

      <template v-for="(item, index) in items" :key="item.title + `${index}`">
        <NavbarItemHeader :item="item" />
      </template>

      <q-space />

      <AppNavbarItemHeader></AppNavbarItemHeader>

      <q-btn
        v-if="imasKeycloak && imasKeycloak.authenticated"
        color="warning"
        :label="imasKeycloak.tokenParsed?.given_name"
        icon="fa-solid fa-user"
        text-color="dark"
      >
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item disable>
              <q-item-section>{{ imasKeycloak.fullName }}</q-item-section>
            </q-item>
            <q-separator />
            <q-item
              v-close-popup
              clickable
              @click="imasKeycloak.logoutFn && imasKeycloak.logoutFn()"
            >
              <q-item-section>Tancar la sessió</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <q-btn
        v-else
        color="warning"
        text-color="dark"
        label="Login"
        @click="doLogin"
      />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
  import { config } from '@/config'
  import { imasKeycloak } from '@/core/keycloak'
  import { ImasNavbarItemHeader } from '@/core/typings'
  import { isProduction } from '@/core/utils'
  import AppNavbarItemHeader from '@/modules/shared/components/AppNavbarItemHeader.vue'
  import { PropType } from 'vue'
  import NavbarItemHeader from './NavbarItemHeader.vue'

  const doLogin = () => {
    const loginUrl =
      imasKeycloak.createLoginUrl && imasKeycloak.createLoginUrl()
    if (loginUrl) window.location.replace(loginUrl)
  }

  const props = defineProps({
    items: {
      type: Object as PropType<ImasNavbarItemHeader[]>,
      required: true,
    },
  })
</script>

<style lang="scss">
  .title-link {
    text-decoration: none;
    color: white;
  }
</style>
