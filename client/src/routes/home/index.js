import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import { getFinances, login, logintemp, register } from '../../actions';
import { connect } from 'preact-redux';

class Home extends Component {
	state={
		user:{
			AuthenticationString: "steven.kangga@gmail.com",
			Password: "tribeapp2017"
		},
		user_regis:{
			Name: "Steven Kangga 1",
			AuthenticationString: "steven.kangga1@gmail.com",
			Password: "tribeapp2018"
		}
	}

	handleSubmit(user){
		this.props.register(user);
	}

	render({ finance },{ user, user_regis }) {
		console.log(finance);
		return (
			<div class={style.home}>
				<h1>Home route</h1>
				<button onClick={()=>this.handleSubmit(user_regis)}/>
			</div>
		);
	}
}

function mapStateToProps(finance){
	return { finance };
}

export default connect( mapStateToProps, { getFinances, login, logintemp, register })(Home);