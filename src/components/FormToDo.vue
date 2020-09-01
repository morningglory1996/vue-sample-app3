<template>
  <b-container>
    <b-input-group>
      <b-form-input type="text" v-model="value" />
      <b-input-group-append>
        <b-button variant="info" @click="addToDoChild">ボタン</b-button>
      </b-input-group-append>
    </b-input-group>
  </b-container>
</template>

<script>
export default {
  name: "FormToDo",
  data() {
    return {
      value: "",
    };
  },
  methods: {
    addToDoChild() {
      this.$emit("addToDoChild", this.value);
      this.value = "";
    },
  },
};
</script>

<style scoped>
</style>