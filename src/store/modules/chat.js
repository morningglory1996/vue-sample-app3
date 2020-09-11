import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const state = {
  messages: [],
};

const getters = {
  messages: (state) => state.messages,
};

const mutations = {
  setMessages(state, messages) {
    state.messages = messages;
  },
};

const actions = {
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
          messageId: doc.id,
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
  async removeMessage(context, messageId) {
    try {
      const db = firebase.firestore();
      await db
        .collection("messages")
        .doc(messageId)
        .delete();
    } catch (error) {
      alert(error);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
