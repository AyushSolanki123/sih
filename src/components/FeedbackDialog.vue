<template>
  <q-dialog v-model="showDialog" position="bottom" persistent>
    <q-card>
      <q-card-section class="row justify-between">
        <div class="text-subtitle1 text-bold">Thank you for using our Application!</div>
        <q-btn flat round dense icon="close" @click="$emit('closeDialog')" />
      </q-card-section>

      <q-card-section class="q-pt-none text-caption">
        <div>
          Would you be willing to take two minutes and sharing about the detection accuracy?
        </div>
        </div>
        <div class="q-my-sm column q-gutter-sm" v-if="!consent">
          <q-btn label="Provide Feedback" color="positive" class="col" @click="isCorrect=false; consent = true;" />
          <q-btn label="No Thanks"  class="col" outline color="red" @click="consent = false" />
        </div>
        <q-input
          v-if="!isCorrect"
          v-model="comment"
          label="Enter Feedback"
          placeholder="Feedback"
          outlined
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          no-caps
          label="Submit"
          color="primary"
          @click="$emit('submit', comment)"
        />
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
      default: false,
    },
  },
  data() {
    return {
      isCorrect: true,
      consent: false,
      comment: ""
    };
  },
};
</script>

<style lang="scss"></style>
