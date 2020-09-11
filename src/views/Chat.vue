<template>
  <div>
    <div class="chat-container">
      <ul v-if="messages">
        <transition-group @beforeEnter="beforeEnter" @enter="enter">
          <div
            v-for="message in messages"
            :style="{ 'text-align': message.isMyMessage ? 'right' : 'left'}"
            :key="message.messageId"
          >
            <img v-if="!message.isMyMessage" :src="message.photoURL" />

            <li
              @click="removeMessage(message.isMyMessage, message.messageId)"
              :class="{ 'my-message ': message.isMyMessage }"
            >{{ message.message }}</li>

            <img v-if="message.isMyMessage" :src="message.photoURL" />
            <small>{{ message.displayName }}</small>

            <p class="time">{{ message.createdAt | toLocaleString }}</p>
          </div>
        </transition-group>
      </ul>
    </div>

    <div class="form">
      <input type="text" v-model="chatMessage" />
      <button @click="sendMessage">送信</button>
    </div>
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
      this.chatMessage = "";
    },
    removeMessage(isMyMessage, messageId) {
      if (!isMyMessage) return;
      const result = confirm("Do you remove this message ?");
      if (!result) return;
      this.$store.dispatch("removeMessage", messageId);
    },
    beforeEnter(el) {
      el.style.transform = "scale(0)";
    },
    enter(el, done) {
      let scale = 0;
      const interval = setInterval(() => {
        el.style.transform = `scale(${scale})`;
        scale += 0.1;
        if (scale > 1) {
          clearInterval(interval);
          done();
        }
      }, 10);
    },
  },
  updated() {
    const container = this.$el.querySelector(".chat-container");
    container.scrollTop = container.scrollHeight;
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
  background-color: rgb(140, 141, 141);
  border-radius: 5px;
  margin: 0 5px;
  display: inline-block;
  vertical-align: middle;
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
  margin: 10px auto;
  height: 600px;
  background-color: rgb(90, 141, 143);
  padding: 0 8px;
  overflow-y: scroll;
  color: white;
}

.my-message {
  background-color: rgb(41, 167, 79);
  cursor: pointer;
  text-align: right;
}

.time {
  font-size: 10px;
  margin: 0;
  margin-bottom: 8px;
}

.form {
  text-align: center;
  width: 500px;
  margin: auto;
}

.form input {
  width: 85%;
}
</style>