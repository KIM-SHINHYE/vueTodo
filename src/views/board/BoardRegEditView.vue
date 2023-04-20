<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'

type Content = {
  id: number
  title: string
  content: string
  writer: string
  regDate: string
}

const dateFormat = (now: Date) => {
  return now.getFullYear() + '-' + (now.getMonth()+1 < 9? '0'+ (now.getMonth()+1) : now.getMonth())  +'-' + (now.getDate() < 9? '0': now.getDate());
}

let content: Ref<Content> = ref({
  id: 0,
  title: '',
  content: '',
  writer: '',
  regDate: dateFormat(new Date())
})

const registerBoard = (cont: Content) => {
  let i:number = 0
  let keyStrArr = Object.keys(localStorage);
  if(keyStrArr.length !== 0) {
    // string to num
    let keyNumArr = keyStrArr.map(Number);
    cont.id = i = Math.max(...keyNumArr) + 1;
  } else {
    cont.id = 0
  }
  
  
  localStorage.setItem(`${i}`, JSON.stringify(cont));
  content.value.title = ''
  content.value.content = ''
  content.value.writer = ''
  i++;
  

}

const focusNextInput = (nextRef:any) => {
  nextRef.focus();
}

</script>

<template>
  <br>
  <div class="container">
    <div class="input-container">
      <h3>제목</h3>
      <input ref="titleInput" @keyup.enter="focusNextInput($refs.contentInput)" type="text" class="input-text" v-model="content.title" />
    </div>
    <div class="input-container">
      <h3>내용</h3>
      <input ref= "contentInput" @keyup.enter="focusNextInput($refs.writerInput)" type="text" class="input-text" v-model="content.content" />
    </div>
    <div class="input-container">
      <h3>작성자</h3>
      <input ref="writerInput" @keyup.enter="registerBoard(content); focusNextInput($refs.titleInput)" type="text" class="input-text" v-model="content.writer" />
    </div>
    <div class="btn">
      <button @click="$router.push({ name: 'board-list' })">이전</button>
      <button @click="registerBoard(content); focusNextInput($refs.titleInput)">등록</button>
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
