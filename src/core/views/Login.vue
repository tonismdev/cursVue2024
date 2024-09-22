<template>
  <div class="loginBase">
    <div class="fixed-center" style="width: 50%">
      <section class="text-center">
        <img
          src="@/assets/img/Logo_IMAS_blanc.png"
          class="mx-auto d-block"
          alt="logo_IMAS"
          style="margin-bottom: 40px; width: 50%"
        />
      </section>
      <q-card class="my-card" flat bordered>
        <q-item class="bg-grey-3 row justify-between">
          <span class="text-h6">
            <span>Entrar a l'aplicació:</span>
          </span>
        </q-item>

        <q-separator />

        <q-card-section class="text-center">
          <span class="text-h5"
            >Benvinguts al programa <b>{{ config.APP_PROJECT_TITLE }}</b> de
            l'IMAS.</span
          >
          <template v-if="!isProduction()">
            <br />
            <q-badge color="warning text-dark text-h6 q-px-md">
              Versió de proves!
            </q-badge>
          </template>
          <div class="q-my-lg">
            <q-btn
              color="primary"
              :label="`Entrar a ${config.APP_PROJECT_TITLE}`"
              @click="doLogin"
            />
          </div>
          <div class="mb-3">
            <a href="https://apps.imasmallorca.net/clau/" target="_blank"
              >Recuperar la contrasenya del teu usuari</a
            >
          </div>
          <template v-if="ldapError">
            <q-badge color="red-6 text-white text-h6 q-px-md q-mt-lg">
              {{ ldapError }}
            </q-badge>
          </template>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { config } from '@/config'
  import { imasKeycloak } from '@/core/keycloak'
  import { isProduction } from '@/core/utils'
  import { computed, onMounted, watch } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  onMounted(() => {
    if (imasKeycloak.authenticated) {
      router.push({ name: 'Home' })
    }
  })

  const ldapError = computed(() => imasKeycloak.ldapError)

  watch(
    () => imasKeycloak.ready,
    (ready) => {
      if (ready == true && imasKeycloak.authenticated) {
        router.push({ name: 'Home' })
      }
    }
  )

  function doLogin() {
    const loginUrl = imasKeycloak.createLoginUrl()
    window.location.replace(loginUrl)
  }
</script>

<style>
  .loginBase {
    background-color: #0288d1;
    height: 100%;
  }
</style>
