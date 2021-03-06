import { h, Component } from 'preact';
import { route } from 'preact-router';
import Toolbar from 'preact-material-components/Toolbar';
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';
import Dialog from 'preact-material-components/Dialog';
import Switch from 'preact-material-components/Switch';
import Menu from 'preact-material-components/Menu';
import Icon from 'preact-material-components/Icon';
import 'preact-material-components/Switch/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Toolbar/style.css';
import 'preact-material-components/Menu/style.css';
import 'preact-material-components/Icon/style.css';
import style from './style';
import { connect } from 'preact-redux';
import _ from 'lodash';

class Header extends Component {
	state={
		dropdown:{
			accounting:{
				clicked: false
			},
			product:{
				clicked: false
			}
		},
		temp:{
			accounting:{
				clicked: false
			},
			product:{
				clicked: false
			}
		}
	}

	closeDrawer() {
		this.drawer.MDComponent.open = false;
	}

	openDetail(){
		this.setState({
			btn_open: ( this.state.btn_open ? false : true )
		});
	}

	openProfileDetail = () => {
		console.log(this.menu.MDComponent.open);
		this.menu.MDComponent.open = !(this.menu.MDComponent.open);
		const closeDropDown = this.state.temp;
		this.setState({
			dropdown: closeDropDown
		})
	}

	dropDownToggle(){
		const existData = this.state.temp;
		this.setState({
			dropdown:{
				...existData,
				[event.target.__preactattr_.name]:{
					clicked: ( this.state.dropdown[event.target.__preactattr_.name].clicked ? false : true )
				}
			}
		});
	}

	openDrawer = () => {
		this.drawer.MDComponent.open = true;
		const tempp = this.state.temp;
		this.setState({
			dropdown: tempp
		})
	}

	openSettings = () => this.dialog.MDComponent.show();

	drawerRef = drawer => (this.drawer = drawer);
	dialogRef = dialog => (this.dialog = dialog);
	menuRef = menu => (this.menu = menu);

	linkTo = path => () => {
		route(path);
		this.closeDrawer();
	};

	goToLogin = this.linkTo('/');
	goToStaffManage = this.linkTo('/staff/management');
	goToProductManager = this.linkTo('/manager/product');
	goToSalesManage = this.linkTo('/sales/management');
	goToAccounting = this.linkTo('/accounting');
	goToBranches = this.linkTo('/branches');
	goToProductList = this.linkTo('/manager/product/list');

	toggleDarkTheme = () => {
		this.setState(
			{
				darkThemeEnabled: !this.state.darkThemeEnabled
			},
			() => {
				if (this.state.darkThemeEnabled) {
					document.body.classList.add('mdc-theme--dark');
				}
				else {
					document.body.classList.remove('mdc-theme--dark');
				}
			}
		);
	}

	checkingEvent(){
		const target = event.target.__preactattr_.branchId;
		console.log(target);
	}

	render({dataReducer}, {}) {
		return (
			<div id="headerToolbar">
				<Toolbar>
					<Toolbar.Row>
						<Toolbar.Section align-start>
							<Toolbar.Icon menu onClick={this.openDrawer}>
								menu
							</Toolbar.Icon>
							<Toolbar.Title>Tribe-Erp</Toolbar.Title>
						</Toolbar.Section>
					</Toolbar.Row>
				</Toolbar>
				<Drawer.TemporaryDrawer className={style.navbar_drawer} ref={this.drawerRef}>
					<Drawer.TemporaryDrawerContent className={style.menu_list}>
						<List>
							<List.LinkItem className={style.mainMenu} onClick={this.goToBranches}>
								<Icon>home</Icon>
								Branches
							</List.LinkItem>
							<List.LinkItem className={style.mainMenu} name="product" onClick={this.dropDownToggle.bind(this)}>
								<Icon>account_circle</Icon>
								Product Management
							</List.LinkItem>
							<div className={this.state.dropdown.product.clicked ? '' : style.hided}>
								<div className={this.state.dropdown.product.clicked ? style.subMenuItems : ''} onClick={this.goToProductList}>
									<Icon>home</Icon>
									<div className={style.subMenuItem}>Product List</div>
								</div>
							</div>
							<List.LinkItem className={style.mainMenu} onClick={this.goToStaffManage}>
								<Icon>list</Icon>
								Staff Management
							</List.LinkItem>
							<List.LinkItem className={style.mainMenu} onClick={this.goToLogin}>
								<Icon>exit_to_app</Icon>
								Logout
							</List.LinkItem>
						</List>
					</Drawer.TemporaryDrawerContent>
				</Drawer.TemporaryDrawer>
			</div>
		);
	}
}

function mapStateToProps(dataReducer){
	return {dataReducer};
}

export default connect(mapStateToProps,"")(Header);