<template>
  <div class="user-main">
    <h2>USER</h2>
    <router-link
      :to="{ name: 'user-id-detail', params: { id: userId }}"
      active-class="active"
    >User Detail</router-link>
    <router-link
      :to="{ name: 'user-id-profile', params: { id: userId }}"
      active-class="active"
    >Profile Update</router-link>
    <BackTransition>
      <router-view></router-view>
    </BackTransition>
  </div>
</template>

<script>
import BackTransition from "../components/transitions/BackTransition.vue";

export default {
  data() {
    return {
      userId: 1,
      selectedTabs: "UserProfile",
    };
  },
  computed: {},
  components: {
    BackTransition,
  },
};
</script>

<style scoped>
.user-main {
  margin: auto;
  text-align: center;
  background-color: yellowgreen;
}

a {
  margin: 5px;
  color: black;
}

.active {
  font-weight: bold;
}
</style>
