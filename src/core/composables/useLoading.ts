import { useQuasar } from 'quasar'
import { computed, ComputedRef, Ref, watch } from 'vue'

const useLoading = (
  isLoading: Ref<boolean> | ComputedRef<boolean>,
  model?: Ref<any>
) => {
  const quasar = useQuasar()

  const _loading = computed(
    () =>
      (!model && isLoading.value) || (model && isLoading.value && !model.value)
  )

  watch(
    _loading,
    () => {
      if (_loading.value) {
        quasar.loading.show()
      } else {
        quasar.loading.hide()
      }
    },
    {
      immediate: true,
    }
  )
}

export default useLoading
