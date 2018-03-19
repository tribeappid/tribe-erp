import { h, Component } from 'preact';
import { route } from 'preact-router';
import LayoutGrid, { LayoutGridCell } from 'preact-material-components/LayoutGrid';
import Card from 'preact-material-components/Card';
import Icon from 'preact-material-components/Icon';
import 'preact-material-components/Card/style';
import 'preact-material-components/LayoutGrid/style';
import 'preact-material-components/Icon/style';
import 'preact-material-components/TextField/style';
import style from './style.css';

export default class AddStaff extends Component{
    backStaffManage(){
        this.setState({
            back_btn:{
                clicked: true
            }
        });
        if(this.state.back_btn.clicked){
            route('/staff/management');
        }
    }

    render({},{}){
        return(
            <LayoutGrid>
                <LayoutGrid.Inner>
                    <LayoutGrid.Cell cols='1'/>
                    <LayoutGrid.Cell cols='10'>
                        <Card className={style.content_body}>
                            <a className={style.page_title}>Add Staff</a>
                            <div style={`text-align: center;margin-bottom: 40px;`}>
                                <label for='photo'>
                                    <Icon style={`font-size: 150px; padding: 5px;`}>account_circle</Icon>
                                    <input type='file' id='photo' style={`display: none;`}/><br/>
                                    <span className={style.open_folder}>Open Folder</span>
                                </label>
                            </div>
                            <form>
                                <Input type='text' labelName='Email'/>
                                <Input type='text' labelName='Name'/>
                                <Input type='date' labelName='Birthday'/>
                                <Input type='number' labelName='Phone Number'/>
                            </form>
                            <div>
                                <button onClick={this.backStaffManage.bind(this)} className={style.back_button}>Back</button>
                                <button className={style.add_button}>Add</button>
                            </div>
                        </Card>
                    </LayoutGrid.Cell>
                    <LayoutGrid.Cell cols='1'/>
                </LayoutGrid.Inner>
            </LayoutGrid>
        )
    }
}

class Input extends Component{
    render({type, labelName},{}){
        return(
            <div className={style.input_group}>
                <label>{labelName}</label><br/>
                <input type={type}/>
            </div>
        )
    }
}