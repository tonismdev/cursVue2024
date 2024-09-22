<template>
  <div
    :style="{ backgroundColor: color }"
    class="persona-card"
    @click="gestionaClick"
  >
    <slot name="contingutExtra" :nom="persona.nom"></slot>
    <br />
    <div class="icona">
      <img :src="icon" alt="Icona de la Persona" />
    </div>
    <div class="details">
      <h2>
        {{ persona.nom }} {{ persona.llinatge1 }} {{ persona.llinatge2 || '' }}
      </h2>
      <p>{{ persona.email }}</p>
      <p v-if="showDoi">DOI: {{ persona.doi }}</p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref } from 'vue'
  import { Persona } from '../models/Persona' // Importa el model Persona

  export default defineComponent({
    name: 'PersonaCardEmit',
    props: {
      persona: {
        type: Object as PropType<Persona>,
        required: true,
      },
      color: {
        type: String,
        default: '#fff',
      },
      icon: {
        type: String,
        default: '/default-icon.png',
      },
      showDoi: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['persona-click'], // Defineix el nom de la propietat on s'haurà d'especificar el mètode que es cridarà al pare quan es faci click
    //methods: {
    //  gestionaClick() {
    //    this.$emit('persona-click', this.persona) // Emet l'esdeveniment amb el nom definit a la propietat "emits" i passa la persona com a paràmetre (per tant, el pare tendrà accés a la persona seleccionada)
    //  },
    //},
    setup(props, { emit, expose }) {
      // Color de fons del component
      const color = ref(props.color)

      const gestionaClick = () => {
        emit('persona-click', props.persona)
      }

      // Mètode per canviar el color de fons
      const canviaColor = (nouColor: string) => {
        color.value = nouColor
      }

      expose({
        canviaColor,
      })

      return {
        color,
        gestionaClick,
      }
    },
  })
</script>

<style scoped>
  .persona-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    align-items: center;
    max-width: 45em;
  }

  .icon img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 16px;
  }

  .details h2 {
    margin: 0;
    font-size: 1.5em;
  }

  .details p {
    margin: 0;
    color: #666;
  }
</style>
