<template>
  <div class="chat-container">
    <ul v-if="messages">
      <div
        v-for="(message, index) in messages"
        :style="{ 'text-align': message.isMyMessage ? 'right' : 'left'}"
        :key="index"
      >
        <li :class="{ 'my-message ': message.isMyMessage }">{{ message.message }}</li>
        <p class="time">{{ message.createdAt.toDate().toLocaleString() }}</p>
        <br />
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
      value.toDate().toLocaleString();
    },
  },
};
</script>

<style scoped>
ul {
  padding: 0;
}

li {
  margin-top: 5px;
  padding: 5px;
  list-style: none;
  color: white;
  background-color: rgb(140, 141, 141);
  border-radius: 15px;
  display: inline-block;
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
}
</style>