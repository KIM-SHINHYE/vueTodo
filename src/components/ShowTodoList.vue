<script setup lang="ts">
import { useStore } from '@/stores/todo'

const todoStore = useStore();
type Todo = {
    title: string;
    content: string;
    name: string;
    priority: number;
    date: Date | null;
}

let orderedTodoList: Todo[] = todoStore.todoList.sort((a,b) => a.priority - b.priority);

</script>

<template>
  <h1>할 일 목록</h1>
  <table>
    <thead>
      <tr>
        <th>번호</th>
        <th>제목</th>
        <th>내용</th>
        <th>작성자</th>
        <th>우선순위</th>
        <th>날짜</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(todo, idx) in orderedTodoList" :key="idx"> <!-- :key는 웬만하면 써주는 편이 좋다-->
        <td>{{ idx+1 }}</td>
        <td>{{ todo.title }}</td>
        <td>{{ todo.content }}</td>
        <td>{{ todo.name }}</td>
        <td>{{ todo.priority }}</td>
        <td>{{ todo.date }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style>
@media (min-width: 1024px) {
  .cal {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

th, td{
  margin: 0 auto;
  border: 1px solid black;
}
</style>