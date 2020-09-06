import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profileData: {
      gender: null,
      firstName: null,
      lastName: null,
      age: null,
      hobbies: [],
    },
    userData: {
      userId: null,
      userName: null,
    },
  },
  getters: {
    profileDetail: (state) => state.profileData,
  },
  mutations: {
    updateProfile(state, profileData) {
      state.profileData = { ...profileData };
    },
    addUserId(state, userId) {
      state.userId = userId;
    },
  },
  actions: {
    updateProfile(context, profileData) {
      setTimeout(() => {
        context.commit("updateProfile", profileData);
      }, 5000);
    },
    signUp(context, userData) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(userData.email, userData.password)
        .then((res) => {
          res.user.updateProfile({
            displayName: userData.username,
          });
          context.commit("addUserId", res.user.uid);
          router.push("/user/1/detail");
        })
        .catch((err) => {
          alert("Sign up falied", err);
        });
    },
    login(context, userData) {
      firebase
        .auth()
        .signInWithEmailAndPassword(userData.email, userData.password)
        .then((res) => {
          console.log(res);
          context.commit("addUserId", res.user.uid);
          router.push("/user/1/detail");
        })
        .catch((err) => {
          alert("Login falied", err);
        });
    },
    logout() {
      firebase.auth().signOut();
      alert("Logout");
    },
  },
});
