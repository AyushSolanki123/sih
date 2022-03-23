<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-10" bordered>
      <q-toolbar class="q-pa-none">
        <q-toolbar-title class="text-center text-bold">FishDetec </q-toolbar-title>
      </q-toolbar>
    </q-header>
<!-- 
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
        <q-route-tab to="/camera" icon="eva-camera-outline" />
      </q-tabs>
    </q-footer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {};
  },
};
</script>
