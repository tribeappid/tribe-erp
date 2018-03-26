import { REGIS } from '../actions';

export default function( state= [], action ){
    switch(action.type){
        case REGIS:{
            if(action.payload.data){
                return action.payload.data;
            }
            else{
                return state;
            }
        }
        default:
        return state;
    }
}