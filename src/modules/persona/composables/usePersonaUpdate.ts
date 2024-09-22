import { useMutation } from '@tanstack/vue-query'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { PersonaRepo } from '../models/index'
import { Persona } from '../models/Persona'

interface Options {
  onSuccess?
  onError?
  onDelete?
}

const i18nLabel = 'per.lpersona'
const path = '/persona'

export const usePersonaUpdate = (options?: Options) => {
  const toast = useToast()
  const { t } = useI18n()

  // Peticions d'actualització
  const { mutate, isLoading, isSuccess, isError } = useMutation<
    Persona,
    unknown,
    Persona
  >(
    async (entity) => {
      // const url = entity.id ? `${path}/${entity.id}` : path
      // const method = entity.id ? Method.PUT : Method.POST
      // const data = await save<Persona>(url, 'persona', entity, method)

      // El seguent es per que funcioni sense bd
      const data = entity
      if (!data.id) {
        data.id = Math.max(...PersonaRepo.all().map((p) => p.id)) + 1
      }

      PersonaRepo.save(data)
      return data
    },
    {
      onSuccess: (data, variables) => {
        // En cas d'anar bé mostram el missatge corresponent
        if (!variables.id) {
          toast.success(t('ui.msg.createSuccess', { el: t(i18nLabel) }))
        } else {
          toast.success(t('ui.msg.updateSuccess', { el: t(i18nLabel) }))
        }

        // Executam la funció onsucces que ens arriba per parametre
        options?.onSuccess?.(data, variables)
      },
      onError: (error, variables) => {
        // No mostram el missatge d'errir ja que imasAxios ho fa per defecte

        // Executam la funció d'error que arriba per paràmetre
        options?.onError?.(error, variables)
      },
    }
  )

  // Petició per eliminar
  const { mutate: esborra, isLoading: isDeleting } = useMutation<
    void,
    undefined,
    number
  >(
    async (id) => {
      // await del(`${path}/${id}`)
      PersonaRepo.destroy(id)
    },
    {
      onSuccess: (data, variables) => {
        // Si es correcte mostram el missatge corresponent
        toast.success(t('ui.msg.deleteSuccess', { el: t(i18nLabel) }))

        // Executam la funció que arriba per parametre
        options?.onDelete?.(data)
      },
    }
  )

  return {
    update: mutate,
    isUpdating: isLoading,
    isUpdatingSuccess: isSuccess,
    isUpdatingError: isError,

    esborra,
    isDeleting,
  }
}
