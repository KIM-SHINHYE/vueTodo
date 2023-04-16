import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

type Todo ={

    title: string,
    completed: boolean
}

export const todoStore = defineStore('todoStore', () => {
    // 한 화면 안에서 실시간으로 화면에 뿌려주려면 여기 변수를 ref로 감싸줘야 함 - 그리고 그냥 다시 뿌려주기만 하면 됨
    // 여기에 ref를 쓰면 굳이 computed로 안써줘도 되지만, 상태관리를 위해선 computed를 사용해서 변수를 내보내주는게 좋다.
    let todoList: Ref<Todo[]> = ref([]);

    const addTodo = (todo: Todo) => {

        todoList.value.push({
            title: todo.title,
            completed: todo.completed
        });
    }

    const deleteTodo = (idx: number) => {
        todoList.value.splice(idx, 1);
        todoList.value.splice(idx, 0, {title:'', completed:false});

    }

    const deleteTodoListAll = () => {
        console.log('before', todoList.value)

        todoList.value = []
        console.log('after', todoList.value)
    }
    return {todoList, addTodo, deleteTodo, deleteTodoListAll}
})