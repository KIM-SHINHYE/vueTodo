<script setup lang="ts">
import { todoStore } from '@/stores/newtodo' 
import { computed } from 'vue';
const useStore = todoStore();

const deleteAll = () => {
    useStore.deleteTodoListAll();    
}

// getter 적용
const todoListLen = computed(() => {
    return useStore.todoList.filter((todo) => todo.title != '').length != 0;
})

</script>
<template>
    <div id="del-container">
        <button id="delete-btn"  @click="deleteAll" v-if="todoListLen">CLEAR ALL</button>
    </div>

</template>

<style scoped>
#delete-btn {
    height: 50px;
    line-height: 50px;
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: all 0.3s ease-out; 
}
#del-container {
    display: flex;
    justify-content: center;
}

</style>