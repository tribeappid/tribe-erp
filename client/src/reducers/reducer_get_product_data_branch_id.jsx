import { GET_PRODUCT_DATA_BRANCH_ID } from '../actions';

export default function( state= [], action ){
    switch(action.type){
        case GET_PRODUCT_DATA_BRANCH_ID:{
            if(action.payload.data){
                return action.payload.data.Data;
            }
            else{
                return state;
            }
        }
        default:
        return state;
    }
}