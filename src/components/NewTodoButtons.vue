<script setup lang="ts">
import { todoStore } from '@/stores/newtodo' 
import { computed, ref, watch, type Ref } from 'vue';
const useStore = todoStore();

enum btnState {
    ALL = 'SHOW ALL',
    COMPLETED = 'COMPLETED',
    UNCOMPLETED = 'UNCOMPLETED'
}

const deleteAll = () => {
    useStore.deleteTodoListAll();    
}

const clickedBtn = (state:string) => {
    useStore.changeState(state);
    console.log('useStore.clickstate', useStore.clickstate)
}


// getter 적용
const todoListLen = computed(() => {
    return useStore.todoList.filter((todo) => todo.title != '').length != 0;
})

</script>
<template>
    <div id="btn-container">
        <button id="all-btn" class="btn" @click="clickedBtn(btnState.ALL)" >전체 보기</button>
        <button id="uncompleted-btn" class="btn" @click="clickedBtn(btnState.UNCOMPLETED)" >해야할 일</button>
        <button id="completed-btn" class="btn" @click="clickedBtn(btnState.COMPLETED)" >완료한 일</button>
        <button id="delete-btn" class="btn"  @click="deleteAll" v-if="todoListLen">전체 삭제</button>
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