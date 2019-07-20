<template>
  <SlideContainer />
</template>
<script>
import { firestore } from "./firebase";
import SlideContainer from "./modules/slides/slideContainer";

export default {
  name: "app",
  components: { SlideContainer },
  data() {
    return {
      meta: {}
    };
  },
  firestore: {
    meta: firestore.collection("meta").doc("default")
  }
};
</script>
<style>
:root {
  --primaryColor: #db0000;
  --secondaryColor: #000000;
  --tertiaryColor: #ffffff;
  --primaryAltColor: #564d4d;
  --secondaryAltColor: #831010;
  --textColor: var(--secondaryColor);
}

@font-face {
  font-family: "Volkhov";
  font-style: normal;
  font-weight: 400;
  src: local("Volkhov"), url("./assets/fonts/Volkhov-Regular.ttf") format("ttf");
}

* {
  font-family: "Volkhov", serif !important;
}
</style>
