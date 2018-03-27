import { h, Component } from 'preact';
import { route } from 'preact-router';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import Card from 'preact-material-components/Card';
import Icon from 'preact-material-components/Icon';
import 'preact-material-components/LayoutGrid/style.css';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Icon/style.css';
import { connect } from 'preact-redux';
import { getAccountData, getPicture } from '../../actions';
import _ from 'lodash';
import style from './style.css'

class StaffManageView extends Component{
    componentDidMount(){
        this.props.getAccountData(this.props.ownProps.id);
        this.props.getPicture(this.props.ownProps.id);
    }
    handleChange(event){
        
    }

    backTotaffList(){
        this.setState({
            back_to_staff:{
                clicked: true
            }
        })
        if(this.state.back_to_staff.clicked){
            route('/staff/management');
        }
    }

    render({dataReducer, ownProps}, {}){
        console.log(dataReducer);
        const ROOT_URL = 'http://localhost:3000/';
        const profileInfo = _.map(dataReducer.accountData);
        return(
            <LayoutGrid>
                <LayoutGrid.Inner>
                    <LayoutGrid.Cell cols='1'/>
                    <LayoutGrid.Cell cols='10'>
                        <Card>
                            <div className={style.content_body}>
                                <LayoutGrid.Inner>
                                    <LayoutGrid.Cell cols='6'>
                                        <a className={style.page_info}>View Staff</a>
                                    </LayoutGrid.Cell>
                                    <LayoutGrid.Cell cols='6'>
                                        <button className={style.edit_button}>
                                                <Icon>edit</Icon>
                                                <a>Edit</a>
                                        </button>
                                    </LayoutGrid.Cell>
                                </LayoutGrid.Inner>
                                <LayoutGrid.Inner className={style.second_content}>
                                    <LayoutGrid.Cell cols='3'>
                                        <div className={style.image_place}>
                                            {//<div className={style.image_setting}></div>
                                            }
                                            <img style={`width:100px;height:100px;`} src={`${ROOT_URL}accounts/userprofile?EntityId=${ownProps.id}`}/>
                                            {console.log(`accounts/userprofile?EntityId=${ownProps.id}`)}
                                        </div>
                                    </LayoutGrid.Cell>
                                    <LayoutGrid.Cell cols='9'>
                                        <div className={style.second_content_people_name}>{ profileInfo[0] ? profileInfo[0].name : 'Loading ...' }</div>
                                        <LayoutGrid.Inner>
                                            <LayoutGrid.Cell cols='5'>
                                                <div className={style.second_content_row + ' ' + style.row_title}>
                                                    Email
                                                </div>
                                                <div className={style.second_content_row + ' ' + style.row_title}>
                                                    Birthday
                                                </div>
                                                <div className={style.second_content_row + ' ' + style.row_title}>
                                                    Mobile Number
                                                </div>
                                            </LayoutGrid.Cell>
                                            <LayoutGrid.Cell cols='7'>
                                                <div className={style.second_content_row}>
                                                    { profileInfo[0] ? profileInfo[0].authentication_string : 'Loading ...' }
                                                </div>
                                                <div className={style.second_content_row}>
                                                    xxxx-xx-xx
                                                </div>
                                                <div className={style.second_content_row}>
                                                    xxxxxxxx1234
                                                </div>
                                            </LayoutGrid.Cell>
                                        </LayoutGrid.Inner>
                                    </LayoutGrid.Cell>
                                </LayoutGrid.Inner>
                                <LayoutGrid.Inner>
                                    <LayoutGrid.Cell cols='2'>
                                        <div className={style.second_content_row + ' ' + style.row_title}>Role</div>
                                    </LayoutGrid.Cell>
                                    <LayoutGrid.Cell cols='10'>
                                        <div className={style.second_content_row}>{ profileInfo[0] ? profileInfo[0].authorization_level == 500 ? "Adminitrasition" : '' : '' }</div>
                                </LayoutGrid.Cell>
                                </LayoutGrid.Inner>
                                <div className={style.divider}/>
                                <LayoutGrid.Inner className={style.last_content}>
                                    <LayoutGrid.Cell cols='2'>
                                        <div className={style.second_content_row + ' ' + style.row_title}>Branches</div>
                                    </LayoutGrid.Cell>
                                    <LayoutGrid.Cell cols='10'>
                                        <div className={style.second_content_row}>Role Detail</div>
                                        <div className={style.second_content_row}>Role Detail</div>
                                    </LayoutGrid.Cell>
                                </LayoutGrid.Inner>
                                {/*
                                <div className={style.divider}/>
                                <LayoutGrid.Inner>
                                    <LayoutGrid.Cell cols='12'>
                                        <div className={style.second_content_row + ' ' + style.row_title}>Programmers</div>
                                        <ProgramTable/>
                                        <ProgramTable/>
                                    </LayoutGrid.Cell>
                                </LayoutGrid.Inner>*/
                                }
                                <button onClick={this.backTotaffList.bind(this)} className={style.button_back}>Back</button>
                            </div>
                        </Card>
                    </LayoutGrid.Cell>
                </LayoutGrid.Inner>
            </LayoutGrid>
        )
    }
}

function mapStateToProps(dataReducer, ownProps){
    return { dataReducer, ownProps };
}

export default connect(mapStateToProps,{ getAccountData, getPicture })(StaffManageView);