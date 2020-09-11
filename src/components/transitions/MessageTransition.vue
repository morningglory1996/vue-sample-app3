<template>
  <transition-group @beforeEnter="beforeEnter" @enter="enter">
    <slot></slot>
  </transition-group>
</template>

<script>
export default {
  methods: {
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
};
</script>