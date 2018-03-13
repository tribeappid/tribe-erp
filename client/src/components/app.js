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
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Invoice path="/sales/management"/>
					<AddInvoice path='/sales/management/add'/>
					<Accounting path="/accounting"/>	
					<Product path="/manager/product"/>
					<StaffManage path="/staff/management"/>
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
					<Login path="/purchase/management" />
					<Register path='/register'/>
					<Login path='/login'/>
					<StaffManageView path='/staff/management/:id'/>
				</Router>
			</div>
			</Provider>
		);
	}
}
