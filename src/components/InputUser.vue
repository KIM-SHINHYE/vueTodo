<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useUserStore } from '@/stores/user';
import axios from 'axios';

const userStore = useUserStore();

type User = {
  // id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  // name: string;
  // job: string;
  // createdAt: Date;
}

let user: Ref<User> = ref({
  // id: 0,
  email: '',
  first_name: '',
  last_name: '',
  avatar:''
  // name:'',
  // job: '',
  // createdAt: new Date()
})

const registerUser = () => {
  try {
    axios.post('https://reqres.in/api/users', user.value)
    .then(function(res){
      userStore.addCreateUser(res.data);
      if(res.status == 201){
        alert(JSON.stringify(res.data));
      }
    })
  } catch(error){
    console.log(error);
  }
}

</script>

<template>
  <h1>사용자 등록</h1>
  <form @submit.prevent="registerUser">
    이메일 : <input type="text" v-model="user.email"><br>
    이름 : <input type="text" v-model="user.first_name"><br>
    성 : <input type="text" v-model="user.last_name"><br>
    <!-- 이메일: <input type="text" v-model="user.email"><br>
  
    이름: <input type="text" v-model="user.first_name"><br>
    
    성: <input type="text" v-model="user.last_name"><br> -->
  
    <button type="submit">등록</button>
  </form>
</template>
