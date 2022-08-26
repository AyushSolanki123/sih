<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
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
    start() {
      let that = this;
      let authToken = localStorage.getItem("authToken");
      if (authToken != null || authToken != undefined) {
        this.status().then((location) => {
          this.location.lat = location.lat;
          this.location.long = location.long;
          let user = JSON.parse(localStorage.getItem("user"));
          let userInfo = {
            latitude: that.location.lat,
            longitude: that.location.long,
            userId: user._id,
          };
          updateUser(userInfo)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      } else {
        this.$router.push("/auth");
      }
    },
    status() {
      let authToken = localStorage.getItem("authToken");
      return new Promise(function (resolve, _reject) {
        loginStatus(authToken)
          .then((response) => {
            if (response.data.status) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  let location = {
                    long: position.coords.longitude,
                    lat: position.coords.latitude,
                  };

                  resolve(location);
                },
                this.locationError,
                {
                  enableHighAccuracy: true,
                  maximumAge: 0,
                }
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    logOut() {
      logOutUser().then((_response) => {
        this.$router.push("/auth");
        notify("Failed", "Session Expired! Please Login Again.");
      });
    },
    checkLoginStatus() {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        this.$router.push("/auth");
      } else {
        loginStatus(authToken)
          .then((status) => {
            if (!status.status) {
              this.logOut();
              notify("Failed", "Session Expired, Please Login Successfully");
            }
          })
          .catch((err) => {});
      }
    },
  },
  created() {
    this.checkLoginStatus();
  },
};
</script>
