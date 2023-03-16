<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;

}
let user: Ref<User> = ref({
  id: 0,
  email: '',
  first_name: '',
  last_name: ''
})

const register = () => {
  let userReq = {
    id: user.value.id,
    email: user.value.email,
    first_name: user.value.first_name,
    last_name: user.value.last_name
  }
  userStore.addUser(userReq);
}

</script>

<template>
  <h1>사용자 등록</h1>
  <div>
    <input type="text" v-model="user.email"><br>
  
    <input type="text" v-model="user.first_name"><br>
    
    <input type="text" v-model="user.last_name"><br>
  
    <button @click="register()">등록</button>
  </div>
</template>
