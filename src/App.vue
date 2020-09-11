<template>
  <div>
    <router-view name="header"></router-view>
    <transition :enter-active-class="activeClass" mode="out-in">
      <router-view name="main" :number="number" @emit-data="addData">
        <template #home="slotProps">
          <p>
            Parent number: {{ number }}
            <button @click="increment">+1 Parent Number</button>
          </p>
          <p>Data from child component: {{ slotProps.message }}</p>
        </template>
      </router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: 0,
      dataFromChild: null,
    };
  },
  computed: {
    activeClass() {
      const template = "animate__animated animate__";
      if (this.$route.path === "/") {
        return template + "fadeInLeft";
      } else {
        return template + "fadeInRight";
      }
    },
  },
  methods: {
    increment() {
      this.number += 1;
    },
    addData(data) {
      this.dataFromChild = data;
    },
  },
};
</script>

<style>
@keyframes slide-in {
  from {
    transform: translateX(100px);
  }

  to {
    transform: translateX(0px);
  }
}
</style>
