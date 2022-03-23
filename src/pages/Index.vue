<template>
  <q-page class="bg-grey-2">
    <!-- <Header :back="true"/> -->
    <div class="text-subtitle1 q-pa-md">
      <div class="row q-gutter-x-md">
        <!-- <q-btn
          flat
          dense
          icon="eva-arrow-back-outline"
          @click="$router.push('/')"
        /> -->
      </div>
      <div class="heading q-mt-sm q-mb-xs text-bold text-center">More Information on {{$route.params.name}}</div>
      <q-card class="my-card ">
        <q-img :src="$route.params.image" />
        <q-card-section class="q-pt-xs">            
          <div class="text">
            <div>
              <span class="text-bold">Size</span>:
              <span class="text-grey">{{ size }} </span>
            </div>
            <div>
              <span class="text-bold">Weight</span>:
              <span class="text-grey">{{ weight }} </span>
            </div>
            <div>
              <span class="text-bold">Price</span>:
              <span class="text-grey">{{ price }} </span>
            </div>
            <div>
              <span class="text-bold">Description</span>:
              <span class="text-grey">{{ description }} </span>
            </div>
            <!-- <div>
              <span class="text-bold">Nutrition Values:</span>:
              <span class="text-grey">{{ nutrition }} </span>
            </div> -->
            <div>
              <span class="text-bold">Lifespan</span>:
              <span class="text-grey">{{ lifespan }} </span>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import Header from "src/components/Header.vue";
export default {
  components: { Header },
  name: "Details",
  data() {
    return {
      size: "19.0 cm",
      weight: "0.5 kg",
      price: "709",
      description:
        "They are named for their equine appearance, with bent necks and long snouted heads and a distinctive trunk and tail. Although they are bony fish, they do not have scales, but rather thin skin stretched over a series of bony plates",
      nutrition: `A 4-ounce serving of white tuna contains: \nCalories: 145\nProtein: 26.77 grams\nFat: 3.37 grams`,
      lifespan: '1 year'
    };
  },
};
</script>
