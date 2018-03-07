import { h, Component } from 'preact';
import { route } from 'preact-router';
import Toolbar from 'preact-material-components/Toolbar';
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';
import Dialog from 'preact-material-components/Dialog';
import Switch from 'preact-material-components/Switch';
import 'preact-material-components/Switch/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Toolbar/style.css';
import style from './style';
// import style from './style';

export default class Header extends Component {
	closeDrawer() {
		this.drawer.MDComponent.open = false;
	}

	openDetail(){
		this.setState({
			btn_open: ( this.state.btn_open ? false : true )
		});
	}

	openDrawer = () => this.drawer.MDComponent.open = true;

	openSettings = () => this.dialog.MDComponent.show();

	drawerRef = drawer => (this.drawer = drawer);
	dialogRef = dialog => (this.dialog = dialog);

	linkTo = path => () => {
		route(path);
		this.closeDrawer();
	};

	goHome = this.linkTo('/');
	goToProduct = this.linkTo('/product');
	goToMyProfile = this.linkTo('/profile');
	goToRegister = this.linkTo('/register');
	goToInvoice = this.linkTo('/invoice');
	goToLogin = this.linkTo('/login');

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
				<Toolbar className="toolbar">
					<Toolbar.Row>
						<Toolbar.Section align-start>
							<Toolbar.Icon menu onClick={this.openDrawer}>
								menu
							</Toolbar.Icon>
							<Toolbar.Title>Preact app</Toolbar.Title>
						</Toolbar.Section>
						<Toolbar.Section align-end onClick={this.openSettings}>
							<Toolbar.Icon>settings</Toolbar.Icon>
						</Toolbar.Section>
					</Toolbar.Row>
				</Toolbar>
				<Drawer.TemporaryDrawer className={style.contohhhh} ref={this.drawerRef}>
					<div className={style.contoh}>
						<button className={style.contohh} onClick={this.openDetail.bind(this)}>Show Detail</button>
						<div className={ true ? (this.state.btn_open ? style.contohhh : style.contohhh_hidden) : this.setState({ btn_open: false })}>
							<button>Detail Contain</button>
						</div>
					</div>
					<Drawer.TemporaryDrawerContent>
						<List>
							<List.LinkItem onClick={this.goHome}>
								<List.ItemIcon>home</List.ItemIcon>
								Home
							</List.LinkItem>
							<List.LinkItem onClick={this.goToProduct}>
								<List.ItemIcon>list</List.ItemIcon>
								Product
							</List.LinkItem>
							<List.LinkItem onClick={this.goToMyProfile}>
								<List.ItemIcon>account_circle</List.ItemIcon>
								Profile
							</List.LinkItem>
							<List.LinkItem onClick={this.goToRegister}>
								<List.ItemIcon>edit</List.ItemIcon>
								Register
							</List.LinkItem>
							<List.LinkItem onClick={this.goToInvoice}>
								<List.ItemIcon>edit</List.ItemIcon>
								Invoice
							</List.LinkItem>
							<List.LinkItem onClick={this.goToLogin}>
								<List.ItemIcon>edit</List.ItemIcon>
								Login
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
