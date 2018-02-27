import { Component, h } from 'preact';
import { Select, LayoutGrid, TextField, Card, Button, Elevation } from 'preact-material-components';
import 'preact-material-components/style.css';
import style from './style';

export default class Register extends Component{
	state={
		user:{
			email: '',
			password: '',
			confirmPass: '',
			name: '',
			role: ''
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

	handleSubmit(event){
		event.preventDefault();
		this.setState({submitted: true});
		if(this.state.name){
			return console.log("Success");
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
								<form onSubmit={this.handleSubmit.bind(this)}>
								<Card>
									<Card.Primary className="mdc-theme--secondary-bg">
										<Card.Title align="center" className={style.title + " mdc-typography--headline mdc-theme--text-primary-on-secondary"}>Register</Card.Title>
									</Card.Primary>
									<Card.Media className="mdc-typography--title">
										<TextField type="text" name="email" label="Email" value={user.email} onChange={ event => this.handleInput(event.target)} />
										<div className={ submitted && !user.email ? style.has_error : style.has_valid}>Error here</div>
										<TextField type="password" name="password" label="Password" value={user.password} onChange={ event => this.handleInput(event.target)} />
										<TextField type="password" name="confirmPass" label="Confirm Password" value={user.confirmPass} onChange={ event => this.handleInput(event.target)} />
										<TextField type="text" name="name" label="Name" value={user.name} onChange={ event => this.handleInput(event.target)} />
                                        <Select name="role" label="Role" hintText="Select a Role" selectedIndex={this.state.chosenIndex} onChange={e => this.handleOptions(e)}>
                                            <Select.Item>Administrator</Select.Item>
                                            <Select.Item>Operator</Select.Item>
                                            <Select.Item>Supplier</Select.Item>
                                            <Select.Item>Stockist</Select.Item>
											<Select.Item>Finance</Select.Item>
											<Select.Item>Customer</Select.Item>
                                        </Select>
										<div className="mdc-layout-grid">
											<Button ripple raised className="mdc-theme--secondary-bg">
												Register
											</Button>
										</div>
									</Card.Media>
								</Card>
								</form>
							</Elevation>
						</LayoutGrid.Cell>
						<LayoutGrid.Cell cols="4" />
					</LayoutGrid.Inner>
				</LayoutGrid>
            </div>
        )
    }
}