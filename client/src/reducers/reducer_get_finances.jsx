import { ACCOUNT_DATA, ACCOUNT_LIST, FINANCE, LOGIN, REGIS } from '../actions';

export default function( state= [], action ){
    switch(action.type){
        case FINANCE:
        return state.concat([action.payload.data]);
        case LOGIN:
        return state.concat([action.payload.data]);
        case REGIS:
        return state.concat([action.payload.data]);
        case ACCOUNT_LIST:
        return state.concat([action.payload.data]);
        case ACCOUNT_DATA:
        return state.concat([action.payload.data]);
        default:
        return state;
    }
}