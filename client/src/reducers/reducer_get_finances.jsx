import { FINANCE } from '../actions';

export default function( state= [], action ){
    switch(action.type){
        case FINANCE:
        return state.concat([action.payload.data]);
        default:
        return state;
    }
}