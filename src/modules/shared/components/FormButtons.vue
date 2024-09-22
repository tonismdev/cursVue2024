<template>
  <div>
    <div class="row justify-end q-gutter-md">
      <slot name="moreButtons"></slot>

      <q-btn
        v-if="showDelete"
        :loading="isDeleting"
        :disable="isDeleting"
        color="negative"
        icon="fa-solid fa-trash"
        :label="t('ui.btn.delete')"
        @click="eliminar"
      />

      <q-btn
        :loading="isUpdating"
        :disable="isUpdating"
        color="positive"
        :label="isUpdate ? t('ui.btn.save') : t('ui.btn.create')"
        type="submit"
        icon="fa-solid fa-floppy-disk"
        @click="emit('update')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useQuasar } from 'quasar'
  import { toRefs } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const quasar = useQuasar()

  interface Props {
    nomEntitat?: string
    showDelete?: boolean
    isUpdate?: boolean
    isUpdating?: boolean
    isDeleting?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    showDelete: false,
    isUpdate: true,
    isUpdating: false,
    isDeleting: false,
  })

  const { showDelete, isUpdate, isUpdating, isDeleting } = toRefs(props)

  interface Emits {
    (e: 'delete'): void
    (e: 'update'): void
  }

  const emit = defineEmits<Emits>()

  const eliminar = () => {
    quasar
      .dialog({
        message: t('ui.msg.voleuEsborrar', {
          en: props.nomEntitat || t('lregistre').toLowerCase(),
        }),
        ok: {
          color: 'negative',
        },
        cancel: true,
      })
      .onOk(() => {
        emit('delete')
      })
  }
</script>

<style scoped></style>
