<template>
  <div class="main">
    <h2>{{ title | upperCase}}</h2>
    <p>Data From Parent Component: {{ number }}</p>
    <input type="text" v-model="message" />
    <button @click="emitData">Emit data to parent component</button>
    <slot name="home" :message="message"></slot>
  </div>
</template>

<script>
export default {
  props: ["number"],
  data() {
    return {
      message: "",
      title: "Home",
    };
  },
  filters: {
    upperCase(value) {
      return value.toUpperCase();
    },
  },
  methods: {
    emitData() {
      this.$emit("emit-data", this.message);
    },
  },
};
</script>

<style scoped>
.main {
  margin: auto;
  text-align: center;
  background-color: deepskyblue;
}
</style>
