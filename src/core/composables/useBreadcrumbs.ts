import { ImasBreadCrumbsItem } from '@/core/typings'
import { staticTables } from '@/store/staticTables'
import { ComputedRef, watch } from 'vue'

const checkIBCI = (o: any): o is ImasBreadCrumbsItem => {
  return o.label !== undefined || o.icon !== undefined
}

const useBreadcrumbs = (
  items: (ImasBreadCrumbsItem | ComputedRef<ImasBreadCrumbsItem>)[]
) => {
  const pinia = staticTables()

  const home = {
    icon: 'fas fa-home',
    to: { name: 'Home' },
  }

  pinia.breadcrumbsItems = [home]

  items.forEach((item, index) => {
    if (checkIBCI(item)) {
      pinia.breadcrumbsItems!.push(item)
    } else {
      pinia.breadcrumbsItems!.push(item.value)
      const unwatch = watch(item, () => {
        if (pinia.breadcrumbsItems) {
          pinia.breadcrumbsItems![index + 1] = item.value
        } else {
          unwatch()
        }
      })
    }
  })

  return {}
}

export default useBreadcrumbs
