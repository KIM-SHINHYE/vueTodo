<template>
  <div class="openApi">
    <div class="swagger">
      <div ref="swaggerUI"></div>
    </div>
    <br>
    <input style="width:500px; height: 40px;" type="text" @keyup.enter="changeUri(uri)" v-model="uri">
    <br>
    <br>
    <ul>SAMPLE
      <li><a href="#" @click="changeUri('https://www.data.go.kr/data/15081808/openapi.do')">https://www.data.go.kr/data/15081808/openapi.do</a></li>
      <li><a href="#" @click="changeUri('https://www.data.go.kr/data/15058273/openapi.do')">https://www.data.go.kr/data/15058273/openapi.do</a></li>
      <li><a href="#" @click="changeUri('https://www.data.go.kr/data/15112088/openapi.do')">https://www.data.go.kr/data/15112088/openapi.do</a></li>
      <li><a href="#" @click="changeUri('https://www.data.go.kr/data/15112476/openapi.do')">https://www.data.go.kr/data/15112476/openapi.do</a></li>
      <li><a href="#" @click="changeUri('https://www.data.go.kr/data/15001699/openapi.do#/tab_layer_detail_function')">https://www.data.go.kr/data/15001699/openapi.do#/tab_layer_detail_function</a></li>
    </ul>
    <br>
    <br>
    <h1>{{ apiList.info.title? apiList.info.title + ' API': 'URI 입력'}}</h1>
    <!-- <h3>: {{ apiList.info.description }}</h3> -->
    <br>
    <p><a :href="'https://'+ apiList.host + apiList.basePath">Base_URL: https://{{ apiList.host + apiList.basePath }}</a></p>
    <p>BasePath: {{ apiList.basePath? apiList.basePath: 'X'}}</p>
    <p>Host: {{ apiList.host }}</p>
    <p>Swagger: {{ apiList.swagger }}</p>
    <br>
    <div v-for="(api, i) in apiList.paths" :key="i">

      <h2>API{{ i+1 }}: {{ apiList.paths[i] }}</h2>
      <!-- 
        - 타입스크립트는 외부 라이브러리의 타입을 미리 알 수 없기 때문에 타입에러 발생 가능성 존재. 
        - 이 때, as any를 사용함으로써 타입 체크 무시하고 코드를 실행하겠다는 의미
        - apiList.descs[i]가 동적인 데이터일 가능성이 있기 때문에 as any를 써줌으로써 타입 쳌크를 무시하고 .get.summary속서에 접근 가능
        - 만약, as any를 안쓰고 싶다면 descs의 타입을 string[] 이 아닌 any[]로 두면 됨
      -->
      <p>설명: {{ apiList.descs[i].get?  apiList.descs[i].get.summary: apiList.descs[i].post.tags[0]}}</p>
      <br>
    </div>
  </div>
</template>
<script setup lang="ts">
import cheerio from 'cheerio';
import axios from 'axios';
import { ref, watch, type Ref, onMounted } from 'vue';
import {crawlData} from '@/api/crawler'
// import SwaggerUI from 'swagger-ui-dist';

// onMounted(() => {
//   SwaggerUI({
//     url
//   })
// })

// let keyValTest = {
//   q: { a: 1, b: 1 },
//   w: { a: 4, b: 4 },
//   e: { a: 2, b: 2 },
//   r: { a: 3, b: 3 },
// };

// console.log('keyValTest;;;', keyValTest);
// console.log('keys;;;', Object.keys(keyValTest));
// console.log('values;;;', Object.values(keyValTest));




// let uri:Ref<string> = ref('');
let uri:Ref<string> = ref('https://www.data.go.kr/data/15001699/openapi.do#/tab_layer_detail_function');
// let uri:Ref<string> = ref('https://www.data.go.kr/data/15081808/openapi.do');

/*
- swaggerUrl
https://www.data.go.kr/data/15081808/openapi.do

- swagerJson
https://www.data.go.kr/data/15058273/openapi.do
https://www.data.go.kr/data/15112088/openapi.do
https://www.data.go.kr/data/15112476/openapi.do
 */

  
function changeUri(event:any){
  uri.value = event;
  processData();
  // console.log('uri.value',event);
}


type Info = {
  description: string,
  title: string,
  version: string
}

type Response = {
  basePath: string,
  host: string,
  info: Info,
  paths: string[],
  swagger: string,
  descs: any[]
}

const apiList:Ref<Response> = ref({
  basePath: "",
  host: "",
  info: {
    description: "",
    title: "",
    version: ""
  },
  paths: [],
  swagger: "",
  descs: []
})



// const crawledData = async () => {
//   try {
//     return await axios.get(uri.value);
//   } catch(err) {
//     console.error(err);
//     // try, catch문에서 아래처럼 에러를 던져주는게 자연스러움
//     throw new Error('URL does not exist.');
//     // return Promise.reject(new Error('URL does not exist.'));
//   }
// }

// const processData = async () => {
//   crawlData(uri.value).then(res => {

//   }).catch(err => {

//   })
//   const res = await crawledData();
//   // .then((res)=> res).catch((err) => Promise.reject(new Error('URL does not exist.'))); 
//   const $ = cheerio.load(res?.data);
//   const $scriptList = $('script');
//   let titles:string[] = [];
  
//   $scriptList.each((i, ele) => {
//     titles.push($(ele).text());
//   })

//   titles = titles.filter((str) => str.includes('swagger'));

//   const swaggerUrl = titles[0].split("var swaggerUrl = '")[1].split("';")[0];
//   const swaggerJson = titles[0].split('var swaggerJson = `')[1].split("`;")[0];
  
//   if(swaggerUrl){
//     console.log('swaggerUrl 존재');
//     axios.get(swaggerUrl)
//           .then((res) => {
//             console.log('res.data:  ', res.data);
//             apiList.value = res.data;
//             apiList.value.descs = Object.values(res.data.paths);
//             apiList.value.paths = Object.keys(res.data.paths);
//           })
//           .catch((err) => {})

//   } else if(swaggerJson) {
//     console.log('swaggerJson 존재');
//     const swaggerJsonData = JSON.parse(swaggerJson);
//     // let a = JSON.stringify(swaggerJson);
//     // let b = JSON.stringify(JSON.parse(swaggerJson));
//     // let c = JSON.parse(a);
//     // let d = JSON.parse(swaggerJson);
//     // let e = JSON.stringify(d);
//     // let f = JSON.parse(e);

//     // console.log('a', a);
//     // console.log('b', b);
//     // console.log('c', c);
//     // console.log('d', d);
//     // console.log('e', e);
//     // console.log('f', f);

//     // const swaggerJsonData = JSON.parse(JSON.stringify(JSON.parse(swaggerJson)));
//     // const originalSwaggerJsonData = JSON.parse(swaggerJson);
//     // const swaggerJsonData = Object.assign({}, originalSwaggerJsonData);
//     // JSON.stringify 함수를 사용해 객체를 문자열로 직렬화한 다음 다시 JSON.parse() 사용해 객체로 파싱하는 것은 객체를 복제하는데 사용 - 단, undefined나 복사할 객체의 내용이 간단하지 않은 경우에 사용은 피하기
//     // 이렇게 복사하는 경우 객체가 아닌 자료형은 처리하지 못하거나 객체가 깊어지면 성능상의 이슈가 발생하기 때문에 피하기 - assign사용하기(아니 근데 assign은 얕은 복사라는데)

//     // apiList.value = swaggerJsonData;
//     // apiList.value.paths = [];
//     // apiList.value.descs = [];

//     // for(const [key, value] of Object.entries(swaggerJsonData.paths)){
//     //   console.log(`${key}: ${value}`);
//     //   apiList.value.paths.push(key);
//     //   apiList.value.descs.push(value);
//     // }
//     // console.log(apiList.value);
//     // console.log(apiList.value.paths);
//     // console.log(apiList.value.descs);
//     // console.log('swaggerJson', swaggerJson);
//     // console.log('swaggerJsonData', swaggerJsonData);



//     // 2.
//     // 같은 객체를 참조하고 있으므로 값이 변경되면 다른 쪽에서 반영됨
//     // apiList.value = swaggerJsonData;
//     // // Object.value() 메서드는 객체의 value들만 추출해서 배열로 반환
//     // // Object.keys() 메서드는 객체의 keys들만 추출해서 배열로 반환
//     // // 여기서 Object.values/keys 순서바꾸면 값을 못찾음 => apiList.value
//     // console.log('1', swaggerJsonData.paths);
    
//     // apiList.value.descs = Object.values(swaggerJsonData.paths);
//     // console.log('values', Object.values(swaggerJsonData.paths))
//     // console.log('keys', Object.keys(swaggerJsonData.paths))
//     // console.log('2', swaggerJsonData.paths);

//     // apiList.value.paths = Object.keys(swaggerJsonData.paths);
//     // console.log('3', swaggerJsonData.paths);
    

//     // console.log('values', Object.values(swaggerJsonData.paths))
//     // console.log('keys', Object.keys(swaggerJsonData.paths))
//     // console.log('4', swaggerJsonData.paths);

//     // 1. 
//     apiList.value.basePath = swaggerJsonData['basePath'];
//     apiList.value.host = swaggerJsonData['host'];
//     apiList.value.info = swaggerJsonData['info'];
//     apiList.value.paths = Object.keys(swaggerJsonData['paths']);
//     apiList.value.swagger = swaggerJsonData['swagger'];
//     apiList.value.descs = Object.values(swaggerJsonData['paths']);
//     console.log(swaggerJsonData['paths']);

//   } else {
//     alert('X');
//   }
// }
// processData();

const processData = async () => {
  crawlData(uri.value).then(res => {
    // load() 메서드를 통해 HTMl을 불러오면 Cheerio 오브젝트 생성됨
    const $ = cheerio.load(res?.data);

    // 반환된 오브젝트에 이름을 붙일 땐, $를 붙여 구분
    const $scriptList = $('script');
    let titles:string[] = [];

    console.log(';;;;', $scriptList)
    
    $scriptList.each((i, ele) => {
      titles.push($(ele).text());
    })

    console.log('titles;;;; before', titles);

    titles = titles.filter((str) => str.includes('swagger'));

    console.log('titles;;;; after', titles);


    const swaggerUrl = titles[0].split("var swaggerUrl = '")[1].split("';")[0];
    const swaggerJson = titles[0].split('var swaggerJson = `')[1].split("`;")[0];

    console.log('swaggerUrl',  swaggerUrl)
    console.log('swaggerJson',  swaggerJson)

    
    if(swaggerUrl){
      console.log('swaggerUrl 존재');
      axios.get(swaggerUrl)
            .then((res) => {
              console.log('res.data:  ', res.data);
              apiList.value = res.data;
              apiList.value.descs = Object.values(res.data.paths);
              apiList.value.paths = Object.keys(res.data.paths);
            })
            .catch((err) => {})

    } else if(swaggerJson) {
      console.log('swaggerJson 존재');
      const swaggerJsonData = JSON.parse(swaggerJson);
      // 객체 속성에 접근하는 방법 2가지
      // swaggerJsonData['basePath'] : 프로퍼티 이름을 문자열로 지정할 수 있기 때문에 변수를 사용하여 동적으로 프로퍼티에 접근 가능
      // swaggerJsonData.basePath : 프로퍼티 이름에 유효한 식별자만 사용 가능하므로 프로퍼티 이름이 유효한 식별자이고, 동적으로 접근할 필요가 없을 경우 사용
      apiList.value.basePath = swaggerJsonData['basePath'];
      apiList.value.host = swaggerJsonData['host'];
      apiList.value.info = swaggerJsonData['info'];
      apiList.value.paths = Object.keys(swaggerJsonData['paths']);
      apiList.value.swagger = swaggerJsonData['swagger'];
      apiList.value.descs = Object.values(swaggerJsonData['paths']);
      console.log(swaggerJsonData['paths']);

    } else {
      alert('swaggerUrl, swaggerJson이 존재하지 않아요🥲');
    }
  }).catch(err => {
    console.error(err);
  })
  
}
processData();

</script>
<style>
</style>
