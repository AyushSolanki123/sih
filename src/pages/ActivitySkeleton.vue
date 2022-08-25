<template>
  <q-page class="activity">
    <transition
      appear
      enter-active-class="animated slideOutDown"
      leave-active-class="animated slideInDown"
    >
      <div>
        <div v-for="i in 6" :key="i">
          <q-card class="q-ma-md actCardSK radius">
            <q-card-section horizontal>
              <q-skeleton width="32vw" height="13vh" />
              <q-card-section class="col text-center">
                <div class="text-center">
                  <q-skeleton class="q-ma-xs" width="200px" />
                  <q-skeleton class="q-ma-xs" width="200px" />
                  <q-skeleton class="q-ma-xs" width="200px" />
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </transition>
  </q-page>
</template>

<script>
export default {};
</script>

<style>
.actCardSk {
  height: 11vh !important;
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
