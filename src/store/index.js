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
        await firebase
          .auth()
          .createUserWithEmailAndPassword(userData.email, userData.password);
        const user = firebase.auth().currentUser;
        await user.updateProfile({
          displayName: userData.displayName,
          photoURL:
            "https://firebasestorage.googleapis.com/v0/b/vue-app-test-7fc5d.appspot.com/o/delault%20user%2F8.png?alt=media&token=f12cc7ba-e60a-40c8-bf7b-dfa4901f4d95",
        });
        const userObject = {
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        context.commit("updateUserData", userObject);
      } catch (err) {
        alert(err);
      }
    },
    async login(context, userData) {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(userData.email, userData.password);
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
        const user = firebase.auth().currentUser;
        if (!updateData.displayName) {
          delete updateData.displayName;
        }
        if (!updateData.photoURL) {
          delete updateData.photoURL;
        } else {
          const file = updateData.photoURL;
          const storageRef = firebase
            .storage()
            .ref("users/" + user.uid + "/images/" + file.name);
          await storageRef.put(file);
          updateData.photoURL = await firebase
            .storage()
            .ref("users/" + user.uid + "/images/" + file.name)
            .getDownloadURL();
        }
        await user.updateProfile({
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
          const user = firebase.auth().currentUser;
          const data = doc.data();
          const boolean = data.uid === user.uid;
          messages.push({
            userId: data.uid,
            displayName: data.displayName,
            photoURL: data.photoURL,
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
        const user = firebase.auth().currentUser;
        await db.collection("messages").add({
          displayName: user.displayName,
          photoURL: user.photoURL,
          message: message,
          uid: user.uid,
          createdAt: now,
        });
      } catch (error) {
        alert("send message faild");
      }
    },
  },
});
