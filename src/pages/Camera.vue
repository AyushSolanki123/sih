<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="camera-frame q-pa-sm">
      <!-- <video
        v-show="!imageCaptured"
        class="full-width image"
        ref="video"
        autoplay
      /> -->
      <!-- <q-img :src="image2" :ratio="1" /> -->
      <canvas
        class="full-width image"
        ref="canvas"
        height="350"
        v-show="imageCaptured"
      />
    </div>

    <div class="text-center q-pa-md">
      <!-- <q-btn
        @click="captureImage"
        v-if="!imageCaptured"
        color="black"
        size="lg"
        icon="eva-camera"
        round
      /> -->
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
    <div v-if="imageCaptured" class="text-h6 text-bold q-ml-md q-mb-md">
      Details of fish:
    </div>
    <div v-if="imageCaptured" class="q-ml-md text-subtitle1">
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
    <div
      v-show="imageCaptured"
      class="row justify-center q-mt-lg fixed-bottom q-pa-md q-mx-md"
    >
      <q-btn
        no-caps
        @click="addPost"
        class="btn"
        icon-right="eva-arrow-forward-outline"
        color="primary"
        label="More Details"
      />
    </div>
  </q-page>
</template>

<script>
import { uid } from "quasar";
export default {
  name: "Camera",
  data() {
    return {
      post: {
        id: uid(),
        photo: null,
        date: Date.now(),
      },
      image:
        "http://d1iraxgbwuhpbw.cloudfront.net/images/thumbnails/jpg/tn_ththy_ug.jpg",
      image1:
        "https://files.worldwildlife.org/wwfcmsprod/images/Atlantic_bluefin_tuna_253467_Tuna_Species/hero_small/925cryk2za_Bluefin_tuna_253467.jpg",
      image2:
        "https://5.imimg.com/data5/RQ/IM/BK/SELLER-36867365/local-magur-2-500x500.jpg",
      name: "Cat fish",
      regionalName: "मांगुर",
      speciesName: "Cybiosarda elegans",
      imageCaptured: false,
      imageUpload: [],
      imagesrc: "",
      hasCameraSupport: true,
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
        .catch((error) => {
          this.hasCameraSupport = false;
        });
    },
    captureImage() {
      let video = this.$refs.video;
      let canvas = this.$refs.canvas;

      //   canvas.width = video.getBoundingClientRect().width;
      //   canvas.height = video.getBoundingClientRect().height;
      //   let ctx = canvas.getContext("2d");
      //   ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.imageCaptured = true;
      //   this.post.photo = this.dataURItoBlob(canvas.toDataURL());
      //   this.disableCamera();
    },
    captureImageFallBack(file) {
      console.log(file);
      let that = this;
      this.post.photo = file;
      let canvas = this.$refs.canvas;
      let ctx = canvas.getContext("2d");
      var reader = new FileReader();
      reader.onload = (event) => {
        var img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          this.imageCaptured = true;
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
      console.log(this.post);
      this.$router.push({
        name: "Details",
        params: {
          name: this.name,
          image: this.imagesrc,
        },
      });
    },
  },
  mounted() {
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
