<template>
  <q-page class="q-pa-md bg-grey-2">
    <transition
      appear
      enter-active-class="animated slideInDown"
      leave-active-class="animated slideOutDown"
    >
      <div v-if="loading" class="q-mt-xl q-pt-xl flex flex-center">
        <q-spinner-box color="primary" size="80vw" />
      </div>
      <q-scroll-area v-else style="height: 85vh; max-width: 100vw">
        <div class="camera-frame q-pa-sm">
          <video
            v-show="!imageCaptured"
            class="full-width image"
            ref="video"
            autoplay
          />
          <canvas
            class="full-width image"
            ref="canvas"
            height="350"
            v-show="imageCaptured"
          />
        </div>

        <div class="text-center q-pa-md">
          <q-btn
            v-if="hasCameraSupport"
            @click="captureImage"
            :disable="imageCaptured"
            color="grey-10"
            icon="eva-camera"
            round
            class="q-mb-md"
            size="lg"
          />
          <q-file
            @input="captureImageFallBack"
            label="Choose an Image"
            v-model="imageUpload"
            accept="image/*"
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="eva-attach-outline" />
            </template>
          </q-file>
        </div>

        <div v-show="imageCaptured" class="row q-pa-md q-mx-md">
          <q-btn
            no-caps
            @click="addPost"
            class="btn"
            icon-right="eva-arrow-forward-outline"
            color="primary"
            label="Upload"
          />
        </div>
      </q-scroll-area>
    </transition>
  </q-page>
</template>

<script>
import { uid, Loading } from "quasar";
import { resizeBase64ForMaxHeight } from "resize-base64";
import FeedbackDialog from "src/components/FeedbackDialog.vue";
import InfoPage from "src/pages/InfoPage.vue";
import {
  updateUser,
  createHistory,
  getFishByModel,
} from "src/utils/ApiActions";
export default {
  components: { FeedbackDialog, InfoPage },
  name: "Camera",
  data() {
    return {
      post: {
        id: uid(),
        photo: null,
        date: Date.now(),
      },
      imageCaptured: false,
      imageUpload: [],
      imagesrc: "",
      weight: "",
      options: ["kg", "gm"],
      type: "",
      hasCameraSupport: true,
      loading: false,
      location: {
        lat: 0,
        lng: 0,
      },
      location1: {
        lat: 0,
        lng: 0,
      },
      location2: {
        lat: 0,
        lng: 0,
      },
    };
  },
  methods: {
    initCamera() {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          this.$refs.video.srcObject = stream;
        })
        .catch((_error) => {
          this.hasCameraSupport = false;
        });
    },
    createThumbnail(image) {
      return new Promise((resolve, reject) => {
        const that = this;
        resizeBase64ForMaxHeight(
          image,
          256,
          256,
          (img) => {
            console.log("inside", img);
            that.imagesrc = img;
            resolve(img);
          },
          (err) => {
            reject(err);
          }
        );
      });
    },
    captureImage() {
      let video = this.$refs.video;
      let canvas = this.$refs.canvas;

      canvas.width = video.getBoundingClientRect().width;
      canvas.height = video.getBoundingClientRect().height;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.imageCaptured = true;
      this.showDialog = true;
      const uri = canvas.toDataURL();
      this.post.photo = this.dataURItoBlob(uri);

      this.imagesrc = uri;
      this.disableCamera();
    },
    captureImageFallBack(file) {
      let that = this;
      this.post.photo = file;
      let canvas = this.$refs.canvas;
      let ctx = canvas.getContext("2d");
      let reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          this.imageCaptured = true;
          this.showDialog = true;
        };
        img.src = event.target.result;
        that.imagesrc = event.target.result;
      };
      reader.readAsDataURL(file);
    },
    disableCamera() {
      this.$refs.video.srcObject.getVideoTracks().forEach((track) => {
        track.stop();
      });
    },
    dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      var byteString = atob(dataURI.split(",")[1]);

      // separate out the mime component
      var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length);

      // create a view into the buffer
      var ia = new Uint8Array(ab);

      // set the bytes of the buffer to the correct values
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      // write the ArrayBuffer to a blob, and you're done
      var blob = new Blob([ab], { type: mimeString });
      // console.log("Blob:",blob);
      return blob;
    },
    locationError() {
      this.$q.dialog({
        title: "Error",
        message: "Could Not find Your location",
      });
      this.locationLoading = false;
    },
    addPost() {
      Loading.show();

      const user = JSON.parse(localStorage.getItem("user"));
      getFishByModel(this.imagesrc)
        .then((response) => {
          const reqBody = {
            user: user._id,
            fish: response._id["$oid"],
            imageUrl: this.imagesrc,
          };
          return createHistory(reqBody);
        })
        .then((response) => {
          this.$router.push({
            name: "DetailActivity",
            params: {
              activity: response.data,
            },
          });
          Loading.hide();
        })
        .catch((error) => {
          console.log(error);
          Loading.hide();
        });
    },
    getFishData() {
      this.loading = false;
    },
  },
  created() {
    this.initCamera();
  },
  beforeDestroy() {
    if (this.hasCameraSupport) {
      this.disableCamera();
    }
  },
};
</script>

<style lang="scss">
video {
  width: 100%;
  height: 350px;
  object-fit: cover;
}
.camera-frame {
  border: 2px solid $grey-10;
  height: 370px;
}
.image {
  height: 350px;
}
</style>
