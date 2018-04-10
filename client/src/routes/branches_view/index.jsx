import { h, Component } from 'preact';
import { route } from 'preact-router';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import Card from 'preact-material-components/Card';
import Icon from 'preact-material-components/Icon';
import 'preact-material-components/LayoutGrid/style.css';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Icon/style.css';
import { connect } from 'preact-redux';
import { getBranchData } from '../../actions';
import style from './style.css'

class BranchView extends Component{
    componentDidMount(){
        this.props.getBranchData(this.props.ownProps.id);
    }

    state={
        isDataReady: false
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

    goEditBranch = () => {
        route(`/branches/edit/${this.props.ownProps.id}`);
    }

    render({dataReducer}, {isDataReady}){
        if(dataReducer.branchData.length!=0){
            if(!isDataReady){
                this.setState({isDataReady: true});
            }
        }
        return(
            <div>
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
                                            <button onClick={this.goEditBranch.bind(this)} className={style.edit_button}>
                                                    <Icon>edit</Icon>
                                                    <a>Edit</a>
                                            </button>
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                    
                                    <LayoutGrid.Inner style={`margin-top: 50px;`}>
                                        <LayoutGrid.Cell cols='2'>
                                            <div className={style.second_content_row + ' ' + style.row_title}>Branch Name</div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='10'>
                                            <div className={style.second_content_row}>{isDataReady ? dataReducer.branchData[0].name : 'Loading.....'}</div>
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                    <div className={style.divider}/>
                                    <LayoutGrid.Inner className={style.last_content}>
                                        <LayoutGrid.Cell cols='2'>
                                            <div className={style.second_content_row + ' ' + style.row_title}>Address</div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='10'>
                                            <div className={style.second_content_row}>{isDataReady ? dataReducer.branchData[0].address : 'Loading....'}</div>
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                    <div className={style.divider}/>
                                    <LayoutGrid.Inner className={style.last_content}>
                                        <LayoutGrid.Cell cols='2'>
                                            <div className={style.second_content_row + ' ' + style.row_title}>Phone</div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='10'>
                                            <div className={style.second_content_row}>{isDataReady ? dataReducer.branchData[0].phone : 'Loading....'}</div>
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                    <button onClick={this.backTotaffList.bind(this)} className={style.button_back}>Back</button>
                                </div>
                            </Card>
                        </LayoutGrid.Cell>
                    </LayoutGrid.Inner>
                </LayoutGrid>
            </div>
        )
    }
}

function mapStateToProps( dataReducer, ownProps ){
    return { dataReducer, ownProps };
}

export default connect(mapStateToProps,{ getBranchData })(BranchView);