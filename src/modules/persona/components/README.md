# Vue.js Project - Exercici 2 - Toni Sánchez Magraner

Es demana:

- Creau un component especific tipus card (icona, titol, color...) que rebi com a paràmetre les dades d'una persona. Creau un segon component genèric, igual que l'anterior però que rebi els paràmetres (icona, titol, color) per separat.
- Creau un o diversos components que facin ús de emits, expose i slot, usau els diferents mecanismes de reactivitat si es necessari.

## Components

### 1. **PersonaCard.vue** (Component específic)

Aquest component representa una targeta que mostra la informació d'una persona, incloent nom, llinatges, correu electrònic, DOI, una icona i un color de fons.

- **Props:**
  - `persona` (objecte Persona): Objecte que conté la informació de la persona (nom, llinatges, email, DOI).
  - `color` (string): Color de fons de la targeta.
  - `icon` (string): Ruta de la icona per mostrar.

### 2. **PersonaCardEmit.vue** (Component específic amb `emit`, `expose` i `slot`)

Aquest component és una versió ampliada del component `PersonaCard.vue` i afegeix interactivitat mitjançant:

- Un **esdeveniment `emit`** anomenat `persona-click` per notificar quan la targeta es clica.
- Un **slot** per tal de permetre incloure contingut addicional dins del component, a través del pare.
- Una funció **expose** per tal de permetre al component pare canviar el color de la targeta des de fora.

- **Props:**
  - `persona` (objecte Persona): Informació de la persona.
  - `color` (string): Color de fons de la targeta.
  - `icon` (string): Ruta de la icona.
- **Mètodes i característiques:**
  - `gestionaClick`: Emet l'event `persona-click` amb la persona clicada.
  - **Exposició de mètodes:** El mètode `canviaColor` permet als components externs canviar el color de la targeta.

### 3. **GenericCard.vue** (Component genèric)

Aquest component és una targeta genèrica que accepta diversos paràmetres separats com a `props`, incloent nom, email, DOI, icona i color. No està lligat a cap model específic i pot ser reutilitzat per mostrar diferents tipus de dades.

- **Props:**
  - `nom` (string): Nom de la persona o ítem.
  - `email` (string): Correu electrònic.
  - `doi` (string): DOI o altra informació identificativa.
  - `icon` (string): Ruta de la icona.
  - `color` (string): Color de fons de la targeta.

### 4. **App.vue** (Instància dels components)

Aquest fitxer és el component principal on es mostren i s'instancien els tres components esmentats anteriorment (`GenericCard.vue`, `PersonaCard.vue` i `PersonaCardEmit.vue`). Es fa ús de `props`, `emit` i `ref` per manipular els components.

- **Instàncies dels components:**

  - **GenericCard:** Es passen paràmetres com a icona, nom, email, DOI i color.
  - **PersonaCard:** S'instancia amb una persona i les seves dades, passant-les com a objecte.
  - **PersonaCardEmit:** Afegeix la funcionalitat d'emetre esdeveniments quan la targeta és clicada i canviar el color de la targeta des de l'exterior mitjançant un botó.

- **Funcions en App.vue:**
  - `gestionaClickPersona`: Gestor de l'event `persona-click` que mostra en consola la persona seleccionada.
  - `canviaPersonaCardColor`: Funció per canviar el color de la targeta utilitzant la referència al component `PersonaCardEmit`.
