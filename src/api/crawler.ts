import axios from 'axios';

export async function crawlData(uri:string) {
    try{
        
        return await axios.get(uri)
    }
    catch(err){
        return Promise.reject(new Error('URL DOES NOT EXIST.'))
    }
}