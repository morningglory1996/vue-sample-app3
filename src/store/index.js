import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: {},
  },
  getters: {
    userData: (state) => state.userData,
  },
  mutations: {
    updateUserData(state, updateData) {
      state.userData = { ...state.userData, ...updateData };
    },
    setUserData(state, userData) {
      state.userData = { ...userData };
    },
  },
  actions: {
    async signUp(context, userData) {
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(userData.email, userData.password);
        router.push("/user/" + response.user.uid + "/detail");
      } catch (err) {
        alert(err);
      }
    },
    async login(context, userData) {
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(userData.email, userData.password);
        router.push("/user/" + response.user.uid + "/detail");
      } catch (err) {
        alert(err);
      }
    },
    async logout() {
      await firebase.auth().signOut();
      router.push("login");
    },
    setUserData(context, userData) {
      context.commit("setUserData", userData);
    },
    async updateProfile(context, updateData) {
      try {
        const userId = context.getters.userData.userId;
        const db = firebase.firestore();
        await db
          .collection("users")
          .doc(userId)
          .set({
            ...updateData,
          });
        context.commit("updateUserData", updateData);
        alert("Update success");
      } catch (err) {
        alert(err);
      }
    },
    async getUserProfile(context, userId) {
      try {
        const db = firebase.firestore();
        const docRef = db.collection("users").doc(userId);
        const doc = await docRef.get();
        if (!doc.exists) return;
        context.commit("updateUserData", doc.data());
      } catch (err) {
        alert(err);
      }
    },
    signInWithGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .catch(function(error) {
          alert(error);
        });
    },
  },
});
