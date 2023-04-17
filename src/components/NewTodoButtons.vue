<script setup lang="ts">
import { todoStore } from '@/stores/newtodo' 
import { computed, ref, watch } from 'vue'
import { btnState } from '@/types/newtodoTypes'
const useStore = todoStore();

const deleteAll = () => {
    useStore.deleteTodoListAll();    
}

const clickedBtn = () => {
    if( useStore.clickstate == btnState.ALL){
        useStore.changeState(btnState.COMPLETED);
    } else if( useStore.clickstate == btnState.COMPLETED){
        useStore.changeState(btnState.UNCOMPLETED);
    }else{
        useStore.changeState(btnState.ALL);
    }
}


// getter 적용
const todoListLen = computed(() => {
    return useStore.todoList.filter((todo) => todo.title != '').length != 0;
})

const todoState = computed(() => {
    return useStore.clickstate==btnState.ALL? '완료한 일': useStore.clickstate==btnState.COMPLETED?"해야 할 일":"전체 보기";
})

</script>
<template>
    <div id="btn-container">
        <button v-if="todoListLen" id="all-btn" class="btn" @click="clickedBtn()"  >
        {{ todoState }}</button>

        <button v-if="todoListLen" id="delete-btn" class="btn"  @click="deleteAll" >전체 삭제</button>
    </div>

</template>

<style scoped>
.btn {
    height: 50px;
    line-height: 50px;
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: all 0.3s ease-out; 
}
#btn-container {
    display: flex;
    justify-content: space-around;
}

</style>