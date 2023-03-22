<script setup lang="ts">
import Lifecycle from '@/components/Lifecycle.vue'
import { onErrorCaptured } from 'vue';

onErrorCaptured((error, instance, info) => {
    console.error('parent onErrorCaptured error: ', error); // 에러가 발생한 에러 객체
    console.error('parent onErrorCaptured instance: ', instance); // 에러가 발생한 Vue 인스턴스/컴포넌트
    console.error('parent onErrorCaptured info: ', info); // 에러가 발생한 위치에 대한 추가 정보
    return false // 에러 전파 중단
})

</script>

<template>
    <main>
        <Lifecycle/>
    </main>
</template>