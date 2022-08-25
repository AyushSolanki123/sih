<template>
  <div>
    <q-card class="my-card">
      <q-card-section horizontal>
        <q-img
          class="col-5"
          src="https://cdn.quasar.dev/img/parallax1.jpg"
        />

        <q-card-section>
          {{ lorem }}
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data(){
    return{
      activities:[],
    }
  }
}
</script>

<style>

</style>