import Vue from "vue";
import { firestorePlugin } from "vuefire";
import * as firebase from "firebase";

Vue.use(firestorePlugin);

export const firestore = firebase
  .initializeApp({
    apiKey: "AIzaSyCNbUBsRQRR_qLkCPm0xD0AOlzADSlg8iI",
    authDomain: "netflix-beer.firebaseapp.com",
    databaseURL: "https://netflix-beer.firebaseio.com",
    projectId: "netflix-beer",
    storageBucket: "netflix-beer.appspot.com",
    messagingSenderId: "1075429614080",
    appId: "1:1075429614080:web:8e0b7961382ba4bb"
  })
  .firestore();
