<template>
  <q-page class="bg-grey-2" padding>
    <div class="text-h5 text-center text-bold">Feedback</div>
    <div v-if="!loading">
      <div v-for="feed in feedback" :key="feed._id">
        <q-card class="q-my-md q-ml-sm actCard radius">
          <q-card-section horizontal>
            <q-avatar class="q-pa-md">
              <img :src="feed.imageUrl ? feed.imageUrl : 'Profile.jpg'" />
            </q-avatar>
            <q-card-section class="col text-center">
              <div class="text-weight-bold">
                {{ feed.fish.name }}
              </div>
              <div class="">
                <span class="text-weight-bold">User: </span>
                {{ feed.user.firstName }} {{ feed.user.lastName }}
              </div>
              <div class="">
                <span class="text-weight-bold">Feedback: </span>
                {{ feed.feedback }}
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div v-else>
      <div v-for="i in 6" :key="i">
        <FeedbackSkeleton />
      </div>
    </div>
  </q-page>
</template>

<script>
import { listFeedback } from "src/utils/ApiActions";
import FeedbackSkeleton from "src/components/FeedbackSkeleton.vue";
export default {
  components: { FeedbackSkeleton },
  data() {
    return {
      feedback: [],
      loading: true,
    };
  },
  methods: {
    getFeed() {
      this.loading = true;
      //   let id = this.user._id;
      listFeedback()
        .then((response) => {
          console.log(response);
          this.loading = false;
          this.feedback = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
  },
  created() {
    this.getFeed();
  },
};
</script>

<style></style>
