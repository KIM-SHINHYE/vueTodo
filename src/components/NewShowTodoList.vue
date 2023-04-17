<script setup lang="ts">
import { todoStore } from '@/stores/newtodo';
import { ref, watch, type Ref, computed } from 'vue';

type Todo = {
  title: string,
  completed: boolean ,
}

const useStore = todoStore();

// const completedTodo = (state:string) => {
//         // console.log('store clickstate.value', useStore.clickstate);
//         // console.log('store state', state)
//         if(state === 'COMPLETED'){
//           useStore.todoList.filter((todo) => todo.completed)
//           console.log(useStore.todoList.filter((todo) => todo.completed))
//             console.log('여기가 컴플릿')

//         } else if(state === 'UNCOMPLETED'){
//           useStore.todoList.filter((todo) => !todo.completed)
//             console.log('여기가 언컴플릿')

//         } else {
//           useStore.todoList
//             console.log('여기가 전체')


//         }
//     }

// completedTodo(useStore.clickstate);
// 만약 이런 식으로 감싸게 되면 순간의 useStore.todoList값을 가져오고 사용하는 것이므로 useStore에서 바로 꺼내서 사용해야 함
// const todoList:Ref<Todo[]> = ref(useStore.todoList);

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
    <div v-for="(todo, idx) in useStore.filteredList(useStore.clickstate)" v-show="todo.title != ''"  :key="idx" :id="`todo_item_${idx}`"  class="li-text" >
      <!-- 텍스트를 label for로 감싸줘야 텍스트를 눌러도 선택됨(대신 이때 for 안써줘도 먹힘), 여기서 v-for사용하기 때문에 오히려 라벨에 이름을 쓰면 적용안됨 -->
      <!-- <div v-if="todo.completed? todo.completed:todo.completed"> -->

        <label >
        <input type="checkbox" v-model="todo.completed" class="li-checkbox-input" @click="isDone(todo)"><span :style="{'text-decoration' : todo.completed ? 'line-through' : 'none'}">{{ todo.title }}</span>
        </label>
        <span >
          <i class="fas fa-trash-alt delete-btn" @click="deleteTodo(idx)"></i>
        </span>
        <!-- {{ useStore.clickstate }}
        {{ useStore.todoList.filter((todo) => !todo.completed) }}
        ::: {{ completedTodo(useStore.clickstate) }} ::: -->
      <!-- </div> -->
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
  font-size: 20px;
  padding-top: 15px;
  padding-left: 17px;
  background-color: #efefef;
}
</style>