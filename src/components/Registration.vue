<template>
  <div class="">
    <q-card class="regCard q-pa-none q-ma-none shadow-24 q-mt-lg">
      <q-card-section class="text-weight-bolder login-card-text text-center">
        User Registration
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-md">
          <!-- LOGIN FORM START -->
          <div>
            <!-- Name of User -->
            <div class="text-weight-bolder text-grey">First Name</div>
            <q-input
              dense
              class="q-ma-none q-ml-md"
              v-model.trim="firstName"
              lazy-rules
              placeholder="Enter First Name"
            >
              <template v-slot:prepend>
                <q-icon name="eva-person-outline" />
              </template>
            </q-input>

            <div class="text-weight-bolder q-mt-md text-grey">Last Name</div>
            <q-input
              dense
              class="q-ma-none q-ml-md"
              v-model.trim="lastName"
              lazy-rules
              placeholder="Enter Last Name"
            >
              <template v-slot:prepend>
                <q-icon name="eva-person-outline" />
              </template>
            </q-input>

            <!-- Email of User  -->
            <div class="text-weight-bolder q-mt-md text-grey">Email</div>
            <q-input
              dense
              class="q-ma-none q-ml-md"
              v-model.trim="email"
              lazy-rules
              :rules="[(val) => isValidEmail(val) || 'Enter a valid email']"
              hide-bottom-space
              placeholder="Enter Email"
            >
              <template v-slot:prepend>
                <q-icon name="eva-person-outline" />
              </template>
            </q-input>
            <!-- Password of User -->
            <div class="text-weight-bolder q-mt-md text-grey">Password</div>
            <q-input
              dense
              class="q-ma-none q-ml-md"
              v-model.trim="password"
              lazy-rules
              :rules="[
                (val) =>
                  val.length >= 8 ||
                  'Minimum password length must be 8 characters',
              ]"
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
            <div class="text-weight-bolder text-grey">Confirm Password</div>
            <q-input
              dense
              class="q-ma-none q-ml-md"
              v-model.trim="confirmPass"
              lazy-rules
              hide-bottom-space
              :rules="[
                (val) => val === password || 'Both passwords must match',
              ]"
              placeholder="Password"
              type="password"
            >
              <template v-slot:prepend>
                <q-icon name="eva-lock-outline" />
              </template>
              <template v-slot:append>
                <q-icon :name="'visibility_off'" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
          <div class="row justify-between q-pa-md">
            <q-btn
              flat
              dense
              no-caps
              label="Login"
              color="primary"
              @click="$emit('change')"
            />
            <q-btn
              flat
              dense
              no-caps
              label="Register"
              color="primary"
              @click="register"
            />
          </div>
        </q-form>
      </q-card-section>
      <!-- LOGIN FORM END  -->
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPass: "",
      isPwd: true,
    };
  },
  methods: {
    isValidEmail(value) {
      const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return re.test(String(value).toLowerCase());
    },
    register() {
      this.$emit("register", {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      });
    },
  },
  created() {
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.password = "";
  },
};
</script>

<style>
.regCard {
  /* height: 60vh; */
  border-radius: 16px !important;
}
</style>
