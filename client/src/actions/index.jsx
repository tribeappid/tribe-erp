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
export const ADD_BRANCH = 'add_branch';
export const DELETE_BRANCH = 'delete_branch';
export const BRANCH_DATA = 'branch_data';
export const UPDATE_BRANCH = 'update_branch';
export const GET_PRODUCT_DATA_BRANCH_ID = 'get_product_data_branch_id';

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

export function deleteAccount(user){
    const req = axios.post(`${ROOT_URL}accounts/delete`,user);

    return{
        type: DELETE_ACCOUNT,
        payload: req
    }
}

export function updateProfile(dataForm,successCallback, failCallback){
    const req = axios.post(`${ROOT_URL}accounts/update`,dataForm).then(response => {
        if(!response.Error){
            successCallback();
        }
    }).catch(error =>{
        if(error.response.Error){
            failCallback();
        }
    });

    return{
        type: UPDATE_ACCOUNT,
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

export function addBranchData(user){
    const req = axios.post(`${ROOT_URL}admin/addBranch`,user).then(response => {return response}).catch(error => {return error.response});

    return{
        type: ADD_BRANCH,
        payload: req
    }
}

export function deleteBranchData(user,successCallback){
    const req = axios.post(`${ROOT_URL}admin/deleteBranch`,user).then(response=>{
        if(!response.data.Error){
            successCallback();
        }
    }).catch(error=>{
        console.log(error.response);
    });

    console.log(req);

    return{
        type: DELETE_BRANCH,
        payload: req
    }
}

export function getBranchData(entityId){
    const req = axios.get(`${ROOT_URL}admin/getBranch?BranchId=${entityId}`);

    return{
        type: BRANCH_DATA,
        payload: req
    }
}

export function updateBranch(user,successCallback,failCallback){
    const req = axios.post(`${ROOT_URL}admin/updateBranch`,user).then(response=>{
        if(!response.data.Error){
            successCallback();
        }
    }).catch(error =>{
        console.log(error.response);
    });

    return{
        type: UPDATE_BRANCH,
        payload: req
    }
}

export function uploadPicture(dataEntity,dataForm){
    dataForm.append('EntityId', dataEntity.EntityId);
    console.log(dataForm);
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

export function getProductDataBranch(branchId){
    const req = axios.get(`${ROOT_URL}products/list?BranchId=${branchId}`).then(response => {console.log(response);return response}).catch(error => {console.log(error.response);return error.response});

    return{
        type: GET_PRODUCT_DATA_BRANCH_ID,
        payload: req
    }
}

export function getProductAll(){
    const req = axios.get(`${ROOT_URL}products/list`).then(response =>{console.log(response);return response}).catch(error =>{console.log(error.response);return error.response});

    return{
        type: GET_PRODUCT_DATA_BRANCH_ID,
        payload: req
    }
}