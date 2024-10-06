import { ref } from 'vue'
export const useToggle = (estatInicial: boolean) => {
  const estat = ref(estatInicial)

  const toggle = () => {
    estat.value = !estat.value
  }

  return {
    estat,
    toggle,
  }
}
