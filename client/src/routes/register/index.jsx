import { Component, h } from 'preact';
import { Select, LayoutGrid, TextField, Card, Button, Elevation } from 'preact-material-components';
import 'preact-material-components/style.css';
import style from './style';
import { connect } from 'preact-redux';
import { register } from '../../actions';

class Register extends Component{
	state={
		user:{
			AuthenticationString: '',
			Password: '',
			//confirmPass: '',
			Name: '',
			//role: ''
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
	
	handleOptions(event){
		const data = event.selectedOptions[0].textContent;
		const newUser = this.state.user;
		this.setState({
			user:{
				...newUser,
				role: data
			}
		});
		this.setState({chosenIndex: event.selectedIndex});
	}

	validate(email){
		if((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
			return true;
		}
		return false;
	}

	handleSubmit(event){
		event.preventDefault();
		this.setState({submitted: true});
		if(this.state.user.AuthenticationString && this.state.user.Password && this.state.user.Name){
			this.props.register(this.state.user);
		}
	}

    render( {}, { user, submitted } ){
        return(
            <div>
                <LayoutGrid className={style.wrapper}>
					<LayoutGrid.Inner>
						<LayoutGrid.Cell cols="4" />
						<LayoutGrid.Cell cols="4">
							<Elevation z={2}>
								<Card>
									<Card.Primary className="mdc-theme--secondary-bg">
										<Card.Title align="center" className={style.title + " mdc-typography--headline mdc-theme--text-primary-on-secondary"}>Register</Card.Title>
									</Card.Primary>
									<Card.Media className="mdc-typography--title">
									<form align='center' onSubmit={this.handleSubmit.bind(this)}>
										<TextField className={style.register_input} type="text" name="AuthenticationString" label="Email" value={user.AuthenticationString} onChange={ event => this.handleInput(event.target)} />
										<div align='left' className={ submitted && !user.AuthenticationString ? style.has_error : ( this.validate(user.AuthenticationString) ? style.has_valid : style.has_error ) }>{ submitted && !user.AuthenticationString ? 'You must fill this field' : ( submitted && !this.validate(user.AuthenticationString) ? 'You have input an invalid Email' : '' ) }</div>
										{/*
										<div align='left' className={ submitted && !user.AuthenticationString ? style.has_error : (this.validate(user.AuthenticationString) ? style.has_error : style.has_valid)}>
											{ submitted && !user.AuthenticationString ? 'You must fill this Field' : (this.validate(user.AuthenticationString ? '' : 'You have input an invalid Email')) }
										</div>
										*/
										}
										<TextField className={style.register_input} type="password" name="Password" label="Password" value={user.Password} onChange={ event => this.handleInput(event.target)} />
										<div align='left' className={ submitted && !user.Password ? style.has_error : style.has_valid}>Error here</div>
										{//<TextField type="password" name="confirmPass" label="Confirm Password" value={user.confirmPass} onChange={ event => this.handleInput(event.target)} />
										}
										<TextField className={style.register_input} type="text" name="Name" label="Name" value={user.Name} onChange={ event => this.handleInput(event.target)} />
										<div align='left' className={ submitted && !user.Name ? style.has_error : style.has_valid}>{this.validate(user.AuthenticationString)}</div>
                                        {
										/*
										<Select name="role" label="Role" hintText="Select a Role" selectedIndex={this.state.chosenIndex} onChange={e => this.handleOptions(e)}>
                                            <Select.Item>Administrator</Select.Item>
                                            <Select.Item>Operator</Select.Item>
                                            <Select.Item>Supplier</Select.Item>
                                            <Select.Item>Stockist</Select.Item>
											<Select.Item>Finance</Select.Item>
											<Select.Item>Customer</Select.Item>
                                        </Select>
										*/
										}
										<div className="mdc-layout-grid">
											<Button type="submit" ripple raised className="mdc-theme--secondary-bg">
												Register
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
        )
    }
}

export default connect( '' ,{ register })(Register);