import { h, Component } from 'preact';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import Card from 'preact-material-components/Card';
import Icon from 'preact-material-components/Icon';
import 'preact-material-components/LayoutGrid/style.css';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Icon/style.css';
import { connect } from 'preact-redux';
import style from './style.css'
import { getProductDataDetail } from '../../actions';
import { route } from 'preact-router';

class ItemProductView extends Component{
    componentDidMount(){
        this.props.getProductDataDetail(this.props.ownProps.id);
    }

    state={
        isDataIsReady: false
    }

    goBackToProductList = () => {
        route('/manager/product/list');
    }

    render({dataReducer}, {isDataIsReady}){
        if(dataReducer.productDataDetail.length!=0){
            if(!isDataIsReady){
                this.setState({isDataIsReady: true});
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
                                            <a className={style.page_info}>View Product</a>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='6'>
                                            <button onClick={''} className={style.edit_button}>
                                                    <Icon>edit</Icon>
                                                    <a>Edit</a>
                                            </button>
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                    
                                    <LayoutGrid.Inner style={`margin-top: 50px;`}>
                                        <LayoutGrid.Cell cols='2'>
                                            <div className={style.second_content_row + ' ' + style.row_title}>Product Name</div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='10'>
                                            <div className={style.second_content_row}>{isDataIsReady ? dataReducer.productDataDetail[0].name : 'Loading....'}</div>
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                    <div className={style.divider}/>
                                    <LayoutGrid.Inner className={style.last_content}>
                                        <LayoutGrid.Cell cols='2'>
                                            <div className={style.second_content_row + ' ' + style.row_title}>Status</div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='10'>
                                            <div className={style.second_content_row}>{isDataIsReady ? dataReducer.productDataDetail[0].status : 'Loading....'}</div>
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                    <div className={style.divider}/>
                                    <LayoutGrid.Inner className={style.last_content}>
                                        <LayoutGrid.Cell cols='2'>
                                            <div className={style.second_content_row + ' ' + style.row_title}>Code</div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='10'>
                                            <div className={style.second_content_row}>{isDataIsReady ? dataReducer.productDataDetail[0].code : 'Loading....'}</div>
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                    <div className={style.divider}/>
                                    <LayoutGrid.Inner className={style.last_content}>
                                        <LayoutGrid.Cell cols='2'>
                                            <div className={style.second_content_row + ' ' + style.row_title}>Length</div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='10'>
                                            <div className={style.second_content_row}>{isDataIsReady ? dataReducer.productDataDetail[0].length : 'Loading....'}</div>
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                    <div className={style.divider}/>
                                    <LayoutGrid.Inner className={style.last_content}>
                                        <LayoutGrid.Cell cols='2'>
                                            <div className={style.second_content_row + ' ' + style.row_title}>Width</div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='10'>
                                            <div className={style.second_content_row}>{isDataIsReady ? dataReducer.productDataDetail[0].width : 'Loading....'}</div>
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                    <div className={style.divider}/>
                                    <LayoutGrid.Inner className={style.last_content}>
                                        <LayoutGrid.Cell cols='2'>
                                            <div className={style.second_content_row + ' ' + style.row_title}>Weight</div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='10'>
                                            <div className={style.second_content_row}>{isDataIsReady ? dataReducer.productDataDetail[0].weight : 'Loading....'}</div>
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                    <div className={style.divider}/>
                                    <LayoutGrid.Inner className={style.last_content}>
                                        <LayoutGrid.Cell cols='2'>
                                            <div className={style.second_content_row + ' ' + style.row_title}>Height</div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='10'>
                                            <div className={style.second_content_row}>{isDataIsReady ? dataReducer.productDataDetail[0].height : 'Loading....'}</div>
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                    <div className={style.divider}/>
                                    <LayoutGrid.Inner className={style.last_content}>
                                        <LayoutGrid.Cell cols='2'>
                                            <div className={style.second_content_row + ' ' + style.row_title}>Description</div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='10'>
                                            <div className={style.second_content_row}>{isDataIsReady ? dataReducer.productDataDetail[0].description : 'Loading....'}</div>
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                    <button onClick={this.goBackToProductList} className={style.button_back}>Back</button>
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

export default connect(mapStateToProps,{getProductDataDetail})(ItemProductView);
{/*
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
}*/
}