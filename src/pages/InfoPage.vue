<template>
  <div>
    <div v-if="imageCaptured" class="q-pa-md">
      <q-input outlined v-model="weight" label="Enter Estimated weight" type="number">
        <template v-slot:after>
          <q-select v-model="type" :options="options" label="Unit" behavior="menu" />
        </template>
      </q-input>
    </div>
    <div v-if="imageCaptured" class="heading text-bold q-ml-md q-mb-md">
      Details of fish:
    </div>
    <div v-if="imageCaptured" class="q-ml-md text">
      <div class="text-bold">
        Name:
        <span class="text-weight-regular q-ml-xs">
          {{ name }}
        </span>
      </div>
      <div class="text-bold">
        Species Name:
        <span class="text-weight-regular q-ml-xs">
          {{ speciesName }}
        </span>
      </div>
      <div class="text-bold">
        Regional Name:
        <span class="text-weight-regular q-ml-xs">
          {{ regionalName }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        weight:{
            type:String,
            required:false,
        },
        type:{
            type:String,
            required: true
        },
        name:{
            type:String,
            required: true
        },
        regionalName:{
            type:String,
            required: true
        },
        speciesName:{
            type:String,
            required: true
        },
        imageCaptured:{
            type:Boolean,
            default: false,
            required: true
        }
        
    }

}
</script>

<style>

</style>