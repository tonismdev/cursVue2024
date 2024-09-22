<template>
  <q-layout view="lHh lpr lFf">
    <Navbar :items="navbarItems" />

    <q-page-container>
      <q-page padding>
        <Breadcrumbs />
        <router-view />
      </q-page>
    </q-page-container>

    <Footer />
  </q-layout>
</template>

<script setup lang="ts">
  import { navbarItems } from '@/config/menu'
  import Footer from '@/core/components/Footer.vue'
  import Navbar from '@/core/components/navbar/Navbar.vue'
  import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs.vue'
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
