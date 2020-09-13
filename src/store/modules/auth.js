import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/messaging";
import router from "../../router";
import config from "../../../config";

let unsubscribe;

const state = {
  userData: {},
};

const getters = {
  userData: (state) => state.userData,
};

const mutations = {
  updateUserData(state, updateData) {
    state.userData = { ...state.userData, ...updateData };
  },
  setUserData(state, userData) {
    state.userData = { ...userData };
  },
};

const actions = {
  setUserData(context, userData) {
    context.commit("setUserData", userData);
  },
  async signUp(context, userData) {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(userData.email, userData.password);
      const user = firebase.auth().currentUser;
      const userObject = {
        displayName: userData.displayName,
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/vue-sample-app-eeb9f.appspot.com/o/defalut.png?alt=media&token=4150e302-918d-4d3f-9df8-652137c439cb",
      };
      await user.updateProfile(userObject);
      context.commit("updateUserData", userObject);
    } catch (error) {
      alert(error);
    }
  },
  async login(context, userData) {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(userData.email, userData.password);
    } catch (error) {
      alert(error);
    }
  },
  async logout() {
    await firebase.auth().signOut();
    unsubscribe();
    router.push("login");
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
      await user.updateProfile(updateData);
      context.commit("updateUserData", updateData);
      updateData.vm.$toasted.success("Updated", {
        icon: "check",
      });
    } catch (error) {
      alert(error);
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
  signInWithTwitter() {
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch(function(error) {
        alert(error);
      });
  },
  onSnapshot(context) {
    const db = firebase.firestore();
    unsubscribe = db.collection("messages").onSnapshot(() => {
      context.dispatch("getMessages");
    });
  },
  notification() {
    const messaging = firebase.messaging();
    Notification.requestPermission()
      .then(() => {
        console.log("Notification permission granted.");
        messaging.getToken(config.publicVapidKey).then((token) => {
          console.log(token);
        });
      })
      .catch((err) => {
        console.log("Unable to get permission to notify.", err);
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
