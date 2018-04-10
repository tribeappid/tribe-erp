import {h, Component} from 'preact';
import style from './style';
import { connect } from 'preact-redux';
import { route } from 'preact-router';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style';
import 'preact-material-components/LayoutGrid/style';
import { getBranchData, updateBranch } from '../../actions';

class EditBranch extends Component{
    componentDidMount(){
        this.props.getBranchData(this.props.ownProps.id);
    }
    
    state={
        user:{
            BranchId: '',
            Name:'',
            Address:'',
            Phone:''
        },
        oldData:{
            Name:'',
            Address:'',
            Phone: ''
        },
        isDataReady: false,
        alreadyGetData: true,
        isNeedToUpload: false,
        successUpdated: false,
        failUpdated: false
    }

    backToViewBranchData = () => {
        route(`/branches/view/${this.props.ownProps.id}`);
    }

    getCurrentData(isDataReady, alreadyGetData){
        if(isDataReady && alreadyGetData){
            this.setState({
                user:{
                    BranchId: this.props.ownProps.id,
                    Name: this.props.dataReducer.branchData[0].name,
                    Address: this.props.dataReducer.branchData[0].address,
                    Phone: this.props.dataReducer.branchData[0].phone
                },
                oldData:{
                    Name: this.props.dataReducer.branchData[0].name,
                    Address: this.props.dataReducer.branchData[0].address,
                    Phone: this.props.dataReducer.branchData[0].phone
                },
                alreadyGetData: false
            })
        }
    }

    handleInput(term){
		const target = term.__preactattr_.name;
        const newUser = this.state.user;
		this.setState({
			user:{
				...newUser,
				[target]: term.value
            },
            isNeedToUpload: true
        });
    }

    handleSubmit(){
        event.preventDefault();
        if(this.state.isNeedToUpload){
            this.loading();
            this.props.updateBranch(this.state.user,this.successUpdated,this.failUpdated);
        }
    }

    successUpdated = () =>{
        this.setState({successUpdated: true});
    }

    failUpdated = () =>{
        this.setState({failUpdated: true});
    }

    loading(){
        document.getElementById("loadingScreen").hidden = false;
    }

    hideLoading(){
        document.getElementById("loadingScreen").hidden = true;
    }

    checkingUpdateResponse(){
        if(this.state.successUpdated){
            alert("Update Branch Success");
            this.hideLoading();
            route(`/branches/view/${this.props.ownProps.id}`);
        }
    }

    render({dataReducer},{user,isDataReady, alreadyGetData}){
        if(dataReducer.branchData.length!=0){
            if(!isDataReady){
                this.setState({isDataReady: true});
            }
        }
        this.getCurrentData(isDataReady,alreadyGetData);
        this.checkingUpdateResponse();
        return(
            <div>
                <LayoutGrid>
                    <LayoutGrid.Inner>
                        <LayoutGrid.Cell cols='1'/>
                        <LayoutGrid.Cell cols='10'>
                            <Card className={style.content_body}>
                                <a className={style.page_title}>Update Branch</a>
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    <div className={style.input_group}>
                                        <label>Name</label><br/>
                                        <input value={user.Name} name="Name" type='text' onChange={ event => this.handleInput(event.target)}/>
                                    </div>
                                    <div className={style.input_group}>
                                        <label>Address</label><br/>
                                        <input value={user.Address} name="Address" type='text' onChange={ event => this.handleInput(event.target)}/>
                                    </div>
                                    <div className={style.input_group}>
                                        <label>Phone</label><br/>
                                        <input value={user.Phone} name="Phone" type='text' onChange={ event => this.handleInput(event.target)}/>
                                    </div>
                                    <div>
                                        <button onClick={this.backToViewBranchData} className={style.back_button}>Back</button>
                                        <button type="submit" className={style.add_button}>Update</button>
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

function mapStateToProps(dataReducer, ownProps){
    return { dataReducer, ownProps };
}

export default connect(mapStateToProps,{getBranchData, updateBranch})(EditBranch);