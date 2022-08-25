<template>
    <div>
        <div class="q-pt-md">
          <div class="text-primary text-bold text-h6 q-ml-lg">Users</div>
            <q-scroll-area class="peopleScroll">
              <div v-if="!loading">
              <div v-for="student in students" :key="student._id">
                <peopleCard :student="student" :teacher="isTeacher" />
              </div>
              </div>
              <div v-else>
                <div v-for="i in 5" :key="i">
                  <PeopleCardSkeleton/>
                </div>
              </div>
            </q-scroll-area>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            loading: false,
            users:[]
        }
    },
    methods:{
        getUsers(){

        }
    }
}
</script>

<style>

</style>