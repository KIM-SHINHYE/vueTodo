<script setup lang="ts">
import router from '@/router'
import { useStore } from '@/stores/board'
import { type Ref, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const boardStore = useStore()

type Content = {
  id: number
  title: string
  content: string
  writer: string
  regDate: string
}

let content: Ref<Content> = ref({
  id: 0,
  title: '',
  content: '',
  writer: '',
  regDate: ''
})

// 현재 id
let idList = Object.keys(localStorage).sort((a, b) => Number(a) - Number(b))
console.log(idList)
const length = idList.length

let findIdx: string | null = ''
let findItem: string | null = ''
let showPrevBtn: boolean = false
let showNextBtn: boolean = false

onMounted(() => {
  content.value = boardStore.updateContent
  let currentIdx = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  if(currentIdx <= '0'){
    showPrevBtn = true
  } 
  else if(currentIdx == idList[length-1]){
    showNextBtn = true
  }
})

const showPrevContent = () => {
  if(showNextBtn) {
    showNextBtn = !showNextBtn;
  }
  let currentIdx = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  let prevIdx = idList.indexOf(currentIdx) - 1

  findIdx = idList[prevIdx]
  findItem = localStorage.getItem(idList[prevIdx])
  if (findItem) {
    content.value = JSON.parse(findItem)
  }
  if(Number(findIdx) <= 0) {
    showPrevBtn = true;
  } 
  router.push({ name: 'board-detail', params: { id: findIdx } })
}

const showNextContent = () => {
  if(showPrevBtn){
    showPrevBtn = !showPrevBtn
  }
  let currentIdx = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

  let nextIdx = idList.indexOf(currentIdx) + 1

  findIdx = idList[nextIdx]
  findItem = localStorage.getItem(idList[nextIdx])
  if (findItem) {
    content.value = JSON.parse(findItem)
  }
  if(idList[length-1] == findIdx) {
    showNextBtn = true;
  } 
  router.push({ name: 'board-detail', params: { id: findIdx } })
}

// 현재 페이지가 board-detail이라서 다른 글로 이동할 때도 :id만 바뀐 board-detail페이지이기 때문에 새로고침이 따로 없음. 그래서 값을 업뎃 시켜줘야 한다고 했나,,?

</script>

<template>
  <div class="container">
    <div class="p-container">
      <h3>id</h3>
      <p>{{ content.id }}</p>
    </div>
    <div class="p-container">
      <!-- 만약, path에 parameter를 받는게 없으먄 해당 페이지에서 route를 통해 param을 전달받을 수 없음 -->
      <h3>제목</h3>
      <p>{{ content.title }}</p>
    </div>
    <div class="p-container">
      <h3>내용</h3>
      <p>{{ content.content }}</p>
    </div>
    <div class="p-container">
      <h3>작성자</h3>
      <p>{{ content.writer }}</p>
    </div>
    <div class="p-container">
      <h3>작성일</h3>
      <p>{{ content.regDate }}</p>
    </div>
    <br />
    <div class="contentBtn">
      <button @click="showPrevContent" :disabled="showPrevBtn">이전 글</button>
      <!-- $router.back() 사용하면 바로 전으로 돌아가게 되는데, 이전 글/다음 글 버튼 누른 만큼 목록 버튼을 눌러야 목록으로 돌아갈 수 있음 -->
      <button @click="$router.push({name: 'board-list'})">목록</button>
      <button @click="showNextContent" :disabled="showNextBtn">다음 글</button>
      <!-- <button class="editBtn">수정</button>
      <button class="editBtn">삭제</button> -->
    </div>
  </div>
</template>

<style scoped>
.p-container {
  display: flex;
}

h3 {
  width: 15%;
  line-height: 50px;
  text-align: center;
  border: 1px solid white;
}

p {
  line-height: 50px;
  width: 85%;
  border: 1px solid white;
  padding-left: 10px;
}

.contentBtn {
  /* text-align: center; */
  display: flex;
  justify-content: center;
}

.editBtn {
  /* display: flex; */
  justify-content: right;

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
