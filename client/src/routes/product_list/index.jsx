import { h, Component } from 'preact';
import style from './style';
import { connect } from 'preact-redux';
import { getBranchList,getProductDataBranch, getProductAll } from '../../actions';
import _ from 'lodash';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import Icon from 'preact-material-components/Icon';
import Card from 'preact-material-components/Card';
import Dialog from 'preact-material-components/Dialog';
import 'preact-material-components/LayoutGrid/style';
import 'preact-material-components/Icon/style';
import 'preact-material-components/Card/style';
import 'preact-material-components/Dialog/style';

class ProductList extends Component{
    componentDidMount(){
        this.props.getBranchList();
    }

    state={
        currentSelectedOptions: 0,
        changingData: true,
        alreadyGetTheData: false,
        searchTerm: ''
    }

    dialogRef = dialog => (this.dialog = dialog);

    openSettings = () => {
        
        this.dialog.MDComponent.show();
    }

    handleOptions(){
        this.setState({currentSelectedOptions: event.target.selectedIndex,changingData: true});
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
                                    <Icon entityId={productData._id} className={style.icon_design} id={dataRow} onClick={''}>visibility</Icon>
                                    <Icon entityId={productData._id} className={style.icon_design} id={dataRow++} onClick={''}>delete</Icon>
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
            console.log("Loading....");
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

    render({dataReducer},{currentSelectedOptions,searchTerm}){
        console.log(dataReducer);
        this.gettingProductData();
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
                            <button className={style.add_button}>
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
                    <Dialog.Header>Delete Staff</Dialog.Header>
                    <Dialog.Body>
                        Are you sure want to delete this staff ?
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Dialog.FooterButton accept onClick={this.deletingAccount}>Yes</Dialog.FooterButton>
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

export default connect(mapStateToProps,{getBranchList,getProductDataBranch, getProductAll})(ProductList);