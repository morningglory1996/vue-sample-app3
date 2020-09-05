<template>
  <div>
    <h3>User details</h3>
    <p>Gender: {{ profileDetail.gender }}</p>
    <p>First Name: {{ profileDetail.firstName }}</p>
    <p>Last Name: {{ profileDetail.lastName }}</p>
    <p>Age: {{ profileDetail.age }}</p>
    <p>
      Hobbies:
      <span v-for="hobby in profileDetail.hobbies" :key="hobby">{{
        hobby
      }}</span>
    </p>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["profileDetail"]),
  },
};
</script>

<style scoped>
div {
  background-color: tomato;
}

span {
  margin: 5px;
}
</style>
