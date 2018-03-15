import { h, Component } from 'preact';
import { route } from 'preact-router';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import Card from 'preact-material-components/Card';
import Icon from 'preact-material-components/Icon';
import 'preact-material-components/LayoutGrid/style.css';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Icon/style.css';
import { connect } from 'preact-redux';
import style from './style.css'

class BranchView extends Component{
    handleChange(event){
        console.log(event);
    }

    backTotaffList(){
        this.setState({
            back_to_staff:{
                clicked: true
            }
        })
        if(this.state.back_to_staff.clicked){
            route('/branches');
        }
    }

    render({}, {}){
        return(
            <LayoutGrid>
                <LayoutGrid.Inner>
                    <LayoutGrid.Cell cols='1'/>
                    <LayoutGrid.Cell cols='10'>
                        <Card>
                            <div className={style.content_body}>
                                <LayoutGrid.Inner>
                                    <LayoutGrid.Cell cols='6'>
                                        <a className={style.page_info}>View Branch</a>
                                    </LayoutGrid.Cell>
                                    <LayoutGrid.Cell cols='6'>
                                        <button className={style.edit_button}>
                                                <Icon>edit</Icon>
                                                <a>Edit</a>
                                        </button>
                                    </LayoutGrid.Cell>
                                </LayoutGrid.Inner>
                                
                                <LayoutGrid.Inner style={`margin-top: 20px;`}>
                                    <LayoutGrid.Cell cols='2'>
                                        <div className={style.second_content_row + ' ' + style.row_title}>Branch Name</div>
                                    </LayoutGrid.Cell>
                                    <LayoutGrid.Cell cols='10'>
                                        <div className={style.second_content_row}>Branch Detail</div>
                                </LayoutGrid.Cell>
                                </LayoutGrid.Inner>
                                <div className={style.divider}/>
                                <LayoutGrid.Inner className={style.last_content}>
                                    <LayoutGrid.Cell cols='2'>
                                        <div className={style.second_content_row + ' ' + style.row_title}>Address</div>
                                    </LayoutGrid.Cell>
                                    <LayoutGrid.Cell cols='10'>
                                        <div className={style.second_content_row}>Address Detail</div>
                                    </LayoutGrid.Cell>
                                </LayoutGrid.Inner>
                                <div className={style.divider}/>
                                <LayoutGrid.Inner>
                                    <LayoutGrid.Cell cols='12'>
                                        <div className={style.second_content_row + ' ' + style.row_title}>Programmers</div>
                                        <ProgramTable/>
                                        <ProgramTable/>
                                    </LayoutGrid.Cell>
                                </LayoutGrid.Inner>
                                <button onClick={this.backTotaffList.bind(this)} className={style.button_back}>Back</button>
                            </div>
                        </Card>
                    </LayoutGrid.Cell>
                </LayoutGrid.Inner>
            </LayoutGrid>
        )
    }
}

export default connect('','')(BranchView);

class ProgramTable extends Component{
    render({}, {}){
        return(
            <div className={style.program_table}>
                <table>
                    <tr>
                        <th>Programmes ##</th>
                    </tr>
                    <tr>
                        <td>
                            <LayoutGrid.Inner>
                                <LayoutGrid.Cell cols='3'><div className={style.row_title}>Subject</div></LayoutGrid.Cell>
                                <LayoutGrid.Cell cols='9'><div>Math</div></LayoutGrid.Cell>
                            </LayoutGrid.Inner>
                        </td>
                    </tr>
                    <div className={style.divider_table}/>
                    <tr>
                        <td>
                            <LayoutGrid.Inner>
                                <LayoutGrid.Cell cols='3'><div className={style.row_title}>Curriculum</div></LayoutGrid.Cell>
                                <LayoutGrid.Cell cols='9'><div>Level A</div></LayoutGrid.Cell>
                            </LayoutGrid.Inner>
                        </td>
                    </tr>
                    <div className={style.divider_table}/>
                    <tr>
                        <td>
                            <LayoutGrid.Inner>
                                <LayoutGrid.Cell cols='3'><div className={style.row_title}>Level</div></LayoutGrid.Cell>
                                <LayoutGrid.Cell cols='9'><div>JC 2</div></LayoutGrid.Cell>
                            </LayoutGrid.Inner>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}
