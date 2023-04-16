<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { todoStore } from '@/stores/newtodo'

type Todo = {
  title: string, 
  completed: boolean,
  deleted: boolean
}

const useStore = todoStore();
let inputText:Ref<string> = ref('');
let todo:Todo = {
  title: '',
  completed: false,
  deleted: false
}; 

const addTodo = (input: string) => {
  if(input != ''){
    todo.title = input;

    useStore.addTodo(todo);
  }
  inputText.value = '';
}

</script>
<template>
  <div id="input-container">
    <h1>TODO</h1>
    <div id="input-text-container">
      <input type="text" id="input-text" v-model="inputText" @keyup.enter="addTodo(inputText)" >
      <button id="input-btn" @click="addTodo(inputText)">+</button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}

#input-text-container {
  display: flex;
  align-items: center;
}

#input-text {
  height: 50px;
  line-height: 50px;
  border-top-left-radius:  5px;
  border-bottom-left-radius:  5px;
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  border: none;

}

#input-btn {
  /* flex: 0;; */
  height: 50px;
  border-top-right-radius:  5px;
  border-bottom-right-radius:  5px;
  border: none;
  width: 10%;
  background: linear-gradient(to right, #62EAC6, #32CEE6);
  color: #fff;
  font-size: 30px;

}
</style>
