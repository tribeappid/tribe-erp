import { ACCOUNT_LIST } from '../actions';

export default function( state= [], action ){
    switch(action.type){
        case ACCOUNT_LIST:
        return (action.payload.data.Data);
        default:
        return state;
    }
}