<script setup lang="ts">
import { defineEmits } from 'vue';

// 자식 컴포넌트에서 emit 정의 -> 따라서 자식 컴포넌트에서만 사용
// 부모 컴포넌트에선 childClickStop 이름의 이벤트를 v-on을 통해 받으면 됨
const emits = defineEmits(['childClickStop']);

function childClickStop( ) {
  alert('자식 컴포넌트 - 클릭되었습니다.');
  // @click.stop을 사용해도, emit을 통해 이벤트를 전달하는 경우 부모 컴포넌트에서 이벤트를 받을 수 있음
  emits('childClickStop');
}

</script>

<template>
    <div>
        <slot name="clickStop">
            <button @click="childClickStop">클릭(click)</button>
            <button @click.stop="childClickStop">클릭(click.stop, emit사용)</button>
        </slot>
    </div>
</template>