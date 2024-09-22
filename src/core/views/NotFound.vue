<template>
  <div class="home">
    <div class="card" style="height: 100%">
      <div
        class="card-body"
        style="
          border-left: 8px solid #ff5757;
          padding-top: 50px;
          padding-bottom: 70px;
        "
      >
        <div class="row">
          <div class="col text-center">
            <span style="font-size: 120px">404</span><br />
            <span class="fs-2 mt-5"
              >{{ t('404') }} <i class="fa-regular fa-face-frown"></i
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>
