<template>
  <div class="sign-up-main">
    <h2>Sign up</h2>

    <form @submit.prevent="signUp">
      <p>
        <label for="email">Email:</label>
        <br />
        <input type="email" id="email" v-model="email" required />
      </p>

      <p>
        <label for="text">User name:</label>
        <br />
        <input type="text" id="username" v-model="username" required />
      </p>

      <p>
        <label for="password">Password: (at least 6 characters.)</label>
        <br />
        <input type="password" id="password" v-model="password" required />
      </p>

      <p>
        <label for="confirm-password">Confirm password:</label>
        <br />
        <input
          type="password"
          id="confirm-password"
          v-model.lazy="confirmPassword"
          required
        />
      </p>

      <button type="submit">Sign up</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    };
  },
  computed: {},
  methods: {
    signUp() {
      let userData = {
        email: this.email,
        username: this.username,
        password: this.password,
      };
      this.$store.dispatch("signUp", userData);
    },
  },
};
</script>

<style scoped>
.sign-up-main {
  margin: auto;
  text-align: center;
  background-color: rgb(247, 181, 120);
}

.error-message {
  display: block;
  font-size: 10px;
  color: red;
}
</style>
