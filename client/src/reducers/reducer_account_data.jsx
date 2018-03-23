import { ACCOUNT_DATA } from '../actions';

export default function( state= [], action ){
    switch(action.type){
        case ACCOUNT_DATA:
        return action.payload.data.Data;
        default:
        return state;
    }
}