import { ACCOUNT_DATA } from '../actions';

export default function( state= [], action ){
    switch(action.type){
        case ACCOUNT_DATA:
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