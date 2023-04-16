<script setup lang="ts">
import { todoStore } from '@/stores/newtodo';

type Todo = {
  title: string,
  completed: boolean ,
}

const useStore = todoStore();

const todoList:Todo[] = useStore.todoList;

function deleteTodo(idx:number){ 
  useStore.deleteTodo(idx)
}


const isDone = (todo:Todo) => {
  todo.completed = !todo.completed;
}
</script>

<template>
  <!-- v-for 디렉티브는 반복되는 요소를 나타내기 위해 사용되므로, 직접적으로 반복되는 요소를 포함하고 있는 요소에 적용해야 함 -->
  <!-- 여기서 왜 v-if하면 값이 안나오냐고 (v-show + title != ''일경우만 나옴)-->
  <transition-group name="todoList" tag="ul" class="container">
    <div v-for="(todo, idx) in todoList" v-show="todo.title != ''"  :key="idx" :id="`todo_item_${idx}`"  class="li-text" >
      <!-- 텍스트를 label for로 감싸줘야 텍스트를 눌러도 선택됨(대신 이때 for 안써줘도 먹힘), 여기서 v-for사용하기 때문에 오히려 라벨에 이름을 쓰면 적용안됨 -->
      
      <label >
      <input type="checkbox" class="li-checkbox-input" @click="isDone(todo)"><span :style="{'text-decoration' : todo.completed ? 'line-through' : 'none'}">{{ todo.title }}</span>
      </label>
      <button class="delete-btn" @click="deleteTodo(idx)">-</button>
    </div>  
  </transition-group>
</template>

<style scoped>
.container {
  position: relative;
  padding: 0;
}

.li-text {
  /* 글자를 가운데 정렬하려면 height, line-height를 같은 값으로 가져가기 */
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
  left:0%;
}

.li-checkbox-input {
  margin-right: 10px;
}

.todoList-move,
.todoList-enter-active,
.todoList-leave-active {
  transition: all 0.5s ease-in-out;
}

.todoList-enter-from,
.todoList-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.todoList-leave-active {
  position: absolute;
}


/* 화면 안에서 안보이게  */
/* .li-before{
  left:100%;
}

.li-active{
  transition: all 0.3s ease-in-out;
} */

ul{
  padding: 0;
  overflow: hidden;
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