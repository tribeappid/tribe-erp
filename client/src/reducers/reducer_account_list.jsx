import { ACCOUNT_LIST } from '../actions';

export default function( state= [], action ){
    switch(action.type){
        case ACCOUNT_LIST:
        if(action.payload.data){
            return action.payload.data.Data;
        }
        else{
            return state;
        }
        default:
        return state;
    }
}