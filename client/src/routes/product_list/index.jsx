import { h, Component } from 'preact';
import style from './style';
import { connect } from 'preact-redux';
import { getBranchList,getProductDataBranch, getProductAll, deleteProduct } from '../../actions';
import _ from 'lodash';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import Icon from 'preact-material-components/Icon';
import Card from 'preact-material-components/Card';
import Dialog from 'preact-material-components/Dialog';
import 'preact-material-components/LayoutGrid/style';
import 'preact-material-components/Icon/style';
import 'preact-material-components/Card/style';
import 'preact-material-components/Dialog/style';
import { route } from 'preact-router';

class ProductList extends Component{
    componentDidMount(){
        this.props.getBranchList();
    }

    state={
        user:{
            ProductId: ''
        },
        currentSelectedOptions: 0,
        changingData: true,
        alreadyGetTheData: false,
        searchTerm: '',
        deleteSucces: false
    }

    dialogRef = dialog => (this.dialog = dialog);

    loading = () =>{
        document.getElementById("loadingScreen").hidden = false;
    }

    hideLoading = () =>{
        document.getElementById("loadingScreen").hidden = true;
    }

    openSettings = () => {
        this.dialog.MDComponent.root_.__preactattr_.productId= event.target.__preactattr_.productId;
        this.dialog.MDComponent.show();
    }

    deletingProduct = () =>{
        this.loading();
        const target = this.dialog.MDComponent.root_.__preactattr_.productId;
        this.setState({
            user:{
                ProductId: target
            }
        });
        console.log(this.state.user);
        console.log(target);
        this.props.deleteProduct(this.state.user,this.successCallBack);
    }

    successCallBack = () =>{
        this.setState({deleteSucces: true});
    }

    handleOptions(){
        this.setState({currentSelectedOptions: event.target.selectedIndex,changingData: true});
    }

    goToAddProduct = () =>{
        route('/manager/product/add');
    }

    goToViewProductData = () => {
        route(`/manager/product/view/${event.target.__preactattr_.productId}`);
    }

    renderOptions(){
        if(this.props.dataReducer.branchList.length!=0){
            const data = _.map(this.props.dataReducer.branchList, branchList=>{
                return <option>{branchList.name}</option>
            });
            return data;
        }
        return null;
    }

    renderData(dataWanted){
        var dataRow = 1;
        if(this.state.alreadyGetTheData){
            if(this.props.dataReducer.productData.length!=0){
                const data = _.map(this.props.dataReducer.productData, productData=>{
                    if(productData.name.toLowerCase().indexOf(dataWanted.toLowerCase())>-1){
                        return (
                            <tr id={dataRow} className={ dataRow%2==1 ? style.even : '' }>
                                <td>{[dataRow]}</td>
                                <td className={style.data_table}>{productData.code}</td>
                                <td className={style.data_table}>{productData.name}</td>
                                <td className={style.data_table}>Kosong</td>
                                <td className={style.data_table}>Kosong</td>
                                <td className={style.data_table}>
                                    <Icon productId={productData._id} className={style.icon_design} id={dataRow} onClick={this.goToViewProductData}>visibility</Icon>
                                    <Icon productId={productData._id} className={style.icon_design} id={dataRow++} onClick={this.openSettings}>delete</Icon>
                                </td>
                            </tr>
                        )
                    }
                })
                return data;
            }
            else{
                return (
                    <div>
                        Kosong
                    </div>
                )
            }
        }
        else{

        }
    }

    gettingProductData(){
        if(this.state.changingData){
            if(this.state.currentSelectedOptions==0){
                this.props.getProductAll();
                this.setState({changingData: false,alreadyGetTheData: true});
            }
            else{
                this.props.getProductDataBranch(this.props.dataReducer.branchList[this.state.currentSelectedOptions-1]._id);
                this.setState({changingData: false,alreadyGetTheData: true});
            }
        }
    }

    handleInput(term){
        event.preventDefault();
        this.setState({searchTerm: term.value});
    }

    checkingDeleteProcess(){
        if(this.state.deleteSucces){
            alert("Deleting Successfull");
            window.location.reload();
        }
    }
    
    render({dataReducer},{currentSelectedOptions,searchTerm}){
        this.gettingProductData();
        this.checkingDeleteProcess();
        return(
            <div>
                <LayoutGrid>
                    <LayoutGrid.Inner>
                        <LayoutGrid.Cell cols='1'/>
                        <LayoutGrid.Cell cols='10'>
                            <div className={style.search_bar}><input value={this.state.searchTerm} onChange={event => this.handleInput(event.target)} placeholder={"Search"} type='text'/></div>
                        </LayoutGrid.Cell>
                        <LayoutGrid.Cell cols='1'/>
                        <LayoutGrid.Cell cols='1'/>
                        <LayoutGrid.Cell cols='10'>
                            <select className={style.optionSelector} selectedIndex={currentSelectedOptions} onChange={this.handleOptions.bind(this)}>
                                <option>All</option>
                                {this.renderOptions()}
                            </select>
                            <button onClick={this.goToAddProduct} className={style.add_button}>
                                <Icon>add</Icon>
                                <a>Add Product</a>
                            </button>
                        </LayoutGrid.Cell>
                        <LayoutGrid.Cell cols='1'/>
                        <LayoutGrid.Cell cols='1'/>
                        <LayoutGrid.Cell cols='10'>
                            <Card>
                                <table>
                                    <ColGroup/>
                                    <tbody>
                                        <tr style={style.even}>
                                            <th>No</th>
                                            <th className={style.data_table}>Code</th>
                                            <th className={style.data_table}>Name</th>
                                            <th className={style.data_table}>Category</th>
                                            <th className={style.data_table}>Price</th>
                                            <th className={style.data_table}>Actions</th>
                                        </tr>
                                        {this.renderData(searchTerm)}
                                    </tbody>
                                </table>
                            </Card>
                        </LayoutGrid.Cell>
                    </LayoutGrid.Inner>
                </LayoutGrid>
                <Dialog ref={this.dialogRef}>
                    <Dialog.Header>Delete Product</Dialog.Header>
                    <Dialog.Body>
                        Are you sure want to delete this product ?
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Dialog.FooterButton accept onClick={this.deletingProduct}>Yes</Dialog.FooterButton>
                        <Dialog.FooterButton cancel>No</Dialog.FooterButton>
                    </Dialog.Footer>
                </Dialog>
            </div>
        )
    }
}

class ColGroup extends Component{
    render(){
        return(
            <colgroup>
                <col style={{width: 4+"%"}}/>
                <col style={{width: 27+"%"}}/>
                <col style={{width: 27+"%"}}/>
                <col style={{width: 18+"%"}}/>
                <col style={`width: 10%`}/>
                <col style={{width: 18+"%"}}/>
            </colgroup>
        )
    }
}

function mapStateToProps(dataReducer){
    return { dataReducer };
}

export default connect(mapStateToProps,{getBranchList,getProductDataBranch, getProductAll,deleteProduct})(ProductList);