import { imasAxios } from '../api'

export enum Method {
  POST,
  PUT,
}
export const get = async <T>(
  url: string,
  element: string,
  params?: any
): Promise<T> => {
  const { data } = await imasAxios.get<{ element: T }>(url, { params })
  return data[element]
}

export const post = async <T>(
  url: string,
  element: string,
  updateData: T
): Promise<T> => {
  const { data } = await imasAxios.post<{ element: T }>(url, updateData)
  return data[element]
}

export const put = async <T>(
  url: string,
  element: string,
  updateData: T
): Promise<T> => {
  const { data } = await imasAxios.put<{ element: T }>(url, updateData)
  return data[element]
}

export const del = imasAxios.delete

export const save = async <T>(
  url: string,
  element: string,
  updateData: T,
  method: Method
): Promise<T> => {
  if (method == Method.POST) {
    return await post(url, element, updateData)
  } else if (method == Method.PUT) {
    return await put(url, element, updateData)
  }
  throw new Error('Unsuported')
}
