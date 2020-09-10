<template>
  <div class="chat-container">
    <ul v-if="messages">
      <div
        v-for="(message, index) in messages"
        :style="{ 'text-align': message.isMyMessage ? 'right' : 'left'}"
        :key="index"
      >
        <img v-if="!message.isMyMessage" :src="message.photoURL" alt />

        <li :class="{ 'my-message ': message.isMyMessage }">{{ message.message }}</li>

        <img v-if="message.isMyMessage" :src="message.photoURL" alt />
        <small>{{ message.displayName }}</small>

        <p class="time">{{ message.createdAt | toLocaleString }}</p>
      </div>
    </ul>

    <input type="text" v-model="chatMessage" />
    <button @click="sendMessage">送信</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: {
        isMyMessage: false,
      },
      chatMessage: "",
    };
  },
  computed: {
    messages() {
      return this.$store.getters.messages;
    },
    userId() {
      return this.$store.getters.userData.userId;
    },
  },
  methods: {
    sendMessage() {
      if (!this.chatMessage) {
        alert("Please fill Messages");
        return;
      }
      this.$store.dispatch("sendMessage", this.chatMessage);
    },
  },
  filters: {
    toLocaleString(value) {
      return value.toDate().toLocaleString();
    },
  },
};
</script>

<style scoped>
ul {
  padding: 0;
}

li {
  padding: 5px 8px;
  list-style: none;
  color: white;
  background-color: rgb(140, 141, 141);
  border-radius: 5px;
  margin: 0 5px;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}

small {
  display: block;
}

img {
  width: 40px;
  height: 40px;
  border-radius: 25px;
  vertical-align: middle;
}

.chat-container {
  margin: auto;
  width: 500px;
}

.my-message {
  background-color: rgb(41, 167, 79);
  text-align: right;
}

.time {
  font-size: 13px;
  margin: 0;
  margin-bottom: 8px;
}
</style>