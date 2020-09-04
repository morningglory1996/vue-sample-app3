<template>
  <div>
    <h3>User profile</h3>
    <form @submit.prevent="updateProfile">
      <div>
        Gender:
        <label for="male">Male</label>
        <input type="radio" id="male" value="male" v-model="gender" />
        <label for="female">Female</label>
        <input type="radio" id="female" value="female" v-model="gender" />
      </div>

      <p>
        <label for="first-name">First Name:</label>
        <input type="text" id="first-name" v-model="firstName" required />
      </p>

      <p>
        <label for="last-name">Last Name:</label>
        <input type="text" id="last-name" v-model="lastName" required />
      </p>

      <p>
        <label for="age">Age:</label>
        <input type="number" id="age" v-model.number="age" required />
      </p>

      <p>
        <label for="hobby">Hobby:</label>
        <input type="text" id="hobby" v-model="hobby" />
        <button @click.prevent="addHobbies">Add</button>
      </p>

      <p>
        Hobbies:
        <transition-group name="fade">
          <span v-for="(h, index) in hobbies" :key="h">
            {{ h }}
            <button @click.prevent="removeHobby(index)">Remove</button>
          </span>
        </transition-group>
      </p>

      <div>
        <button type="submit" :disabled="!isValid">Update</button>
      </div>
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
      hobby: null,
      hobbies: [],
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
        hobbies: this.hobbies,
      };
      this.$emit("updateProfile", profileData);
    },
    addHobbies() {
      if (this.hobby) {
        this.hobbies.push(this.hobby);
      }
      this.hobby = "";
    },
    removeHobby(index) {
      this.hobbies.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.3s;
}

.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-leave-to {
  opacity: 0;
}

div {
  background-color: teal;
}
</style>
