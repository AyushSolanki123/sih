<template>
  <q-page class="bg-grey-2 q-pa-md">
    <q-card flat class="singleCard radius">
      <q-card-section>
        <q-img class="col-4 radius" :src="activity.imageUrl" />
          <q-card-section class="col text-center">
            <div class=""><span class="text-bold text-h4">{{ activity.fish.name }}</span> </div>
            <div>
              <div class=""><span class="text-bold">Species Name:-</span> {{ activity.fish.speciesName }}</div>
              <div class="text-bold q-pt-md">
                Regional Names:-
              </div>
                <div v-for="key, nut in activity.fish.regionalNames" class="row justify-center" :key="nut._id">
                  <div><span class="text-bold">{{nut}}:-</span> {{key}} |</div>
                </div>
              <!-- <div class="">Description {{ activity.fish.description }}</div> -->
              <div class="q-mt-sm"><span class="text-bold">Edibile:-</span> {{ activity.fish.isEdible }}</div>
              <div class=""><span class="text-bold">Price:-</span> {{ activity.fish.price }}</div>
              <div class=""><span class="text-bold">Habitat:-</span> {{ activity.fish.habitat }}</div>
              <div class="text-bold q-pt-md">Nutritional Values</div>
              <div v-for="key, nut in activity.fish.nutritionalValue" :key="nut._id">
                <div><span class="text-bold">{{nut}}:-</span> {{key}}</div>
              </div>
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
  </q-page>
</template>

<script>
export default {
    data(){
        return{
            activity: {},
            user: {},
            keys: [],
        }
    },
    created(){
        this.activity= this.$route.params.activity;
        this.keys = Object.keys(this.activity);
    }
}
</script>

<style>
.singleCard{
}
</style>