import { h, Component } from 'preact';
import { LayoutGrid, TextField, Card, Button, Elevation } from 'preact-material-components';
import 'preact-material-components/style.css';
import './style';
import { login } from '../../actions';
import { connect } from 'preact-redux';

class Login extends Component {
	state={
		user:{
			AuthenticationString: "",
			Password: ""
		}
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

	handleSubmit(event){
		event.preventDefault();
		this.props.login(this.state.user);
	}

	render({ finance },{ user }){
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
											<TextField type="password" label="Password" name="Password" value={user.Password} onChange={ event => this.handleInput(event.target)} />
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