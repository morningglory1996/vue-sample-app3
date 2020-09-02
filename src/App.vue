<template>
  <div>
    <Header></Header>
    <router-view :number="number" @emit-data="addData">
      <template v-slot:home>
        <p>
          Parent number: {{ number }}
          <button @click="increment">+1 Parent Number</button>
        </p>
        <p>Data from child component: {{ dataFromChild }}</p>
      </template>
    </router-view>
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  data() {
    return {
      number: 0,
      dataFromChild: null,
    };
  },
  methods: {
    increment() {
      this.number += 1;
    },
    addData(data) {
      this.dataFromChild = data;
    },
  },
  components: {
    Header,
  },
};
</script>

<style scoped>
p {
  text-align: center;
}
</style>
