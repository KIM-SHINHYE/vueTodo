<script setup lang="ts">
import { useStore } from '@/stores/todo'
import { onMounted, ref, type Ref } from 'vue';
import axios from 'axios';
import {fetchData} from '@/api/index'

const todoStore = useStore();
let userList :Ref<any[]> = ref([]); // DOM 구축 후 넣어주는 것이므로 ref 선언

// 1.
// const test = async()=>{
// userList.value =  await fetchData()
// }

// 2. 더 좋음
const test =()=>{
fetchData().then((res)=>{
  userList.value =res
  console.log(userList.value)
}).catch((err)=>{
  console.log(err)
})
}
test()

// onMounted(() => {
//   let a = fetchData()
// }) 
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
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
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