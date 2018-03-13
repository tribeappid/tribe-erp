import { h, Component } from 'preact';
import { route } from 'preact-router';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/LayoutGrid/style';
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
            }
        ]
    }

    loadData(){
        return _.map(this.state.data, data => {
            return(
                <tr>
                    <td>{data.no}</td>
                    <td>{data.usernama}</td>
                    <td>{data.name}</td>
                    <td>{data.role}</td>
                    <td><button onClick={this.goToViewData}>view</button><button>edit</button></td>
                </tr>
            )
        })
    }

    goToViewData(){
        console.log("okk")
    }

    goToAddStaff(){
        this.setState({
            btn:{
                clicked: true
            }
        })

        if(this.state.btn.clicked){
            route('/register');
        }
    }
    
    handleEvent(event){
        console.log(event);
    }

    render( {}, {} ){
        return(
            <LayoutGrid>
                <LayoutGrid.Inner>
                    <LayoutGrid.Cell cols='1'/>
                    <LayoutGrid.Cell cols='10'>
                        <div className={style.contoh}>Search : <input type='text'/></div>
                    </LayoutGrid.Cell>
                    <LayoutGrid.Cell cols='1'/>
                    <LayoutGrid.Cell cols='1'/>
                    <LayoutGrid.Cell cols='10'>
                        <button onClick={this.goToAddStaff.bind(this)} className={style.contoh}>Add</button>
                    </LayoutGrid.Cell>
                    <LayoutGrid.Cell cols='1'/>
                    <LayoutGrid.Cell cols='1'/>
                    <LayoutGrid.Cell cols='10'>
                        <table>
                            <tr>
                                <th>No</th>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                            {this.loadData()}
                        </table>
                    </LayoutGrid.Cell>
                </LayoutGrid.Inner>
            </LayoutGrid>
        )
    }
}