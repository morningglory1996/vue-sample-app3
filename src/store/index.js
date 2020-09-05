import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

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
  },
  getters: {
    profileDetail: (state) => state.profileData,
  },
  mutations: {
    updateProfile(state, profileData) {
      state.profileData = { ...profileData };
    },
  },
  actions: {
    updateProfile(context, profileData) {
      setTimeout(() => {
        context.commit("updateProfile", profileData);
      }, 5000);
    },
    getUserData({ commit }) {
      axios.get("http://localhost:8000/api/v1/user").then(({ data }) => {
        commit("updateProfile", data);
      });
    },
  },
});
