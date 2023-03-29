<script setup lang="ts">import { ref } from 'vue';

const count = ref(0);
const string = ref('adsa');
console.log(count);
console.log(string);

</script>
<template>
  <div class="about">
    <h1>type, interface</h1>
    <h1>async/await</h1>
    <div>
      <h1>ref vs reactive</h1>
      <p>const state = ref({count:0, message: 'Hello'}) 이런식으로 ref에서도 객체타입을 만들 수 있지만 접근을 하려면 .value를 이용해서 state.value.count 이렇게 접근해야되고, const state = reactive({count:0, message:'Hello'}) 이렇게 reactive를 이용해서 객체타입을 만들면 state.count이런 식으로 접근</p>
      <p>"ref"는 기본 자료형 또는 객체를 감싸서, 해당 데이터를 반응형으로 만듦,  "reactive"는 객체를 반응형으로 만듦</p>
      <p>객체를 반응형으로 만들 땐 reactive를 사용하는게 맞음, ref함수는 내부적으로 객체를 래핑하기 때문에 객체의 속성에 접근할 때마다 .value사용헤 ref객체 내부의 값이 객체형태고 이때마다 .value를 사용하는 것이므로 성능에 악영향 줄 수 잇음, reactive로 만든 객체는 객체 내부의 속성이 변경될 때마다 자동으로 업데이트 되어 화면을 다시 그릴 필요없이 바로 반영 </p>
      <p>ref는 객체 전체를 대상으로 감시해서 객체 내부의 속성값이 변경될 때마다 ref객체 자체의 값이 변경되는 거고, reactive로 만든 객체는 객체 내부의 속성을 감시해서 객체 내부의 속성값이 변경되어도 reactive객체 자체는 변경되지 않는다</p>
    </div>

  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
