<template>
  <router-view />
</template>
<script>
import { firestore } from "./firebase";
// import Beers from "./modules/beers/beers";

export default {
  name: "app",
  // components: { Beers },
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
@font-face {
  font-family: "Volkhov";
  font-style: normal;
  font-weight: 400;
  src: local("Volkhov"), url("./assets/fonts/Volkhov-Regular.ttf") format("ttf");
}

* {
  font-family: "Volkhov", serif !important;
}

html,
body {
  height: 100%;
  width: 100%;
}
</style>
