<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import { ref, type Ref } from 'vue'
import { useStore } from '@/stores/todo'

const todoStore = useStore();

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

const register = () => {
  const date = new Date
  // 이렇게 안해주면 주솟값이 바뀌기 때문에 한 번 더 세팅해주는 것 -  근데 이런 식으로 개발할 일은 잘 없음, 저장하는 곳을 DB로 바라볼 거기 때문
  const request = {
    title: todo.value.title,
    content: todo.value.content,
    name: todo.value.name,
    priority: todo.value.priority,
    date: date
  }
  todoStore.addTodo(request);
}
</script>

<template>
  <h1>할 일</h1>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>제목</template>
    <input type="text" v-model="todo.title">
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>내용</template>
    <textarea v-model="todo.content"></textarea>
    

  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>작성자</template>
    <input type="text" v-model="todo.name">

  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>우선순위</template>
    <input type="number" v-model="todo.priority">
  </WelcomeItem>
  <button @click="register()">등록</button>
</template>
