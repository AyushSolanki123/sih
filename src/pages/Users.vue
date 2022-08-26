<template>
  <q-page>
    <div class="text-h4 text-bold text-center">Admin Users</div>
    <div class="row justify-end">
      <q-btn
        icon="eva-plus-outline"
        style="border-radius: 8px"
        no-caps
        @click="startReg"
        >Add User</q-btn
      >
    </div>
    <div v-if="!loading">
      <div v-for="user in users" :key="user._id">
        <PeopleCard :user="user" />
      </div>
    </div>
    <div v-else>
      <div v-for="i in 6" :key="i">
        <PeopleCardSkeleton />
      </div>
    </div>
    <q-dialog v-model="showRegister">
      <Registration @register="adminUser" />
    </q-dialog>
  </q-page>
</template>

<script>
import PeopleCard from "./PeopleCard.vue";
import Registration from "src/components/Registration.vue";
import PeopleCardSkeleton from "./PeopleCardSkeleton.vue";
import { listAdminUsers, registerUser } from "src/utils/ApiActions";
import {notify} from 'src/functions/Notify'
export default {
  components: { PeopleCard, PeopleCardSkeleton, Registration },
  data() {
    return {
      users: [],
      loading: false,
      showRegister: false,
    };
  },
  methods: {
    startReg() {
      this.showRegister = true;
    //   console.log("Register", this.showRegister);
    },
    getUsers() {
      this.loading = true;
      listAdminUsers()
        .then((response) => {
          this.users = response.data;
          console.log(response);
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    adminUser(user) {
        this.showRegister = false;
      let data = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        role: "ADMIN",
      };
      console.log(data);
      registerUser(data)
        .then((response) => {
          if ((response.message = "Registration Successful")) {
            notify({
              message: "Registration Success",
              color: "positive",
              type: "positive",
              icon: "eva-checkmark-circle-outline",
            });
          }
        })
        .catch((error) => {
          notify({
            message: "User already exists!",
            color: "negative",
            icon: "eva-close-circle-outline",
            type: "negative",
          });
          console.log(error);
        });
    },
  },
  created() {
    this.getUsers();
  },
};
</script>

<style></style>
