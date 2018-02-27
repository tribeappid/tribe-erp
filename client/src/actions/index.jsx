import axios from 'axios';

export const FINANCE = 'finances';
export const LOGIN = 'login';
export const REGIS = 'register';

const ROOT_URL = 'http://localhost:3000/';

export function getFinances(){
    const req = axios.get(`${ROOT_URL}finances`);
    console.log(req);

    return{
        type: FINANCE,
        payload: req
    };
}

export function login(user){
    const req = axios.post(`${ROOT_URL}accounts/login`,user);
    console.log(req);

    return{
        type: LOGIN,
        payload: req
    }
}

export function logintemp(data){
    fetch(`${ROOT_URL}login`, {
        method: "POST",
        body:  JSON.stringify(data)
     })
     .then(function(response){ 
      return response.json();   
     })
     .then(function(data){ 
     console.log(data)
     });
}

export function register(user){
    const req = axios.post(`${ROOT_URL}accounts/register`,user);
    console.log(req);

    return{
        type: REGIS,
        payload: req
    }
}