<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    mydata: string
}>()
</script>

<template>
    <div v-if="mydata == 'computed' || 'watch'">
        <!-- slot name 지정 -->
        <h1>*Computed vs Watch</h1>
        <table>
            <thead>
                <tr>
                    <th>비교</th>
                    <th>Computed</th>
                    <th>Watch</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>공통점</td>
                    <td colspan="2">값이 변하면 무언가 실행됨</td>
                </tr>
                <tr>
                    <td>template 기술</td>
                    <td>O</td>
                    <td>X</td>
                </tr>
                <tr>
                    <td>캐싱</td>
                    <td>감시하고 있는 데이터가 변경될 때 이를 감지하고 자동으로 연산하여 결과 값은 저장(캐싱) <br>=> 데이터가 변경되지 않는다면 캐싱한 결과를 즉시 반환</td>
                    <td>데이터가 변경되지 않아도 명시적으로 호출한다면 호출 결과를 반환</td>
                </tr>
                <tr>
                    <td>사용</td>
                    <td>데이터를 가공해서 보여주는 경우(템플릿 이중괄호)</td>
                    <td>
                        <ol style="padding-left: 20px;">
                            <li>데이터 변경으로 API를 호출하는 경우(서버 통신)</li>
                            <li>시간이 많이 소요되는 계산을 하는 경우</li>
                            <li>DOM 조작</li>
                            <li>local storage, audio playback과 같은 browser API 사용시</li>
                        </ol>
                        </td>
                </tr>
            </tbody>
        </table>
    </div>
    <br>
    
    <div v-if="mydata == 'computed'">
        <h1>*Computed vs Methods</h1>
        <table>
            <thead>
                <tr>
                    <th>비교</th>
                    <th>Computed</th>
                    <th>Method</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>공통점</td>
                    <td colspan="2"></td>
                </tr>
                <tr>
                    <td>호출 방법</td>
                    <td>()를 붙일 필요없이 호출</td>
                    <td>()를 붙여서 호출</td>
                </tr>
                <tr>
                    <td>인자</td>
                    <td>X <br>=> 함수 형태로 호출하는 것이 아니므로 인자를 가질 수 없음</td>
                    <td>O</td>
                </tr>
                <tr>
                    <td>라이프사이클 영향</td>
                    <td>종속된 데이터가 변경될 경우에만 실행</td>
                    <td>onUpdate 훅이 발생하면 template에 있는 method들은 반드시 실행 <br>=> onUpdate 훅은 데이터가 변경되어 가상돔을 재랜더링할 때 발생하는데, 이때, 해당 method와 관련없는 액션에도 재호출되어 의도치 않은 버그 발생가능성 존재
                    <br> => 즉, 컴포넌트가 관리하는 데이터가 변경될 때마다 실행</td>
                </tr>
                <tr>
                    <td>return값의 존재유무</td>
                    <td>O</td>
                    <td>X</td>
                </tr>
                <tr>
                    <td>물어볼거 및 할거</td>
                    <td colspan="2">watch의 사용은 피해야 할까?, 재렌더링할 때, methods는 계속 호출되는 반면, computed는 값이 변경되지 않았다면 호출되는건가?, watch는 ref랑 꼭 같이 사용해야되나?, <br> 비스트에서의 사용, watch와 watcheffect의 차이점</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div v-if="mydata == 'watch'">
        <h1>*watch() vs watchEffect()</h1>
        <table>
            <thead>
                <tr>
                    <th>비교</th>
                    <th>watch</th>
                    <th>watchEffect</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>공통점</td>
                    <td colspan="2">사이드 이펙트를 반응적으로 실행할 수 있게 함</td>
                </tr>
                <tr>
                    <td>반응형 의존성 추적 방식</td>
                    <td>명시적으로 감시된 소스만 추적, 의존성 추적을 사이드 이펙트와 분리<br>=> 즉, 콜백 내에서 조회하는 항목은 추적하지 않지만 콜백이 실행되어야 하는 시기를 보다 명확하게 제어 가능</td>
                    <td>의존성 추적과 사이드 이펙트를 하나의 단계로 결합 <br>=> 즉, 동기적 실행 중에 조회되는 모든 반응형 속성을 자동으로 추적하지만 콜백이 실행되어야 하는 시기가 덜 명시적</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
th, td {
    margin: 0 auto;
    border: 1px solid hsla(160, 100%, 37%, 1);
}
</style>