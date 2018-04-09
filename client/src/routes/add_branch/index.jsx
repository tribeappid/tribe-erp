import { h, Component } from 'preact';
import LayoutGrid, { LayoutGridCell } from 'preact-material-components/LayoutGrid';
import Card from 'preact-material-components/Card';
import Icon from 'preact-material-components/Icon';
import 'preact-material-components/Card/style';
import 'preact-material-components/LayoutGrid/style';
import 'preact-material-components/Icon/style';
import 'preact-material-components/TextField/style';
import style from './style.css';
import { route } from 'preact-router';
import { addBranchData } from '../../actions';
import { connect } from 'preact-redux';

class AddBranch extends Component{
    state={
        user:{
            Name: '',
            Address: '',
            Phone: ''
        },
        submitted: false,
        responseCheck: false
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

    backBranchView(){
        this.setState({
            back_btn:{
                clicked: true
            }
        });
        if(this.state.back_btn.clicked){
            route('/branches');
        }
    }

    handleSubmit(){
        event.preventDefault();
		this.setState({submitted: true,responseCheck: true});
		if(this.state.user.Name && this.state.user.Address && this.state.user.Phone){
			this.loading();
            this.props.addBranchData(this.state.user);
        }
    }

    loading(){
        document.getElementById("loadingScreen").hidden = false;
    }

    hideLoading(){
        document.getElementById("loadingScreen").hidden = true;
    }

    checkingResponse(){
        if(this.state.responseCheck){
            if(this.props.dataReducer.addBranchResponse.length == 0){

            }
            else{
                if(!this.props.dataReducer.addBranchResponse.Error){
                    alert("Adding Branch Success");
                    route('/branches');
                    console.log(this.props.dataReducer);
                    this.hideLoading();
                }
                else{
                    this.setState({responseCheck: false});
                    console.log(this.props.dataReducer);
                    this.hideLoading();
                }
            }
        }
    }

    render({},{responseCheck}){
        this.checkingResponse();
        return(
            <div>
                <LayoutGrid>
                    <LayoutGrid.Inner>
                        <LayoutGrid.Cell cols='1'/>
                        <LayoutGrid.Cell cols='10'>
                            <Card className={style.content_body}>
                                <a className={style.page_title}>Add Branch</a>
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    <div className={style.input_group}>
                                        <label>Name</label><br/>
                                        <input value={this.state.user.Name} name="Name" type='text' onChange={ event => this.handleInput(event.target)}/>
                                    </div>
                                    <div className={style.input_group}>
                                        <label>Address</label><br/>
                                        <input value={this.state.user.Address} name="Address" type='text' onChange={ event => this.handleInput(event.target)}/>
                                    </div>
                                    <div className={style.input_group}>
                                        <label>Phone</label><br/>
                                        <input value={this.state.user.Phone} name="Phone" type='text' onChange={ event => this.handleInput(event.target)}/>
                                    </div>
                                    <div>
                                        <button onClick={this.backBranchView.bind(this)} className={style.back_button}>Back</button>
                                        <button type="submit" className={style.add_button}>Add</button>
                                    </div>
                                </form>
                            </Card>
                        </LayoutGrid.Cell>
                        <LayoutGrid.Cell cols='1'/>
                    </LayoutGrid.Inner>
                </LayoutGrid>
            </div>
        )
    }
}

function mapStateToProps(dataReducer){
    return { dataReducer };
}

export default connect( mapStateToProps, { addBranchData })(AddBranch);