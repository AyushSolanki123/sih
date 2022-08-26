<template>
  <q-page padding>
    <q-card class="" flat style="height: 100vh">
      <div v-show="slide == 1">
        <q-card-section class="text-h4 text-center">
          Identification
        </q-card-section>

        <q-card-section class="text-subtitle1 text-center">
          Find the best detection application for aquatic animals
        </q-card-section>
      </div>

      <div v-show="slide == 2">
        <q-card-section class="text-h4 text-center">
          Welcome to <span class="text-bold">AquaDeTec</span>
        </q-card-section>

        <q-card-section
          class="text-subtitle1 text-center"
          style="
            width: 150px;
            height: 150px;
            margin-left: auto;
            margin-right: auto;
          "
        >
          <q-img src="app-icon.png" width="100%" />
        </q-card-section>
      </div>

      <div class="q-ma-md q-pa-md rounded-borders" style="height: 60%">
        <q-carousel
          animated
          v-model="slide"
          navigation
          infinite
          transition-prev="slide-right"
          transition-next="slide-left"
        >
          <q-carousel-slide :name="1" img-src="identify.svg" />
          <q-carousel-slide :name="2" img-src="welcome.svg" />
        </q-carousel>
      </div>

      <q-card-actions class="fixed-bottom" v-if="slide == 1">
        <q-btn
          label="Next"
          color="primary"
          class="full-width"
          @click="slide = 2"
          no-caps
        />
      </q-card-actions>

      <q-card-actions vertical v-else>
        <q-btn
          label="Let's get started"
          no-caps
          color="primary"
          @click="onBoardingDone"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "SplashScreen",
  data() {
    return {
      slide: 1,
    };
  },
  methods: {
    onBoardingDone() {
      localStorage.setItem("onBoardingDone", true);
      this.$router.push("/auth");
    },
  },
};
</script>

<style></style>
