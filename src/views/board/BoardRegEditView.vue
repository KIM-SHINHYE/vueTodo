<script setup lang="ts">
import { ref, type Ref } from 'vue'

type Content = {
  id: number
  title: string
  content: string
  writer: string
  regDate: Date
}

let content: Ref<Content> = ref({
  id: 0,
  title: '',
  content: '',
  writer: '',
  regDate: new Date()
})

let i:Ref<number> = ref(0)
const registerBoard = (cont: Content) => {
    // let i:Ref<number> = ref(localStorage.length== 0 ? 0) ;
  console.log(cont)

  console.log('iiii------',i);
  cont.id = i.value
  localStorage.setItem(`${i.value}`, JSON.stringify(cont));
  content.value.title = ''
  content.value.content = ''
  content.value.writer = ''
  i.value++;

}
</script>

<template>
  <div class="container">
    <div class="input-container">
      <h3>제목</h3>
      <input type="text" class="input-text" v-model="content.title" />
    </div>
    <div class="input-container">
      <h3>내용</h3>
      <input type="text" class="input-text" v-model="content.content" />
    </div>
    <div class="input-container">
      <h3>작성자</h3>
      <input type="text" class="input-text" v-model="content.writer" />
    </div>
    <div class="btn">
      <button @click="$router.push({ name: 'board-list' })">이전</button>
      <button @click="registerBoard(content)">등록</button>
    </div>
  </div>
</template>

<style scoped>
.input-container {
  display: flex;
}
h3 {
  width: 15%;
  line-height: 50px;
  text-align: center;
}

.btn {
  /* text-align: center; */
  display: flex;
  justify-content: center;
}

button {
  /* height: 50px;
  border-radius: 5px;
  border: none;
  width: 15%;
  background: linear-gradient(to right, #62eac6, #32cee6);
  color: #fff;
  font-size: 20px; */
  margin-left: 10px;
}

.input-text {
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  border: none;
}
</style>
