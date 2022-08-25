<template>
  <q-page>
    <div class="text-h4 text-bold text-center">Admin Users</div>
    <div v-for="user in users" :key="user._id">
    <PeopleCard :user="user"/>
    </div>
  </q-page>
</template>

<script>
import PeopleCard from './PeopleCard.vue';
import {listAdminUsers} from 'src/utils/ApiActions';
export default {
    components: { PeopleCard },
    data(){
        return{
            users:[]
        }
    },
    methods:{
        getUsers(){
            this.loading = true;
            listAdminUsers()
                .then((response) => {
                    this.users = response.data.data;
                    this.loading = false;
                })
                .catch((error) => {
                    console.log(error);
                    this.loading = false;
                });
        }
    },
    created(){
        this.getUsers();
    }
}
</script>

<style>

</style>