<template>
  <q-page class="bg-grey-2 q-pa-md">
    <transition
      appear
      enter-active-class="animated slideInLeft"
      leave-active-class="animated slideInRight"
    >
      <q-card flat class="singleCard radius">
        <q-card-section>
          <q-img class="col-4 radius" :src="activity.imageUrl" />
          <q-card-section class="col text-center">
            <div class="">
              <span class="text-bold text-h4">{{ activity.fish.name }}</span>
            </div>
            <div class="text-subtitle1">
              <div class="text-italic">{{ activity.fish.speciesName }}</div>
              <div class="text-bold q-pt-md">Regional Names:</div>
              <div class="row justify-evenly">
                <div
                  v-for="(key, nut) in activity.fish.regionalNames"
                  :key="nut._id"
                  class="col"
                >
                  <div class="">{{ key }}</div>
                </div>
              </div>
              <q-separator class="q-my-sm" />
              <div class="">
                {{ activity.fish.description }}
              </div>
              <q-separator class="q-my-sm" />

              <div class="row">
                <div class="col">
                  <span class="text-bold">Edibile:-</span>
                  {{ activity.fish.isEdible }}
                </div>
                <div class="col">
                  <span class="text-bold">Price:-</span>
                  {{ activity.fish.price }}
                </div>
              </div>
              <div class="">
                <span class="text-bold">Habitat:-</span>
                {{ activity.fish.habitat }}
              </div>
              <q-separator class="q-my-sm" />

              <div class="text-bold">Nutritional Values</div>
              <div class="row">
                <div class="col">
                  <span class="text-weight-bold">Calories:</span>
                  {{ activity.fish.nutritionalValue.calories }} g
                </div>
                <div class="col">
                  <span class="text-weight-bold">Proteins:</span>
                  {{ activity.fish.nutritionalValue.protein }} g
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <span class="text-weight-bold">Fat:</span>
                  {{ activity.fish.nutritionalValue.fat }} g
                </div>
                <div class="col">
                  <span class="text-weight-bold">Carbs:</span>
                  {{ activity.fish.nutritionalValue.carbs }} g
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </transition>
    <FeedBackDialog
      :showDialog="showFeedbackDialog"
      @closeDialog="showFeedbackDialog = false"
      @submit="sendFeedback"
    />
  </q-page>
</template>

<script>
import FeedBackDialog from "src/components/FeedbackDialog.vue";
export default {
  components: {
    FeedBackDialog,
  },
  data() {
    return {
      showFeedbackDialog: false,
      activity: {},
      user: {},
      keys: [],
    };
  },
  methods: {
    sendFeedback(comment) {
      console.log(comment);
      this.showFeedbackDialog = false;
    },
  },
  created() {
    this.activity = this.$route.params.activity;
    console.log(this.activity);
    this.activity.fish.nutritionalValue = JSON.parse(
      this.activity.fish.nutritionalValue
    );
    this.activity.fish.regionalNames = JSON.parse(
      this.activity.fish.regionalNames
    );
    this.keys = Object.keys(this.activity);
    this.showFeedbackDialog = true;
  },
};
</script>

<style>
.singleCard {
}
</style>
