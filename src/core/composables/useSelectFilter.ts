import { Model, Repository } from 'pinia-orm'
import { ComputedRef, Ref, computed, ref, watch } from 'vue'
import { normalize } from '../utils'

interface FilterModel {
  label: string
  search: string
  value: any
  object: any
}

interface Options<T extends Model> {
  repo: Repository<T> | ComputedRef<Array<T>> | Ref<Array<T>>
  field?: string | ((el: T) => string)
  id?: string
  searchField?: string | ((el: T) => string)
}

const useSelectFilter = <T extends Model>(options: Options<T>) => {
  const { repo, field = 'nom', id = 'id', searchField } = options
  // Miram si s'ha definir el camp de cerca, sinó es el camp
  const _searchField = searchField ? searchField : field

  // Calculam les dades completes
  const fullData = computed<FilterModel[]>(() => {
    const data = repo instanceof Repository ? repo.all() : repo.value

    return data.map((d) => {
      const f = typeof field === 'function' ? field(d) : d[field]
      const sf =
        typeof _searchField === 'function' ? _searchField(d) : d[_searchField]

      return {
        label: f,
        search: normalize(sf),
        value: d[id],
        object: d,
      }
    })
  })

  // Dades filtrades, inicialment totes
  const data = ref<FilterModel[]>(fullData.value)

  // Si s'actualitzen les dades actualitzam la data
  watch(fullData, () => {
    data.value = fullData.value
  })

  const filter = (val, update) => {
    // Si no introdueix 3 caracters no cercam
    if (val.length < 3) {
      update(() => {
        data.value = fullData.value
      })
    } else {
      update(() => {
        const normalizedVal = normalize(val)
        data.value = fullData.value.filter(
          (v) => v.search.indexOf(normalizedVal) > -1
        )
      })
    }
  }

  return {
    data,
    filter,
  }
}

export default useSelectFilter
