import axios from 'axios'

// Promise객체를 핸들링하기 위해서 then, catch를 필수로 사용해야함
// async await사용하려면 Promise타입으로 지정해줘야 함(반환 자체를 Promise타입으로 하기 때문) => 근데 애초에 promise객체 자체를 반환해주는데 굳이 return을 promise.resolve, promise.reject를 할 필요가 있나
// then catch는 비동기를 위해서 만들어짐, try catch는 동기, 비동기 둘 다 지원(하지만 catch블록에서 반환하는 것은 Promise객체-rejected) 
// export async function fetchData():Promise<any[]> {
//     try {
//         // const response = await axios.get('https://reqres.in/api/users?page=2'); 이런식으로 https:// ~ api까지는 같을테니 baseUrl로 가져가는 거
//         const response = await axios.get('https://reqres.in/api/users?page=2');

//         return Promise.resolve(response.data);
//     } catch (error) {
//         console.log(error)
//         return Promise.reject()
//     }
// }

// async/await는 Promise객체 자체를 반환하기 때문에 성공/실패 - Promise.resolve, Promise.reject를 반환, 하지만 해당 함수를 호출하는 곳에서 에러 핸들링(ShowUserList에서 1,2번에 해당)을 해준다면 안써줘도 되긴 함 => 그치만 명시적으로 써주는게 좋음
export async function fetchData(): Promise<any[]>{
    // const response = await axios.get('https://reqres.in/api/users?page=2');
    // console.log('response',response);
    // return response.data.data;
    try {
        // const response = await axios.get('https://reqres.in/api/users?page=2'); 이런식으로 https:// ~ api까지는 같을테니 baseUrl로 가져가는 거
        const response = await axios.get('https://reqres.in/api/users?page=2');
        console.log('response',response)
        return response.data.data;
        // return Promise.resolve(response.data.data);
    } catch (error) {
        console.log(error)
        return Promise.reject()
    }
}



// export async function registerUser() {
//     try {

//     } catch(error) {

//     }
// }

