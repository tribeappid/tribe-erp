import axios from 'axios';

export const FINANCE = 'finances';
export const LOGIN = 'login';
export const REGIS = 'register';
export const ACCOUNT_LIST = 'accounts_data_list';
export const ACCOUNT_DATA = 'accounts_personal_data';
export const BRANCH_LIST = 'branch_list';
export const GET_PICTURE = 'get_picture';
export const POST_PICTURE = 'post_picture';

const ROOT_URL = 'http://localhost:3000/';
const ENTERPRISE_ID = '43GSMTI3-5KBX0YYP-EQNZ4DSZ';

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

export function getAccountList(){
    const req = axios.get(`${ROOT_URL}accounts/list`);
    
    return{
        type: ACCOUNT_LIST,
        payload: req
    }
}

export function getAccountData(entity_id){
    const req = axios.get(`${ROOT_URL}accounts/profile?EntityId=${entity_id}`);

    return{
        type: ACCOUNT_DATA,
        payload: req
    }
}

export function getBranchList(){
    const req = axios.get(`${ROOT_URL}admin/getBranch?EnterpriseId=${ENTERPRISE_ID}`);

    return{
        type: BRANCH_LIST,
        payload: req
    }
}

export function uploadPicture(dataPicture,dataForm){
    console.log('call uploadPicture');
    console.log(dataPicture);
    /*const req = axios.post(`${ROOT_URL}accounts/userprofile`,dataPicture)
    .catch(error => {
        console.log(error);
    }); */
    //const req = axios.post(`${ROOT_URL}accounts/userprofile`,dataPicture,dataForm);
    const req = axios.put(`${ROOT_URL}accounts/userprofile`,dataPicture,dataForm);
    /*const reqq = axios.post(`${ROOT_URL}accounts/userprofile`,dataPicture,{
        headers:{
            'Content-Type' : `multiple/form-data; boundary=${dataPicture._boundary}`
        }
    }); */
    console.log(req);

    return{
        type: POST_PICTURE,
        payload: req
    }
}

export function getPicture(entityId){
    const req = axios.get(`${ROOT_URL}accounts/userprofile?EntityId=${entityId}`);

    return{
        type: GET_PICTURE,
        payload: req
    }
}