---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Esquelet Vue de l'IMAS"
  text: "Documentació de l'esquelet Vue de l'IMAS"
  tagline: Aquí trobareu tota la documentació del projecte.
  actions:
    - theme: brand
      text: Inici de la documentació
      link: /contingut-esquelet
    - theme: alt
      text: API Examples
      link: /api-examples

features:
  - title: Vue + TypeScript
    details: L'esquelet de l'IMAS està dissenyat emprant Vue3 i TypeScript 5.
  - title: Pinia-ORM
    details: L'estat de les dades es controla mitjançant Pinia-ORM.
  - title: Axios + TanStack-Query
    details: Per consumir dades de l'API l'esquelet empra la llibreria TanStack-Query per damunt d'una versió preconfigurada d'Axios.
---
