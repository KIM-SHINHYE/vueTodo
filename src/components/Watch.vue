<script setup lang="ts">
import { computed, ref, watch, type Ref } from 'vue';
import ComputedWatchMethods from '@/components/ComputedWatchMethods.vue';

const subTitleAttr = {
    style: 'color: aqua;'
};

const question = ref('');
const answer = ref('*물음표를 써야 질문으로 인식됩니당');

watch(question, async (newQuestion, oldQuestion) => {
    if (newQuestion.indexOf('?') > -1){
        answer.value = '생각 중^.,,,.,......^;;';
        try {
            const res = await fetch('https://yesno.wtf/api');
            answer.value = (await res.json()).answer === 'yes' ? '네' : '아니오'
        } catch (err){
            answer.value = 'Warning! API에 연결할 수 없습니다.' + err;
        }
    }
})

</script>

<template>
    <br>
    <main>
        <div>
            <div>
                <h1>1. Watch란?</h1>
                <h5 :="subTitleAttr">특정 데이터 속성을 감시하고, 해당 속성(반응형 속성)이 변경될 때마다 실행할 함수 정의<br>즉, <u><br>=> 데이터 속성의 변화를 감지하여 수행해야 하는 작업이 있을 때 사용</u></h5>
                <h5 style="color:cornflowerblue">Vue.js 인스턴스의 라이프사이클 훅과 유사하게 동작 => 인스턴스의 생성 시점에서 자동 등록되며, 해당 인스턴스가 파괴될 때까지 유지</h5>
                
            </div>
            <br>
            <div>
                <h1>2. 사용법</h1>
                <ol>
                    <li>두 개의 인자를 받기
                        <ul>
                            <li>첫 번째 인자: 새로운 값(감시하고자 하는 데이터)</li>
                            <ol>
                                <li>값을 반환하는 getter함수</li>
                                <li>ref</li>
                                <li>반응형 객체</li>
                                <li>위에 나열한 것들의 배열</li>
                            </ol>
                            <li>두 번째 인자: 감시하고 있는 데이터가 변경될 때 호출될 콜백 => 콜백은 (변경된 새로운 값, 이전 값, 사이드 이펙트 클린업 콜백을 등록하기 위한 함수) 3가지의 인자 받음</li>
                            <li>세 번째 인자(optional):
                                <ol>
                                    <li>immediate: 감시자가 생성되는 즉시 콜백 호출, 최초 호출 시, 이전 값은 undefined</li>
                                    <li>deep: 감시하고자 하는 데이터가 객체인 경우, 깊은 변경사항에서도 콜백 실행되도록 함</li>
                                    <li>flush: 콜백의 발생 타이밍 조정</li>
                                    <li>onTrack / onTrigger: 감시자의 의존성 디버깅</li>
                                </ol>
                            </li>
                        </ul>
                    </li>
                    <br>

                    <p>
                        네/아니오 질문: 
                        <input type="text" v-model="question">
                    </p>
                    <h5 style="color:yellow">{{ answer }}</h5>
                </ol>
            </div>
            <br>
            <div>
                <h1>3. 주의사항</h1> 
                <ol>
                    <li>watch는 ref에서 직접 작동</li>
                    <li>watch의 사용은 피해야 함 => 서버 통신, DOM조작, browser API 사용시, computed로 해결되지 않는 상황에서만 사용</li>
                </ol>
            </div>
            <br>
            <div>
                <h1>4. BEAST에서의 사용</h1>
                <ol>
                    <li>주로 객체 상태의 변수를 감시하는 형태라 getter사용(watch(() => obj.count, ~) => 이 경우, computed의 get, set 이용해서 바로 사용가능하지 않나?</li>

                </ol>
            </div>
            <br>
            <div>
                <ComputedWatchMethods mydata="watch"/>
            </div>

        </div>
    </main>
</template>

<style scoped>
.vPreBox {
    border: 1px solid white;
}
</style>