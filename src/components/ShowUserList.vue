<script setup lang="ts">
import { useStore } from '@/stores/todo'

const todoStore = useStore();


</script>

<template>
  <h1>할 일 목록</h1>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Email</th>
        <th>Last Name</th>
        <th>First Name</th>
        <th>Avatar</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
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