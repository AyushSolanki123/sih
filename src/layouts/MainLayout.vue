<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-10" bordered>
      <q-toolbar class="q-pa-md">
        <q-toolbar-title class="text-bold">AquaDeTec </q-toolbar-title>
        <div>
          <q-btn-dropdown no-caps unelevated>
            <template v-slot:label>
              <div class="row items-center no-wrap q-ma-none">
                <q-avatar color="grey" text-color="black">
                  {{ user.firstName[0] }}</q-avatar
                >
              </div>
            </template>
            <transition
              appear
              enter-active-class="animated backInDown"
              leave-active-class="animated backOutUp"
            >
              <q-list separator>
                <!-- Signout -->
                <q-item clickable v-close-popup @click="logOut">
                  <q-item-section>
                    <q-icon
                      name="logout"
                      color="blue-grey"
                      text-color="white"
                      size="4vh"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Signout</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </transition>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-footer class="bg-white" bordered>
      <q-tabs
        class="text-grey-10"
        active-color="primary"
        indicator-color="transparent"
      >
        <q-route-tab to="/" icon="eva-home-outline" />
        <q-route-tab to="/camera" style="q-pa-none" icon="eva-camera-outline" />
        <q-route-tab v-if="isAdmin" to="/people" icon="eva-people-outline" />
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { notify } from "src/functions/Notify";
export default {
  name: "MainLayout",
  data() {
    return {
      isAdmin: true,
      user: {},
    };
  },
  methods: {
    logOut() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      notify("Success", "Logged Out");
      this.$router.push("/auth");
    },
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user.role !== "USER") {
      this.isAdmin = true;
    }
  },
};
</script>
