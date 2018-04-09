import { h, Component } from 'preact';
import { route } from 'preact-router';
import { getBranchList } from '../../actions';
import { connect} from 'preact-redux';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import Icon from 'preact-material-components/Icon';
import Card from 'preact-material-components/Card';
import Dialog from 'preact-material-components/Dialog';
import 'preact-material-components/LayoutGrid/style';
import 'preact-material-components/Icon/style';
import 'preact-material-components/Card/style';
import 'preact-material-components/Dialog/style';
import style from './style';
import _ from 'lodash';

class Branches extends Component{
    componentDidMount(){
        this.props.getBranchList();
    }

    state={
        searchTerm: ''
    }

    dialogRef = dialog => (this.dialog = dialog);

    openSettings = () => this.dialog.MDComponent.show();

    loadData(dataWanted){
        var dataRow = 1;
        return _.map(this.props.dataReducer.branchList, branchList => {
            if(branchList.name.toLowerCase().indexOf(dataWanted.toLowerCase())>-1){
                return(
                    <tr id={dataRow} className={ dataRow%2==1 ? style.even : '' }>
                        <td>{[dataRow]}</td>
                        <td className={style.data_table}>{branchList.name}</td>
                        <td className={style.data_table}>{branchList.address}</td>
                        <td className={style.data_table}>{branchList.phone}</td>
                        <td className={style.data_table}>
                            <Icon entityId={branchList._id} className={style.icon_design} id={dataRow} onClick={''}>visibility</Icon>
                            <Icon entityId={branchList._id} className={style.icon_design} id={dataRow++} onClick={''}>delete</Icon>
                        </td>
                    </tr>
                )
            }
        })
    }

    goToViewData(event){
        this.setState({
            view_btn:{
                clicked: true
            }
        })
        if(this.state.view_btn.clicked){
            route(`/branches/view/${event.target.id}`);
        }
    }

    goToAddBranch(){
        this.setState({
            add_btn:{
                clicked: true
            }
        })
        if(this.state.add_btn.clicked){
            route('/branches/add');
        }
    }

    handleInput(term){
        event.preventDefault();
		this.setState({searchTerm: term.value})
	}

    render( {dataReducer}, {} ){
        return(
            <div>
                <LayoutGrid>
                    <LayoutGrid.Inner>
                        <LayoutGrid.Cell cols='1'/>
                        <LayoutGrid.Cell cols='10'>
                            <div className={style.search_bar}>Search : <input value={this.state.searchTerm} onChange={event => this.handleInput(event.target)} type='text'/></div>
                        </LayoutGrid.Cell>
                        <LayoutGrid.Cell cols='1'/>
                        <LayoutGrid.Cell cols='1'/>
                        <LayoutGrid.Cell cols='10'>
                            <button onClick={this.goToAddBranch.bind(this)} className={style.add_button}>
                                <Icon>add</Icon>
                                <a>Add Branch</a>
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
                                            <th>S/N</th>
                                            <th className={style.data_table}>Branch Name</th>
                                            <th className={style.data_table}>Address</th>
                                            <th className={style.data_table}>Phone</th>
                                            <th className={style.data_table}>Actions</th>
                                        </tr>
                                        {this.loadData(this.state.searchTerm)}
                                    </tbody>
                                </table>
                            </Card>
                        </LayoutGrid.Cell>
                    </LayoutGrid.Inner>
                </LayoutGrid>
                <Dialog ref={this.dialogRef}>
                    <Dialog.Header>Delete Branch</Dialog.Header>
                    <Dialog.Body>
                        Are you sure want to delete this branch?
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Dialog.FooterButton accept>Yes</Dialog.FooterButton>
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
                <col style={{width: 20+"%"}}/>
                <col style={{width: 34+"%"}}/>
                <col style={{width: 20+"%"}}/>
                <col style={{width: 12+"%"}}/>
            </colgroup>
        )
    }
}

function mapStateToProps(dataReducer){
    return { dataReducer };
}

export default connect( mapStateToProps ,{ getBranchList })(Branches);