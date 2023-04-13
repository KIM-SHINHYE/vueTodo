<script setup lang="ts">
import { todoStore } from '@/stores/newtodo';
import { watch } from 'vue';

const useStore = todoStore();
let length = useStore.todoList.length
watch(useStore.todoList,(val)=>{
  if(val.length> length){
    setTimeout(() => {
    document.getElementById(val[val.length-1])?.classList.add('li-active')
    length = val.length
  }, 10);
  }
})

function deleteTodo(todo: string,idx:number) {
    document.getElementById(todo)?.classList.remove('li-active')
    setTimeout(() => {
      useStore.deleteTodo(idx)
    }, 300);
}

</script>

<template>
  <ul v-for="(todo, idx) in useStore.todoList" :key="idx">
    <li class="li-text" :id="`${todo}`">{{ todo }}<button class="delete-btn" @click="deleteTodo(todo,idx)">-</button></li>
    
  </ul>
</template>

<style scoped>
.li-text {
  /* margin-right: 10px; */
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
  width: 100%;
  padding-left: 20px;
  margin: 8px 0;
  border: none;
  background-color: #fff;
  list-style-type: none;
  color: black;
  overflow: hidden;
  left: 110%;
  transition: all 0.3s ease-in-out;
}

.li-active{
  left:0%
}

ul{
  padding: 0;
}

.delete-btn{
  float: right;
  height: 100%;
  width: 10%;
  border: none;
  color: red;
  font-size: 40px;
}
</style>