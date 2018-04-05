import axios from 'axios';

export const FINANCE = 'finances';
export const LOGIN = 'login';
export const REGIS = 'register';
export const ACCOUNT_LIST = 'accounts_data_list';
export const ACCOUNT_DATA = 'accounts_personal_data';
export const BRANCH_LIST = 'branch_list';
export const GET_PICTURE = 'get_picture';
export const POST_PICTURE = 'post_picture';
export const DELETE_ACCOUNT = 'delete_account';
export const UPDATE_ACCOUNT = 'update_account';

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
    console.log(user)
    const req = axios.post(`${ROOT_URL}accounts/register`,user).then(response => {return response})
    .catch(error => {return error.response});

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

export function uploadPicture(dataEntity,dataForm){
    dataForm.append('EntityId', dataEntity.EntityId);
    const req = axios.post(`${ROOT_URL}accounts/userprofile`,dataForm).then(response => {return response})
    .catch(error => {return error.response});

    return{
        type: POST_PICTURE,
        payload: req
    }
}

export function getPicture(entityId){
    const req = axios.get(`${ROOT_URL}accounts/userprofile?EntityId=${entityId}`).then(response => {return response}).catch(error => console.log(error));

    console.log(req);

    return{
        type: GET_PICTURE,
        payload: req
    }
}

export function deleteAccount(entityId){
    const req = axios.post(`${ROOT_URL}accounts/delete`,entityId);

    return{
        type: DELETE_ACCOUNT,
        payload: req
    }
}

export function updateProfile(user){
    const req = axios.post(`${ROOT_URL}accounts/update`,user);

    return{
        type: UPDATE_ACCOUNT,
        payload: req
    }
}