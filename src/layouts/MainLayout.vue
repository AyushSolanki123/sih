<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-10" bordered>
      <q-toolbar class="q-pa-md">
        <q-toolbar-title class="text-bold">AquaDeTec </q-toolbar-title>
        <q-avatar color="grey" text-color="black">{{
          user.firstName[0]
        }}</q-avatar>
      </q-toolbar>
    </q-header>

    <q-footer class="bg-white" bordered>
      <transition
        appear
        enter-active-class="animated fadeInDown"
        leave-active-class="animated fadeOut"
      >
      </transition>
      <q-tabs
        class="text-grey-10"
        active-color="primary"
        indicator-color="transparent"
      >
        <q-route-tab to="/" icon="eva-home-outline" />
        <q-route-tab to="/camera" style="q-pa-none" icon="eva-camera-outline" />
        <q-route-tab to="/settings" icon="eva-settings-outline" />
        <q-route-tab v-if="isAdmin" to="/people" icon="eva-people-outline" />
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {
      isAdmin: true,
      user: {},
    };
  },
  methods: {},
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user.role !== "USER") {
      this.isAdmin = true;
    }
  },
};
</script>
