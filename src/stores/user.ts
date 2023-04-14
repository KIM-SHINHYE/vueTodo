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
    let users: Ref<User[]> = ref([])
    let createUsers :Ref<User[]> = ref([])

    const addCreateUser = (user: User) => {
        createUsers.value.push(user)
    }


    const addUser = (user: User[]) => {
        users.value = [...createUsers.value,...user]
    }
    
    // 여기서 computed로 감싸줘야 좋음
    // const createUsers = computed(() => createList.value);
    // const users = computed(() =>userList.value);
    return {users,createUsers,addUser,addCreateUser}
})