<template>
  <div class="loginBase">
    <div class="container full-height">
      <div class="row full-height justify-content-center align-items-center">
        <div class="col-md-8">
          <img
            src="@/assets/img/Logo_IMAS_blanc.png"
            class="mx-auto d-block"
            alt="logo_IMAS"
            style="margin-bottom: 40px; width: 50%"
          />
          <div class="card">
            <div class="card-header d-flex justify-content-left">
              Entra a l'aplicació:
            </div>

            <div class="card-body p-4">
              <h5>
                <span>
                  Benvinguts al programa
                  <b>Skeleton</b> de l'IMAS.
                </span>
              </h5>
              <div class="d-flex justify-content-center mt-3">
                <button class="btn btn-primary" @click="doLogin">
                  Entrar a Skeleton
                </button>
              </div>
              <template v-if="ldapError">
                <div class="alert alert-warning" role="alert">
                  {{ ldapError }}
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { onMounted, computed, watch } from 'vue'
  import { imasKeycloak } from '@/core/keycloak'
  import { defineComponent } from 'vue'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    setup() {
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

      return { doLogin, ldapError }
    },
  })
</script>

<style>
  .loginBase {
    background-color: #0288d1;
    height: 100%;
  }
</style>
