<script setup lang="ts">
const attrOdDesc = {
    mainDesc: {
        style: 'color: blue; background-color:white; font-weight: bold;'
    },
    subDesc: {
        class: 'subDesc',
        style: 'color: yellow;'
    }
}

function delay(ms:number){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple() {
    await delay(1000); // delay()가 끝날 때까지 기다렸다가 🍎 return
    return '🍎';
}

async function getBanana() {
    await delay(2000);
    return '🍌';
}

async function pickFurits() {
    try{
        const apple =  await getApple();
        const banana =  await getBanana();
        // await가 붙으면 Promise객체 안에 있는 PromiseResult(🍎, 🍌)를 반환, await가 붙지 않으면 PromiseResult를 포함하는 Promise객체를 반환
        console.log('apple', apple);
        console.log('banana', banana);
        // return Promise.resolve(`${apple} + ${banana}`)
        return `${apple} + ${banana}` // 이 값이 then으로 들어가게 됨
    } catch(error){
        console.log(error);
        return Promise.reject(error);
    }
}
pickFurits().then(fruits => console.log('fruits', fruits));

</script>

<template>
    <div>
        <h2>Async-await</h2>
        <p :style="attrOdDesc.mainDesc.style">기존의 callback함수와 Promise의 단점을 보완하고 비동기 처리를 깔끔하게 할 수 있게 만듦</p><br>
        <ul><h3>Async</h3>
            <li> async는 함수의 앞에 붙임</li>
            <li>async가 붙은 함수는 Promise 반환하고 아닌 것은 Promise로 감싸서 반환 <br>=> Promise를 반환하기 때문에 then/catch사용해 해당 함수를 호출해야 함(resolve상태의 값은 then, reject 상태의 에러는 catch로 전달)</li>
            <br>
            <h3>Await</h3>
            <li>await는 async를 붙인 함수 내부에서만 사용 가능</li>
            <li>await는 함수의 내부 로직 중 HTTP 통신을 하는 비동기 코드 앞에 붙임 <br>=> 비동기 처리 메서드(주로 axios)가 꼭 Promise객체를 반환해야 await가 의도한 대로 동작</li>
            <li>await키워드가 없는 경우: <br>-  PromiseResult를 포함하는 Promise객체를 반환<br>- Promise객체가 resolve되기 전에 반환문이 실행되는 것이므로 Promise.resolve/Promise.reject로 감싸서 호출(함수가 아직 끝나지 않은 상태에서 비동기 처리 중일 때 Promise객체가 반환되는 것이므로 pending 상태를 return) <h5>*pending일 경우 다른 코드가 싱행되면 예상치 못한 결과를 초래할 수 있길 때문에 fulfilled상태가 될 때까지 기다렸다가 다음 코드 실행하는 것이 좋음(await사용)</h5><h5>*pending일 경우 아직 비동기 작업이 완료되지 않은 상태이므로 .then(), .catch()같은 콜백함수 처리 불가능</h5></li>
            <li>await키워드가 있는 경우: <br>- Promise객체 안에 있는 PromiseResult(🍎, 🍌)를 반환<br>- Promise객체가 resolve된 후에 반환문이 실행되는 것이므로 Promise.resolve/Promise.reject를 사용하지 않아도 됨 </li>
        </ul>
        <br>
        <h3>사용 예</h3>
        <pre>
function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple() {
    await delay(1000); // delay()가 끝날 때까지 기다렸다가 🍎 return
    return '🍎';
}

async function getBanana() {
    await delay(2000);
    // throw 'error'; // 에러를 던지면 해당 함수를 부르는 async 함수에서 try, catch를 통해 잡을 수 있음
    return '🍌';
}
        </pre>
        <br>
        <pre>
async function pickFruitsAsync() {
    try{
        const apple = await getApple();
        const banana = await getBanana();
        
        return `${apple} + ${banana}`;
        
    } catch (error){
        console.log(error);
    }
}
        </pre>
    </div>
</template>

<style scoped>
pre {
    color: black; 
    background-color: aliceblue; 
    padding: 7px; 
    white-space: pre-wrap;
}

h5{
    color: yellow;
}
</style>
