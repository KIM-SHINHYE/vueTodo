<script setup lang="ts">
import LifecycleViewVue from '@/views/LifecycleView.vue';

type Lifecycle = {
  optApi: string,
  compApi: string,
  desc: string,
  warn: string,
  ex: string
}

const lifecycleList :Lifecycle[] = [
  {
  optApi: 'beforeCreated',
  compApi: 'X',
  desc: '<strong>Vue 인스턴스가 만들어지기 전에 호출</strong> <br><br>- 외부에서 들어오는 데이터인 props에 접근 가능 <br>- data, methods 등이 만들어지지 않아 this로 접근해서 컴포넌트 데이터와 관련된 작업할 수 X',
  warn: '',
  ex:''
  },

  {
  optApi: 'created',
  compApi: 'X',
  desc: '<strong>Vue 인스턴스가 생성된 후, 호출</strong> <br><br>- data, computed, methods, watch 설정이 완료되어 this로 접근 가능 <br>',
  warn: '',
  ex:''
  },
  {
  optApi: 'beforeMount',
  compApi: 'onBeforeMount',
  desc: '<strong>Vue 인스턴스가 생성된 후, template옵션이 있으면 이를 컴파일하는데, 컴파일된 이후 호출됨</strong> <br><br>- 컴파일 된 이후에 특별히 할만한 일 X <br>- 이후 자식 컴포넌트가 생성되고 마운트',
  warn: '',
  ex:''
  },
  {
  optApi: 'mounted',
  compApi: 'onMounted',
  desc: '<strong>컴포넌트가 마운트된 이후 호출</strong> <br><br>- DOM 트리가 완성되어 DOM에 접근 가능  <br>- 모든 자식 컴포넌트들도 마운트 완료 상태 <br>- 비동기(async) 컴포넌트/ Suspense태그가 들어간 컴포넌트를 제외하고는 모든 자식 컴포넌트들이 마운트되었을 때 호출됨',
  warn: '',
  ex:''
  },
  {
  optApi: 'beforeUpdate',
  compApi: 'onBeforeUpdate',
  desc: '<strong>컴포넌트 데이터가 변함으로 인해 DOM이 변화되기 전에 호출됨</strong> <br><br>- document.querySelector로 접근하면 이미 값이 변경됨<br>- 여기서 데이터 값을 변경시키면 그 값이 렌더링에 반영되고, 다시 이 훅이 실행되진 X',
  warn: '- DOM 변경에 영향을 주는 데이터가 변하지 않으면 호출되지 X',
  ex:''
  },
  {
  optApi: 'updated',
  compApi: 'onUpdated',
  desc: '<strong>DOM이 변한 이후 호출</strong> <br><br>- 데이터 변경으로 가상 DOM이 다시 렌더링 되고 패치된 후에 호출됨. <br>- 이 훅이 호출된 시점은 컴포넌트의 DOM이 없데이트된 상태이므로 DOM에 종속적인 작업 가능',
  warn: '- DOM 변경에 영향을 주는 데이터가 변하지 않으면 호출되지 X <br>-만약, 여기서 값을 변경한다면 다시 beforeUpdate 훅부터 호출 -> 무한루프',
  ex:''
  },
  {
  optApi: 'beforeUnmount',
  compApi: 'onBeforeUnmount',
  desc: '<strong>Vue 인스턴스가 마운트 해제되기 전에 호출</strong> <br><br>- 마운트 해제 전이기 때문에 인스턴스의 모든 기능 사용 가능 <br>- 이후 자식 컴포넌트들도 해제',
  warn: '',
  ex:''
  },
  {
  optApi: 'unmounted',
  compApi: 'onUnmounted',
  desc: '<strong>컴포넌트가 마운트 해제된 후 호출</strong> <br><br>- 모든 자식 컴포넌트가 마운트 해제된 상태 <br>- 컴포넌트에 관련된 것들이 모두 멈춤',
  warn: '',
  ex:'<br>- 별개로 남아있을 수 있는 이벤트 리스너를 제거 <br>- 서버와의 연결을 해지하는 용도'
  },
]


</script>

<template>
  <h1>Lifecycle</h1>
  <img src="https://vuejs.org/assets/lifecycle.16e4c08e.png" style="height: 50; width: 600px; ">
  <table>
    <thead>
      <tr>
        <th>번호</th>
        <th>Options API</th>
        <th>Composition API</th>
        <th>설명</th>
        <th>주의사항</th>
        <th>예시</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(lifecycle, idx) in lifecycleList" :key="idx">
        <td>{{ idx +1 }}</td>
        <td>{{ lifecycle.optApi }}</td>
        <td>{{ lifecycle.compApi }}</td>
        <td v-html="lifecycle.desc"></td>
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
  border: 1px solid black;
}
</style>