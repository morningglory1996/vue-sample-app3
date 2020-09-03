<template>
  <div>
    <h3>User profile</h3>
    <form @submit.prevent="updateProfile">
      <p>
        Gender:
        <label for="male">Male </label>
        <input type="radio" id="male" value="male" v-model="gender" />
        <label for="female">Female </label>
        <input type="radio" id="female" value="female" v-model="gender" />
      </p>

      <p>
        <label for="first-name">First Name: </label>
        <input type="text" id="first-name" v-model="firstName" required />
      </p>

      <p>
        <label for="last-name">Last Name: </label>
        <input type="text" id="last-name" v-model="lastName" required />
      </p>

      <p>
        <label for="age">Age: </label>
        <input type="number" id="age" v-model.number="age" required />
      </p>

      <p>
        <button type="submit" :disabled="!isValid">Update</button>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gender: "male",
      firstName: null,
      lastName: null,
      age: null,
    };
  },
  computed: {
    isValid() {
      if (this.firstName && this.lastName && this.age) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    updateProfile() {
      let profileData = {
        gender: this.gender,
        firstName: this.firstName,
        lastName: this.lastName,
        age: this.age,
      };
      this.$emit("updateProfile", profileData);
    },
  },
};
</script>

<style scoped>
div {
  background-color: teal;
}
</style>
