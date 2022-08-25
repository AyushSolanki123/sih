<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { LocalStorage } from "quasar";
import { updateUser } from "src/utils/ApiActions";
import { logOutUser, loginStatus } from "./utils/ApiActions";
export default {
  name: "App",
  data() {
    return {
      location: {
        lat: 0,
        long: 0,
      },
    };
  },
  methods: {
    async start() {
      let that = this;
      let authToken = LocalStorage.getItem("authToken");
      if (authToken != null || authToken != undefined) {
          this.status().then(response=>{
            this.location.lat = position.coords.latitude;
            this.location.long = position.coords.longitude;
            console.log(position);
            var user = LocalStorage.getItem("user");
            var userInfo = {
              latitude: that.location.lat,
              longitude: that.location.long,
              id: user._id,
            };
            // console.log(userInfo);
            updateUser(userInfo)
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
          })
      }
      else{
        this.$router.push("/auth");
      }
    },
    status(){
      let authToken = LocalStorage.getItem("authToken");
      return new Promise(function (resolve, reject) {
        loginStatus(authToken)
          .then((response) => {
            // console.log(response);
            if (response.response.data.status) {
              navigator.geolocation.getCurrentPosition(
              (position) => {
                this.location.lat = position.coords.latitude;
                this.location.long = position.coords.longitude;
                console.log(position);
                resolve({ response: position })
              },
              this.locationError,
              {
                enableHighAccuracy: true,
                maximumAge: 0,
              })
            }
            })
            .catch((error) => {
                console.log(error);
              });
      })
            
    },
    logOut() {
      logOutUser().then((response) => {
        this.$router.push("/auth");
        notify({
          message: "Session Expired! Please Login Again.",
          color: "warning",
          type: "warning",
        });
      });
    },
  },
  created() {
    this.start();
  },
};
</script>
