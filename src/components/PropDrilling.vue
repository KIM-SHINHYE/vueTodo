<script setup lang="ts">
import DrillingFirstChild from '@/components/DrillingFirstChild.vue';
import { provide, ref, type Ref } from 'vue';


const imgObj = {
    src: 'https://v3-docs.vuejs-korea.org/assets/prop-drilling.5af51664.png',
    src2: 'https://v3-docs.vuejs-korea.org/assets/provide-inject.2d638840.png',
    style: 'width: 500px; height: 300px'
}
const descOfAttr:Object = {
    class: "pTagDesc",
    style: 'color: blue; background-color:white; font-weight: bold;'
}

const inputSize = 'width: 200px';

let provideMsg:Ref<string> = ref('자식에게 보내는 메세지-provide');
provide('message', provideMsg);

let storeMsg:Ref<string> = ref('자식에게 보내는 메세지-store');


</script>

<template>
    <div>
        <h1>Prop Drilling</h1>
        <img :src="imgObj.src" :style="imgObj.style">
        <img :src="imgObj.src2" :style="imgObj.style">
        <p :="descOfAttr">부모 - 자식 - 손자 컴포넌트의 구조를 예로 들면 손자 컴포넌트에서 부모 컴포넌트의 무언가가 필요할 때, 자식 컴포넌트는 해당 prop이 전혀 필요하지 않아도 prop을 선언하고 전달</p>
        <br>
        <ol> 해결방법
            <li>Provide, Inject 사용</li>
            <li>Store 사용</li>
        </ol>
    </div>
    <br>
    <div>
        <h2>1. Provide, Inject 사용</h2>
        <input type="text" v-model="provideMsg" :style="inputSize">
        <h4>0.부모 컴포넌트임미당</h4>
        <DrillingFirstChild mydata="inject"/>
    </div>
    <br>
    <div>
        <h2>2. Store 사용</h2>
        <input type="text" v-model="storeMsg" :style="inputSize">
        <h4>0.부모 컴포넌트임미당</h4>
        <DrillingFirstChild :storeDrilling="storeMsg" mydata="store"/>
    </div>


</template>