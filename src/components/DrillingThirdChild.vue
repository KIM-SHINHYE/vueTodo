<script setup lang="ts">
import { inject } from 'vue';
const message = inject('message');
</script>

<template>
    <div>
        <h4>3. 자식 컴포넌트의 자식 컴포넌트의 자식 컴포넌트입미당</h4>
        <h5 style="color:yellowgreen">*3번에서 inject를 이용해 부모 컴포넌트의 데이터를 보고 있어요: {{ message }}</h5>
        <h5 style="color:yellowgreen">*3번에서 inject를 이용해 부모 컴포넌트의 데이터를 보고 있어요: {{ message }}</h5>
    </div>
</template>