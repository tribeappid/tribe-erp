import { h, Component } from 'preact';
import { route } from 'preact-router';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/LayoutGrid/style';
import style from './style';

export default class StaffManage extends Component{
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
                            <tr>
                                <td>1</td>
                                <td>adminpertama</td>
                                <td>Admin Pertama</td>
                                <td>Administration</td>
                                <td><button>tombol</button><button>tombol</button></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>supplierpertama</td>
                                <td>Supplier Pertama</td>
                                <td>Supplier</td>
                                <td><button>tombol</button><button>tombol</button></td>
                            </tr>
                        </table>
                    </LayoutGrid.Cell>
                </LayoutGrid.Inner>
            </LayoutGrid>
        )
    }
}