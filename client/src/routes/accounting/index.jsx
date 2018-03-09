import { h, Component } from 'preact';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/LayoutGrid/style.css';
import style from './style.css';

export default class Accounting extends Component{
    render({},{}){
        return(
            <LayoutGrid>
                <LayoutGrid.Inner>
                    <LayoutGrid.Cell cols='1'/>
                    <LayoutGrid.Cell cols='10'>
                        <table>
                            <tr>
                                <th>Date</th>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Role</th>
                            </tr>
                            <tr>
                                <td><input type='date'/></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><button>tombol</button></td>
                            </tr>
                            <tr>
                                <td><input type='date'/></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><input /></td>
                                <td><button>tombol</button></td>
                            </tr>
                        </table>
                    </LayoutGrid.Cell>
                </LayoutGrid.Inner>
            </LayoutGrid>
        )
    }
}