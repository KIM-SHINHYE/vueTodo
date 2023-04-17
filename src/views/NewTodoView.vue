<script setup lang="ts">
import NewInputTodo from '@/components/NewInputTodo.vue';
import NewShowTodoList from '@/components/NewShowTodoList.vue'
import NewTodoButtons from '@/components/NewTodoButtons.vue';
</script>
<template>
    <div id="todo-container">
        <br>
        <NewInputTodo/>
        <br>
        <NewShowTodoList/>
        <br>
        <NewTodoButtons/>
    </div>
</template>