<template>
  <q-dialog v-model="showDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">Alert</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
        repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
        perferendis totam, ea at omnis vel numquam exercitationem aut, natus
        minima, porro labore.
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup @click="$emit('closeDialog')" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
    props: {
        showDialog: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    data() {
        return {

        }
    }
};
</script>

<style lang="scss"></style>
