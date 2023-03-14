import { defineStore } from "pinia";

type Todo = {
    title: string;
    content: string;
    name: string;
    priority: number;
    date: Date | null;
}

// userStore란 변수를 사용하기 때문에 다른 곳에서 사용할 때 useStore로 import 해야 함
export const useStore = defineStore('todoContent', () => {
    // state선언
    let todoList : Todo[] = [];

    const addTodo = (todo : Todo)=>{
        todoList.push(todo)
    }

    return {todoList, addTodo} 
})
