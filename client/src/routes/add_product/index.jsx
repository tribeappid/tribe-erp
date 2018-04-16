import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import style from './style';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import Card from 'preact-material-components/Card';
import Icon from 'preact-material-components/Icon';
import 'preact-material-components/Card/style';
import 'preact-material-components/LayoutGrid/style';
import 'preact-material-components/Icon/style';
import { getBranchList, addProduct } from '../../actions';
import _ from 'lodash';

class AddProduct extends Component{
    componentDidMount(){
        this.props.getBranchList();
    }

    state={
        user:{
            Name: '',
            Status: '',
            Code: '',
            Description: '',
            AllBranch: "0",
            BranchIds: []
        },
        branchData:[]
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

    checkedData(){
        if(this.state.branchData.length!=0){
            if(event.target.checked){
                var data = this.state.branchData;
                data.push(event.target.__preactattr_.id);
                this.setState({branchData: data});
            }
            else{
                var data = this.state.branchData;
                var index = data.indexOf(event.target.__preactattr_.id);
                if(index!==-1){
                    data.splice(index,1);
                }
                this.setState({branchData: data});
            }
        }
        else{
            var data=this.state.branchData;
            data.push(event.target.__preactattr_.id);
            this.setState({branchData: data});
        }
    }

    loadBranchOptions(){
        if(this.props.dataReducer.branchList.length!=0){
            var data = _.map(this.props.dataReducer.branchList, branchList=>{
                return(
                    <div className={style.check_groupbox}>
                        <input id={branchList._id} type="checkbox" name={branchList.name} value={branchList.name} onClick={this.checkedData.bind(this)}/>
                        <label for={branchList._id}>{branchList.name}</label>
                    </div>
                )
            });
            return data;
        }
        else{
            return(
                <div>
                    Loading .....
                </div>
            )
        }
    }

    handleSubmit(){
        event.preventDefault();
        if(this.state.branchData.length == this.props.dataReducer.branchList.length){
            const oldData = this.state.user;
            this.setState({user:{
                ...oldData,
                AllBranch: "1",
                BranchIds: this.state.branchData
            }});
            if(this.state.user.Name && this.state.user.Code && this.state.user.Description && this.state.user.Status){
                console.log(this.state.user);
                this.props.addProduct(this.state.user);
            }
        }
        else{
            const oldData= this.state.user;
            this.setState({user:{
                ...oldData,
                BranchIds: this.state.branchData
            }});
            if(this.state.user.Name && this.state.user.Code && this.state.user.Description && this.state.user.Status){
                console.log(this.state.user);
                this.props.addProduct(this.state.user);
            }
        }
    }

    render({dataReducer},{user,branchData}){
        /* console.log(dataReducer)
        var a = ["car", "bike", "scooter"];
        var b = a.map(function(entry) {
            var singleObj = {}
            singleObj['haihai'] = 'vehicle';
            singleObj['haha'] = entry;
            return singleObj;
        });
        console.log(b);
        var index = a.indexOf("bike");
        console.log(index);
        if(index !== -1){
            var c = b.splice(index,1);
            console.log(b);
        } */
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
                                        <input value={user.Name} name="Name" type='text' onChange={ event => this.handleInput(event.target)}/>
                                    </div>
                                    <div className={style.input_group}>
                                        <label>Status</label><br/>
                                        <input value={user.Status} name="Status" type='text' onChange={ event => this.handleInput(event.target)}/>
                                    </div>
                                    <div className={style.input_group}>
                                        <label>Code</label><br/>
                                        <input value={user.Code} name="Code" type='text' onChange={ event => this.handleInput(event.target)}/>
                                    </div>
                                    <div className={style.input_group}>
                                        <label>Description</label><br/>
                                        <input value={user.Description} name="Description" type='text' onChange={ event => this.handleInput(event.target)}/>
                                    </div>
                                    <fieldset>
                                        <legend>Branch List</legend>
                                        {this.loadBranchOptions()}
                                    </fieldset>
                                    <div>
                                        <button onClick={this.goBackToView} className={style.back_button}>Back</button>
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

function mapStateToProps(dataReducer,ownProps){
    return { dataReducer, ownProps };
}

export default connect(mapStateToProps,{getBranchList,addProduct})(AddProduct);