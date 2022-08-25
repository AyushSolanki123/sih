<template>
  <q-page class="q-pa-md bg-grey-2 column">
    <transition
      appear
      enter-active-class="animated slideInDown"
      leave-active-class="animated slideOutDown"
    >
      <div>
        <div class="q-mt-md text-center text-h5">
          <div>Welcome to</div>
          <div class="text-bold text-h4">AquaDetec</div>
        </div>
        <div class="flex flex-center card q-mt-lg">
          <q-spinner-facebook v-if="loading" size="10vh" />
          <div v-else>
            <q-card
              v-if="signin"
              class="card q-pa-none q-ma-none shadow-24 q-mt-lg"
            >
              <q-card-section
                class="text-weight-bolder login-card-text text-center"
              >
                User Login
              </q-card-section>
              <q-card-section>
                <q-form>
                  <!-- LOGIN FORM START -->
                  <div>
                    <div class="text-weight-bolder text-grey">Email</div>
                    <q-input
                      dense
                      class="q-ma-none q-ml-md"
                      v-model.trim="email"
                      lazy-rules
                      placeholder="Enter Email"
                    >
                      <template v-slot:prepend>
                        <q-icon name="eva-person-outline" />
                      </template>
                    </q-input>
                    <div class="text-weight-bolder text-grey">Password</div>
                    <q-input
                      dense
                      class="q-ma-none q-ml-md"
                      v-model.trim="password"
                      lazy-rules
                      placeholder="Password"
                      :type="isPwd ? 'password' : 'text'"
                    >
                      <template v-slot:prepend>
                        <q-icon name="eva-lock-outline" />
                      </template>
                      <template v-slot:append>
                        <q-icon
                          :name="isPwd ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd = !isPwd"
                        />
                      </template>
                    </q-input>
                  </div>
                  <div class="row justify-between q-pa-md">
                    <q-btn
                      flat
                      dense
                      no-caps
                      label="Register"
                      color="primary"
                      @click="changeSignin()"
                    />
                    <q-btn
                      flat
                      dense
                      no-caps
                      label="Login"
                      color="primary"
                      @click="login()"
                    />
                  </div>
                </q-form>
              </q-card-section>
              <!-- LOGIN FORM END  -->
            </q-card>
            <Registration
              v-else
              @register="register"
              @change="changeSignin()"
            />
          </div>
        </div>
      </div>
    </transition>
  </q-page>
</template>

<script>
import Registration from "src/components/Registration.vue";
import { notify } from "src/functions/Notify";
import { registerUser, loginUser, updateUser } from "src/utils/ApiActions";

export default {
  components: {
    Registration,
  },
  name: "Auth",
  data() {
    return {
      email: "solankiam@rknec.edu",
      password: "12345678",
      signin: true,
      loading: false,
      isPwd: true,
      location: {
        lat: 0,
        long: 0,
      },
    };
  },
  methods: {
    changeSignin() {
      this.signin = !this.signin;
    },
    register(user) {
      registerUser(user)
        .then((response) => {
          localStorage.setItem("authToken", response.data.token.authToken);
          localStorage.setItem(
            "refreshToken",
            response.data.token.refreshToken
          );
          localStorage.setItem("user", response.data.user);
          if ((response.message = "User Registered Successfully")) {
            notify({
              message: "Registration Success",
              color: "positive",
              type: "positive",
              icon: "eva-checkmark-circle-outline",
            });
            this.$router.push("/");
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
    login() {
      this.loading = true;
      let that = this;
      let login = {
        email: this.email,
        password: this.password,
      };
      loginUser(login)
        .then((response) => {
          if (response.loginDone) {
            localStorage.setItem("authToken", response.data.token.authToken);
            localStorage.setItem(
              "refreshToken",
              response.data.token.refreshToken
            );
            const user = response.data.user;
            localStorage.setItem("user", JSON.stringify(user));
            navigator.geolocation.getCurrentPosition(
              (position) => {
                this.location.lat = position.coords.latitude;
                this.location.long = position.coords.longitude;
                console.log(position);
              },
              this.locationError,
              {
                enableHighAccuracy: true,
                maximumAge: 0,
              }
            );

            let lat = that.location.lat;
            let long = that.location.long;
            let userInfo = {
              userId: user._id,
              latitude: lat,
              longitude: long,
            };
            console.log(userInfo);
            updateUser(userInfo)
              .then((response) => {
                notify("Success", response.message);
                this.loading = false;
                that.$router.push("/");
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            notify("Failed", "Login Failed");
            this.loading = false;
            throw new Error("Login failed");
          }
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
          notify("Failed", "Invalid email or password entered");
        });
    },
  },
};
</script>

<style lang="scss">
.card {
  height: 33vh;
  border-radius: 16px !important;
}
</style>
