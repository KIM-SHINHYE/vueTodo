import { defineStore } from "pinia";
import { computed, ref, type Ref } from "vue";


type User = {
    email: string;
    first_name: string;
    last_name: string;
}

// type InputUser = {
//     id: string;
//     name: string;
//     job: string;
//     createdAt: Date;
// }

// defineStore에 첫번째 파라미터에 고유이름, 두번째 파라미터에 다른 옵션 추가
export const useUserStore = defineStore('userStore', () => {
    let userList: Ref<User[]> = ref([])
    let createList :Ref<User[]> = ref([])

    const addCreateUser = (user: User) => {
        createList.value.push(user)
    }


    const addUser = (user: User[]) => {
        userList.value = [...createList.value,...user]
    }
    
    const createUsers = computed(() => createList.value);
    const users = computed(() =>userList.value);
    return {users,createUsers,addUser,addCreateUser}
})