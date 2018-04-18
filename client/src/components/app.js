import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Provider } from 'preact-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reducers from '../reducers';

import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';
import Login from '../routes/login';
import Register from '../routes/register';
import Product from '../routes/product';
import Invoice from '../routes/invoice';
import AddInvoice from '../routes/invoice_add';
import StaffManage from '../routes/staff_management';
import Accounting from '../routes/accounting';
import StaffManageView from '../routes/staff_manage_view';
import ItemProductView from '../routes/product_item_view';
import AddStaff from '../routes/add_staff_management';
import Branches from '../routes/branches';
import BranchView from '../routes/branches_view';
import AddBranch from '../routes/add_branch';
import EditStaff from '../routes/edit_staff_management';
import LoadingScreen from './loading_screen';
import EditBranch from '../routes/edit_branch';
import ProductList from '../routes/product_list';
import AddProduct from '../routes/add_product';
import EditProduct from '../routes/edit_product';
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		const createStoreWithMiddleWare = applyMiddleware(promise)(createStore);

		return (
			<Provider store={createStoreWithMiddleWare(reducers)}>
			<div id="app">
				<LoadingScreen/>
				<Header/>
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Register path='/register'/>
					<Login path='/login'/>
					<AddInvoice path='/sales/management/add'/>
					<Invoice path="/sales/management"/>
					<Accounting path="/accounting"/>
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
					<Login path="/purchase/management" />
					<StaffManage path="/staff/management"/>
					<StaffManageView path='/staff/management/view/profile/:id'/>
					<AddStaff path='/staff/management/add'/>
					<EditStaff path='/staff/management/edit/:id'/>
					<Branches path='/branches'/>
					<BranchView path='/branches/view/:id'/>
					<AddBranch path='/branches/add'/>
					<EditBranch path='/branches/edit/:id'/>
					<Product path="/manager/product"/>
					<ProductList path='/manager/product/list'/>
					<ItemProductView path='/manager/product/view/:id'/>
					<AddProduct path='/manager/product/add'/>
					<EditProduct path='/manager/product/edit/:id'/>
				</Router>
			</div>
			</Provider>
		);
	}
}
