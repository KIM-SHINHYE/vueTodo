<template>
  <div class="openApi">
    <br>
    <input style="width:500px; height: 40px;" type="text" @keyup.enter="changeUri" v-model="uri">
    <br>
    <br>
    <h1>{{ apiList.info.title? apiList.info.title + 'API': 'URI 입력'}}</h1>
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
import { ref, watch, type Ref } from 'vue';

// let uri:Ref<string> = ref('');
let uri:Ref<string> = ref('https://www.data.go.kr/data/15001699/openapi.do#/tab_layer_detail_function');
// let uri:Ref<string> = ref('https://www.data.go.kr/data/15081808/openapi.do');

  
function changeUri(event:any){
  uri.value = event.target.value;
  processData();
  console.log('uri.value',uri.value);
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



const crawledData = async () => {
  try {
    
    return axios.get(uri.value);
  } catch(err) {
    console.error(err);
  }
}

const processData = async () => {
  const res = await crawledData(); 
  const $ = cheerio.load(res?.data);
  const scriptList = $('script');
  let titles:string[] = [];
  
  scriptList.each((i, ele) => {
    titles.push($(ele).text());
  })

  titles = titles.filter((str) => str.includes('swagger'));
  // 이 부분 콘솔에 데이터가 다 잡히나..
  // console.log(titles);

  const swaggerUrl = titles[0].split("var swaggerUrl = '")[1].split("';")[0];
  const swaggerJson = titles[0].split('var swaggerJson = `')[1].split("`;")[0];
  
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
    // apiList.value = swaggerJsonData;
    // apiList.value.paths = [];
    // apiList.value.descs = [];

    // for(const [key, value] of Object.entries(swaggerJsonData.paths)){
    //   console.log(`${key}: ${value}`);
    //   apiList.value.paths.push(key);
    //   apiList.value.descs.push(value);
    // }
    // console.log(apiList.value);
    // console.log(apiList.value.paths);
    // console.log(apiList.value.descs);



    // 2.
    apiList.value = swaggerJsonData;
    // Object.value() 메서드는 객체의 value들만 추출해서 배열로 반환
    // Object.keys() 메서드는 객체의 keys들만 추출해서 배열로 반환
    // 여기서 Object.values/keys 순서바꾸면 값을 못찾음
    // console.log('1', swaggerJsonData.paths);
    apiList.value.descs = Object.values(swaggerJsonData.paths);
    // console.log('values', Object.values(swaggerJsonData.paths))
    // console.log('keys', Object.keys(swaggerJsonData.paths))
    // console.log('2', swaggerJsonData.paths);
    
    apiList.value.paths = Object.keys(swaggerJsonData.paths);
    // console.log('2-1', swaggerJsonData.paths);

    // console.log('values', Object.values(swaggerJsonData.paths))
    // console.log('keys', Object.keys(swaggerJsonData.paths))
    // console.log('3', swaggerJsonData.paths);

    // 1. 
    // apiList.value.basePath = swaggerJsonData['basePath'];
    // apiList.value.host = swaggerJsonData['host'];
    // apiList.value.info = swaggerJsonData['info'];
    // apiList.value.paths = Object.keys(swaggerJsonData['paths']);
    // apiList.value.swagger = swaggerJsonData['swagger'];
    // apiList.value.descs = Object.values(swaggerJsonData['paths']);
    // console.log(swaggerJsonData['paths']);

  } else {
    alert('')
  }
}
processData();


// 이렇게 나눠서 한 이유?
// const popData = () => {
//   processData();
// }
// onMounted(() => {
//   popData();
// })

</script>
<style>
@media (min-width: 1024px) {
  .openApi {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
