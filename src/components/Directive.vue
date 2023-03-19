<script setup lang="ts">
import { defineProps, ref, type Ref } from 'vue';
// props를 이용해서 childPropData에 바로 접근해도 되고, 바로 childPropData를 써서 접근해도 됨
// const props = defineProps<{
//   msg1: string;
//   msg2: string;

// }>();
const props = defineProps({
  // 1.
  // childPropData: Object

  // 2.
  // v-bind통해서 가져온 데이터 이름을 써줘야 함
  childPropData: {
    type: Object,
    required: true
  }
});

const linkToMedium:string = "<a href='https://medium.com/@hozacho/%EB%A7%A8%EB%95%85%EC%97%90-vuejs-005-vuejs-directive-v-html-f221dd096d6a'>링크</a>"
const smile = "https://t1.daumcdn.net/cfile/blog/2119CF4157F6360D2F"
const descOfAttr = {
  id: "desc",
  style: 'color: blue; background-color:white; font-weight: bold;'
}
let vText:string = 'v-text는 엘리먼트의 텍스트 컨테츠 속성 설정하므로, 엘리먼트 내부의 기존 컨텐츠를 덮어씀. 단, 이 태그에 값을 입력하면 에러'
let textCont:string = '{{}}는 텍스트 컨텐츠의 일부 업데이트하는 경우 사용'

let state:Ref<Boolean> = ref(true);
const changeBoolean = () => {
  state.value = !state.value 
  console.log(state)
}
console.log(state)

</script>

<template>
  <div class="greetings">
    <!-- <h1 class="green">{{ childPropData.directive1 }}</h1>
    <h1 class="green">{{ childPropData.directive2 }}</h1> -->

    <!-- <h1 class="green">{{ props.childPropData.directive1 }}</h1>
    <h1 class="green">{{ props.childPropData.directive2 }}</h1> -->

    <span v-for="(data, idx) in childPropData" :key="idx" class="list">
      &nbsp; {{ data }} &nbsp;&nbsp;|
    </span>

    <h1>디렉티브 종류</h1>
    <div>

      <h2 class="green">1. {{ childPropData[0] }}</h2>
      <p :="descOfAttr">엘리먼트의 텍스트 컨텐츠를 업데이트하는 디렉티브. 엘리먼트 내부의 기존 컨텐츠를 덮어씀</p>
        <span v-text="vText"></span>
        <br>
        <span>{{ textCont }}</span>
    </div>
    <br>


    <div>
      <h2 class="green">2. {{ childPropData[1] }}</h2>
        <p :="descOfAttr"> HTML 코드를 직접적으로 입력해줄 떄 사용되는 디렉티브. 즉, 엘리먼트의 innerHTML을 업데이트 함</p>
        <br>
        1번처럼 텍스트 보간법을 이용하면 string으로 입력되는데, 2번처럼 v-html 디렉티브를 이용하면 HTML코드로서 인식, 단, 이 태그에 값을 입력하면 에러
        <p>1. {{ linkToMedium }}</p>
        2. <p v-html="linkToMedium"></p>
        <br>
  
      <h2 class="green">3. {{ childPropData[2] }} </h2>
      <p :="descOfAttr"> html의 속성인 id, class, style 등에 대해 model의 데이터를 연결할 때 사용되는 디렉티브</p>
      <p>`v-bind:속성명` = `:속성명`</p>
  
      <img :src="smile" >
    </div>
    <br><!-- 왜 br태그 하나만 하면 안먹히지? -->

    <!-- TODO: v-on 수식어 공부하기 -->
    <div>
      <h2 class="green"> 4. {{ childPropData[3]='v-show 및 v-on' }}</h2>
      <p :="descOfAttr">v-show: 엘리먼트를 조건부로 표시하는 디렉티브. 표현식의 truthy값을 기반으로 엘리먼트의 가시성 전환</p>
      <br>
      <p :="descOfAttr">v-on: 엘리먼트에 이벤트 리스너 연결</p>
      <p v-show="state">v-show의 값이 truthy일 때, 이 내용이 보이게 됨</p>
      <button @click="changeBoolean()">{{ state? '숨기기':'보여주기' }}</button>
    </div>
    <br>

    <div>
      <h2 class="green"> 5. v-model</h2>
      <p :="descOfAttr">사용자가 입력받는 폼 엘리먼트 또는 컴포넌트에 양방향 바인딩을 만드는 디렉티브</p>
    </div>

    </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

p .desc{
  color:aqua;
}
.list {
  color:chartreuse;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
