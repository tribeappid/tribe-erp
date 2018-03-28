import { POST_PICTURE } from '../actions';

export default function( state= [], action ){
    switch(action.type){
        case POST_PICTURE:
            if(action.payload){
                return action.payload;
            }
            else{
                return state;
            }
        default:
        return state;
    }
}