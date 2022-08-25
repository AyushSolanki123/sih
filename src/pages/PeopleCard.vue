<template>
  <div>
    <q-card class="peopleCardStyle q-ml-lg q-mt-md">
      <q-card-section class="q-pa-sm q-px-lg">
        <div class="row justify-between">
          <div class="col-6 row">
            <q-avatar class="q-mt-xs" color="primary" />
            <div class="text-subtitle2 q-mt-md q-mx-lg">
              {{ user.user.name }}
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
      default: null,
    },
  },
  data() {
    return {
    };
  },
  
};
</script>

<style>
.peopleCardStyle {
  border-radius: 8px !important;
  background-color:#edf2f5;
}
</style>
