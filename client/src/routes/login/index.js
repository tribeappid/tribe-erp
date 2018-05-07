import { h, Component } from 'preact';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import TextField from 'preact-material-components/TextField';
import Card from 'preact-material-components/Card';
import Button from 'preact-material-components/Button';
import Elevation from 'preact-material-components/Elevation';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/TextField/style.css';
import 'preact-material-components/Elevation/style.css';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/LayoutGrid/style.css';
import style from './style.css';
import { login } from '../../actions';
import { connect } from 'preact-redux';
import { route } from 'preact-router';

class Login extends Component {
	state={
		user:{
			AuthenticationString: "",
			Password: ""
		},
		submitted: false,
		loginSuccess: false,
		loginFail: false,
	};

	handleInput(term){
		const target = term.__preactattr_.name;
		const newUser = this.state.user;
		this.setState({
			user:{
				...newUser,
				[target]: term.value
			}
		});
	}

	validateEmail(email){
		return(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
	}

	validatePassword(password){
		return(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password));
		//at least contain 1 upper 1 lower and 1 number and 6 character or more
	}

	successCallback(){
		this.setState({loginSuccess: true});
	}
	
	failCallback(){
		this.setState({loginFail: true});
	}

	handleSubmit(event){
		event.preventDefault();
		this.setState({submitted: true});
		if(this.state.user.AuthenticationString && this.state.user.Password){
			if(this.validateEmail(this.state.user.AuthenticationString)){
				this.props.login(this.state.user,this.successCallback.bind(this),this.failCallback.bind(this));
				document.getElementById("loadingScreen").hidden = false;
			}
			else{
				alert("Wrong Email Format");
			}
		}
	}

	loginResult(){
		if(this.state.loginSuccess){
			document.getElementById("headerToolbar").hidden = false;
			document.getElementById("mainBackground").background = `#ffffff`;
			route('/staff/management');
			document.getElementById("loadingScreen").hidden = true;
		}
		else if(this.state.loginFail){
			this.setState({loginFail:false});
			alert("Login Fail");
			document.getElementById("loadingScreen").hidden = true;
		}
	}

	render({ finance },{ user, submitted }){
		document.getElementById("headerToolbar").hidden = true;
		this.loginResult();
		return (
			<div>
				<LayoutGrid id="mainBackground" style={`width: 100%;height: 100%;padding:0px!important;background: #1abc9c;`}>
					<LayoutGrid.Inner>
						<LayoutGrid.Cell desktopCols="3" tabletCols="2" phoneCols="4"/>
						<LayoutGrid.Cell desktopCols="6" tabletCols="4" phoneCols="4">
							<div align="center">
								<img style={`width: 110px;height:150px;margin-top:20px;`} src="/images/tribe_logo.png"/>
							</div>
							<div className={style.name} align="center">TRIBE APP</div>
							<Elevation z={2}>
								<form onSubmit={this.handleSubmit.bind(this)}>
								<Card style={`border-radius: 10px;`}>
									<a className={style.title} align="center">LOGIN</a>
									<div className={style.input_group}>
										<label>Email</label><br/>
										<input name="AuthenticationString" value={user.AuthenticationString} onChange={ event => this.handleInput(event.target)} type="text" placeholder="Email"/>
									</div>
									<div className={style.input_group}>
										<label>Password</label><br/>
										<input name="Password" value={user.Password} onChange={ event => this.handleInput(event.target)} type="password" placeholder="Password"/>
									</div>
									<div>
										<div className={style.checkbox_group} style={`float: left;`}>
											<input id="checkbox" type="checkbox"/>
											<label for="checkbox">Remember Me</label>
										</div>
										<div className={style.link_word} style={`float: right`}>
											<a>Forget Password</a>
										</div>
									</div>
									<button type="submit" className={style.sign_in_btn}>SIGN IN</button>
								</Card>
								</form>
							</Elevation>
						</LayoutGrid.Cell>
						<LayoutGrid.Cell desktopcols="3" tabletCols="2" phoneCols="4"/>
					</LayoutGrid.Inner>
				</LayoutGrid>
			</div>
		);
	}
}

function mapStateToProps(finance){
	return { finance };
}

export default connect( mapStateToProps, { login })(Login);