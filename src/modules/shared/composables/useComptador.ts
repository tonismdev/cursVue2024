import { ref } from 'vue'

export const useComptador = (valorInicial: number) => {
  // definició de variables i mètodes
  const valor = ref(valorInicial)

  const incrementar = () => {
    valor.value++
  }

  const decrementar = () => {
    valor.value--
  }

  const reestablir = (nouValor: number) => {
    valor.value = nouValor
  }

  return {
    // parametres i mètodes
    valor,
    incrementar,
    decrementar,
    reestablir,
  }
}
