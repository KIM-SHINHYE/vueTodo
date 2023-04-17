import { defineStore } from "pinia";
import { computed, ref, type Ref } from "vue";

type Todo ={

    title: string,
    completed: boolean
}

enum btnState {
    ALL = 'SHOW ALL',
    COMPLETED = 'COMPLETED',
    UNCOMPLETED = 'UNCOMPLETED'
}


export const todoStore = defineStore('todoStore', () => {
    // 한 화면 안에서 실시간으로 화면에 뿌려주려면 여기 변수를 ref로 감싸줘야 함 - 그리고 그냥 다시 뿌려주기만 하면 됨
    // 여기에 ref를 쓰면 굳이 computed로 안써줘도 되지만, 상태관리를 위해선 computed를 사용해서 변수를 내보내주는게 좋다.
    let todoList: Ref<Todo[]> = ref([]);
    let clickstate:Ref<string> = ref('SHOW ALL');


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
        todoList.value = []
    }

    const filteredList = (state:string) => {
        // console.log('filteredList')
        // console.log('state', state)
        // console.log('clickstate', clickstate.value)
        let changeList:Todo[] = [];


        if(state === 'COMPLETED'){
            changeList = todoList.value.filter((todo) => todo.completed);
        } 
        else if(state ==='UNCOMPLETED') {
            changeList = todoList.value.filter((todo) => !todo.completed);
        }
        else if(state ==='SHOW ALL'){
            changeList = todoList.value;
        }
        return changeList;
    }

    const changeState = (state:string) => {
        if(state === 'COMPLETED'){
            clickstate.value = 'COMPLETED'
        } 
        else if(state ==='UNCOMPLETED') {
            clickstate.value = 'UNCOMPLETED'
        }
        else if(state ==='SHOW ALL'){
            clickstate.value = 'SHOW ALL'
        }
    }

    // const chageState = () => {
    //     // 처음엔 uncompleted상태여도 보여줘야되는데 버튼은 completed로 보여주고
    //     clickstate.value = clickstate.value === 'COMPLETED' ? 'UNCOMPLETED' : (clickstate.value === 'UNCOMPLETED' ? 'SHOW ALL': 'COMPLETED' );

    //     if(clickstate.value === 'COMPLETED'){
    //         changeList.value = todoList.value.filter((todo) => todo.completed)
    //         console.log('여기가 컴플릿')
    //     console.log('changeList', changeList.value)
    //     console.log('todoList', todoList.value)

    //     } else if(clickstate.value === 'UNCOMPLETED'){
    //         changeList.value = todoList.value.filter((todo) => !todo.completed)
    //         console.log('여기가 언컴플릿')
    //     console.log('changeList', changeList.value)
    //     console.log('todoList', todoList.value)


    //     } else {
    //         changeList.value = todoList.value
    //         console.log('여기가 전체')
    //     console.log('changeList', changeList.value)
    //     console.log('todoList', todoList.value)


    //     }
    // }

    return {todoList, clickstate, addTodo, deleteTodo, deleteTodoListAll, filteredList, changeState}
})