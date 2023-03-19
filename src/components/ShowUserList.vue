<script setup lang="ts">
// import { useStore } from '@/stores/todo'
import { onMounted, ref, type Ref } from 'vue';
import axios from 'axios';
import {fetchData} from '@/api/index' // export한 함수명 써주기

// const todoStore = useStore();
// 먼저 화면이 렌더링 되고 script가 실행되면서 데이터가 매핑되는거 근데 렌더링되는 시점엔 []로 세팅이 되고 호출하면서 데이터가 세팅되는거기 때문에 ref선언해줘야 함
let userList :Ref<any[]> = ref([]); // DOM 구축 후 넣어주는 것이므로 ref 선언

// ---------------------------
// 1.
// const userData = async()=>{
// userList.value =  await fetchData()
// }

// 2. 이 방식으로 많이 씀
const userData =()=>{
  fetchData().then((res)=>{
    userList.value = res
    console.log(userList.value)
  }).catch((err)=>{
    console.log(err)
  })
}
userData()

// ---------------------------

// TODO: 질문: 우리 프로젝트에선 아래처럼 썼던데 2번 방식이 좋다고 했으면서!
// onMounted(async () => {
//   try {
//     const response = await axios.get('https://reqres.in/api/users?page=2');
//     userList.value = response.data.data;
//     console.log(response.data.data)

//   } catch(err) {
//     console.log(err)
//   }
// }) 

// TODO: baseUrl 적용시키기, 페이징처리나 무한스크롤 해서 값이 있으면 계속 보여주기, 등록, 삭제, 수정 다 해보기

</script>

<template>
  <h1>할 일 목록</h1>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Email</th>
        <th>Last Name</th>
        <th>First Name</th>
        <th>Avatar</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for=" (user, idx) in userList" :key="idx">
        <td>{{ user.id}}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.last_name }}</td>
        <td>{{ user.first_name }}</td>
        <td><img :src="user.avatar" alt="" srcset=""></td>
      </tr>
    </tbody>
  </table>
</template>

<style>
@media (min-width: 1024px) {
  .cal {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

th, td{
  margin: 0 auto;
  border: 1px solid black;
}
</style>