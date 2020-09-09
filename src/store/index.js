import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: {},
    messages: [],
  },
  getters: {
    userData: (state) => state.userData,
    messages: (state) => state.messages,
  },
  mutations: {
    updateUserData(state, updateData) {
      state.userData = { ...state.userData, ...updateData };
    },
    setUserData(state, userData) {
      state.userData = { ...userData };
    },
    setMessages(state, messages) {
      state.messages = messages;
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
      const userId = context.getters.userData.userId;
      try {
        if (updateData.image) {
          const image = updateData.image;
          const storageRef = firebase
            .storage()
            .ref("users/" + userId + "/images/" + image.name);
          await storageRef.put(image);
          const imageUrl = await firebase
            .storage()
            .ref("users/" + userId + "/images/" + image.name)
            .getDownloadURL();
          updateData.image = imageUrl;
        }
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
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .catch(function(error) {
          alert(error);
        });
    },
    async getMessages(context) {
      try {
        const db = firebase.firestore();
        const response = await db
          .collection("messages")
          .orderBy("createdAt", "asc")
          .limit(50)
          .get();
        let messages = [];
        response.forEach((doc) => {
          const data = doc.data();
          const boolean = data.uid === context.getters.userData.userId;
          messages.push({
            userId: data.uid,
            message: data.message,
            createdAt: data.createdAt,
            isMyMessage: boolean,
          });
        });
        context.commit("setMessages", messages);
      } catch (error) {
        alert(error);
      }
    },
    onSnapshot(context) {
      const db = firebase.firestore();
      db.collection("messages").onSnapshot(() => {
        context.dispatch("getMessages");
      });
    },
    async sendMessage(context, message) {
      try {
        const db = firebase.firestore();
        const now = new Date();
        await db.collection("messages").add({
          message: message,
          uid: context.getters.userData.userId,
          createdAt: now,
        });
      } catch (error) {
        alert("send message faild");
      }
    },
  },
});
