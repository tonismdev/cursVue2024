import { RouteLocationRaw } from 'vue-router'

// https://juhanajauhiainen.com/posts/how-to-type-an-object-with-exclusive-or-properties-in-typescript
type AllKeys<T> = T extends unknown ? keyof T : never
type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never
type _ExclusifyUnion<T, K extends PropertyKey> = T extends unknown
  ? Id<T & Partial<Record<Exclude<K, keyof T>, never>>>
  : never
type ExclusifyUnion<T> = _ExclusifyUnion<T, AllKeys<T>>
//

export type separatorItem = { isSeparator: boolean }
export type basicItemInfo = {
  title: string | Function
  to?: RouteLocationRaw | undefined
  icon?: string | undefined
  children?: ExclusifyUnion<ImasNavbarItem>[]
  active?: function
}

export type ImasNavbarItem = basicItemInfo | separatorItem
export type ImasNavbarItemHeader = basicItemInfo

export type ImasBreadCrumbsItem = {
  label?: string
  to?: RouteLocationRaw | undefined
  icon?: string | undefined
}
