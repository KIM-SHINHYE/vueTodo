import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const todoStore = defineStore('todoStore', () => {
    // 한 화면 안에서 실시간으로 화면에 뿌려주려면 여기 변수를 ref로 감싸줘야 함 - 그리고 그냥 다시 뿌려주기만 하면 됨
    let todoList: Ref<string[]> = ref([]);

    const addTodo = (todo: string) => {
        todoList.value.push(todo);
    }

    const deleteTodo = (idx: number) => {
        todoList.value.splice(idx, 1);
        console.log(todoList.value)
    }

    // const updateTodo = ()
    return {todoList, addTodo, deleteTodo}
})