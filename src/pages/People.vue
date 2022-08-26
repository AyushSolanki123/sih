<template>
  <q-page class="bg-grey-2 flex flex-center">
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated slideInRight"
    >
      <div class="q-pt-md text-center">
        <q-card class="radius q-pa-md people" @click="$router.push('/users')">
          <q-card-section horizontal>
            <div class="col-3">
              <q-avatar>
                <img src="Profile.jpg" />
              </q-avatar>
            </div>
            <div class="text-h6 text-bold text-center q-pt-sm col-6">Users</div>
            <q-btn flat icon="eva-arrow-ios-forward-outline" />
          </q-card-section>
        </q-card>
        <q-card
          class="radius q-mt-lg q-pa-md people"
          @click="$router.push('/feed')"
        >
          <q-card-section horizontal>
            <div class="col-3">
              <q-avatar>
                <img src="Profile.jpg" />
              </q-avatar>
            </div>
            <div class="text-h6 text-bold text-center q-pt-sm col-6">
              FeedBack
            </div>
            <q-btn flat icon="eva-arrow-ios-forward-outline" />
          </q-card-section>
        </q-card>
      </div>
    </transition>
  </q-page>
</template>

<script>
export default {};
</script>

<style>
.people {
  width: 70vw;
  height: 10vh;
}
</style>
