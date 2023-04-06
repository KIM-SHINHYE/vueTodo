<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import ComputedWatchMethods from '@/components/ComputedWatchMethods.vue';

const subTitleAttr = {
    style: 'color: aqua;'
};

let user:Ref<string> = ref('');
let userList: Ref<string[]> = ref([]);

// getter형태
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
    // 계산형 데이터(계산하고자 하는 데이터)
    get() {
        // console.log("get(): ", firstName.value + ' ' + lastName.value)
        return firstName.value + ' ' + lastName.value
    },
    // 계산형 데이터 속성에 값을 할당할 때 실행(newVal에 새로 할당된 값 들어옴)
    // newVal에 사용자가 입력된 값이 들어오게 되고, 그 값이 입력되었을 때 어떤 로직을 수행하고 반환
    set(newVal) {
        // console.log("set(): ",newVal);
        [firstName.value , lastName.value] = newVal.split(' ')
    }

})



const inputText = ref('')
const isLengthValid = computed({
    get() {
        // 여기서는 감시하는 data로 inputText를 바라보고 있고, 
        console.log("inputText get()", inputText.value.length);
        return inputText.value.length <= 10? '이하':'초과' ;
    },
    set(newVal) {
        // 여기서는 감시하는 data가 변경되면 newVal로 값을 받게 되고, 관련 로직을 여기서 실행
        console.log('inputText set()', newVal)

        if(newVal=='이하'){
            console.log('이하', newVal)
            inputText.value = ''
        }
    }
})

// const myHtml = ref('const text = computed({get: () => props.value,set: (val) => {if (checkLength(val, 1, 20) && checkEnglishNumber(val)) { notiMessage.value = { valid: true, msg: \'\' };    } else if (val == \'\') {      notiMessage.value = { valid: false, msg: \'\' };    } else {      notiMessage.value = { valid: false, msg: t(\'service.valid_check_id\') as string };    }    emit\'update:value\', val);  },});');
// console.log('fullName1', typeof fullName.value);
// console.log('fullName2', typeof([firstName.value+' '+lastName.value]))


</script>

<template>
    <br>
    <main>
        <div>
            <div>
                <h1>1. Computed란?</h1>
                <h5 :="subTitleAttr">: 템플릿(이중괄호)의 데이터 표현에 반응형 데이터를 포함하거나 복잡한 논리의 경우 데이터를 더 직관적이고 간결하게 도와주는 속성 <br>즉, <u><br>=> 뷰 템플릿 코드의 가독성도 높여주고, computed 속성의 대상으로 정한 data 속성이 변경했을 때, 이를 감지하고 자동으로 다시 연산</u><br>=> computed를 통해 반환된 값은 읽기 전용으로 처리되어야 하며 변경되지 않아야 함</h5>
            </div>
            <br>
            <div>
                <h1>2. 사용법</h1>
                <ol>
                    <li>따로 선언하지 않으면 getter: 오로지 계산만 수행해야 함</li>
                    <br>
                    <div>
                        <h5 style="color:yellow">getter 사용 예제</h5>

                        <input type="text" v-model="user" @keyup.enter="inputUser"><span style="font-size: 10px; color: yellow;">*작동하는 것을 확인하시려면 "엔터"를 쳐주세욤</span>
                        <p>User : {{ userMsg }}</p>
                        <p>UserList : {{ userList }} => computed로 바라보고 있는 값(userList.value.length)</p>
                    </div>
                    <br>
                    <li> get(), set()
                        <br>
                        <ul>
                            <li>get(): 계산형 데이터 속성이 계산되는 방식 정의 => 계산형 데이터 속성을 사용할 때마다 실행</li>
                            <ul>
                                <li>여기서는 firstName + lastName = fullName으로 만들어져서 firstName이나 lastName이 변경될 때마다 getter함수 호출</li>
                            </ul>

                            <li>set(): 객체의 속성 값을 변경할 때 호출되는 함수 => 해당 속성 값을 변경할 때마다 실행</li>
                            <ul>
                                <li>fullName을 바라보고 이 값이 변경되면 setter함수 호출</li>
                            </ul>
                        </ul>
                    </li>
                    
                    <br>
                    <div>
                        <h5 style="color:yellow">getter, setter 사용 예제</h5>
                        <div>

                            이름: <input type="text" v-model="firstName"><br>
                            성: <input type="text" v-model="lastName"><br>
                            풀네임: <input type="text" v-model="fullName"><br>
                            풀네임 읽기: {{ fullName }}
                        </div>
                        <br>
                        <div>
                            <!-- v-model로 연결되는 데이터들은 대부분 input, textarea 등에 들어가는 값은 string형태, 따라서 boolean형태로 바인딩하는 건 ㄴㄴ  -->
                            <input type="text" v-model="inputText"><br>문자열 길이 : {{ inputText.length }}<br>
                            문자열 길이가 10을 넘는지(이하, 초과) : {{ isLengthValid }} => isLengthValid <br>
                            <input type="boolean" v-model="isLengthValid"><br>
                        </div>
                    </div>
                </ol>
            </div>
            <br>
            <div>
                <h1>3. 주의사항</h1> 
                <ol>
                    <li>인자를 받지 않는 computed <br> => computed 속성에 괄호가 생기는 순간 해당 템플릿을 실제 DOM으로 변환할 때, 라이브러리에서 에러 발생시킴 </li>
                    <li>HTTP통신과 같이 컴퓨팅 리소스가 많이 필요한 로직은 정의하지 X <br> => 브라우저 리소스가 많이 할애되는 코드들은 watch나 methods를 정의해서 사용
                    </li>
                </ol>
            </div>
            <br>
            <div>
                <h1>4. BEAST에서의 사용</h1>
                <ol>
                    <li>get()사용: 주로 부모 컴포넌트에서 props를 통해 데이터를 받아와 해당 값이 변경될 때 호출</li>
                    <li>get(), set() 사용: get에 부모로부터 받은 데이터를 가져오고, set에 사용자가 입력한 값에 대한 변화가 있으면 그에 대한 유효성 체크를 한 후, 다시 부모 컴포넌트에 emit하는 형태</li>
                </ol>
            </div>
            <br>
            <div>
                <ComputedWatchMethods mydata="computed"/>
            </div>

        </div>
    </main>
</template>

<style scoped>
</style>