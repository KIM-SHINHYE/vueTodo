<script setup lang="ts">
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
  </WelcomeItem>
  <!-- <button class="openBtn" @click="register">등록</button> -->
  <!-- todoData로 전달하기 때문에 자식 컴포넌트에선 todoData로 받아야 함 -->
  <Modal :todoData="todo" />
</template>

<style scoped>
</style>