<template>
  <q-layout view="lHh lpr lFf">
    <q-header
      elevated
      class="text-white"
      :class="isProduction() ? 'bg-light-blue-6' : 'bg-grey-10'"
    >
      <q-toolbar>
        <img src="@/assets/img/imas_off.png" alt="IMAS Logo" />

        <q-toolbar-title shrink>
          IMAS | {{ config.APP_PROJECT_TITLE }}
        </q-toolbar-title>

        <q-space />

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
          :to="{ name: 'Login' }"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <div class="card" style="height: 100%">
          <div
            class="card-body"
            style="
              border-left: 8px solid #ff5757;
              padding-top: 50px;
              padding-bottom: 70px;
            "
          >
            <div class="row">
              <div class="col text-center">
                <span style="font-size: 120px">{{ route.query.code }}</span
                ><br />
                <span v-if="route.query.message" class="fs-2 mt-5">
                  {{ t(route.query.message.toString()) }}
                  <i class="fa-regular fa-face-frown"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <Footer />
  </q-layout>
</template>

<script setup lang="ts">
  import { config } from '@/config'
  import Footer from '@/core/components/Footer.vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'
  import { imasKeycloak } from '../keycloak'
  import { isProduction } from '../utils'
  const { t } = useI18n()

  const route = useRoute()
</script>

<style scoped>
  #container {
    min-height: 100%;
    position: relative;
  }

  #body {
    padding-bottom: 70px;
    /* Height of the footer */
  }
</style>
