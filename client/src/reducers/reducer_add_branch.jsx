import { ADD_BRANCH } from '../actions';

export default function( state= [], action ){
    switch(action.type){
        case ADD_BRANCH:
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