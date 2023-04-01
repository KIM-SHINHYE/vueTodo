<script setup lang="ts">
import { usePropDrillingStore } from '@/stores/propDrilling';
import { inject } from 'vue';

const pMessage = inject('provideMessage');

const useStore = usePropDrillingStore();

</script>

<template>
    <div>
        <h4>3. 자식 컴포넌트의 자식 컴포넌트의 자식 컴포넌트임미당</h4>
        <br>
        <h5 style="color:yellowgreen">*3번에서 provide/inject를 이용한 부모 컴포넌트의 데이터: {{ pMessage }}</h5>
        <h5 style="color:cornflowerblue">*3번에서 store를 이용한 부모 컴포넌트의 데이터: {{ useStore.storeMsg }}</h5>
    </div>
</template>