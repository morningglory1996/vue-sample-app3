<template>
  <div>
    <img :src="userData.image" alt="user-image" />
    <h3>User details</h3>
    <p>Gender: {{ userData.gender }}</p>
    <p>First Name: {{ userData.firstName }}</p>
    <p>Last Name: {{ userData.lastName }}</p>
    <p>Age: {{ userData.age }}</p>
    <p>
      Hobbies:
      <span v-for="hobby in userData.hobbies" :key="hobby">
        {{
        hobby
        }}
      </span>
    </p>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["userData"]),
  },
  methods: {},
};
</script>

<style scoped>
img {
  margin-top: 10px;
  width: 100px;
  height: 100px;
  border-radius: 100px;
}

div {
  background-color: tomato;
}

span {
  margin: 5px;
}
</style>
