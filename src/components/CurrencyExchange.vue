<script setup >
import {onMounted} from 'vue'
let currencyRatio = {
    USD: {
        KRW: 1295.83,
        USD: 1,
        VND: 23525.00,
        unit: "달러"
    },
    KRW: {
        KRW: 1,
        USD: 0.00077,
        VND: 18.15,
        unit: "원"
    },
    VND: {
        KRW: 0.055,
        USD: 0.000043,
        VND: 1,
        unit: "동"
    }
}
// 아래처럼 접근 가능
// console.log(currencyRatio['KRW']['unit'])
// console.log(currencyRatio['KRW'].unit)
// console.log(currencyRatio.KRW.unit)

let unitWords = ["", "만", "억", "조", "경"];
const splitUnit = 10000;
let fromCurrency = "USD";
let toCurrency = "USD";
// 아래처럼 미리 가져오면 아직 DOM구축 전에 값을 가져오는 것이라 null -> 변수만 먼저 선언하고 onMounted에서 값을 넣어주기
// let fromButton = document.getElementById('from-button');
// let toButton = document.getElementById('to-button');
// let fromInput = document.getElementById('from-input');
// let toInput = document.getElementById('to-input');
// let fromUnit = document.getElementById('from-unit');
// let toUnit = document.getElementById('to-tunit');
let fromButton = '';
let toButton = '';
let fromInput = '';
let toInput = '';


// HTML이 DOM에 구축된 후 값을 가져올 수 있기 때문에 onMounted안에 넣어줌
onMounted(() => {
    fromButton = document.getElementById('from-button');
    toButton = document.getElementById('to-button');
    fromInput = document.getElementById('from-input');
    toInput = document.getElementById('to-input');

    // dropdown 리스트에 클릭이벤트 주기
    // list 돌면서 그 안에 있는 a태그들의 요소에 이벤트 추가
    document.querySelectorAll('#from-currency-list a').forEach(menu => menu.addEventListener("click", function() {
        // 클릭했을 떄 어떤 동작을 했으면 하는지 함수로 정의 가능(화살표 함수는 this를 사용하지 못함)
        // 버튼 값을 가져오고, 클릭한 후 클릭된 값을 버튼 값에 넣어주기
        // this는 내가 누른 이벤트
        fromButton.textContent = this.textContent;
        fromCurrency = this.textContent;
        // document.getElementById('from-unit').textContent = currencyRatio[fromCurrency]['unit'];
        convert('from');
    }))

    document.querySelectorAll('#to-currency-list a').forEach(menu => menu.addEventListener("click", function(){
        toButton.textContent = this.textContent;
        toCurrency = this.textContent;
        // document.getElementById('to-unit').textContent = currencyRatio[toCurrency].unit;
        convert('to');
    }))
})

// function convert(type) {
//     let amount = 0;
//     // let convertedAmount = 0;
//     // console.log(12345678 % Math.pow(10000, 1)/ Math.pow(10000,0))
//     // console.log(12345678 % Math.pow(10000, 2)/Math.pow(10000,1))
//     if(type == 'from'){

//         amount = document.getElementById('from-input').value;
//         console.log('amount', amount)
//         let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
//         console.log('from>> convertedAmount',convertedAmount);
//         document.getElementById('to-input').value = convertedAmount;
//     } 
//     else {
//         amount = document.getElementById('to-input').value;
//         let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];
//         document.getElementById('from-input').value = convertedAmount;
//         console.log('to>> convertedAmount', convertedAmount)
//     }

//     // if(type == 'from'){
//     //     amount = document.getElementById('from-input').value;
//     //     let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
//     //     document.getElementById('to-input').value = convertedAmount;
//     //     console.log('convertedAmount',convertedAmount);
//     //     // renderKoreanNum(amount, convertedAmount);
//     // } else {
//     //     amount = document.getElementById('to-input').value;
//     //     let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];
//     //     document.getElementById('from-input').value = convertedAmount;
//     //     // renderKoreanNum(convertedAmount, amount);
//     // }
// }

function convert() {
  let amount = fromInput.value;
  let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
  toInput.value = convertedAmount;
  renderKoreanNum(amount, convertedAmount);
}

function reverseConvert() {
    let amount = toInput.value;
    let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];
    fromInput.value = convertedAmount;
    renderKoreanNum(convertedAmount, amount);
}

function renderKoreanNum(from, to){
    // console.log('readNum       ',readNum(from))
    document.getElementById('from-unit').textContent = readNum(from) + currencyRatio[fromCurrency].unit;
    document.getElementById('to-unit').textContent = readNum(to) + currencyRatio[toCurrency].unit;

}

function readNum(num){
    let resultNum = "";
    let resultArr = [];
    for(let i = 0; i < unitWords.length; i++){
        let unitResult = (num % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        unitResult = Math.floor(unitResult);
        // console.log('unitResult : ', unitResult);
        if(unitResult > 0){
            resultArr[i] = unitResult;
        }
    }
    // console.log('resultArr: ', resultArr);
    for(let i = 0; i < resultArr.length; i++){
        // resultArr[i] 값이 falsy한 값(undefined, 0 등)이면 continue를 통해 반복문을 다음으로 넘김
        if(!resultArr[i]) continue;
        resultNum = String(resultArr[i])+unitWords[i]+resultNum;
    }
    return resultNum;

}

</script>

<template>
    <br>
    <div class="container">
        <div class="exchange-box">
            <div class="dropdown">
                <button class="dropbtn" id="from-button">USD</button>
                <div class="dropdown-content" id="from-currency-list">
                    <a href="#">USD</a>
                    <a href="#">KRW</a>
                    <a href="#">VND</a>
                </div>
            </div>
            <div class="input-area">
                <input type="number" id="from-input" @keyup="convert">
                <div id="from-unit">달러</div>
            </div>
        </div>
        <h1>=</h1>
    
        <div class="exchange-box">
            <div class="dropdown">
                <button class="dropbtn" id="to-button">USD</button>
                <div class="dropdown-content" id="to-currency-list">
                    <a href="#">USD</a>
                    <a href="#">KRW</a>
                    <a href="#">VND</a>
                </div>
            </div>
            <div class="input-area">
                <input type="number" id="to-input" @keyup="reverseConvert">
                <div id="to-unit">달러</div>
            </div>
        </div>
    </div>

    <br>
    <div>
        <h1>사용된 개념 및 추가 개념</h1>
        <ul>
            <li>document 객체: 웹페이지 그 자체, DOM 트리의 최상위 객체 => 브라우저는 HTML 문서를 로드하기 전에 documnet 객체를 먼저 만든 후 document 객체를 뿌리로 하는 DOM 트리를 만듦
                <ol>- 주요 메소드
                    <li>querySelectorAll(선택자): 해당 선택자로 선택되는 요소를 모두 선택함</li>
                    <li>getElementById(아이디): 해당 아이디의 요소 선택</li>
                    <li>getElementBysByClassName(클래스이름): 해당 클래스에 속한 요소를 모두 선택함</li>
                    <li>getElementsByName(name속성값): 해당 name 속성값을 가지는 요소를 모두 선택함</li>
                    <li>getElementsByTagName(태그이름): 해당 태그 이름의 요소를 모두 선택함</li>
                </ol>
            </li>
            <li>addEventListener: "여러 개"의 이벤트를 한 번에 발생시킬 때</li>
            <li>onkeyup(js) / @keyup : key를 누르고 올라가는 순간 이벤트 발생, addEventListener대신 사용해도 되지만, 이벤트 처리가 하나일 때 사용하기 </li>

            <li>자바스크립트에서는 인라인 이벤트 핸들러를 convert() 이런식으로 메소드를 바로 호출하지만, vue에서는 인라인 이벤트 핸들러를 v-on이나 @로 호출하기 때문에 convert 메소드 이름을 보고 메소드를 호출</li>
        </ul>
    </div>
</template>

<style scoped>
h1 {
    text-align: center;
}
.exchange-box {
    border: #3e8e41 1px solid;
    width: 100%;
}

.input-area {
    width: 100%; 
}

.input-area input {
    width: 100%; 
}

#from-unit, #to-unit {
    text-align: right;
}
/* Style The Dropdown Button */
.dropbtn {
  background-color: #4CAF50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  width: 100%; /* 부모의 넓이를 100% 쓰는 것 */
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
  width: 100%; 
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  width: 100%; 
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #f1f1f1}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}
</style>