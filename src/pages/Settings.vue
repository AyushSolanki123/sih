<template>
  <div>
    <q-card flat>
      <q-card-section>
        <q-btn
          dense
          no-caps
          label="SignOut"
          color="primary"
          @click="signOut()"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { logOutUser } from "src/utils/ApiActions";
import { notify } from "src/functions/Notify";
export default {
  data() {
    return {};
  },
  methods: {
    signOut() {
      logOutUser().then((response) => {
        notify({
          message: "LogOut Successfully",
          color: "positive",
          icon: "eva-checkmark-circle-2",
        });
        this.$router.push("/auth");
      });
    },
  },
};
</script>

<style></style>
