import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Esquelet Vue de l'IMAS",
  lastUpdated: true,
  description: "Documentació de l'esquelet Vue de l'IMAS",
  outDir: '../dist-docs',
  base: '/vue3-skeleton/docs',
  themeConfig: {
    search: {
      provider: 'local',
    },
    outlineTitle: "Seccions d'aquesta pàgina",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Inici de la documentació', link: '/contingut-esquelet' },
      { text: 'Documentació VitePress', link: 'https://vitepress.dev' },
    ],

    sidebar: [
      {
        text: "Esquelet de l'IMAS",
        items: [
          { text: "Contingut de l'esquelet", link: '/contingut-esquelet' },
          { text: 'Com començar', link: '/com-començar' },
          { text: 'Com documentar el projecte', link: '/com-documentar' },
        ],
      },
    ],
  },
})
