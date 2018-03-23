import { h, Component } from 'preact';
import { route } from 'preact-router';
import LayoutGrid, { LayoutGridCell } from 'preact-material-components/LayoutGrid';
import Card from 'preact-material-components/Card';
import Icon from 'preact-material-components/Icon';
import 'preact-material-components/Card/style';
import 'preact-material-components/LayoutGrid/style';
import 'preact-material-components/Icon/style';
import 'preact-material-components/TextField/style';
import style from './style.css';
import { connect } from 'preact-redux';
import { register } from '../../actions';

class AddStaff extends Component{
    state={
        user:{
            AuthenticationString:'',
            Password: '',
            Name: '',
            AuthorizationLevel: 500
        },
        submitted: false
    }
    backStaffManage(){
        this.setState({
            back_btn:{
                clicked: true
            }
        });
        if(this.state.back_btn.clicked){
            route('/staff/management');
        }
    }

    showAllert(){
        route('/staff/management');
        alert("Registration Finish");
    }

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

    optionHandle(){
        const newUser = this.state.user;
        this.setState({
            user:{
                ...newUser,
                AuthorizationLevel: ( event.target.selectedIndex == 0 ? 500 : ( 
                    event.target.selectedIndex == 1 ? 400 : (
                        event.target.selectedIndex == 2 ? 300 : 200 
                        ) 
                    ) 
                )
            }
        })
    }

    handleSubmit(){
        event.preventDefault();
		this.setState({submitted: true});
		if(this.state.user.AuthenticationString && this.state.user.Password && this.state.user.Name){
			if(this.validateEmail(this.state.user.AuthenticationString)){
				this.props.register(this.state.user,this.showAllert.bind(this));
			}
		}
    }

    render({dataReducer},{user, submitted}){
        return(
            <LayoutGrid>
                <LayoutGrid.Inner>
                    <LayoutGrid.Cell cols='1'/>
                    <LayoutGrid.Cell cols='10'>
                        <Card className={style.content_body}>
                            <a className={style.page_title}>Add Staff</a>
                            <div style={`text-align: center;margin-bottom: 40px;`}>
                                <label for='photo'>
                                    <Icon style={`font-size: 150px; padding: 5px;`}>account_circle</Icon>
                                    <input type='file' id='photo' style={`display: none;`}/><br/>
                                    <span className={style.open_folder}>Open Folder</span>
                                </label>
                            </div>
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className={style.input_group}>
                                    <label>Email</label>
                                    <input type="text" name="AuthenticationString" value={user.AuthenticationString} onChange={ event => this.handleInput(event.target)} />
                                </div>
                                <div align='left'>
									{ submitted && !user.AuthenticationString ? 'You must fill this field' : ( submitted && !this.validateEmail(user.AuthenticationString) ? 'You have input an invalid Email' : '' ) }
								</div>
                                <div className={style.input_group}>
                                    <label>Password</label>
                                    <input type="password" name="Password" value={user.Password} onChange={ event => this.handleInput(event.target)} />
                                </div>
                                <div className={style.input_group}>
                                    <label>Name</label>
                                    <input type="text" name="Name" value={user.Name} onChange={ event => this.handleInput(event.target)} />
                                </div>
                                <div className={style.input_group}>
                                    <label>Role</label><br/>
                                    <select onChange={this.optionHandle.bind(this)}>
                                        <option value="datapertama">Administration</option>
                                        <option value="datakedua">Stockist</option>
                                        <option value="dataketiga">Supplier</option>
                                        <option value="datakeempat">Customer</option>
                                    </select>
                                </div>
                                <div>
                                    <button onClick={this.backStaffManage.bind(this)} className={style.back_button}>Back</button>
                                    <button type="submit" className={style.add_button}>Add</button>
                                </div>
                            </form>
                        </Card>
                    </LayoutGrid.Cell>
                    <LayoutGrid.Cell cols='1'/>
                </LayoutGrid.Inner>
            </LayoutGrid>
        )
    }
}

function mapStateToProps(dataReducer){
    return { dataReducer }
}

export default connect(mapStateToProps,{ register })(AddStaff);