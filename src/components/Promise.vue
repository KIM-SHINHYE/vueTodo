<script setup lang="ts">
const attrOfDesc = {
    p: {
        style: 'color: blue; background-color:white; font-weight: bold;'
    },
    h5: {
        style: 'color: yellow;'
    }
}
const attrOfPre = 'color: black; background-color: aliceblue; padding: 7px;'

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
        <img src="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/promises.png">
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
                <pre :style="attrOfPre">const promise = new Promise();</pre>
                Promise() 메서드 호출 시, 2개의 콜백함수 호출 가능
                <pre :style="attrOfPre">new Promise((resolve, reject) => {})</pre>
            </li>
            <li><h3>Fulfilled(Resolve)</h3>: 비동기 처리가 완료되어 결과 값을 반환한 상태
                resolve를 실행하면 이행/완료 상태 => then()을 이용해 처리 결과 값 받을 수 있음
                <pre :style="attrOfPre">new Promise((resolve, reject) => {
        resolve();
})
                </pre>
            </li>
            <li><h3>Reject</h3>: 비동기 처리가 실패하거나 오류가 발생한 상태 => catch()를 이용해 결과값 받아올 수 있음
                <pre :style="attrOfPre">new Promise((resolve, reject) => {
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
        <pre :style="attrOfPre">// producer
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
        <pre :style="attrOfPre">
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
        <pre :style="attrOfPre">
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
    

</template>

<style scoped>
h7{
    background-color: aliceblue;
}
</style>
