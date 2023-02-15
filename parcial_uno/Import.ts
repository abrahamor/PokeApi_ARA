import axios from 'axios';

export const reqApi = axios.create({
    baseURL:'https://pokeapi.co/api/v2/pokemon/',
})

// export const wait2SecondsAsync = async (showresolve = true) =>{
//     const promise = new Promise((resolve,reject)=>{
//         setTimeout(()=>showresolve ? resolve('Promise succeeded') : reject('Promise error'),5000);
//     })
//     return promise;
// }