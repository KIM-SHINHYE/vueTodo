<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { useStore } from '@/stores/board'
// 어떤 path인지에 따라서 값을 변경시켜야 하므로 route.path.includes를 통해 어떤 path가 들어왔는지 확인
import { useRoute } from 'vue-router'
import router from '@/router'
const route = useRoute()
const boardStore = useStore()

const dateFormat = (now: Date) => {
  return (
    now.getFullYear() +
    '-' +
    (now.getMonth() + 1 < 9 ? '0' + (now.getMonth() + 1) : now.getMonth()) +
    '-' +
    (now.getDate() < 9 ? '0' + now.getDate() : now.getDate()) +
    ' ' +
    (now.getHours() < 9 ? '0' + now.getHours() : now.getHours()) +
    ':' +
    (now.getMinutes() < 9 ? '0' + now.getMinutes() : now.getMinutes()) +
    ':' +
    (now.getSeconds() < 9 ? '0' + now.getSeconds() : now.getSeconds())
  )
}

// 등록을 해도, 수정을 해도 공유해서 사용할 수 있게 하기 위해 따로 선언
let content: Ref<Content> = ref({
  id: 0,
  title: '',
  content: '',
  writer: '',
  regDate: ''
})

// 태그에 있는 ref를 가져와서 스크립트에서 사용하는 방법
let titleInput: HTMLInputElement | null = null

// 현재는 로컬스토리지 이용하는 거라 상관없지만, api를 쏘게 될 경우는 문제가 생길 수 있으니 onMounted에서 사용하는게 좋음
onMounted(() => {
  if (route.path.includes('edit')) {
    content.value = boardStore.updateContent
  }
})

type Content = {
  id: number
  title: string
  content: string
  writer: string
  regDate: string
}

const registerBoard = () => {
  let i: number = 0
  let keyStrArr = Object.keys(localStorage)
  if (keyStrArr.length !== 0) {
    // localStorage는 key:value 형태라 string으로 들어감
    // string to num
    let keyNumArr = keyStrArr.map(Number)
    content.value.id = i = Math.max(...keyNumArr) + 1
  } else {
    content.value.id = 0
  }
  content.value.regDate = dateFormat(new Date())

  localStorage.setItem(`${i}`, JSON.stringify(content.value))
  // 등록하고 이전 페이지로 돌리는 것이기 때문에, 굳이 input창 지울 필요없음
  // content.value.title = ''
  // content.value.content = ''
  // content.value.writer = ''
  i++

  // 등록하고 이전 페이지로 돌리는 것이기 때문에, 굳이 포커스 이동할 필요없음
  // focusNextInput(titleInput)
  if (route.path.includes('edit')) {
    alert('수정되었습니다.')
  } else {
    alert('등록되었습니다.')
  }
  // router.push({name: 'board-list'});
  router.back()
}

const focusNextInput = (nextRef: any) => {
  nextRef.focus()
}
</script>

<template>
  <div class="container">
    <div class="input-container">
      <h3>제목</h3>
      <input
        ref="titleInput"
        @keypress.enter="focusNextInput($refs.contentInput)"
        type="text"
        class="input-text"
        v-model="content.title"
      />
    </div>
    <div class="input-container">
      <h3>내용</h3>
      <input
        ref="contentInput"
        @keypress.enter="focusNextInput($refs.writerInput)"
        type="text"
        class="input-text"
        v-model="content.content"
      />
    </div>
    <div class="input-container">
      <h3>작성자</h3>
      <!-- key속성 사용할 때 엔터를 치면 먼저 저장하고 그 다음 input창으로 옮겨야 됨 -->
      <input
        ref="writerInput"
        @keypress.enter="registerBoard()"
        type="text"
        class="input-text"
        v-model="content.writer"
      />
    </div>
    <div class="btn">
      <button @click="$router.push({ name: 'board-list' })">이전</button>
      <button @click="registerBoard()">
        {{ $route.path.includes('register') ? '등록' : '수정' }}
      </button>
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
