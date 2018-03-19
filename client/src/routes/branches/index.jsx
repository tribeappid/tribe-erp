import { h, Component } from 'preact';
import { route } from 'preact-router';
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

export default class Branches extends Component{
    state={
        data:[
            {
                no: 1,
                branchName: 'adminpertama',
                address: 'Address Pertama',
                classroom: '1',
            },
            {
                no: 2,
                branchName: 'adminkedua',
                address: 'Address Kedua',
                classroom: '2',
            },
            {
                no: 3,
                branchName: 'adminketiga',
                address: 'Address Ketiga',
                classroom: '3',
            }
        ]
    }

    dialogRef = dialog => (this.dialog = dialog);

    openSettings = () => this.dialog.MDComponent.show();

    loadData(){
        var dataRow = 0;
        return _.map(this.state.data, data => {
            return(
                <tr id={data.no} className={ dataRow%2==0 ? style.even : '' }>
                    <td>{data.no}</td>
                    <td className={style.data_table}>{data.branchName}</td>
                    <td className={style.data_table}>{data.address}</td>
                    <td >{data.classroom}</td>
                    <td className={style.data_table}>
                        <Icon className={style.icon_design} id={data.no} onClick={this.goToViewData.bind(this)}>visibility</Icon>
                        <Icon className={style.icon_design} id={data.no} onClick={this.openSettings}>delete</Icon>
                    </td>
                    <div style={`height: 0px;visibility: hidden;width: 0px; opacity: 0px`}>{dataRow++}</div>
                </tr>
            )
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
    
    handleEvent(event){
        console.log(event);
    }

    render( {}, {} ){
        return(
            <div>
            <LayoutGrid>
                <LayoutGrid.Inner>
                    <LayoutGrid.Cell cols='1'/>
                    <LayoutGrid.Cell cols='10'>
                        <div className={style.search_bar}>Search : <input type='text'/></div>
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
                                        <th>Classroom</th>
                                        <th className={style.data_table}>Actions</th>
                                    </tr>
                                    {this.loadData()}
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
                <col style={{width: 15+"%"}}/>
                <col style={{width: 59+"%"}}/>
                <col style={{width: 10+"%"}}/>
                <col style={{width: 12+"%"}}/>
            </colgroup>
        )
    }
}