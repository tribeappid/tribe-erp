import { combineReducers } from 'redux';
import FinanceReducer from './reducer_get_finances.jsx';

const rootReducer = combineReducers({
    finances: FinanceReducer
});

export default rootReducer;