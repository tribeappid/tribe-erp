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
					<Invoice path="/invoice"/>
					<AddInvoice path="/invoice/add"/>		
					<Product path="/product"/>
					<Register path="/register"/>
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
					<Login path="/login" />
				</Router>
			</div>
			</Provider>
		);
	}
}
