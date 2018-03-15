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

export default class StaffManage extends Component{
    state={
        data:[
            {
                no: 1,
                usernama: 'adminpertama',
                name: 'Admin Pertama',
                role: 'Administration',
            },
            {
                no: 2,
                usernama: 'adminkedua',
                name: 'Admin Kedua',
                role: 'Administration',
            },
            {
                no: 3,
                usernama: 'adminketiga',
                name: 'Admin Ketiga',
                role: 'Administration',
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
                    <td className={style.data_table}>{data.usernama}</td>
                    <td className={style.data_table}>{data.name}</td>
                    <td className={style.data_table}>{data.role}</td>
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
            route(`/staff/management/view/${event.target.id}`);
        }
    }

    goToAddStaff(){
        this.setState({
            add_btn:{
                clicked: true
            }
        })
        if(this.state.add_btn.clicked){
            route('/staff/management/add');
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
                        <button onClick={this.goToAddStaff.bind(this)} className={style.add_button}>
                            <Icon>add</Icon>
                            <a>Add Staff</a>
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
                                        <th className={style.data_table}>Username</th>
                                        <th className={style.data_table}>Name</th>
                                        <th className={style.data_table}>Role</th>
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
				<Dialog.Header>Settings</Dialog.Header>
				<Dialog.Body>
					Example
				</Dialog.Body>
				<Dialog.Footer>
					<Dialog.FooterButton accept>okay</Dialog.FooterButton>
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
                <col style={{width: 32+"%"}}/>
                <col style={{width: 32+"%"}}/>
                <col style={{width: 18+"%"}}/>
                <col style={{width: 18+"%"}}/>
            </colgroup>
        )
    }
}