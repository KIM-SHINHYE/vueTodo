<script setup lang="ts">
import { update } from 'lodash';
import { type Ref, ref, computed, watch } from 'vue';

type Content = {
    id: number,
    title: string,
    content: string,
    writer: string,
    regDate: Date
}

const contents:Ref<Content[]> = ref([]);

// const contentList = computed(() => {

// })
let length = localStorage.length;


// watch(
//   () => localStorage,

//   ()=>{
//       const updatedContents = [];

//       for(let i = 0; i < localStorage.length ; i++){
//         let strArr = localStorage.getItem(i.toString());
//         if(strArr != null) {
//           updatedContents.push(JSON.parse(strArr));
//         }
//       }
//       contents.value = updatedContents;
//     }
// )


// for(let i = 0; i < localStorage.length ; i++){
//   let strArr = localStorage.getItem(i.toString());
//   if(strArr != null) {
//     contents.value.push(JSON.parse(strArr));
//   }
// }



console.log(length)

const deleteContent = (i:number) => {
  console.log('delete');
  localStorage.removeItem(i.toString());
}

</script>

<template>
  <br>
  <div>
    <table>
      <thead>
        <tr>
          <th>선택</th>
          <th>번호</th>
          <th>id</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
          <th>수정/삭제</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(content, idx) in contents" :key="idx">
          <td><input type="checkbox" /></td>
          <td>{{ idx + 1 }}</td>
          <td>{{ content.id }}</td>
          <td>{{ content.title }}</td>
          <td>{{ content.writer }}</td>
          <td>{{ content.regDate }}</td>
          <td>
            <button @click="$router.push({ name: 'board-edit' })">수정</button>
            <button @click="deleteContent(content.id)">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <div class="btn">
      <button @click="$router.push({ name: 'board-register' })">등록</button>
      <!-- <button @click="deleteContent">삭제</button> -->
    </div>
  </div>
</template>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: hsla(160, 100%, 37%, 1);
}

.btn {
  float: right;
}
</style>
