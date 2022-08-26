<template>
  <q-page padding class="bg-grey-2">
    <div class="text-h5 text-bold text-center">Admin Users</div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        icon="eva-plus-outline"
        style="border-radius: 8px"
        no-caps
        color="primary"
        @click="startReg"
        >Add User</q-btn
      >
    </q-page-sticky>

    <div v-if="!loading">
      <transition
        appear
        enter-active-class="animated slideInLeft"
        leave-active-class="animated slideInRight"
      >
        <q-scroll-area style="height: 80%">
          <div v-for="user in users" :key="user._id">
            <PeopleCard :user="user" />
          </div>
        </q-scroll-area>
      </transition>
    </div>
    <div v-else>
      <transition
        appear
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideInLeft"
      >
        <div>
          <div v-for="i in 6" :key="i">
            <PeopleCardSkeleton />
          </div>
        </div>
      </transition>
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
import { notify } from "src/functions/Notify";
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
          //   console.log(response);
          this.loading = false;
        })
        .catch((error) => {
          //   console.log(error);
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
      //   console.log(data);
      registerUser(data)
        .then((response) => {
          if ((response.message = "Registration Successful")) {
            notify("Success", "User Registered Successfully");
          }
        })
        .catch((error) => {
          notify("Error", "User Registration Failed");
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
