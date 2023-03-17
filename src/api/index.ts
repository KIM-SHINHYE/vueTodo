import axios from 'axios'

// TODO: then, catch 사용 가능한지 확인
// async await사용하려면 Promise타입으로 지정해줘야 함
// then catch는 비동기를 위해서 만들어짐, try catch는 동기, 비동기 둘 다 지원 
export async function fetchData():Promise<any[]> {
    try {
        const response = await axios.get('https://reqres.in/api/users?page=2');
        return Promise.resolve(response.data);
    } catch (error) {
        console.log(error)
        return Promise.reject()
    }
}