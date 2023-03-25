<script setup lang="ts">
import { ref, type Ref, defineProps, onMounted, onUnmounted} from 'vue';

const a:string = "a: 자식 컴포넌트에 정의된 msg"
const b:string = "b: 자식 컴포넌트에 정의된 msg"

type Item = {
  body: string,
  username: string,
  likes: number
}

const items:Ref<Item[]> = ref([])

setTimeout(() => {
  items.value = [
  { body: '9. v-slot 예제8, 범위가 지정된 Slot 가이드', username: '신형만', likes: 20 },
	{ body: 'Vue 튜토리얼', username: '나미리', likes: 10 }
  ]
}, 1000)

const props = defineProps<{
  myData: string,
}>();

const x = ref(0)
const y = ref(0)

const update = e => {
  x.value = e.pageX
  y.value = e.pageY
}

onMounted(() => {
  window.addEventListener('mouseover', update);
})

onUnmounted(() => {
  window.removeEventListener('mouseover', update);
})
</script>

<template>
  <!-- name을 붙이지않으면 부모 컴포넌트에서 default로 받으면 됨 -->
  
  <div>
    <slot name="child-header"></slot>
    <slot></slot>
    <slot name="child-footer"></slot>
    <slot name="left-button"></slot>
    <slot name="right-button"></slot>
  </div>

  <div>
    <slot name="a" :text="a" :count="1"></slot>
  </div>

  <div>
    <slot name="b" :text="b" :count="2"></slot>
  </div>

  <div>
    <!-- 여기서 slot name은 예약어이기 때문에 message만 전달됨, 여기선 :안씀 -->
    <slot name="slotMsg" message="HI"></slot>
  </div>

  <div>
    <!-- 부모로부터 받은 myData값이 eight일 때만 해당 slot 연결  -->
    <slot v-if="myData === 'eight'">
    <ul id="areaSlot">
      <li v-if="!items.length">로딩..</li>
      <li v-for="item in items">
        <!-- v-bind로 객체를 name을 통해 슬롯 props로 전달 -->
        <slot name="item" v-bind="item"></slot>
      </li>
    </ul>
    </slot>
  </div>

  <!-- mouseover -->
  <div>
    <slot name="mouseover" v-if="myData === 'nine'" :x="x" :y="y"/>
  </div>

  
  
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 5px;
  background: linear-gradient(315deg, #42d392 25%, #647eff);
}

li {
  padding: 5px 20px;
  margin: 10px;
  background: #fff;
  color: black;
}
</style>
