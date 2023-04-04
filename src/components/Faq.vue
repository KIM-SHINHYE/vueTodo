<script setup lang="ts">
import { reactive, ref, type Ref } from 'vue';

const textColor = {
    style: 'color: violet;'
}

// 1. Type, Interface차이: =의 유무
// type Item = {
//     title: string,
//     panelItem: string,
//     activePanels: boolean
// }

interface Item {
    title: string,
    panelItem: string,
    activePanels: boolean
}

// 2. Type, Interface차이: Type의 확장은 특수문자&로 확장, interface의 확장은 extends로(선언적 확장과 인터페이스 상속 존재)
// 2-1. Interface의 선언적 확장(이 인터페이스를 정의하기 전에 기존에 같은 이름으로 먼저 선언되어 있어야 함)
interface Person {
    name: string;
    age: number;
    msg: string;
}

interface Person {
    nationality: string;
}

// 2-2. Interface의 상속
interface Employee extends Person {
    salary: number;
}

let john:Person = reactive({
    name: 'john 초기값 name',
    age: 20,
    nationality: 'john 초기값 nationality',
    msg: 'interface의 선언적 확장'
})

let jenny:Employee = reactive({
    salary: 100000000,
    name: 'jenny 초기값 name',
    age: 21,
    nationality: 'jenny 초기값 nationality',
    msg: 'interface의 extends로 처리'
})

// 2-3. type의 확장
type Animal = {
    species: string;
    sound: string;
    msg: string;
}
type Dog = Animal & {
    breed: string;
}

let bambi:Dog = reactive({ // 자동완성 X
    species: 'bambi 초기값 species',
    sound: 'bambi 초기값 sound',
    breed: 'bambi 초기값 breed',
    msg: 'type의 확장'
})

// 3. Type, Interface차이: computed value의 사용여부
type Names = 'firstName' | 'lastName'
type NameTypes = {
    [key in Names]: string
}
const test:NameTypes = {firstName: 'Hi', 'lastName': 'Bye'}

// 3.
const items= reactive([ // reactive 사용할 때는 타입을 명시해주지 않아도 됨
    {
        id:1,
        title: 'Type 과 Interface의 차이',
        panelItem: '>>공통점: 객체의 타입 이름 지정<br>>>Type의 특징 : 특수문자&으로 확장, 선언적 확장X <br>>>Interface의 특징 : extends로 확장 및 선언적 확장, 객체에만 사용 가능 <br>*TypeScipt팀은 Interface사용을 권장하고, 합(|) 타입 혹은 튜플 타입을 반드시 써야되는 상황이면 Type 사용을 권함<br>',
        activePanels: false,
    },
    
    {
        id:3,
        title: 'HTMLCollection과 NodeList의 주요 차이점',
        panelItem: 'HTMLCollection은 동적, NodeList는 정적.<br>=> 즉, DOM에 새로운 요소(Element)가 추가되면 HTMLCollection은 새로운 요소를 가져오지만 NodeList는 가져오지 못함. <br>=> 따라서, HTMLCollection은 Array.from()을 이용해 객체를 배열로 만들어야 함',
        activePanels: false
    },
    {
        id: 4,
        title: 'ref vs reactive',
        panelItem: 'const state = ref({count:0, message: \'Hello\'}) 이런식으로 ref에서도 객체타입을 만들 수 있지만 접근을 하려면 .value를 이용해서 state.value.count 이렇게 접근 <br> const state = reactive({count:0, message:\'Hello\'}) reactive를 이용해서 객체타입을 만들면 state.count이런 식으로 접근 <br>>> 어떤 것을 쓰던 상관없으나 "중첩된 객체나 배열의 경우 객체 또는 배열의 변경 사항을 감지"하여 자동으로 반응성을 유지하려면 reactive를 사용하는게 좋음',
        activePanels: false
    },
    // {
    //     title: 'b',
    //     panelItem: 'b',
    //     activePanels: false
    // },
])

function togglePanel(index: number) {
    items[index].activePanels = !items[index].activePanels;
    items[index]
}

john.name = 'john에 다른 name 할당' ;
jenny.nationality = 'jenny에 다른 nationality 할당';
</script>

<template>
    <div>
        <h1>FAQ</h1>
        <div v-for="(item, index) in items" :key="index" class="accordion-box">
            <button class="accordion" @click="togglePanel(index)" :class="{active: item.activePanels}" >{{ item.title }}</button>
            <div class="panel" :class="{active: item.activePanels}">
                <!-- <p>{{ item.panelItem }}</p> -->
                <p v-html="item.panelItem"></p>
                <ol v-if="item.id == 1">
                    <li>{{ john }}</li>
                    <li>{{ jenny }}</li>
                    <li>{{ bambi }}</li>
                </ol>

            </div>
        </div>
    </div>

    <!-- <div class="about">
        <h1>type, interface</h1>
        <h1>async/await</h1>
        <div>
        <h1>ref vs reactive</h1>
        <p> 해야되고,  이렇게 근</p>
        <p>"ref"는 기본 자료형 또는 객체를 감싸서, 해당 데이터를 반응형으로 만듦,  "reactive"는 객체를 반응형으로 만듦</p>
        <p>객체를 반응형으로 만들 땐 reactive를 사용하는게 맞음, ref함수는 내부적으로 객체를 래핑하기 때문에 객체의 속성에 접근할 때마다 .value사용헤 ref객체 내부의 값이 객체형태고 이때마다 .value를 사용하는 것이므로 성능에 악영향 줄 수 잇음, reactive로 만든 객체는 객체 내부의 속성이 변경될 때마다 자동으로 업데이트 되어 화면을 다시 그릴 필요없이 바로 반영 </p>
        <p>ref는 객체 전체를 대상으로 감시해서 객체 내부의 속성값이 변경될 때마다 ref객체 자체의 값이 변경되는 거고, reactive로 만든 객체는 객체 내부의 속성을 감시해서 객체 내부의 속성값이 변경되어도 reactive객체 자체는 변경되지 않는다</p>
        </div>
    </div> -->
    
</template>
<style scoped>
.accordion-box {
    margin-bottom: 1px;
}

p{
    padding: 18px;
    font-size: small;
}
.accordion {
    background-color: grey;
    color: #444;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    border: 1px solid  #444 ;
    text-align: left;
    outline: none;
    font-size: 18px;
    transition: 0.4s;
    border: none;
}

.active, .accordion:hover {
    background-color: #ccc; 
    color: black;
}

.panel {
    /* padding: 18px; */
    background-color: white;
    overflow: hidden;
    max-height: 0;
    transition: height 0.2s ease-out;
}

.panel.active {
    max-height: 1000px;
    transition: height 0.5s ease-in;
}
</style>