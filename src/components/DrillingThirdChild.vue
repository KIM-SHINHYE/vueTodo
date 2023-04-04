<script setup lang="ts">
import { usePropDrillingStore } from '@/stores/propDrilling';
import { inject } from 'vue';

// 부모 컴포넌트에서 provide를 통해 값을 주입하지 않았을 경우 inject의 두 번째 인자로 기본값을 세팅할 수 있음
const pMessage = inject('provideMessage', '부모 컴포넌트에서 데이터가 오지 않았어요🫣');

const useStore = usePropDrillingStore();

</script>

<template>
    <div>
        <h4>3. 자식 컴포넌트의 자식 컴포넌트의 자식 컴포넌트임미당</h4>
        <br>
        <h4>[자식 컴포넌트에서 받은 데이터]</h4>
        <h5 style="color:yellowgreen">*3번에서 provide/inject를 이용한 부모 컴포넌트의 데이터: {{ pMessage }}</h5>
        <h5 style="color:cornflowerblue">*3번에서 store를 이용한 부모 컴포넌트의 데이터: {{ useStore.storeMsg }}</h5>
    </div>
</template>