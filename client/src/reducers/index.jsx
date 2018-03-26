import { combineReducers } from 'redux';
import FinanceReducer from './reducer_get_finances.jsx';
import AccountDataReducer from './reducer_account_data';
import AccountListReducer from './reducer_account_list';
import RegisterResponseReducer from './reducer_register_response';

const rootReducer = combineReducers({
    accountData: AccountDataReducer,
    accountList: AccountListReducer,
    finances: FinanceReducer,
    registerResponse: RegisterResponseReducer
});

export default rootReducer;