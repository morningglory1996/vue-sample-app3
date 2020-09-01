<template>
  <b-container>
    <b-row class="mt-2" v-for="(toDo, index) in toDos" :key="index">
      <b-col cols="8" :class="['text-left', {line: toDo.complete}]">
        <h5>{{ toDo.text }}</h5>
      </b-col>
      <b-col cols="4" class="text-right">
        <b-button
          @click="completeToDoChild(index)"
          :variant="toDo.complete ? 'success' : 'danger'"
        >{{ toDo.complete ? '完了' : '未完了' }}</b-button>
        <b-button style="margin-left: 5px;" @click="removeToDoChild(index)">削除</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: {
    toDos: {
      type: Array,
      required: true,
    },
  },
  methods: {
    removeToDoChild(index) {
      this.$emit("removeToDoChild", index);
    },
    completeToDoChild(index) {
      this.$emit("completeToDoChild", index);
    },
  },
};
</script>

<style scoped>
.line {
  text-decoration: line-through;
}
</style>