import { defineStore } from "pinia";
import { computed } from "vue";

type User = {
    email: string;
    first_name: string;
    last_name: string;

    id: string;
    name: string;
    job: string;
    createdAt: Date;
}

// type InputUser = {
//     id: string;
//     name: string;
//     job: string;
//     createdAt: Date;
// }

// defineStore에 첫번째 파라미터에 고유이름, 두번째 파라미터에 다른 옵션 추가
export const useUserStore = defineStore('userStore', () => {
    let userList: User[] = []
    let createList : User[] = [];

    const addCreateUser = (user: User) => {
        createList.push(user)
    }


    const addUser = (user: User[]) => {
        userList = [...createUsers.value,...user]
        // console.log(users)
        // users = [...createList]
        // console.log(users)
    }
    // const addUser2 = (user: InputUser) => {
    //     users.push(user);
    // }

    // const addUsers = (userList: User[]) => {
    //     users = userList;
    // }
    const createUsers = computed(() => createList);
    const users = computed(() =>userList);
    return {users,createUsers, addUser,addCreateUser}
})