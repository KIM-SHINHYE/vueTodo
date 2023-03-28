<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';

const subTitleAttr = {
    style: 'color: aqua;'
};

let user:Ref<string> = ref('');
let userList: Ref<string[]> = ref([]);

const userMsg = computed(() => {
    return userList.value.length > 0 ? 'Yes' : 'No';
})

function inputUser() {
    userList.value.push(user.value);
    user.value=''
}

let firstName:Ref<string> = ref('Shinhye');
let lastName:Ref<string> = ref('Kim')

const fullName = computed({
    // 감시하고자 하는 데이터 
    get() {
        console.log("get()", firstName.value + ' ' + lastName.value)
        return firstName.value + ' ' + lastName.value
    },
    // get을 통해 새롭게 조합된 값이 newVal로 인자값으로 들어가고, 
    set(newVal) {
       console.log("set()",newVal);
    //    [firstName.value , lastName.value] = newVal.split(' ')
    }

})

console.log('fullName1', typeof fullName.value);
console.log('fullName2', typeof([firstName.value+' '+lastName.value]))


</script>

<template>
    <br>
    <main>
        <div>
            <div>
                <h1>1. Computed란?</h1>
                <h5 :="subTitleAttr">: 템플릿(이중괄호)의 데이터 표현에 반응형 데이터를 포함하거나 복잡한 논리의 경우 데이터를 더 직관적이고 간결하게 도와주는 속성 <br>즉, <u><br>=> 뷰 템플릿 코드의 가독성도 높여주고, computed 속성의 대상으로 정한 data 속성이 변경했을 때, 이를 감지하고 자동으로 다시 연산</u></h5>
                <input type="text" v-model="user" @keyup.enter="inputUser"><span style="font-size: 10px; color: yellow;">*작동하는 것을 확인하시려면 "엔터"를 쳐주세욤</span>
                <p>User : {{ userMsg }}</p>
                <p>UserList : {{ userList }} => computed로 바라보고 있는 값</p>
            </div>
            <br>
            <div>
                <h1>2. 사용법</h1>
                <ol>
                    <li>따로 선언하지 않으면 getter 전용</li>
                    <li>getter: 객체의 속성 값을 읽을 때 호출되는 함수, 해당 속성 값을 계산하고 반환</li>
                    <li>setter: 객체의 속성 값을 변경할 때 호출되는 함수, 해당 속성 값을 변경할 때마다 실행</li>
                    이름: <input type="text" v-model="firstName">
                    성: <input type="text" v-model="lastName">
                    풀네임: <input type="text" v-model="fullName">
                    {{ fullName }}
                </ol>
            </div>
            <br>
            <div>
                <h1>3. 주의사항</h1> 
                <ol>
                    <li>인자를 받지 않는 computed <br> => computed 속성에 괄호가 생기는 순간 해당 템플릿을 실제 DOM으로 변환할 때, 라이브러리에서 에러 발생시킴 </li>
                    <li>HTTP통신과 같이 컴퓨팅 리소스가 많이 필요한 로직은 정의하지 X <br> => 브라우저 리소스가 많이 할애되는 코드들은 watch나 함수를 정의해서 사용
                    </li>
                </ol>
            </div>
            <br>
            <div>
                <h1>4. BEAST에서의 사용</h1>
            </div>

        </div>
    </main>
</template>

<style scoped>
</style>