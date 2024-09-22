<p align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png" width="250"><img src="https://www.imasmallorca.net/sites/default/files/Logo.png" width="400">
</p>

# Eskelet Vue-Keycloak

Aquest esquelet de Vue està dissenyat emprant la darrera versió estable de Vue (Al moment d'escriure aquest article és la 3.0.2).

Aquest esquelet està pensat per funcionar mitjançant Keycloak tal com venim fent a l'IMAS. A aquest esquelet, es protegeix les rutes que siguin "privades" mitjançant Keycloak. Una vegada autenticats, es configura Axios per poder emprar el token de Keycloak per poder fer peticions a l'API.

## Passes per executar l'esquelet:

1. Clonar el repositori amb `git clone`.
2. Entrar a la carpeta.
3. Esborrar l'historial de git `rm -rf .git`.
4. Iniciar un nou repositori git `git init`.
5. Executar un `cp .env.pre .env` per crear el nostre fitxer `.env`.
6. Executar un `yarn install`.
7. Una vegada acabat, executar `yarn dev` i obrir l'esquelet al navegador.

**Nota**: Aquest esquelet s'alimentarà amb llibreries pròpies de l'IMAS (que estan al servidor: https://npm.imasmallorca.net/), per tant, no es farà un fork del projecte (per això esborram la carpeta `.git`).

El programador ha d'anar revisant les noves versions de les llibreries `core` de l'IMAS i actualitzant.

## Configuració inicial:

1. .gitlab-ci.example.yml -> .gitlab-ci.yml
2. src/config/\*
3. package.json -> name
4. README.md
5. vite.config.ts -> base

## Quins packages du aquest Esquelet?

Per aquest esquelet, he instal·lat els següents paquets:

- [vue-router](https://router.vuejs.org/): Versió de Vue-Router per emprar amb Vue3.
- [Quasar](https://quasar.dev/): Llibreria amb components UI
- [Vue-i18n](https://vue-i18n.intlify.dev/): Llibreria per poder fer la nostra aplicació en varis llenguatges
- [keycloak-js](https://www.npmjs.com/package/keycloak-js) Llibreria JS per interactuar amb Keycloakj. Recomanaria llegir l'implementació que he fet al fitxer `src/core/keycloak/index.ts` basat en la llibreria [dsb-norge/vue-keycloak-js](https://github.com/dsb-norge/vue-keycloak-js) però adaptat a Vue3.
- [pinia-orm](https://pinia-orm.codedredd.de/guide/getting-started/quick-start) És un [ORM](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping) per interactuar amb Pinia. Pens que és útil sobretot a projectes grans on s'han de consultar, manipular i filtrar molts de models. Convé que llegigueu la documentació i entendre bé si al vostre projecte vos és útil o no (per projectes senzills, alomillor és més ràpid no emprar-ho).
- [axios](https://github.com/axios/axios) Llibreria per generar i gestionar les peticions que farem a l'API. He fet una implementació global a fi de que totes les peticions vagin autenticades sense haver-ho de configurar cada component (seria repetir moltíssim codi). Ho teniu disponible a `src/core/api/index.ts`

És important anar a les pàgines d'aquests paquets i mirar un poc la seva configuració i mirar com funcionen.

---

## Estructura de l'esquelet de l'IMAS:

L'estructura de carpetes inicial és aquesta:

```
src
└───assets
└───composables
└───config
│   │   index.ts
│   │   menu.ts
│   │   routes.ts
│   │   urls.ts
└───core
│   │   typings.d.ts
│   └───api
│   └───components
│   └───i18n
│   └───keycloak
│   └───router
│   └───utils
│   └───views
│
└───locales
└───models
└───modules
└───store
```

Hi ha carpetes que són trivials (`assets` i `locales`) i no necessiten explicació.

Seguidament s'explicaran les carpetes importants:

### **config**:

Dins aquesta carpeta s'hi guarda la configuració del projecte. S'ha de tenir en compte que s'ha optat per separar en fitxers separats la configuració de certs components (Navbar, router) a fi de que el programador tengui clar on posar les coses i també per simplificar les dades que es contenen dins cada fixer (p.e. el fitxer de rutes no té tota la configuració de què passa si no té login o cap a on ha d'anar o com funciona aquesta condició).

- `menu.ts`: És el fitxer on podeu anar construint els ítems de la Navbar (el component intern de `Navbar` s'alimenta d'aquest objecte).
- `routes.ts`: És el fitxer on el programador anirà afegint les rutes de la seva aplicació. El `router` de Vue s'alimentarà d'aquest fixer.
- `urls.ts`: És on, mitjançant un objecte `JSON` es definiran les rutes de l'API que han de ser consumides per Axios.

Exemple d'objecte JSON de rutes:

```ts
export const urls = {
  persones: {
    list: '/persones',
    view: '/persones/:idPersona',
    update: '/persones/:idPersona',
  },
  estadesTemporals: {
    list: '/estada-temporal',
    view: `/estada-temporal/:idSolicitud`,
  },
}
```

En cas d'haver de passar paràmetres, es fa ús de la funció "parseURLParams" de dins el fitxer "@/core/utils/imas.ts"

```ts
axios.get(
        parseURLParams(urls.persones.view, {
          idPersona: route.params.idPersona,
        })
```

### **core**:

És una carpeta on s'ha anat configurant els fitxers que no s'haurien de tocar. És on es configura l'Axios per estar autenticat amb el token de Keycloak, on hi ha la pròpia llibreria de Keycloak, la configuració completa del Router, etc.

És important que el programador tengui actualitzada aquesta carpeta amb les canvis que es puguin pujar a l'esquelet, però no és convenient que editi fitxers d'aquesta carpeta sense saber el que s'està fent.

### **models**:

A aquesta carpeta s'hi guardaran els models de Pinia-ORM. Fixau-vos com estàn importants els models: es crea un fitxer de Model, i després aquest és importat a un fitxer `index.ts`, això és degut a que Pinia-ORM requereix emprar [`useRepo`](https://pinia-orm.codedredd.de/guide/getting-started/usage), per tant, per no haver-ho d'emprar als fitxers i perquè sigui més similar a Vuex-ORM, s'ha decidir exportar d'aquesta manera. A més, amb aquesta manera d'importar també empram [Tree-shaking](https://web.dev/reduce-javascript-payloads-with-tree-shaking/).

### **modules**:

A dins aquesta carpeta serà on el programador escriurà la gran part del codi de l'aplicació. L'idea és que el programador pugui dividir la seva aplicació per mòduls (noramlment, coincideixen amb el "Menú" de la Navbar).
Cada mòdul tendrà les seves pròpies carpetes internes de `routes`, `views` i `components` (Nota: Si els components són genèrics convé posar-ho a dins `src/modules/shared/components`).

A més d'això, disposau d'una eina pròpia de l'IMAS que serveix com a "scaffolder", és a dir, vos demanarà el nom del mòdul i ja vos crearà les carpetes que s'han comentat i també els fitxers necessaris amb el nom del mòdul configurat.

Aquesta eina la podeu executar així:

```sh
yarn imas-cli
```

És interactiva, per tant, és senzilla d'emprar.

**IMPORTANT:** Aquesta eina fa ús de la llibreria `chalk` amb versió `4.1.2`, no actualitzeu aquesta llibreria o rompreu l'eina.

---

## Deploy d'aplicacions a l'IMAS

Per fer el deploy d'aplicacions Vue, el que emprarem serà el fitxer `.gitlab-ci.yml` que ja hi ha creat, únicament heu de canviar les direccions del servidor de PRE i PRO segons vos diguin a Sistemes, després en principi ja hauria de fer el deploy correctament.
El que fa l'script és compilar el codi a la màquina de Gitlab (Kovac) i després fa un `rsync` del codi compilat al servidor PRE/PRO. Això fa que les màquines puguin tenir molt poca RAM, ja que les pàgines Vue són únicament HTML i JS, els quals són servits per Nginx.

# Components de l'IMAS:

## IMAS-Calendar:

```vue
<imas-calendar-component
  v-model:date="nouElement.dataElement"
  :init-date="nouElement.dataElement"
  :min-date="dayjs('2023-01-02').toDate()"
  --
  Paràmetre
  opcional
  :max-date="new Date()"
  --
  Paràmetre
  opcional
/>
```

Aquest component mostra un QDate dins un QInput tal i com es mostra a [aquest exemple](https://quasar.dev/vue-components/date#with-qinput).

Per passar un valor inicial, s'ha d'emprar el paràmetre `:init-date`, és el mateix valor que al `v-model` però aquest camp és unidireccional (amb això evitam problemes de recursivitat amb els camps reactius).

Permet passar-li també `min-date` i/o `max-date` a fi de limitar les dates del calendari.

Aquest component valida que les dates introduïdes al `q-input` siguin vàlides, si no ho són, el valor passa a `null` (Per exemple, `29/02/2023` retornaria `null`).

**Nota**: el paràmetre `v-model:date=""` és obligatori a fi de que pogueu capturar la data introduïda per l'usuari.

**Nota2:** Aquest component és **global**, per tant, no requereix cap `import`.
