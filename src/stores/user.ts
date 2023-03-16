import { defineStore } from "pinia";

type User = {
    email: string;
    first_name: string;
    last_name: string;
}

// defineStore에 첫번째 파라미터에 고유이름, 두번째 파라미터에 다른 옵션 추가
export const useUserStore = defineStore('userStore', () => {
    let users: User[] = []

    const addUser = (user: User) => {
        users.push(user)
    }
    return {users, addUser}
})