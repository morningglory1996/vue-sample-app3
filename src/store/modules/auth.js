import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import router from "../../router";

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
          "https://firebasestorage.googleapis.com/v0/b/vue-app-test-7fc5d.appspot.com/o/delault%20user%2Fdefalut.png?alt=media&token=61ebfadd-a432-4d79-be92-284f8e449124",
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
};

export default {
  state,
  getters,
  mutations,
  actions,
};
