import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import config from "../config";
import firebase from "firebase";

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

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("loginしています");
      next();
    } else {
      console.log("loginしていません");
      next();
    }
  });
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
