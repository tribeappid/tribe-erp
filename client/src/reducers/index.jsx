import { combineReducers } from 'redux';
import FinanceReducer from './reducer_get_finances.jsx';
import AccountDataReducer from './reducer_account_data';
import AccountListReducer from './reducer_account_list';
import RegisterResponseReducer from './reducer_register_response';
import PostPictureReducer from './reducer_post_picture';
import BranchListReducer from './reducer_branch_list';
import AddBranchResponse from './reducer_add_branch';
import BranchDataReducer from './reducer_branch_data';
import ProductDataBranchId from './reducer_get_product_data_branch_id';
import ProductDataDetailReducer from './reducer_get_product_detail';

const rootReducer = combineReducers({
    accountData: AccountDataReducer,
    accountList: AccountListReducer,
    finances: FinanceReducer,
    registerResponse: RegisterResponseReducer,
    addBranchResponse: AddBranchResponse,
    pictureData: PostPictureReducer,
    branchList: BranchListReducer,
    branchData: BranchDataReducer,
    productData: ProductDataBranchId,
    productDataDetail: ProductDataDetailReducer
});

export default rootReducer;