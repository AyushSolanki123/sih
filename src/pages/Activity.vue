<template>
  <q-page class="activity bg-grey-2">
    <div class="text-h5 text-bold q-pa-md text-center">Recent Searches</div>
    <div v-if="!loading">
      <transition
        appear
        enter-active-class="animated slideInDown"
        leave-active-class="animated slideOutDown"
      >
        <div>
          <div v-for="activity in activities" :key="activity._id">
            <q-card
              class="q-ma-md actCard radius"
              @click="showDetailedView(activity)"
            >
              <q-card-section horizontal>
                <q-img
                  class="q-ma-sm col-4 radius"
                  style="width: 35vw"
                  :src="activity.imageUrl"
                />
                <q-card-section class="col text-center">
                  <div>
                    <div class="text-weight-bold">
                      {{ activity.fish.name }}
                    </div>
                    <div class="">
                      Species Name: {{ activity.fish.speciesName }}
                    </div>
                    <div class="">Price: {{ activity.fish.price }}</div>
                  </div>
                </q-card-section>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </transition>
    </div>
    <div v-else>
      <ActivitySkeleton />
    </div>
  </q-page>
</template>

<script>
import { getHistory } from "src/utils/ApiActions";
import ActivitySkeleton from "src/pages/ActivitySkeleton.vue";
export default {
  components: {
    ActivitySkeleton,
  },
  data() {
    return {
      activities: [],
      user: {},
      loading: false,
    };
  },
  methods: {
    getActivites() {
      this.loading = true;
      let id = this.user._id;
      getHistory(id)
        .then((response) => {
          this.activities = response.data.data;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },

    showDetailedView(activity) {
      this.$router.push({
        name: "DetailActivity",
        params: {
          activity: activity,
        },
      });
    },
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getActivites();
  },
};
</script>

<style>
.actCard {
  /* height: 20vh; */
  width: 92vw;
}

.radius {
  border-radius: 8px;
}

.activity {
  background-color: #fafafa;
  width: 100% !important;
  height: 100% !important;
}
</style>
