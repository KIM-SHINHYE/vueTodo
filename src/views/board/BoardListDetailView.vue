<script setup lang="ts">
import { useStore } from '@/stores/board';
import { type Ref, ref, onMounted } from 'vue';
// import { useRoute } from 'vue-router';

// const route = useRoute();
const boardStore = useStore();

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

// let contentId = route.params.id;

onMounted(() => {
  content.value = boardStore.updateContent;
})



</script>

<template>
  <div class="container">
    <div class="input-container">
      <!-- 만약, path에 parameter를 받는게 없으먄 해당 페이지에서 route를 통해 param을 전달받을 수 없음 -->
      <h3>제목</h3>
      <p>{{ content.title}}</p>
    </div>
    <div class="input-container">
      <h3>내용</h3>
      <p>{{ content.content }}</p>
    </div>
    <div class="input-container">
      <h3>작성자</h3>
      <p>{{content.writer }}</p>
    </div>
    <div class="btn">
      <button>이전 글</button>
      <button @click="$router.back()">목록</button>
      <button>다음 글</button>
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
  border: 1px solid white;
}

p {
  line-height: 50px;
  width: 85%;
  border: 1px solid white;

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
