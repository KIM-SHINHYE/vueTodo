<script setup lang="ts">
import SlotChildComponent from './SlotChildComponent.vue';
import { defineProps, ref, type Ref } from 'vue';
// props를 이용해서 childPropData에 바로 접근해도 되고, 바로 childPropData를 써서 접근해도 됨
// const props = defineProps<{
//   msg1: string;
//   msg2: string;

// }>();
const props = defineProps({
  // 1.
  // childPropData: Object

  // 2.
  // v-bind통해서 가져온 데이터 이름을 써줘야 함
  childPropData: {
    type: Object,
    required: true
  }
});

const linkToMedium:string = "<a href='https://images.velog.io/images/taese0ng/post/82c7a9ee-7d30-44eb-be74-6814dd66b64c/logo-vuejs-min.png'>링크</a>"
const vue:string = "https://images.velog.io/images/taese0ng/post/82c7a9ee-7d30-44eb-be74-6814dd66b64c/logo-vuejs-min.png"
const descOfAttr:Object = {
  id: "desc",
  style: 'color: blue; background-color:white; font-weight: bold;'
}
let vText:string = 'v-text이용 => v-text는 엘리먼트의 텍스트 컨테츠 속성 설정하므로, 엘리먼트 내부의 기존 컨텐츠를 덮어씀. 단, 이 태그에 값을 입력하면 에러'
let textCont:string = '{{}}는 텍스트 컨텐츠의 일부 업데이트하는 경우 사용'

let state:Ref<Boolean> = ref(true);
const changeBoolean = () => {
  state.value = !state.value 
  console.log(state)
}
console.log(state)

let number:Ref<number> = ref(0)
let users:Object = 
  {firstName : "Susan", lastName: "Steward", fullName: 'Susan Steward'};
let modelLazy:Ref<string> = ref('')
let modelNumber:Ref<string> = ref('')
let modelTrim:Ref<string> = ref('')
let msg:string = 'v-once를 사용한 span태그';

function clickStop() {
  alert('클릭되었습니다.')
}

</script>

<template>
  <div class="greetings">
    <!-- 둘 다 가능 -->
    <!-- <h1 class="green">{{ childPropData.directive1 }}</h1>
    <h1 class="green">{{ childPropData.directive2 }}</h1> -->

    <!-- <h1 class="green">{{ props.childPropData.directive1 }}</h1>
    <h1 class="green">{{ props.childPropData.directive2 }}</h1> -->

    <h1>디렉티브 종류</h1>
    <span v-for="(data, idx) in childPropData" :key="idx" class="list">
      &nbsp; {{ data }} &nbsp;&nbsp;|
    </span>

    <div>

      <h2 class="green">1. {{ childPropData[0] }}</h2>
      <p :="descOfAttr">엘리먼트의 텍스트 컨텐츠를 업데이트하는 디렉티브. 엘리먼트 내부의 기존 컨텐츠를 덮어씀</p>
        <span v-text="vText"></span>
        <br>
        <span>이중괄호 이용 => {{ textCont }}</span>
    </div>
    <br>


    <div>
      <h2 class="green">2. {{ childPropData[1] }}</h2>
        <p :="descOfAttr"> HTML 코드를 직접적으로 입력해줄 떄 사용되는 디렉티브. 즉, 엘리먼트의 innerHTML을 업데이트 함</p>
        <br>
        1번처럼 텍스트 보간법을 이용하면 string으로 입력되는데, 2번처럼 v-html 디렉티브를 이용하면 HTML코드로서 인식, 단, 이 태그에 값을 입력하면 에러
        <p>1. {{ linkToMedium }}</p>
        2. <p v-html="linkToMedium"></p>
        <br>
  
      <h2 class="green">3. {{ childPropData[2] }} </h2>
      <p :="descOfAttr"> html의 속성인 id, class, style 등에 대해 model의 데이터를 연결할 때 사용되는 디렉티브 => 하나 이상의 속성(:) 또는 컴포넌트 prop(.)을 표현식에 동적으로 바인딩</p>
      <p>`v-bind:속성명` = `:속성명`</p>
      <ul> 수식어
        <li>.camel: kebab-case속성 이름을 camelCase로 변환</li>
        <li>.prop: 바인딩을 DOM 속성(property)강제 설정</li>
        <li>.attr: 바인딩을 DOM 속성으로 강제 설정</li>
      </ul>
      <img :src="vue" >
    </div>
    <br>

    <!-- TODO: v-on 수식어 공부하기 -->
    <div>
      <h2 class="green"> 4. {{ childPropData[3]='v-show 및 v-on' }}</h2>
      <p :="descOfAttr">v-show: 엘리먼트를 조건부로 표시하는 디렉티브. 표현식의 truthy값을 기반으로 엘리먼트의 가시성 전환</p>
      <br>
      <p :="descOfAttr">v-on: 엘리먼트에 이벤트 리스너 연결</p>
      <p v-show="state">v-show의 값이 truthy일 때, 이 내용이 보이게 됨</p>
      <button @click="changeBoolean()">{{ state? '숨기기':'보여주기' }}</button>
      <ul> 수식어
        <li>.stop: 이벤트 전파 중지. event.stopProppagation() 호출</li>
        <button v-on:click="clickStop()">Click</button>
        <button v-on:click.stop="clickStop()">Click(stop)</button>
        <li>.prevent: 이벤트의 기본 동작막음. event.preventDefault() 호출</li>
        <li>.capture: 캡처 모드로 이벤트 등록</li>
        <li>.self: 이벤트가 이 엘리먼트에서 전달된 경우에만 트리거 됨</li>
        <li>.{keyAlias}: 이벤트가 특정 키에 대해서만 트리거 됨</li>
        <li>.once: 이벤트가 한 번만 트리거 됨(일회용처럼)</li>
        <li>.left: 마우스 왼쪽 버튼으로만 이벤트가 트리거 됨</li>
        <li>.right: 마우스 오른쪽 버튼으로만 이벤트가 트리거 됨</li>
        <li>.middle: 마우스 중앙(휠 클릭) 버튼으로만 이벤트가 트리거 됨</li>
        <li>.passive: {passive: true} 옵션으로 DOM 이벤트 등록</li>
      </ul>
      
    </div>
    <br>

    <div>
      <h2 class="green">5. {{ childPropData[4] }}, {{ childPropData[5] }}, {{ childPropData[6] }}</h2>
      <p :="descOfAttr"> v-if: 표현식의 truthy값을 기반으로 엘리먼트 또는 템플릿 일부를 조건부로 렌더링함</p>
      <ul>
        <li> v-if 엘리먼트가 토글되면, 엘리먼트와 여기에 포함된 디렉티브/컴포넌트가 파괴되고 재구성됨</li>
        <li> 초기값이 falsy면 내부 컨텐츠가 전혀 렌더링 되지 않음</li>
        <li> 텍스트 또는 여러 엘리먼트를 포함하는 조건부 블록을 나타내기 위해 template에 사용할 수 있음</li>
        <li> 이 디렉티브는 조건이 변경될 때, 트랜지션을 트리거 함</li>
        <li> v-for와 함께 사용하는 경우, v-if의 우선순위가 높음 -> 하나의 엘리먼트에 이 두 디렉티브를 함께 사용하는 것은 권장X</li>
      </ul>
      <p :="descOfAttr">v-else-if: v-if에 대한 else if 블록 나타냄, 계속 이어서 사용 가능</p>
      <p :="descOfAttr">v-else: v-if, v-else-if 체인에 대한 else, 표현식 허용하지 않음</p>
      <input type="number" v-model="number"> {{ number }}
      <div v-if="number > 0"> 입력값이 0 초과인 경우</div>
      <div v-else-if="number == 0"> 입력값이 0인 경우</div>
      <div v-else> 입력값이 0 미만인 경우</div>
      <br>
    </div>

    <div>
      <h2 class="green">6. {{ childPropData[7] }}</h2>
      <p :="descOfAttr">소스 데이터를 기반으로 엘리먼트 또는 템플릿 블롯을 여러 번 렌더링하는 디렉티브, value, key, index순</p>
      <p>- 배열인 경우 value, key, index로 v-for를 돌리면 key에 index가 들어가게 됨</p>
      <div v-for="(value, key, index) in childPropData" :key="key">value: {{ value }}, key: {{ key }}, index: {{ index }}
      </div>
      <br>
      <p>- 객체인 경우 value, key, index로 하면 값이 전부 들어옴 </p>
      <div v-for="(value, key, index) in users" :key="key">value: {{ value }}, key: {{ key }}, index:n{{ index }}</div>
    </div>
    <br>

    <div>
      <h2 class="green">7. {{ childPropData[8] }}</h2>
      <p :="descOfAttr">사용자가 입력받는 폼 엘리먼트 또는 컴포넌트에 양방향 바인딩을 만드는 디렉티브 => input, select, textarea</p>
      <ul> 수식어
        <li>.lazy: input대신 change 이벤트를 수신함 => 즉 입력된 값이 바로 data에 반영되지 않고 엔터를 누르거나 포커스가 벗어나는 등의 이벤트가 발생할 경우에만 값이 반영</li>
        <input type="text" v-model.lazy="modelLazy">입력값: {{ modelLazy }}
        <li>.number: 유효한 입력 문자열을 숫자로 변환하여 전달</li>
        <input type="text" v-model.number="modelNumber">입력값: {{ typeof modelNumber }}
        <!-- TODO: .trim되는 기준?  -->
        <li>.trim: 사용자 입력의 공백을 트리밍 => 양쪽 끝의 공백만 제거</li>
        <input type="text" v-model="modelTrim">입력값 길이: {{ modelTrim.length }}
      </ul>
    </div>
    <br>

    <div>
      <h2 class="green">8. {{ childPropData[9] }}</h2>
      <p :="descOfAttr">slot과 비슷하지만 slot보다 좀 더 간결하고 명확한 구문제공. 실질적인 템플릿 코드 조각을 통째로 보내서 화면에 보여줄 수 있는 기능. Named Slot과 Scoped Slot사용을 통합한 새로운 디랙티브</p>
      
    <!-- 아래 코드를 template으로 감싸게 되면 elements에는 표시가 되나, 화면엔 렌더링 되지 않음. 바깥쪽 template은 렌더링할 요소가 없기 때문에 불필요한 template의 중첩으로 화면에 정상적으로 렌더링 되지않음 -->
      <div>
        <p>부모 컴포넌트입니다</p>
        <SlotChildComponent>
          <template v-slot:child-header>
            <h1>Header</h1>
          </template>
          <template v-slot:default>
            <div>Body</div>
          </template>
          <template v-slot:left-button>
            <button>왼쪽 버튼</button>
          </template>
          <template v-slot:right-button>
            <button>오른쪽 버튼</button>
          </template>
          <template v-slot:child-footer>
            <div>Footer</div>
          </template>
        </SlotChildComponent>
      </div>

      <!-- 만약 아래처럼 제일 바깥 template에 렌더링할 요소가 있다면 template을  제일 밖에 써도 값이 보여지게 됨 -->
      <!-- <template v-if="number ==0 ">
        <div>
        <p>부모 컴포넌트입니다</p>
        <SlotChildComponent>
          <template v-slot:child-header>
            <h1>Header</h1>
          </template>
          <template v-slot:default>
            <div>Body</div>
          </template>
          <template v-slot:left-button>
            <button>왼쪽 버튼</button>
          </template>
          <template v-slot:right-button>
            <button>오른쪽 버튼</button>
          </template>
          <template v-slot:child-footer>
            <div>Footer</div>
          </template>
        </SlotChildComponent>
      </div>
      </template> -->
    </div>
    <br>

    <div>
      <h2 class="green">9. {{ childPropData[10] }}</h2>
      <p :="descOfAttr">이 엘리먼트와 모든 자식 엘리먼트의 컴파일 생략</p>
      <p>v-pre가 있는 엘리먼트 내에서 모든 Vue 템플릿 구문은 그대로 유지되고 렌더링됨 => 가장 일반적인 사례: 이중 중괄호 태그 표시</p>
      <span v-pre>{{ 이곳은 컴파일 되지 않습니다. }}</span>
    </div>
    <br>

    <div>
      <h2 class="green">10. {{ childPropData[11] }}</h2>
      <p :="descOfAttr">엘리먼트와 컴포넌트를 한 번만 렌더링하고, 향후 업데이트 생략</p>
      <ul>
        <li>표현식을 허용하지 않음</li>
        <li>이후 다시 렌더링할 때, 엘리먼트/컴포넌트 및 모든 자식들은 정적 컨텐츠로 처리되어 생략</li>
        <li>업데이트 성능을 최적화하는데 사용 가능</li>
      </ul>
      <span v-once>절대 바뀌지 않음: {{ msg }}</span>
      

    </div>
    <br>

    <div>
      <h2 class="green">11. {{ childPropData[12] }}</h2>
      <p :="descOfAttr"></p>

    </div>


    </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

p .desc{
  color:aqua;
}
.list {
  color:chartreuse;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
