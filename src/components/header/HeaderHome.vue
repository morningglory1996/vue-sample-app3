<template>
  <header>
    <h1 class="header-text">Home Header Component</h1>
    <ul class="nav-list">
      <li class="nav-list-item">
        <router-link to="/" active-class="active" exact>Home</router-link>
      </li>
      <li class="nav-list-item" v-if="!isAuthenticated">
        <router-link to="/sign-up" active-class="active" exact
          >Sign up</router-link
        >
      </li>
      <li class="nav-list-item" v-if="!isAuthenticated">
        <router-link
          to="/login"
          v-if="!isAuthenticated"
          active-class="active"
          exact
          >Login</router-link
        >
      </li>
      <li class="nav-list-item" v-if="isAuthenticated">
        <span @click="logout" class="logout">Logout</span>
      </li>
      <li class="nav-list-item" v-if="isAuthenticated">
        <router-link to="/user" active-class="active">User</router-link>
      </li>
      <li class="nav-list-item" v-if="isAuthenticated">
        <router-link to="/chat" active-class="active">Chat</router-link>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.userData.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  padding: 10px 0;
  text-align: center;
  margin: 0 auto;
  background-color: gray;
}

.header-text {
  font-size: 30px;
}

.nav-list {
  text-align: center;
  padding: 10px 0;
  margin: 0 auto;
}

.nav-list-item {
  list-style: none;
  display: inline-block;
  margin: 0 20px;
  cursor: pointer;
}

.nav-list-item a {
  color: black;
}

.active {
  font-weight: bold;
}
</style>
