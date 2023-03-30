<script setup lang="ts">
import axios from 'axios';
import { onActivated, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onDeactivated, onErrorCaptured, onMounted, onRenderTracked, onRenderTriggered, onServerPrefetch, onUnmounted, onUpdated, ref, watch, type Ref } from 'vue';
import LifecycleOrder1 from './LifecycleOrder1.vue';
import LifecycleOrder2 from './LifecycleOrder2.vue';

let count:Ref<number> = ref(0);
let flag:Ref<boolean> = ref(false);
let value:Ref<boolean> = ref(false);

function plus() {
  count.value++
}

function toggle(){
  console.log('###############Toggle###############');
  flag.value = !flag.value;
}

type Lifecycle = {
  optApi: string,
  compApi: string,
  mainDesc: string,
  desc: string,
  warn: string,
  ex: string;
}

const lifecycleList :Lifecycle[] = [
  {
    optApi: 'beforeCreated',
    compApi: 'X',
    mainDesc:'Vue 인스턴스가 만들어지기 전에 호출',
    desc: ' - 외부에서 들어오는 데이터인 props에 접근 가능 <br>- data, methods 등이 만들어지지 않아 this로 접근해서 컴포넌트 데이터와 관련된 작업할 수 X',
    warn: 'setup에서 실행',
    ex:''
  },
  {
    optApi: 'created',
    compApi: 'X',
    mainDesc:'Vue 인스턴스가 생성된 후, 호출',
    desc: '- data, computed, methods, watch 설정이 완료되어 this로 접근 가능 <br>',
    warn: 'setup에서 실행',
    ex:''
  },
  {
    optApi: 'beforeMount',
    compApi: 'onBeforeMount',
    mainDesc:'Vue 인스턴스가 생성된 후, 컴포넌트가 DOM에 마운트 되기 전에 실행',
    desc: '- 렌더링 직전에 DOM을 변경하고자 할 떄 사용 ',
    warn: '- 컴포넌트가 DOM에 마운트되기 전, 초기화 작업 수행시 사용 <br>- 외부 API와 통신하여 데이터를 가져올 떄 사용 <br>- Vuex 스토어 초기화, 이벤트 리스너 등록, 다른 컴포넌트와의 상호작용 등의 작업 수행 가능 <br><span style="color: red;">* DOM 요소를 직접 조작하는 것은 onMounted에서 수행하기(여기서 조작하면 레더링 지연 및 예기치 못한 상황 발생)</span>',
    ex:' <br>ex) Todo List를 불러오는 API호출로 미리 데이터 셋팅하면 더 빠르게 볼 수 있게 됨 <br>ex) '
  },
  {
    optApi: 'mounted',
    compApi: 'onMounted',
    mainDesc:'컴포넌트가 마운트된 이후 호출',
    desc: '- DOM 트리가 완성되어 DOM에 접근 가능  <br>- 모든 자식 컴포넌트들도 마운트 완료 상태 <br>- 비동기(async) 컴포넌트/ Suspense태그가 들어간 컴포넌트를 제외하고는 모든 자식 컴포넌트들이 마운트되었을 때 호출됨',
    warn: '- 특정 DOM 요소를 참조하여 초기화 <br>- DOM 요소 선택 후, 이벤트 리스너 등록 <br>-외부 라이브러리를 초기화하는 등의 작업 수행',
    ex:''
  },
  {
    optApi: 'beforeUpdate',
    compApi: 'onBeforeUpdate',
    mainDesc:'컴포넌트 데이터가 변함으로 인해 DOM이 변화되기 전에 호출(데이터는 변했지만 아직 DOM변화 전)',
    desc: '- 컴포넌트가 재랜더링 되기 전에 실행되는 유일한 훅 <br>- 컴포넌트가 변경될 때마다 호출됨<br>- 여기서 데이터 값을 변경시키면 그 값이 렌더링에 반영되고, 다시 이 훅이 실행되진 X(DOM 변경에 영향을 주는 데이터가 변하지 않으면 호출되지 X )',
    warn: '- 변경사항을 로깅하거나 비동기적으로 데이터를 가져오는 작업 수행',
    ex:'<button id="change">바꾸기</button>'
  },
  {
      optApi: 'updated',
      compApi: 'onUpdated',
      mainDesc:'DOM이 변한 이후 호출',
      desc: '- 데이터 변경으로 가상 DOM이 다시 렌더링 되고 패치된 후에 호출됨. <br>- 이 훅이 호출된 시점은 컴포넌트의 DOM이 없데이트된 상태이므로 DOM에 종속적인 작업 가능',
      warn: '<span style="color: red;">*DOM 변경에 영향을 주는 데이터가 변하지 않으면 호출되지 X => 만약, 여기서 값을 변경한다면 다시 beforeUpdate 훅부터 호출 -> 무한루프</span> <br>- 컴포넌트 상태에 따라 화면에 표시되는 내용이 변경되는 경우' ,
      ex:''
    },
  {
    optApi: 'beforeUnmount',
    compApi: 'onBeforeUnmount',
    mainDesc:'Vue 인스턴스가 마운트 해제되기 전에 호출',
    desc: '- 마운트 해제 전이기 때문에 인스턴스의 모든 기능 사용 가능 <br>- 이후 자식 컴포넌트들도 해제',
    warn: '- 적절하게 해제하면 메모리 누수 방지 및 리소스 절약으로 성능 향상 가능',
    ex:'ex) 타이머나 이벤트리스너를 제거하는 경우 <br>ex) 다른 라이브러리와의 연결을 끊어야 하는 경우 <br>ex) 데이터를 저장하거나 전달하는 경우'
  },
  {
    optApi: 'unmounted',
    compApi: 'onUnmounted',
    mainDesc:'컴포넌트가 마운트 해제된 후 호출',
    desc: '- 모든 자식 컴포넌트가 마운트 해제된 상태 <br>- 컴포넌트에 관련된 것들이 모두 멈춤',
    warn: '-Vuex 모듈 해제 ',
    ex:'<br>- 별개로 남아있을 수 있는 이벤트 리스너를 제거 <br>- 서버와의 연결 해지'
  },
  {
    optApi: 'errorCaptured',
    compApi: 'onErrorCaptured',
    mainDesc:'자식 컴포넌트에서 에러가 발생했을 때 호출',
    desc: '- 자식 컴포넌트에서 발생한 에러가 부모 컴포넌트로 전파되는 것을 방지 <br>- 에러를 캐치해서 로그에 남기거나 특정 에러 메시지를 보여주는 등의 작업 수행 <br>- 부모 컴포넌트에서 처리하는 것이 일반적이나 에러가 난 자식 컴포넌트에서도 사용 가능 <br>-- 부모 컴포넌트에서 처리: 여러 자식 컴포넌트에서 발생한 에러를 한 번에 처리할 수 있어 유지보수 측면에서 좋고 더 효율적',
    warn: '<br>- false반환을 통해 더 이상 에러가 전파되지 않음',
    ex:'<button @click="errorFetchData">errorFetchData</button>'
    // 여기서 버튼 눌렀을 때 동작을 어떻게 하나
  },
  {
    optApi: 'X',
    compApi: 'onRenderTracked',
    mainDesc:'가상 DOM이 렌더링될 때마다 호출',
    desc: '- 컴포넌트가 업데이트 될 때, 해당 컴포넌트가 의존하는 데이터의 변경사항이 있는지 추적하고, 변경이 감지될 때마다 해당 컴포넌트를 다시 렌더링<br>-개발 모드 전용 <br>- 서버 사이드 렌더링 중에 호출되지 않음',
    warn: '화면에 렌더링되는 데이터들의 변경을 감지할 때마다 호출',
    ex:'ex) {{data}} 이런 식으로 값을 동적으로 가져와야할 때 호출'
  },
  {
    optApi: 'X',
    compApi: 'onRenderTriggered',
    mainDesc:'렌더링된 가상 DOM이 실제 DOM으로 변경되기 직전에 호출',
    desc: '- 실제로 변경된 내용이 브라우저에 반영되기 직전에 호출되는 콜백 함수 <br>- 개발 모드 전용 <br>- 서버 사이드 렌더링 중에 호출되지 않음',
    warn: '- onRenderTracked에서 추적하는 데이터가 변경됐을 때 가상DOM이 실제 DOM으로 변경되기 전에 호출',
    ex:'ex) {{data}}에 담긴 data의 값이 변경될 경우 호출'
  },
  {
    optApi: 'X',
    compApi: 'onActivated',
    mainDesc:'KeepAlive로 캐시된 컴포넌트 인스턴스가 DOM트리의 일부로 삽입된 후 호출될 콜백 등록',
    desc: '<span>*KeepAlive: 여러 컴포넌트 간에 동적으로 전환될 때, 컴포넌트 인스턴스를 조건부로 캐시할 수 있는 빌트인 컴포넌트</span> ',
    warn: '- 마운트 시에 호출 <br>- KeepAlive에 의해 캐시된 루트 컴포넌트 뿐만 아니라 캐시된 트리의 자식 컴포넌트에서도 작동',
    ex:''
  },
  {
    optApi: 'X',
    compApi: 'onDeactivated',
    mainDesc:'KeepAlive로 캐시된 컴포넌트 인스턴스가 DOM트리의 일부로 제거된 후 호출될 콜백 등록',
    desc: '',
    warn: '- 마운트 해제 시에 호출 <br>- KeepAlive에 의해 캐시된 루트 컴포넌트 뿐만 아니라 캐시된 트리의 자식 컴포넌트에서도 작동',
    ex:''
  },
  {
    optApi: 'X',
    compApi: 'onServerPrefetch',
    mainDesc:'컴포넌트 인스턴스가 서버에서 렌더링 되기 전에 완료되어야 하는 비동기 함수 등록',
    desc: '- SSR전용',
    warn: '',
    ex:''
  },
] 
const errorFetchData = async () => {
  try {
    const result = await axios.get('https://jsonplaceholder.typicode.com/todos/11111');
    console.log('result', result)
  } catch(error) {
    console.error('Error caught in child component:', error);
    throw error; // 에러 전파 -> 전파를 해줘야 부모 컴포넌트에서 잡을 수 있음
  }
}

console.log('          Parent setup() => beforeCreated, created')

onBeforeMount(() => {
  console.log('          Parent onBeforeMount')
})

onMounted(() => {
  console.log('          Parent Parent onMounted')
  // v-html을 사용해서 버튼을 만들었고, 해당 버튼이 id가 test로서 DOM에 생성되었고, 그 구축된 DOM에 있는 값을 가져와서 세팅해줘야 버튼이 동작
  // let button = document.getElementById('change')
  // console.log(button)
  // button?.addEventListener('click', () => {
  //   changeValue()
  // })
})

onBeforeUpdate(() => {
  console.log('          Parent onBeforeUpdate')
  // const tag = document.getElementById('update')
  // console.log(tag?.innerText)
})

onUpdated(() => {
  console.log('          Parent onUpdated')
  // const tag = document.getElementById('update')
  // console.log(tag?.innerText)
})

// watch(()=>value.value,(newVal,oldVal)=>{
//   console.log(oldVal,' => ', newVal)
// })

onBeforeUnmount(() => {
  console.log('          Parent onBeforeUnmount')
})

onUnmounted(() => {
  console.log('          Parent Component unmounted')
})

onRenderTracked(() => {
  console.log('          Parent onRenderTracked')
})

onRenderTriggered(() => {
  console.log('          Parent onRenderTriggered')
})

onActivated(() => {
  console.log('          Parent onActivated')
})

onDeactivated(() => {
  console.log('          Parent onDeactivated')
})

onServerPrefetch(() => {
  console.log('          Parent onServerPrefetch')
})


</script>

<template>
  <div>
    <h1>Practice -> Console</h1>
    <div>
      <h2 style="background-color:cadetblue;">onBeforeUpdate, onUpdated</h2>
      <button @click="value = !value">바꾸기</button>
      <p>*해당 버튼을 누르게 되면 텍스트 보간법으로 변경된 데이터 값을 추적하고 있기 때문에 onRenderTriggered 훅 호출</p>
      <p>>> {{ value? 'onBeforeUpdate, onUpdated 호출' : 'onBeforeUpdate, onUpdated 호출 전' }}</p>
    </div>
    <br>
    <div>
      <h2 style="background-color:cadetblue;">onErrorCaptured</h2>
      <button @click="errorFetchData">errorFetchData</button>
      <p>*해당 버튼을 누르게 되면 자식 컴포넌트에서 에러가 발생하게 되고, 그 에러를 부모 컴포넌트에서 인지하고 onErrorCaptured 훅 호출</p>
    </div>
    <br>
    <div>
      <h2 style="background-color:cadetblue;">Lifecycle</h2>
      <LifecycleOrder1 v-if="flag == true"/>
      <LifecycleOrder2 v-else/>
      <button @click="toggle">자식 컴포넌트 변경하기</button>
    </div>
  </div>
  <br>
  <h1>Lifecycle</h1>
  <img src="https://dltqhkoxgn1gx.cloudfront.net/img/posts/how-to-use-lifecycle-hooks-in-vue3-1.png" style="height: 50; width: 650px; ">
  <table>
    <thead>
      <tr>
        <th>번호</th>
        <th>Options API</th>
        <th>Composition API</th>
        <th>설명</th>
        <th>특징 및 주의사항</th>
        <th>예시</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(lifecycle, idx) in lifecycleList" :key="idx">
        <td>{{ idx +1 }}</td>
        <td>{{ lifecycle.optApi }}</td>
        <td>{{ lifecycle.compApi }}</td>
        <td><strong>{{lifecycle.mainDesc  }}</strong><br><br>
        <span v-html="lifecycle.desc"></span> </td>
        <td v-html="lifecycle.warn"></td>
        <td v-html="lifecycle.ex"></td>
      </tr>
    </tbody>
  </table>
  <br>
  
</template>

<style>


th, td{
  margin: 0 auto;
  border: 1px solid hsla(160, 100%, 37%, 1);
}
</style>