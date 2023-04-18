<script setup lang="ts">
import { type Ref, ref, onMounted } from 'vue';

type Content = {
    title: string,
    content: string,
    writer: string,
    regDate: Date
}

let contentList:Ref<Content[]> = ref([]);

let length = localStorage.length;

console.log(length)

// onCreate(() => {
//   for(let i = 0; i < localStorage.getItem.length; i++){
//     console.log(localStorage.getItem(`${i}`))
//   }
  
// })
// onMounted(() => {
//   for(let i = 0; i < localStorage.getItem.length; i++){
//     let length = localStorage.getItem(`${i}`);
//     console.log(localStorage.length);

//     // console.log(i)
//     // console.log(length)
//     // console.log('onMounted')
//   }
// })

const deleteContent = () => {}

</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>선택</th>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
          <th>수정/삭제</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input type="checkbox" /></td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>
            <button @click="$router.push({ name: 'board-edit' })">수정</button>
            <button @click="deleteContent">삭제</button>
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
