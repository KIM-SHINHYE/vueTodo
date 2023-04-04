<script setup lang="ts">
import DrillingFirstChild from '@/components/DrillingFirstChild.vue';
import { usePropDrillingStore } from '@/stores/propDrilling';
import { onBeforeUpdate, provide, ref, type Ref } from 'vue';

const useStore = usePropDrillingStore();

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
provide('provideMessage', provideMsg);


let storeMsg:Ref<string> = ref('자식에게 보내는 메세지-store');
useStore.putMessage(storeMsg.value);


onBeforeUpdate(() => {
    useStore.putMessage(storeMsg.value);
})


const attrOfPre = 'color: black; background-color: aliceblue; padding: 7px;'

</script>

<template>
    <div>
        <h1 >Prop Drilling</h1>
        <img :src="imgObj.src" :style="imgObj.style">
        <img :src="imgObj.src2" :style="imgObj.style">
        <p :="descOfAttr">부모 - 자식 - 손자 컴포넌트의 구조를 예로 들면 손자 컴포넌트에서 부모 컴포넌트의 무언가가 필요할 때, 자식 컴포넌트는 해당 prop이 전혀 필요하지 않아도 prop을 선언하고 전달해야 함</p>
        <br>
        <ol> <h2>해결방법</h2>
            <li>Provide, Inject 사용
                <ul>
                    <li>Provide: <br>- 컴포넌트의 하위 항목에 데이터 제공,<br>- 두 개의 인자 허용(주입키 및 symbol(자식 컴포넌트에서 주입을 원하는 값을 조회하는데 사용), 제공되는 값(자식 컴포넌트에서 실제로 사용을 원하는 값, 객체로 묶어 보낼 수 있음))<br>- App.vue에서 사용하면 앱에서 렌더링 되는 모든 컴포넌트에서 사용 가능(app.provide()형태)<br>- 전달된 데이터가 주입된 컴포넌트에 의해 변경될 수 없도록 하려면 readonly()로 래핑<br><pre :style="attrOfPre">const count = ref(0)
provide('read-only-count', readonly(count))</pre></li>
                    <li>Inject: <br>- 부모 컴포넌트에서 제공하는 데이터 주입 <br>- 두 개의 인자 허용(부모 컴포넌트에서 주입한 값 조회 단어, 값이 오지 않았을 시 지정할 기본 값)</li>
                </ul>
            </li>
            <li>Store 사용</li>
        </ol>
    </div>
    <br>
    <div>
        <p>상황: 부모 -> 자식 -> 손자 -> 손자의 손자 -> 손자의 손자의 손자일 때, 맨 마지막 손자가 부모의 데이터를 사용하고 싶을 때, </p>
        <br>
        
        <h4>0.부모 컴포넌트임미당</h4>
    
        <DrillingFirstChild/>
        <br>
        <div>
            <h3>1. Provide, Inject 사용</h3>
            <h5 style="color:yellowgreen">부모: {{ provideMsg }}</h5>
            <input type="text" v-model="provideMsg" :style="inputSize"> /
        </div>
        <br>
        <div>
            <h3>2. Store 사용</h3>
            <h5 style="color:cornflowerblue">부모: {{ useStore.storeMsg }}</h5>
            <input type="text" v-model="storeMsg" :style="inputSize"> /
        </div>
    </div>


</template>