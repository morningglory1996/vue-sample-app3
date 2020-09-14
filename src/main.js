import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import config from "../config";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Toasted from "vue-toasted";
import "./registerServiceWorker";

Vue.config.productionTip = false;

const toastOptions = {
  duration: 2000,
  singleton: true,
};

Vue.use(Toasted, toastOptions);

var firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
};

firebase.initializeApp(firebaseConfig);

store.dispatch("onAuthStateChanged");

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
