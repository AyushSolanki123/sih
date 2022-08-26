<template>
  <q-card class="bg-white text-grey-10 header text-center">
    <div class="q-pa-none row full-width">
      <div class="">
        <q-btn
          v-if="back"
          flat
          dense
          icon="eva-arrow-back-outline"
          @click="$router.push('/')"
        />
      </div>
      <div class="-center text-bold q-mt-sm">FishDeTec</div>
    </div>
  </q-card>
</template>

<script>
export default {
  props: {
    back: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
