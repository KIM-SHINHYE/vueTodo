<script setup lang="ts">
const attrOfDesc = {
    p: {
        style: 'color: blue; background-color:white; font-weight: bold;'
    },
    h5: {
        style: 'color: yellow;'
    }
}
// const attrOfPre = ''

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        let a = 1;
        if(a == 2){
            resolve('success')
        } else {
            reject(new Error('fail'))
        }
    }, 1000); 
});

//consumer
promise
    // then: promise가 정상적으로 잘 수행되어서 마지막에 resolve를 통해 전달된 값이 파라미터로 전달(success)
    .then((value) => { 
        console.log(value);
    })
    // reject: 실패했을 때 reject를 통해 전달된 error를 잡는 catch호출(fail)
    .catch((error) => {
        console.log(error);
    })

// Producer
const fetchNumber:Promise<number> = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000); // 1초있다가 숫자 1전달
});

// Consumer
fetchNumber
    // then은 값을 바로 전달할 수도, promise객체를 전달할 수도 있음 
    .then(num => num * 2) // 2
    .then(num => num * 3) // 6
    .then(num => {
        // 그 숫자를 다른 서버에 보내서 다른 숫자로 변환된 값을 받을 거
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(num - 1), 1000); // 5, 1초 있다가 값을 전달
        });
    })
    .then(num => console.log(num)); // 5 , 최종적으로 2초 있다가 값이 출력되게 됨

    

const getHen = () => 
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('🐓'), 1000);
    });
const getEgg = (hen:any) => 
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${hen} => 🥚`), 1000);
        // setTimeout(() => reject(new Error(`error! ${hen} => 🥚`)), 1000);
    });
const cook = (egg:any) => 
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${egg} => 🍳`), 1000);
    })

    
getHen()
    .then(getEgg)
    .catch(error => {
        return '🥐'; // 여기서 egg를 못받아 와서 error가 아닌 bread로 바꿔서 return해줌
    })
    .then(cook)
    .then(console.log)
    .catch(console.log)

</script>
    
<template>
    <div>
        <h1>Promise</h1>
        <p :style="attrOfDesc.p.style">Javascript의 비동기 처리를 간편하게 할 수 있도록 도와주는 객체, 2개의 콜백함수(resolve, reject) 전달<br>=> 주로 서버에서 받아온 데이터를 화면에 표시할 때 사용 <br>=> 데이터를 다 받아오기도 전에 화면에 표시하려고 하면 에러 발생하는데, 이 문제를 해결하고자 사용</p>
        <h5 :style="attrOfDesc.h5.style">*비동기 처리: 특정 코드의 실행이 완료될 때까지 기다리지 않고 다음 코드를 먼저 수행하는 자바스크립트의 특성</h5>
        <br>
        <h2>전체적인 흐름</h2>
        <img src="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/promises.png" style="width:100%">
        <br>
        <br>
        <h2>Producer/Consumer</h2>
        <ol>
            <li>Producer: 정보 제공 => Promise를 만드는 순간 콜백함수 호출됨</li>
            <li>Consumer: 제공된 데이터를 소비 => then, catch</li>
        </ol>
    </div>
    <br>
    <div>
        <h2>Promise의 3가지 상태(states)</h2>
        <ol>
            <li><h3>Pending</h3>: 비동기 처리 로직이 아직 완료되지 않은 상태
                <pre>const promise = new Promise();</pre>
                Promise() 메서드 호출 시, 2개의 콜백함수 호출 가능
                <pre>new Promise((resolve, reject) => {})</pre>
            </li>
            <li><h3>Fulfilled(Resolve)</h3>: 비동기 처리가 완료되어 결과 값을 반환한 상태
                resolve를 실행하면 이행/완료 상태 => then()을 이용해 처리 결과 값 받을 수 있음
                <pre>new Promise((resolve, reject) => {
        resolve();
})
                </pre>
            </li>
            <li><h3>Reject</h3>: 비동기 처리가 실패하거나 오류가 발생한 상태 => catch()를 이용해 결과값 받아올 수 있음
                <pre>new Promise((resolve, reject) => {
        reject();
})
            </pre>
            </li>
        </ol>
    </div>
    
    <br>
    <div>
        <h2>전체적인 기본 코드(사용) => console확인</h2>
        Promise() 메서드 호출 시, 2개의 콜백함수(resolve, reject) 호출 가능
        <pre>// producer
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        let a = 1;
        if(a == 1){
            resolve('success')
        } else {
            reject(new Error('fail'))
        }
    }, 1000); 
});

//consumer
promise
    // then: promise가 정상적으로 잘 수행되어서 마지막에 resolve를 통해 전달된 값이 파라미터로 전달(success)
    .then((value) => { 
        console.log(value);
    })
    // reject: 실패했을 때 reject를 통해 전달된 error를 잡는 catch호출(fail)
    .catch((error) => {
        console.log(error);
    })

        </pre>
    </div>
    <br>
    <div>
        <h2>Promise Chaining => console확인</h2>
        <h5>*then()메서드를 호출하고 나면 새로운 프로미스 객체가 반환되어 여러 개의 프로미스를 연결하여 사용가능</h5>
        <pre>
// Producer
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000); // 1초있다가 숫자 1전달
});

// Consumer
fetchNumber
    // then은 값을 바로 전달할 수도, promise객체를 전달할 수도 있음 
    .then(num => num * 2) // 2
    .then(num => num * 3) // 6
    .then(num => {
        // 그 숫자를 다른 서버에 보내서 다른 숫자로 변환된 값을 받을 거
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(num - 1), 1000); // 5, 1초 있다가 값을 전달
        });
    })
    .then(num => console.log(num)); // 5 , 최종적으로 2초 있다가 값이 출력되게 됨
        </pre>
    </div>
    <br>
    <div>
        <h2>Error Handling => console확인</h2>
        <pre>
const getHen = () => 
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('🐓'), 1000);
    });
const getEgg = hen => 
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${hen} => 🥚`), 1000);
        // setTimeout(() => reject(new Error(`error! ${hen} => 🥚`)), 1000);
    });
const cook = egg => 
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${egg} => 🍳`), 1000);
    })


getHen()
    .then(getEgg)
    .catch(error => {
        return '🥐'; // 여기서 egg를 못받아 와서 error가 아닌 bread로 바꿔서 return해줌
    })
    .then(cook)
    .then(console.log)
    .catch(console.log)
        </pre>
    </div>
    <br>
    <div>
        <h2>Promise API의 정적 메서드</h2>
        <ol>
            <li>Promise.all: <br>여러 개의 Promise들을 병렬적(비동기적)으로 실행하여 처리<pre>const promise = Promise.all([/*처리할 Promise들*/])</pre>  <br>- 여러 개의 Promise들 중 하나라도 reject를 반환하거나 에러가 날 경우, 모든 Promise들을 reject시킴<br>- 배열 안 promise가 모두 처리되면, 배열 안 promise의 결과값을 담은 배열이 새로운 Promise의 result됨<br>=> 각 Promise의 처리 순서를 보장하되, 결과를 하나의 배열로 저장하고 싶을 때 사용
            <pre>
Promise.all([
  new Promise(resolve => setTimeout(()=> resolve(1),3000)), 
  // 3초 뒤 1
  new Promise(resolve => setTimeout(()=> resolve(2),2000)), 
  // 2초 뒤 2
  new Promise(resolve => setTimeout(()=> resolve(3),1000))  
  // 1초 뒤 3
]).then((result)=>console.log(result)); 
// [1, 2, 3] // 처리 순서는 3을 받는게 가장 빠르지만 배열의 마지막에 위치, 1을 받는게 가장 느리지만 배열의 첫 번째에 위치. => 모든 작업이 이행될 때까지 기다림
            </pre>
                
            </li>
            <br>
            <li>Promise.allSettled: <br>모든 Promise가 처리될 때까지 기다리고, 반환되는 배열은 다음과 같은 요소를 가짐(응답이 성공/실패(에러)일 경우일 수 있음=> 각 Promise의 상태, 값 또는 에러 받을 수 있음)<pre>응답이 성공할 경우 – {status:"fulfilled", value:result}
에러가 발생한 경우 – {status:"rejected", reason:error}</pre><br>- 스펙에 추가된지 얼마 안 된 문법, 구식 브라우저는 폴리필 필요 <h5>*폴리필(polyfill): 기본적으로 지원하지 않는 이전 브라우저에서 최신 기능을 제공하는데 필요한 코드</h5>
            </li>
            <br>

            <li>Promise.race: <pre>const promise = Promise.race([/*처리할 Promise들*/])</pre></li>
            <br>배열에 전달된 Promise들 중 가장 먼저 처리되는 Promise의 결과(성공/에러) 반환
            <br><br>

            <li>Promise.resolve/Promise.reject:<br>- async/await문법이 생긴 후 필요없어졌지만 사용하는 편이 일관성과 안정성을 유지하는 데 좋은 방법<pre>const promise = new Promise((resolve, reject) => {
                    resolve(1) 
                    //reject(new Error('no network'))
})</pre><br><pre>async function pickFruitsAsync() {
    try{
        const apple = await getApple();
        const banana = await getBanana();
        // return `${apple} + ${banana}`;
        return Promise.resolve(`${apple} + ${banana}`);
    } catch (error){
        console.log(error);
        return Promise.reject(error);
    }
}</pre>
                <ol>
                    <li>Promise.resolve: 비동기 처리 완료되어 결괏값이 value인 이행 상태 Promise 생성 </li>
                    <li>Promise.reject: 비동기 처리에 실패하여 결괏값이 error인 거부 상태 Promise 생성</li>
                </ol>
            </li>
        </ol>
    </div>
    

</template>

<style scoped>
h7{
    background-color: aliceblue;
}

pre {
    color: black; 
    background-color: aliceblue; 
    padding: 7px; 
    white-space: pre-wrap;
}
</style>
