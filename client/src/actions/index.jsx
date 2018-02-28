import axios from 'axios';

export const FINANCE = 'finances';
export const LOGIN = 'login';
export const REGIS = 'register';

const ROOT_URL = 'http://localhost:3000/';

export function getFinances(){
    const req = axios.get(`${ROOT_URL}finances`);

    return{
        type: FINANCE,
        payload: req
    };
}

export function login(user){
    const req = axios.post(`${ROOT_URL}accounts/login`, user);

    return{
        type: LOGIN,
        payload: req
    }
}


export function register(user){
    const req = axios.post(`${ROOT_URL}accounts/register`,user);

    return{
        type: REGIS,
        payload: req
    }
}