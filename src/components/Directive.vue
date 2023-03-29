<script setup lang="ts">
import SlotChildComponent from './SlotChildComponent.vue';
import vOnEvent from './vOnEvent.vue';

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

// TODO: 각각의 컨텐츠들을 객체로 관리해서 v-for이용해서 html에 뿌려주기
// ex) 아래처럼 객체로 만든 걸 html에서 뿌려주기, 근데 만약 subTitle이 없다면 v-if 등을 써줘서 값이 보여지고 안보여지게 해주되 초기값 세팅해주기
// let vModel:Object = {
//   title: 'v-model',
//   subTitle: '양방향 바인딩을 만드는 디렉티브',
//   attr: ['.lazy', '.number', 'trim']
// } 

const linkToMedium:string = "<a href='https://images.velog.io/images/taese0ng/post/82c7a9ee-7d30-44eb-be74-6814dd66b64c/logo-vuejs-min.png'>링크</a>"
const vue:string = "https://images.velog.io/images/taese0ng/post/82c7a9ee-7d30-44eb-be74-6814dd66b64c/logo-vuejs-min.png"
const descOfAttr:Object = {
  id: "desc",
  class: "pTagDesc",
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
const boxOfAttr:Object = {
  style: 'color: yellow;'
}

function parentClickStop() {
  alert('부모 컴포넌트 - 클릭되었습니다.');
}

// let inputLeft:Ref<string> = ref('');
  const rightAlert = () => {
    alert('오른쪽 클릭일때만 나타나는 alert창!')
  }


</script>

<template>
  <div class="greetings">
    <br>
    <!-- 둘 다 가능 -->
    <!-- <h1 class="green">{{ childPropData.directive1 }}</h1>
    <h1 class="green">{{ childPropData.directive2 }}</h1> -->

    <!-- <h1 class="green">{{ props.childPropData.directive1 }}</h1>
    <h1 class="green">{{ props.childPropData.directive2 }}</h1> -->

    <h1>디렉티브 종류</h1>
    <a v-for="(data, idx) in childPropData" :key="idx" class="list" :href="'#'+data">
      &nbsp; {{ data }} &nbsp;&nbsp;|
    </a>
    <!-- TODO: br을 하나만 하면 왜 안먹히지? -->
    <br>
    <br>


    <div id="v-text">

      <h2 class="green">1. {{ childPropData[0] }}</h2>
      <p :="descOfAttr">엘리먼트의 텍스트 컨텐츠를 업데이트하는 디렉티브. 엘리먼트 내부의 기존 컨텐츠를 덮어씀</p>
      <span v-text="vText"></span>
      <br>
      <span>이중괄호 이용 => {{ textCont }}</span>
    </div>
    <br>


    <div id="v-html">
      <h2 class="green">2. {{ childPropData[1] }}</h2>
        <p :="descOfAttr"> HTML 코드를 직접적으로 입력해줄 떄 사용되는 디렉티브. 즉, 엘리먼트의 innerHTML을 업데이트 함</p>
        <div :="boxOfAttr">단, 웹사이트에서 임의의 HTML을 동적으로 렌더링하는 것은 XSS공격으로 쉽게 이어질 수 있기 때문에 신뢰할 수 있는 컨텐츠에만 사용 권장</div>
        <br>
        1번처럼 텍스트 보간법을 이용하면 string으로 입력되는데, 2번처럼 v-html 디렉티브를 이용하면 HTML코드로서 인식, 단, 이 태그에 값을 입력하면 에러
        <p>1. {{ linkToMedium }}</p>
        2. <span v-html="linkToMedium"></span>
    </div>
    <br>

    <div id="v-bind">
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

    <div id="v-show">
      <h2 class="green"> 4. {{ childPropData[3]='v-show' }}</h2>
      <p :="descOfAttr">엘리먼트를 조건부로 표시하는 디렉티브. 표현식의 truthy값을 기반으로 엘리먼트의 가시성 전환</p>
      <div :="boxOfAttr">v-show가 있는 엘리먼트는 항상 렌더링되어 DOM에 남아있지만, v-if를 사용한 엘리먼트는 디렉티브 표현식이 truthy 값을 반환하는 경우에만 렌더링</div>
      <p v-show="state">*v-show의 값이 truthy일 때, 이 내용이 보이게 됨</p>
      <button @click="changeBoolean">{{ state? '숨기기':'보여주기' }}</button>
    </div>
    <br>

    <div class="v-on">
      <h2 class="green">5. {{ childPropData[4] }}</h2>
      <p :="descOfAttr">이벤트 처리를 위한 디렉티브. 엘리먼트에 이벤트 리스너 연결</p>
      <ul> 기본 수식어 외 기타
        <li>.stop: 이벤트 전파 중지. event.stopProppagation() 호출</li>
        <vOnEvent @childClickStop="parentClickStop">
          <template #clickStop>
          </template>
        </vOnEvent>
        <li>.prevent: 이벤트의 기본 동작막음. event.preventDefault() 호출</li>
        <li>.capture: 캡처 모드로 이벤트 등록</li>
        <li>.self: 이벤트가 이 엘리먼트에서 전달된 경우에만 트리거 됨</li>
        <li>.{keyAlias}: 이벤트가 특정 키에 대해서만 트리거 됨</li>
        <li>.once: 이벤트가 한 번만 트리거 됨(일회용처럼)</li>
        
        <li>.passive: {passive: true} 옵션으로 DOM 이벤트 등록</li>
      </ul>
      <br>
      <ul>클릭 및 키 수식어
        <li>.left: 마우스 왼쪽 버튼으로만 이벤트가 트리거 됨</li>
        <li>.right: 마우스 오른쪽 버튼으로만 이벤트가 트리거 됨</li>
        <button @click.right="rightAlert">rightAlert</button>
        <li>.middle: 마우스 중앙(휠 클릭) 버튼으로만 이벤트가 트리거 됨</li>
        <li>.ctrl : 컨트롤 키를 누른 상태에서만 이벤트 발생</li>
        <li>.alt : 알트 키를 누른 상태에서만 이벤트 발생</li>
        <li>.shift : 쉬프트 키를 누른 상태에서만 이벤트 발생</li>
        <li>.meta : 메타 키(윈도우: 윈도우키, 맥: 커맨드 키)를 누른 상태에서만 이벤트 발생</li>
      </ul>
    </div>
    <br>

    <div id="v-if">
      <h2 class="green">6. {{ childPropData[5] }}, {{ childPropData[6] }}, {{ childPropData[7] }}</h2>
      <p :="descOfAttr"> v-if: 표현식의 truthy값을 기반으로 엘리먼트 또는 템플릿 일부를 조건부로 렌더링함</p>
      <ul>
        <li> v-if 엘리먼트가 토글되면, 엘리먼트와 여기에 포함된 디렉티브/컴포넌트가 파괴되고 재구성됨</li>
        <li> 초기값이 falsy면 내부 컨텐츠가 전혀 렌더링 되지 않음</li>
        <li> 텍스트 또는 여러 엘리먼트를 포함하는 조건부 블록을 나타내기 위해 template에 사용할 수 있음</li>
        <li> 이 디렉티브는 조건이 변경될 때, 트랜지션을 트리거 함</li>
        <li> v-for와 함께 사용하는 경우, v-if의 우선순위가 높음 -> 하나의 엘리먼트에 이 두 디렉티브를 함께 사용하는 것은 권장X</li>
        <li> v-else/v-else-if를 쓸 때, v-if태그와 인접해 있어야 함</li>
      </ul>
      <p :="descOfAttr">v-else-if: v-if에 대한 else if 블록 나타냄, 계속 이어서 사용 가능</p>
      <p :="descOfAttr">v-else: v-if, v-else-if 체인에 대한 else, 표현식 허용하지 않음</p>
      <input type="number" v-model="number"> {{ number }}
      <div v-if="number > 0"> 입력값이 0 초과인 경우</div>
      <div v-else-if="number == 0"> 입력값이 0인 경우</div>
      <div v-else> 입력값이 0 미만인 경우</div>
      <br>
    </div>

    <div id="v-for">
      <h2 class="green">7. {{ childPropData[8] }}</h2>
      <p :="descOfAttr">소스 데이터를 기반으로 엘리먼트 또는 템플릿 블롯을 여러 번 렌더링하는 디렉티브, value, key, index순</p>
      <p>- 배열인 경우 value, key, index로 v-for를 돌리면 key에 index가 들어가게 됨</p>
      <div v-for="(value, key, index) in childPropData" :key="index">value: {{ value }}, key: {{ key }}, index: {{ index }}
      </div>
      <br>
      <p>- 객체인 경우 value, key, index로 하면 값이 전부 들어옴 </p>
      <div v-for="(value, key, index) in users" :key="key">value: {{ value }}, key: {{ key }}, index:{{ index }}</div>
    </div>
    <br>

    <div id="v-model">
      <h2 class="green">8. {{ childPropData[9] }}</h2>
      <p :="descOfAttr">사용자가 입력받는 폼 엘리먼트 또는 컴포넌트에 양방향 바인딩을 만드는 디렉티브 => input, select, textarea</p>
      <ul> 수식어
        <li>.lazy: input대신 change 이벤트를 수신함 => 즉 입력된 값이 바로 data에 반영되지 않고 엔터를 누르거나 포커스가 벗어나는 등의 이벤트가 발생할 경우에만 값이 반영</li>
        <input type="text" v-model.lazy="modelLazy">입력값: {{ modelLazy }}
        <li>.number: 유효한 입력 문자열을 숫자로 변환하여 전달</li>
        <input type="text" v-model.number="modelNumber">입력값: {{ typeof modelNumber }}
        <li>.trim: 사용자 입력의 공백을 트리밍 => 양쪽 끝의 공백만 제거</li>
        <input type="text" v-model.trim="modelTrim">입력값 길이: {{ modelTrim.length }}
      </ul>
    </div>
    <br>

    <div id="v-slot">
      <h2 class="green">9. {{ childPropData[10] }}</h2>
      <p :="descOfAttr">slot과 비슷하지만 slot보다 좀 더 간결하고 명확한 구문제공. 실질적인 템플릿 코드 조각을 통째로 보내서 화면에 보여줄 수 있는 기능. Named Slot과 Scoped Slot사용을 통합한 새로운 디랙티브</p>
      
      <!-- 아래 코드를 template으로 감싸게 되면 elements에는 표시가 되나, 화면엔 렌더링 되지 않음. 바깥쪽 template은 렌더링할 요소가 없기 때문에 불필요한 template의 중첩으로 화면에 정상적으로 렌더링 되지않음 -->
      <div>
        <p>예제1: 부모 컴포넌트입니다(v-slot: 사용)</p>
        <SlotChildComponent myData="one">
          <template v-slot:child-header>
            <h1>Header(v-slot: 사용)</h1>
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

      <br>
      <hr>

      <div>
        <p>예제2: 부모 컴포넌트입니다(v-slot:대신 #사용)</p>
        <SlotChildComponent myData="two">
          <template #child-header>
            <h1>Header(#사용)</h1>
          </template>
          <template #default>
            <div>Body</div>
          </template>
          <template #left-button>
            <button>왼쪽 버튼</button>
          </template>
          <template #right-button>
            <button>오른쪽 버튼</button>
          </template>
          <template #child-footer>
            <div>Footer</div>
          </template>
        </SlotChildComponent>
      </div>
      <br>
      <hr>

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

      <!-- 자식 컴포넌트에서 전달받을 데이터가 하나인 경우 이름지정 필요X, slotProps를 통해 자식 컴포넌트 slot에 있는 객체를 받아오는 건데, 다른 키워드 써줘도 상관X -->
      <!-- <div>
        <SlotChildComponent>
          <template v-slot="slotProps">
            {{ slotProps.text }} {{ slotProps.count }}
          </template>
        </SlotChildComponent>
      </div> -->
      <div>
        <SlotChildComponent myData="three">
          <template v-slot:a="a">
            예제3: {{ a.text }} {{ a.count }} => 자식으로부터 받은 a라는 데이터 객체를 받음
          </template>
        </SlotChildComponent>
      </div>
      <div>
        <SlotChildComponent myData="four">
          <template #a="a">
            예제4: #이용: {{ a.text }} {{ a.count }}
          </template>
        </SlotChildComponent>
      </div>

      <div>
        <SlotChildComponent myData="five">
          <template v-slot:b="b">
            예제5: {{ b.text }} {{ b.count }}
          </template>
        </SlotChildComponent>
      </div>

      <div>
        <SlotChildComponent myData="six">
          <template v-slot:b="{text, count}">
            예제6: {{ text }} {{ count }} => 자식으로부터 받은 객체 데이터 안에 있는 요소값을 따로 받을 수 있음 : {text, count} 
          </template>
        </SlotChildComponent>
      </div>
      <div>
        <SlotChildComponent myData="seven">
          <template #slotMsg="msg">
            예제7: {{ msg.message }} => 자식 컴포넌트에 정의된 메세지 전달, name과 message를 전달하지만 name은 slot name으로 예약어이기 때문에 전달되지 않고, message만 전달됨
            <span :="boxOfAttr">*앞의 예제와 비슷하지만 차이점은 자식 컴포넌트 slot태그 내부에 :를 통해 전달했는지 안했는지의 차이(여기선 :사용 X, :사용하게 되면 변수 선언 후 사용 필요)</span>
          </template>
        </SlotChildComponent>
      </div>
      <hr>
      <div>
        <SlotChildComponent myData="eight">
          <template v-slot:item="{body, username, likes}">
            <div class="item">
              예제8: 
              <p>{{ body }}</p>
              <p>by {{ username }} | {{ likes }} likes</p>
            </div>
          </template>
        </SlotChildComponent>
      </div>
      
      <div>
        <SlotChildComponent myData="nine" #mouseover="{x,y}">
          예제8: 마우스 좌표) {{ x }}, {{ y }} 
          <p :="boxOfAttr">렌더리스 컴포넌트: 로직을 포함하기만 하고 자체적으로 아무 것도 렌더링하지 않는 컴포넌트, 시각적 출력은 지정된 슬롯이 사용될 컴포넌트에 완전히 위임됨</p>
        </SlotChildComponent>
      </div>
    </div>
    <br>

    <hr>
    <hr>
    <br>
    <div id="v-pre">
      <h2 class="green">10. {{ childPropData[11] }}</h2>
      <p :="descOfAttr">이 엘리먼트와 모든 자식 엘리먼트의 컴파일 생략</p>
      <p>v-pre가 있는 엘리먼트 내에서 모든 Vue 템플릿 구문은 그대로 유지되고 렌더링됨 => 가장 일반적인 사례: 이중 중괄호 태그 표시</p>
      <span v-pre>{{ 이곳은 컴파일 되지 않습니다. }}</span>
    </div>
    <br>

    <div id="v-once">
      <h2 class="green">11. {{ childPropData[12] }}</h2>
      <p :="descOfAttr">엘리먼트와 컴포넌트를 한 번만 렌더링하고, 향후 업데이트 생략</p>
      <ul>
        <li>표현식을 허용하지 않음</li>
        <li>이후 다시 렌더링할 때, 엘리먼트/컴포넌트 및 모든 자식들은 정적 컨텐츠로 처리되어 생략</li>
        <li>업데이트 성능을 최적화하는데 사용 가능</li>
        <li>3.2부터는 v-memo를 사용하여 무효화 조건으로 템플릿의 일부 메모화가능</li>
      </ul>
      <span v-once>절대 바뀌지 않음: {{ msg }}</span>
    </div>
    <br>

    <div id="v-memo">
      <h2 class="green">12. {{ childPropData[13] }}</h2>
      <p :="descOfAttr">템플릿의 하위 트리 메모. 배열의 모든 값이 마지막 렌더링과 같으면 전체 하위 트리에 대한 업데이트 생략</p>
    </div>
    <br>

    <div id="v-cloak">
      <h2 class="green">13. {{ childPropData[14] }}</h2>
      <p :="descOfAttr">준비될 때까지 컴파일되지 않은 템플릿을 숨기는데 사용</p>

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
