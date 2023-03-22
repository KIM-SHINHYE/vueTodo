<script setup lang="ts">
import { ref} from 'vue';

const a:string = "a: 자식 컴포넌트에 정의된 msg"
const b:string = "b: 자식 컴포넌트에 정의된 msg"

const items = ref([])

setTimeout(() => {
  items.value = [
  { body: '범위가 지정된 슬롯 가이드', username: '신형만', likes: 20 },
	{ body: 'Vue 튜토리얼', username: '나미리', likes: 10 }
  ]
}, 1000)

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
    <ul>
      <li v-if="!items.length">로딩..</li>
      <li v-for="item in items">
        <!-- v-bind로 객체를 name을 통해 슬롯 props로 전달 -->
        <slot name="item" v-bind="item"></slot>
      </li>
    </ul>
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
  }
</style>
