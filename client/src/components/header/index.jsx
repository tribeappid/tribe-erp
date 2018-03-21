import { h, Component } from 'preact';
import { route } from 'preact-router';
import Toolbar from 'preact-material-components/Toolbar';
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';
import Dialog from 'preact-material-components/Dialog';
import Switch from 'preact-material-components/Switch';
import Menu from 'preact-material-components/Menu';
import 'preact-material-components/Switch/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Toolbar/style.css';
import 'preact-material-components/Menu/style.css';
import style from './style';

export default class Header extends Component {
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

	closeProfileDetail(){
		this.menu.MDComponent.open = false;
	}

	openDetail(){
		this.setState({
			btn_open: ( this.state.btn_open ? false : true )
		});
	}

	openProfileDetail = () => {
		this.menu.MDComponent.open = true;
		const closeDropDown = this.state.temp;
		this.setState({
			dropdown: closeDropDown
		})
	}

	dropDownToggle(){
		const existData = this.state.temp;
		this.menu.MDComponent.open = false;
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
		this.closeProfileDetail();
	};

	goToDashboard = this.linkTo('/');
	goToStaffManage = this.linkTo('/staff/management');
	goToProductManager = this.linkTo('/manager/product');
	goToSalesManage = this.linkTo('/sales/management');
	goToPurchaseManage = this.linkTo('/purchase/management');
	goToAccounting = this.linkTo('/accounting');
	goToBranches = this.linkTo('/branches');

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

	render({}, {}) {
		return (
			<div>
				<Toolbar>
					<Toolbar.Row>
						<Toolbar.Section align-start>
							<Toolbar.Icon menu onClick={this.openDrawer}>
								menu
							</Toolbar.Icon>
							<Toolbar.Title>Tribe-Erp</Toolbar.Title>
						</Toolbar.Section>
						<Toolbar.Section align-end onClick={this.openSettings}>
							<Toolbar.Icon>settings</Toolbar.Icon>
						</Toolbar.Section>
					</Toolbar.Row>
				</Toolbar>
				<Drawer.TemporaryDrawer className={style.navbar_drawer} ref={this.drawerRef}>
					<Menu.Anchor>
         				<div className={style.profile_toggle} onClick={this.openProfileDetail}>
						 	<div><List.ItemIcon>home</List.ItemIcon></div>
							<div><a>Click for menu</a></div>
          				</div>
          				<Menu className={style.profile_detail} ref={this.menuRef}>
            				Detail
          				</Menu>
        			</Menu.Anchor>
					<Drawer.TemporaryDrawerContent className={style.menu_list}>
						<List>
							<List.LinkItem name="accounting" onClick={this.dropDownToggle.bind(this)}>
								<List.ItemIcon>edit</List.ItemIcon>
								Accounting
							</List.LinkItem>
							<div className={this.state.dropdown.accounting.clicked ? '' : style.hided} onClick={this.goToAccounting}>
								Contoh<br/><br/><br/><br/>
							</div>
							<List.LinkItem onClick={this.goToBranches}>
								<List.ItemIcon>edit</List.ItemIcon>
								Branches
							</List.LinkItem>
							<List.LinkItem onClick={this.goToDashboard}>
								<List.ItemIcon>home</List.ItemIcon>
								Dashboard
							</List.LinkItem>
							<List.LinkItem name="product" onClick={this.dropDownToggle.bind(this)}>
								<List.ItemIcon>account_circle</List.ItemIcon>
								Product Manager
							</List.LinkItem>
							<div className={this.state.dropdown.product.clicked ? '' : style.hided} onClick={this.goToProductManager}>
								Contoh<br/><br/><br/><br/>
							</div>
							<List.LinkItem onClick={this.goToPurchaseManage}>
								<List.ItemIcon>edit</List.ItemIcon>
								Purchase Management
							</List.LinkItem>
							<List.LinkItem onClick={this.goToSalesManage}>
								<List.ItemIcon>edit</List.ItemIcon>
								Sales Management
							</List.LinkItem>
							<List.LinkItem onClick={this.goToStaffManage}>
								<List.ItemIcon>list</List.ItemIcon>
								Staff Management
							</List.LinkItem>
						</List>
					</Drawer.TemporaryDrawerContent>
				</Drawer.TemporaryDrawer>
				<Dialog ref={this.dialogRef}>
					<Dialog.Header>Settings</Dialog.Header>
					<Dialog.Body>
						<div>
							Enable dark theme <Switch onClick={this.toggleDarkTheme} />
						</div>
					</Dialog.Body>
					<Dialog.Footer>
						<Dialog.FooterButton accept>okay</Dialog.FooterButton>
					</Dialog.Footer>
				</Dialog>
			</div>
		);
	}
}
