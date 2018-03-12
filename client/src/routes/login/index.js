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

class Login extends Component {
	state={
		user:{
			AuthenticationString: "",
			Password: ""
		},
		submitted: false
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

	handleSubmit(event){
		event.preventDefault();
		this.setState({submitted: true});
		if(this.state.user.AuthenticationString && this.state.user.Password){
			if(this.validateEmail(this.state.user.AuthenticationString) && this.validatePassword(this.state.user.Password)){
				this.props.login(this.state.user);
			}
		}
	}

	render({ finance },{ user, submitted }){
		return (
			<div>
				<LayoutGrid align="center">
					<LayoutGrid.Inner>
						<LayoutGrid.Cell cols="4" />
						<LayoutGrid.Cell cols="3">
							<Elevation z={2}>
								<Card>
									<Card.Primary className="mdc-theme--secondary-bg">
										<Card.Title className="mdc-typography--headline mdc-theme--text-primary-on-secondary">Login</Card.Title>
									</Card.Primary>
									<Card.Media className="mdc-typography--title">
										<form onSubmit={this.handleSubmit.bind(this)}>
											<TextField type="text" label="Email" name="AuthenticationString" value={user.AuthenticationString} onChange={ event => this.handleInput(event.target)} />
											<div align='left' className={ submitted && !user.AuthenticationString ? style.has_error : ( this.validateEmail(user.AuthenticationString) ? style.has_valid : style.has_error ) }>
												{ submitted && !user.AuthenticationString ? 'You must fill this field' : ( submitted && !this.validateEmail(user.AuthenticationString) ? 'You have input an invalid Email' : '' ) }
											</div>
											<TextField type="password" label="Password" name="Password" value={user.Password} onChange={ event => this.handleInput(event.target)} />
											<div align='left' className={ submitted && !user.Password ? style.has_error : ( this.validatePassword(user.Password) ? style.has_valid : style.has_error ) }>
												{ submitted && !user.Password ? 'You must fill this field' : ( submitted && !this.validatePassword(user.AuthenticationString) ? 'You have input an invalid Password' : '' ) }
											</div>
											<div className="mdc-layout-grid">
												<Button type="submit" ripple raised className="mdc-theme--secondary-bg">
													Sign In
												</Button>
											</div>
										</form>
									</Card.Media>
								</Card>
							</Elevation>
						</LayoutGrid.Cell>
						<LayoutGrid.Cell cols="4" />
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