<script setup lang="ts">
import { type Ref, ref, computed, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/stores/board'

const router = useRouter()
const boardStore = useStore()

type Content = {
  id: number
  title: string
  content: string
  writer: string
  regDate: string
}

// pinia처럼 store에서 바로 가져다가 목록에 뿌려줘야 되는데, for문으로 돌리는 과정이 있다보니까 그렇게 안해줬음. 그래서 computed를 통해 로컬스토리지에 값이 들어가거나 없어진 것에 대해 데이터 감시해줘야 함
// computed 변수에 접근하려면 .value를 통해 접근해야 함 => reactive system에서 반환되는 reactive object이기 때문
const contents: Ref<Content[]> = ref([])
const selectedContent: Ref<Content[]> = ref([])

// watchEffect 함수를 사용해 localStorage가 변경될 때마다 contents변수 업뎃
// watchEffect는 함수 내부에서 의존하는 reactive한 데이터를 자동으로 추적 => 즉, 현재 reactive한 변수는 contents배열, selectedContent배열이 선언되어 있는데 해당 배열을 사용하는 코드가 있으면 자동 추적해 감지
watchEffect(() => {
  console.log('watchEffect안')
  let contentList: Content[] = []
  let keys = Object.keys(localStorage)
  for (let key of keys) {
    let strArr = localStorage.getItem(key)
    if (strArr) {
      contentList.push(JSON.parse(strArr))
    }
  }
  contents.value = contentList.sort((a, b) => a.id - b.id)
})

// watchEffect는 함수 내부에서 의존하는 reactive한 데이터를 추적하는 것이므로 localStorage에서 삭제하는 것에 대한 감지를 하지 못함, 따라서 삭제 후 목록 업데이트가 필요한 것
const deleteContent = (con: Content) => {
  console.log('delete')
  localStorage.removeItem(con.id.toString())
  // watchEffectlocalStorage에서 삭제 후, 목록 업데이트
  contents.value = contents.value.filter((content: Content) => content.id !== con.id)
  // location.reload()
}

const deleteSelectedContents = () => {
  console.log('aa')
  console.log(selectedContent.value.length)

  // 해당 배열이 없는 값으로 목록을 업데이트하려면 삭제될 배열을 만들어줘야 함
  if (selectedContent.value.length === 0) {
    alert('nothing to delete')
    return
  }

  let selectedContentIds = Object.values(selectedContent.value).map((con) => con.id)
  for (let content of selectedContent.value) {
    localStorage.removeItem(content.id.toString())
  }
  // watchEffect는 localStorage를 바라보는게 아니므로 삭제 후 업뎃 필요
  contents.value = contents.value
    .filter((content: Content) => !selectedContentIds.includes(content.id))
    .sort((a, b) => a.id - b.id)
}

const updateContent = (content: Content) => {
  console.log('button clicked ;;;;;', content)
  boardStore.propContent(content)

  // parameter를 넘겨줄 땐, 두 번째 인자로 넘겨주기
  router.push({ name: 'board-edit', params: { id: content.id } })
}

const detailContent =(content: Content)=>{
  boardStore.propContent(content)
  router.push({name: 'board-detail', params: {id: content.id}})
}
</script>

<template>
  <div class="boardList">
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
          <td>
            <!-- 어떤 값이 선택됐는지 알려면 :value를 써줌으로써 v-model에 연결된 변수에 어떤 값이 담겼는지 알려줌, 넘겨줄 때는 :value에 있는 값인 content.id로 넘어감. 즉 number가 넘어가게 됨 -->
            <input type="checkbox" name="'check'" v-model="selectedContent" :value="content" />
            <!-- <label :for="'check-'+idx"></label> -->
          </td>
          <!-- label을 걸어줄거면 td별로 걸어줘야 함. 근데 체크박스에 체크되게끔 하는 건 기본 label이라 아마도 css에서 margin이 들어가서 경계선을 누르면 체크가 안되는 듯, 근데 @click이벤트는 경계 클릭해도 됨 -->
          <td @click="detailContent(content)">{{ idx + 1 }}</td>
          <td @click="detailContent(content)" >{{ content.id }}</td>
          <td @click="detailContent(content)">{{ content.title }}</td>
          <td @click="detailContent(content)">{{ content.writer }}</td>
          <td @click="detailContent(content)">{{ content.regDate }}</td>
          <td>
            <button @click="updateContent(content)">수정</button>
            <button @click="deleteContent(content)">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <div class="btn">
      <button @click="$router.push({ name: 'board-register' })">등록</button>
      <button @click="deleteSelectedContents">선택 삭제</button>
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
