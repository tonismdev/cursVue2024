<template>
  <q-dialog
    v-model="sohwLodingDialog"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 300px">
      <q-card-section class="flex justify-center items-center">
        <q-spinner color="primary" size="10em" />
      </q-card-section>
      <q-card-section class="flex justify-center items-center">
        <span>Carregant informació...</span>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
  import { staticTables } from '@/store/staticTables'
  import { computed, ref } from 'vue'

  const pinia = staticTables()

  const sohwLodingDialog = ref(false)

  // const sohwLodingDialog = computed(() => pinia.axiosCount > 0)
</script>

<style>
  .imas-back-block {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.73);
    z-index: 16777271;
    top: 0;
  }

  .object-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .object-div {
    max-width: 420px;
    width: 100%;
  }

  .object {
    background-color: #03a9f4;
    padding: 20px;
    display: inline-block;
    width: 100%;
    text-align: center;
  }
</style>
