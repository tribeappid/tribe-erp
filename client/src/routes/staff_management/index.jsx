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
        searchTerm: "",
        data:[
            {
                usernama: 'adminpertama',
                name: 'Admin Pertama',
                role: 'Administration',
            },
            {
                usernama: 'adminkedua',
                name: 'Admin Kedua',
                role: 'Administration',
            },
            {
                usernama: 'adminketiga',
                name: 'Admin Ketiga',
                role: 'Administration',
            }
        ]
    }

    dialogRef = dialog => (this.dialog = dialog);

    openSettings = () => this.dialog.MDComponent.show();

    loadData(dataWanted){
        var dataRow = 1;
        return _.map(this.state.data, data => {
            if(data.usernama.indexOf(dataWanted.toLowerCase())>-1){
                return(
                    <tr id={dataRow} className={ dataRow%2==1 ? style.even : '' }>
                        <td>{[dataRow]}</td>
                        <td className={style.data_table}>{data.usernama}</td>
                        <td className={style.data_table}>{data.name}</td>
                        <td className={style.data_table}>{data.role}</td>
                        <td className={style.data_table}>
                            <Icon className={style.icon_design} id={dataRow} onClick={this.goToViewData.bind(this)}>visibility</Icon>
                            <Icon className={style.icon_design} id={dataRow} onClick={this.openSettings}>delete</Icon>
                        </td>
                        <div style={`height: 0px;visibility: hidden;width: 0px; opacity: 0px`}>{dataRow++}</div>
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
    
    handleInput(term){
        event.preventDefault();
		this.setState({searchTerm: term.value})
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
                        <div className={style.search_bar}>Search : <input value={this.state.searchTerm} onChange={ event => this.handleInput(event.target) } type='text'/></div>
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
                                    {this.loadData(this.state.searchTerm)}
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
                <col style={{width: 32+"%"}}/>
                <col style={{width: 32+"%"}}/>
                <col style={{width: 18+"%"}}/>
                <col style={{width: 18+"%"}}/>
            </colgroup>
        )
    }
}