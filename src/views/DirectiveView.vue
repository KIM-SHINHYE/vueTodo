<script setup lang="ts">
import Directive from '@/components/Directive.vue';
import { ref } from 'vue';
// 객체로 전달
// parentPropData의 속성값을 자식컴포넌트에서 변경해서 사용하고자 한다면, vue의 반응성 시스템에서 관찰할 수 있도록 ref사용해야 함
// 이 directive들을 동적으로 생성하는건?
// const parentPropData = ref({
//   directive0: 'v-text',
//   directive1: 'v-html',
//   directive2: 'v-bind',
//   directive3: ''
// })

const parentPropData = ref([
  'v-text', 'v-html', 'v-bind', 'v-show22', 'v-if', 'v-else-if', 'v-else', 'v-for', 'v-model', 'v-slot', 'v-pre', 'v-once', 'v-memo', 'v-cloak'
])

</script>

<template>
  <main>
    <!-- <Directive msg1="a" msg2="b"/> -->
    <!-- 
      부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하기 위해서 v-bind사용해야 함,
      자식 컴포넌트에 childPropData라는 이름으로 props전달하고, 자식 컴포넌트에선 childPropData받아서 사용해야 함
    -->
    <Directive :childPropData="parentPropData"/>

  </main>
</template>
