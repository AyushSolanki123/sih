<template>
  <div>
    <q-card class="peopleCardStyle q-ml-lg q-mt-md">
      <q-card-section class="q-pa-sm q-px-lg">
        <div class="row">
          <div class="col-3">
            <q-avatar class="q-mt-xs">
              <img src="Profile.jpg">
            </q-avatar>
          </div>
            <div class="column text-subtitle2 q-mt-xs q-mx-lg">
              <div>
                {{ user.firstName }} {{ user.lastName }}
              </div>
              <div>
                {{ user.email }}
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
