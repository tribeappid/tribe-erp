import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import { route } from 'preact-router';

export default class Home extends Component {
	goToLogin = () =>{
		route('/login');
	}
	render({},{}) {
		this.goToLogin();
	}
}