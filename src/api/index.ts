import axios from 'axios'

// Promise객체를 핸들링하기 위해서 then, catch를 필수로 사용해야함
// async await사용하려면 Promise타입으로 지정해줘야 함(반환 자체를 Promise타입으로 하기 때문)
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

// TODO: 질문: 여기서 .data를 한 번만 쓰면 proxy객체가 나오는데 나는 배열만 필요하니까 아예 정제해서 보내주는게 맞는거겠지?
export async function fetchData(): Promise<any[]>{
    try {
        // const response = await axios.get('https://reqres.in/api/users?page=2'); 이런식으로 https:// ~ api까지는 같을테니 baseUrl로 가져가는 거
        const response = await axios.get('https://reqres.in/api/users?page=2');
        return Promise.resolve(response.data.data);
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

