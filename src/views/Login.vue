<template>
  <div class="login-main">
    <h2>Login</h2>

    <form @submit.prevent="login">
      <p>
        <label for="email">Email:</label>
        <br />
        <input type="email" id="email" v-model="email" />
      </p>

      <p>
        <label for="password">Password:</label>
        <br />
        <input type="password" id="password" v-model="password" />
      </p>

      <button type="submit">Login</button>
    </form>

    <p>or</p>

    <button @click="signInWithGoogle">Login with Google</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      let userData = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch("login", userData);
    },
    signInWithGoogle() {
      this.$store.dispatch("signInWithGoogle");
    },
  },
};
</script>

<style scoped>
.login-main {
  margin: auto;
  text-align: center;
  background-color: cadetblue;
}
</style>
