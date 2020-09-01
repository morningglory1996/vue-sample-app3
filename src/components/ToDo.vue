<template>
  <div class="main">
    <h1>Todoリスト</h1>
    <FormToDo @addToDoChild="addToDoParent"></FormToDo>
    <ToDoList
      :toDos="toDos"
      @removeToDoChild="removeToDoParent"
      @completeToDoChild="completeToDoParent"
    ></ToDoList>
  </div>
</template>

<script>
import FormToDo from "./FormToDo";
import ToDoList from "./ToDoList";

export default {
  name: "ToDo",
  data() {
    return {
      toDos: [],
    };
  },
  methods: {
    addToDoParent(value) {
      if (value) {
        this.toDos.unshift({ text: value, complete: false });
      }
    },
    removeToDoParent(index) {
      this.toDos.splice(index, 1);
    },
    completeToDoParent(index) {
      this.toDos[index].complete = !this.toDos[index].complete;
    },
  },
  components: {
    FormToDo,
    ToDoList,
  },
};
</script>

<style scoped>
.main {
  margin: auto;
  text-align: center;
  padding-top: 20px;
}
</style>
