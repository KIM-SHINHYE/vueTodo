<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { todoStore } from '@/stores/newtodo'

const useStore = todoStore();
let inputText:Ref<string> = ref('');

const addTodo = (input: string) => {
  useStore.addTodo(input);
  inputText.value = '';
  console.log(useStore.todoList);
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

<!-- 이전 InputTodo.vue -->
<!-- <script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import { ref, type Ref } from 'vue'
import Modal from './Modal.vue'


type Todo = {
  title: string;
  content: string;
  name: string;
  priority: number;
  date: Date ;
}

let todo: Ref<Todo> = ref({
  title: '',
  content: '',
  name: '',
  priority: 0,
  date: new Date()
})
</script>

<template>
  <h1>할 일</h1>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>제목:</template>
    <div id="inputBox">
      <input type="text" v-model="todo.title">
    </div>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>내용:</template>
    <div id="inputBox">
      <input type="text" v-model="todo.content"/>
    </div>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>작성자:</template>
    <div id="inputBox">
      <input type="text" v-model="todo.name">
    </div>

  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>우선순위:</template>
    <div id="inputBox">
    <input type="number" v-model="todo.priority">
    </div>
  </WelcomeItem> -->
  <!-- <button class="openBtn" @click="register">등록</button> -->
  <!-- todoData로 전달하기 때문에 자식 컴포넌트에선 todoData로 받아야 함 -->
  <!-- <Modal :todoData="todo" />
</template>

<style scoped>
</style> -->


