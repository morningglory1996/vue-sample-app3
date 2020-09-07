import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import config from "../config";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

Vue.config.productionTip = false;

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

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const user = firebase.auth().currentUser;
    const userData = {
      userId: user.uid,
      isAuthenticated: true,
    };
    store.dispatch("setUserData", userData);
    store.dispatch("getUserProfile", user.uid);
  } else {
    store.dispatch("setUserData", {});
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
