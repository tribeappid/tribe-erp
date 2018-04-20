import { GET_PRODUCT_DETAIL } from '../actions';

export default function( state= [], action ){
    switch(action.type){
        case GET_PRODUCT_DETAIL:
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