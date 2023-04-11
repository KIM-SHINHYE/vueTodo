<template>
  <div class="openApi">
    <h1>API</h1>
    <h2>{{ apiList.info.title }}</h2>
    <h3>: {{ apiList.info.description }}</h3>
    <br>
    <p><a :href="'https://'+ apiList.host + apiList.basePath">Base_URL: https://{{ apiList.host + apiList.basePath }}</a></p>
    <p>BasePath: {{ apiList.basePath? apiList.basePath: 'X'}}</p>
    <p>Host: {{ apiList.host }}</p>
    <p>Swagger: {{ apiList.swagger }}</p>
    <br>
    <div v-for="(api, i) in apiList.paths" :key="i">

      <h3>API{{ i+1 }}: {{ apiList.paths[i] }}</h3>
      <!-- 
        - 타입스크립트는 외부 라이브러리의 타입을 미리 알 수 없기 때문에 타입에러 발생 가능성 존재. 
        - 이 때, as any를 사용함으로써 타입 체크 무시하고 코드를 실행하겠다는 의미
        - apiList.descs[i]가 동적인 데이터일 가능성이 있기 때문에 as any를 써줌으로써 타입 쳌크를 무시하고 .get.summary속서에 접근 가능
      -->
      <p>{{ (apiList.descs[i] as any).get.summary }}</p>
      <br>
    </div>
  </div>
</template>
<script setup lang="ts">
import cheerio from 'cheerio';
import axios from 'axios';
import { ref, type Ref } from 'vue';

const uri = 'https://www.data.go.kr/data/15043184/openapi.do#/';

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
  descs: string[]
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
    return axios.get(uri);
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

  // console.log(swaggerUrl);
  // console.log(swaggerJson);

  const swaggerJsonData = JSON.parse(swaggerJson);
  // console.log(swaggerJsonData);

  if(swaggerUrl){
    // console.log('swaggerUrl 존재');
  } else if(swaggerJson) {
    // console.log('swaggerJson 존재');
    apiList.value.basePath = swaggerJsonData['basePath'];
    apiList.value.host = swaggerJsonData['host'];
    apiList.value.info = swaggerJsonData['info'];
    apiList.value.paths = Object.keys(swaggerJsonData['paths']);
    apiList.value.swagger = swaggerJsonData['swagger'];
    apiList.value.descs = Object.values(swaggerJsonData['paths']);
    // apiList.value.paths = apiList.value.paths.;
    // console.log(Object.values(apiList.value.paths));
    // console.log(Object.keys(apiList.value.paths));

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
