<script setup lang="ts">
import { useStore } from '@/stores/todo';
import { ref, type Ref } from 'vue';

// 사용하기 전에 선언해줘야 함
const todoStore = useStore();

// interface대신 type을 써도되나, interface는 확장 가능하다는 특징이 있고, type은 확장이 불가능해 구조체 정의하기에 적합
interface Todo {
    title: string;
    content: string;
    name: string;
    priority: number;
    date: Date ;
}

let todo = defineProps({
    // 부모 컴포넌트가 정의한 데이터명
    todoData : {
        type: Object as () => Todo, // Todo타입의 객체를 받겠다는 것
        required: true
    }
})

let isActive: Ref<boolean> = ref(false);

const registerAndShowModal = () => {

    // 이렇게 안해주면 주솟값이 바뀌기 때문에 한 번 더 세팅해주는 것 -  근데 이런 식으로 개발할 일은 잘 없음, 저장하는 곳을 DB로 바라볼 거기 때문
    const request = {
        title: todo.todoData.title,
        content: todo.todoData.content,
        name: todo.todoData.name,
        priority: todo.todoData.priority,
        date: new Date
    }
    todoStore.addTodo(request);

    isActive.value = true;

}

const hideModal = () => {
    isActive.value = false;
}

</script>
<template>
    <div>
        <button @click="registerAndShowModal">등록</button>
        <!-- isActive가 참이면 is-active 클래스를 통해 동적으로 추가하여 모달 활성화 -->
        <div class="modal" :class="{'is-active' : isActive}">
            <div class="modal-background" @click="hideModal"></div>
            <div class="modal-content">
                <p>등록되었습니다</p>
                <p>todo-list에서 확인하세요😄</p>
                <button @click="hideModal">확인</button>
            </div>
            <button class="modal-close is-large" @click="hideModal"></button>
        </div>
    </div>
</template>

<style scoped>
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.modal.is-active {
  display: block;
}

.modal-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  width: 400px;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
  color: black;
  text-align: center;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
}

</style>