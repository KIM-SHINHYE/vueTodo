<script setup lang="ts">
import { todoStore } from '@/stores/newtodo';
import { watch } from 'vue';

const useStore = todoStore();

// watch(
//   useStore.todoList,
//   (val)=>{
//     setTimeout(() => {
//       document.getElementById(`todo_item_${val.length-1}`)?.classList.remove('li-before')
//     }, 0);
// })

// function deleteTodo(idx:number) {
//   // 지울 때 idx를 보고 지우기 때문에 다음 배열 요소 값에서는 해당 클래스가 지워진 상태, 그래서 다시 더해주는 거
//     document.getElementById(`todo_item_${idx}`)?.classList.add('li-before')
//     setTimeout(() => {
//       useStore.deleteTodo(idx)
//       document.getElementById(`todo_item_${idx}`)?.classList.remove('li-active')
//       document.getElementById(`todo_item_${idx}`)?.classList.remove('li-before')
//     }, 300);
//       document.getElementById(`todo_item_${idx}`)?.classList.add('li-active')
// }

function deleteTodo(idx:number){ 
  useStore.deleteTodo(idx)
}

</script>

<template>
  <!-- v-for 디렉티브는 반복되는 요소를 나타내기 위해 사용되므로, 직접적으로 반복되는 요소를 포함하고 있는 요소에 적용해야 함 -->
  <!-- <ul>
    <li v-for="(todo, idx) in useStore.todoList" :key="idx" :id="`todo_item_${idx}`" class="li-text li-before li-active" >{{ todo }}
      <button class="delete-btn" @click="deleteTodo(idx)">-</button>
    </li>  
  </ul> -->
  <transition-group name="todoList" tag="ul" class="container">
    <li v-for="(todo, idx) in useStore.todoList" :key="idx" :id="`todo_item_${idx}`" class="li-text">{{ todo }}
      <button class="delete-btn" @click="deleteTodo(idx)">-</button>
    </li>  
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

.todoList-move,
.todoList-enter-active,
.todoList-leave-active {
  transition: all 0.5s ease-in-out;
}

.todoList-enter-from,
.todoList-leave-to {
  opacity: 0;
  /* transform: translateX(30px); */
  transform: translate(30px, 0) scaleX(10.01);
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