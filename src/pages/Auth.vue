<template>
    <q-page class="q-pa-md bg-grey-2 column">
        <div class="q-mb-xl text-h5">
            <div>Welcome to</div>
            <div class="text-bold text-h4">AquaDeTeQ</div>
        </div>
        <div class="flex flex-center card q-mt-xl">
            <q-card class="my-card q-pa-none q-ma-none shadow-24 q-mt-xl">
                <q-card-section class="text-weight-bolder login-card-text text-center">
                    User Login
                </q-card-section>
                <q-card-section>
                <q-form class="q-gutter-md">
                    <!-- LOGIN FORM START -->
                    <div>
                    <div class="text-weight-bolder text-grey">Username</div>
                    <q-input
                        dense
                        class="q-ma-none q-ml-md"
                        v-model.trim="userName"
                        lazy-rules
                        placeholder="Enter Username"
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
                        type="password"
                    >
                        <template v-slot:prepend>
                        <q-icon name="eva-lock-outline" />
                        </template>
                        <template v-slot:append>
                        <q-icon
                            :name="'visibility_off'"
                            class="cursor-pointer"
                        />
                        </template>
                    </q-input>    
                    </div>
                    <div class="float-right q-pa-md">
                        <q-btn 
                            flat
                            dense
                            no-caps                    
                            label="Login"
                            color="primary"
                            @click="$router.push('/')"
                        />
                    </div>
                </q-form>
                </q-card-section>
                    <!-- LOGIN FORM END  -->
            </q-card>
        </div>
    </q-page>
</template>

<script>
    export default {
        name: 'Auth',
        data () {
            return {
                userName: "admin",
                password: "12345678"
            }
        }
    }
</script>

<style lang="scss">
.card {
    height: 100%;
}
</style>