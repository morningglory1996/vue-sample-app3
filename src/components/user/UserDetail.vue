<template>
  <div>
    <img :src="userData.photoURL" alt="user-image" />

    <p>
      <input @change="setPhotoData" type="file" />
    </p>

    <p>
      <label for="name">change name:</label>
      <input type="text" id="name" v-model="userName" />
    </p>

    <button @click="updateProfile" :disabled="!isValid">Save</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      photoData: null,
    };
  },
  computed: {
    userData() {
      return this.$store.getters.userData;
    },
    isValid() {
      return !this.userName && !this.photoData ? false : true;
    },
  },
  methods: {
    setPhotoData(data) {
      this.photoData = data.target.files[0];
    },
    updateProfile() {
      const updateData = {
        displayName: this.userName,
        photoURL: this.photoData,
      };
      this.$store.dispatch("updateProfile", updateData);
    },
  },
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
