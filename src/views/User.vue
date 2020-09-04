<template>
  <div class="user-main">
    <h2>USER</h2>
    <button @click="selectedTabs = 'UserProfile'">User Profile</button>
    <button @click="selectedTabs = 'UserDetail'">User Detail</button>
    <UserProfile v-show="selectedTabs === 'UserProfile'" @updateProfile="addProfileData"></UserProfile>
    <UserDetail :profileData="profileData" v-show="selectedTabs === 'UserDetail'"></UserDetail>
  </div>
</template>

<script>
import UserProfile from "../components/user/UserProfile";
import UserDetail from "../components/user/UserDetail";

export default {
  data() {
    return {
      selectedTabs: "UserProfile",
      profileData: {
        gender: null,
        firstName: "",
        lastName: "",
        age: null,
        hobbies: [],
      },
    };
  },
  computed: {},
  methods: {
    addProfileData(data) {
      this.profileData = { ...data };
    },
  },
  components: {
    UserProfile,
    UserDetail,
  },
};
</script>

<style scoped>
.user-main {
  margin: auto;
  text-align: center;
  background-color: yellowgreen;
}
</style>
