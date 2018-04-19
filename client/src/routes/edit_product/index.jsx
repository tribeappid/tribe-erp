import { Component, h } from 'preact';
import style from './style';
import { connect } from 'preact-redux';
import { route } from 'preact-router';
import _ from 'lodash';
import { getProductDataDetail, updateProduct } from '../../actions';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import Card from 'preact-material-components/Card';
import Icon from 'preact-material-components/Icon';
import 'preact-material-components/Card/style';
import 'preact-material-components/LayoutGrid/style';
import 'preact-material-components/Icon/style';

class EditProduct extends Component{
    componentDidMount(){
        this.props.getProductDataDetail(this.props.ownProps.id);
    }
    state={
        user:{
            ProductId: '',
            Name: '',
            Status: 'Available',
            Code: '',
            Width: 0,
            Length: 0,
            Height: 0,
            Weight: 0,
            Description: '',
            AllBranch: "0",
            BranchIds: []
        },
        branchDataChecked: [],
        defaultSelected: 0,
        successEdit: false,
        failEdit: false,
        isDataLoaded: false,
        branchOptionsLoaded: false
    }

    loading(){
        document.getElementById("loadingScreen").hidden = false;
    }

    hideLoading(){
        document.getElementById("loadingScreen").hidden = true;
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

    optionHandle(){
        const newUser = this.state.user;
        this.setState({
            user:{
                ...newUser,
                Status: ( event.target.selectedIndex == 0 ? "Available" : "Non-Available")
            }
        })
    }

    handleSubmit(){
        event.preventDefault();
        if(this.state.branchDataChecked.length == this.props.dataReducer.branchList.length){
            const oldData = this.state.user;
            this.setState({user:{
                ...oldData,
                AllBranch: "1",
                BranchIds: this.state.branchDataChecked,
                ProductId: this.props.ownProps.id
            }});
            if(this.state.user.Name && this.state.user.Code && this.state.user.Description && this.state.user.Status){
                this.loading();
                this.props.updateProduct(this.state.user,this.successCallBack,this.failCallBack);
            }
        }
        else{
            const oldData= this.state.user;
            this.setState({user:{
                ...oldData,
                AllBranch: "0",
                BranchIds: this.state.branchDataChecked,
                ProductId: this.props.ownProps.id
            }});
            if(this.state.user.Name && this.state.user.Code && this.state.user.Description && this.state.user.Status){
                this.loading();
                this.props.updateProduct(this.state.user,this.successCallBack,this.failCallBack);
            }
        }
    }

    successCallBack = ()=>{
        this.setState({successEdit: true});
    }

    failCallBack = ()=>{
        this.setState({failEdit: true});
    }

    allData(){
        if(this.props.dataReducer.branchList.length!=0){
            var data = [];
            _.map(this.props.dataReducer.branchList,branchList=>{
                document.getElementById(branchList._id).checked = true;
                data.push(branchList._id);
            })
            return data;
        }
    }

    specificData(){
        var data= [];
        _.map(this.props.dataReducer.productDataDetail[0].branches,branches=>{
            document.getElementById(branches._id).checked = true;
            data.push(branches._id);
        })
        return data;
    }

    settingData(){
        if(!this.state.isDataLoaded){
            if(this.state.branchOptionsLoaded){
                if(this.props.dataReducer.productDataDetail.length!=0){
                    console.log(this.props.dataReducer.productDataDetail);
                    var data = this.props.dataReducer.productDataDetail[0];
                    this.setState({
                        isDataLoaded: true,
                        user:{
                            Name: data.name,
                            Status: data.status,
                            Code: data.code,
                            Width: data.width,
                            Length: data.length,
                            Height: data.height,
                            Weight: data.weight,
                            Description: data.description,
                            AllBranch: (data.all_branch ? "1" : "0"),
                        },
                        branchDataChecked: (data.all_branch ? this.allData() : this.specificData())
                    })
                }
            }
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
            if(!this.state.branchOptionsLoaded){
                this.setState({branchOptionsLoaded: true});
            }
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

    checkedData(){
        console.log(this.state);
        if(this.state.branchDataChecked.length != 0){
            if(event.target.checked){
                var data = this.state.branchDataChecked;
                data.push(event.target.__preactattr_.id);
                this.setState({branchDataChecked: data});
            }
            else{
                var data = this.state.branchDataChecked;
                var index = data.indexOf(event.target.__preactattr_.id);
                if(index!==-1){
                    data.splice(index,1);
                }
                this.setState({branchDataChecked: data});
            }
        }
        else{
            var data=this.state.branchDataChecked;
            data.push(event.target.__preactattr_.id);
            this.setState({branchDataChecked: data});
        }
    }

    goBackToView = () => {
        route(`/manager/product/view/${this.props.ownProps.id}`);
    }

    checkingUpdateResult(){
        if(this.state.successEdit){
            alert("Registration Success");
            route(`/manager/product/view/${this.props.ownProps.id}`);
            this.hideLoading();
        }
    }

    render({dataReducer},{user,branchDataChecked}){
        console.log(user);
        this.settingData();
        this.checkingUpdateResult();
        return(
            <div>
                <LayoutGrid>
                    <LayoutGrid.Inner>
                        <LayoutGrid.Cell cols='1'/>
                        <LayoutGrid.Cell cols='10'>
                            <Card className={style.content_body}>
                                <a className={style.page_title}>Update Product</a>
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    <div className={style.input_group}>
                                        <label>Name</label><br/>
                                        <input value={user.Name} name="Name" type='text' onChange={ event => this.handleInput(event.target)}/>
                                    </div>
                                    <div className={style.input_group}>
                                        <label>Status</label><br/>
                                        <select selectedIndex={user.Status=="Available" ? 0 : 1} onChange={this.optionHandle.bind(this)}>
                                                <option>Available</option>
                                                <option>Non-Available</option>
                                        </select>
                                    </div>
                                    <div className={style.input_group}>
                                        <label>Code</label><br/>
                                        <input value={user.Code} name="Code" type='text' onChange={ event => this.handleInput(event.target)}/>
                                    </div>
                                    <div className={style.input_group}>
                                        <label>Width</label><br/>
                                        <input value={user.Width} name="Width" type='number' onChange={ event => this.handleInput(event.target)}/>
                                    </div>
                                    <div className={style.input_group}>
                                        <label>Length</label><br/>
                                        <input value={user.Length} name="Length" type='number' onChange={ event => this.handleInput(event.target)}/>
                                    </div>
                                    <div className={style.input_group}>
                                        <label>Height</label><br/>
                                        <input value={user.Height} name="Height" type='number' onChange={ event => this.handleInput(event.target)}/>
                                    </div>
                                    <div className={style.input_group}>
                                        <label>Weight</label><br/>
                                        <input value={user.Weight} name="Weight" type='number' onChange={ event => this.handleInput(event.target)}/>
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
    return { dataReducer, ownProps};
}

export default connect(mapStateToProps,{getProductDataDetail, updateProduct})(EditProduct);