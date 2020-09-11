<template>
  <div>
    <img :src="userData.photoURL" alt="user-image" />

    <p>
      <input
        @change="setPhotoData"
        type="file"
        accept=".png, .jpg, .jpeg"
        id="file"
      />
      <button @click="removePhotoData" v-if="photoData">clear</button>
    </p>

    <p>
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
    setPhotoData(e) {
      if (e.target.files[0].size > 3000000) {
        alert("File size exceeds the limit.");
        e.currentTarget.value = "";
        return;
      }
      this.photoData = e.target.files[0];
    },
    removePhotoData() {
      this.$el.querySelector("#file").value = "";
      this.photoData = "";
    },
    async updateProfile() {
      const vm = this;
      const updateData = {
        vm: vm,
        displayName: this.userName,
        photoURL: this.photoData,
      };
      await this.$store.dispatch("updateProfile", updateData);
      this.userName = "";
      this.removePhotoData();
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
