<template>
  <div>
    <h3>User details</h3>
    <p>Gender: {{ profileData.gender }}</p>
    <p>First Name: {{ profileData.firstName }}</p>
    <p>Last Name: {{ profileData.lastName }}</p>
    <p>Age: {{ profileData.age }}</p>
  </div>
</template>
<script>
export default {
  props: ["profileData"],
};
</script>

<style scoped>
div {
  background-color: tomato;
}
</style>
