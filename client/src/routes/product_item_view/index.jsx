import { h, Component } from 'preact';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import Card from 'preact-material-components/Card';
import Icon from 'preact-material-components/Icon';
import 'preact-material-components/LayoutGrid/style.css';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Icon/style.css';
import { connect } from 'preact-redux';
import style from './style.css'

class ItemProductView extends Component{
    handleChange(event){
        console.log(event);
    }

    render({}, {}){
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
                                            <button className={style.edit_button}>
                                                    <Icon className={style.contoh}>edit</Icon>
                                            
                                                    <a className={style.edit_button_word}>Edit</a>
                                            </button>
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                    <LayoutGrid.Inner className={style.second_content}>
                                        <LayoutGrid.Cell cols='3'>
                                            <div className={style.image_place}>
                                                <div className={style.image_setting}></div>
                                            </div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='9'>
                                            <div className={style.second_content_people_name}>Item Name</div>
                                            <LayoutGrid.Inner>
                                                <LayoutGrid.Cell cols='5'>
                                                    <div className={style.second_content_row + ' ' + style.row_title}>
                                                        Product Code
                                                    </div>
                                                    <div className={style.second_content_row + ' ' + style.row_title}>
                                                        Width
                                                    </div>
                                                    <div className={style.second_content_row + ' ' + style.row_title}>
                                                        Height
                                                    </div>
                                                    <div className={style.second_content_row + ' ' + style.row_title}>
                                                        Status
                                                    </div>
                                                </LayoutGrid.Cell>
                                                <LayoutGrid.Cell cols='7'>
                                                    <div className={style.second_content_row}>
                                                        xxxxxxxxxxxxx
                                                    </div>
                                                    <div className={style.second_content_row}>
                                                        xxx cm
                                                    </div>
                                                    <div className={style.second_content_row}>
                                                        xx cm
                                                    </div>
                                                    <div className={style.second_content_row}>
                                                        Disable
                                                    </div>
                                                </LayoutGrid.Cell>
                                            </LayoutGrid.Inner>
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                    <LayoutGrid.Inner>
                                        <LayoutGrid.Cell cols='2'>
                                            <div className={style.second_content_row + ' ' + style.row_title}>Branches</div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='10'>
                                            <div className={style.second_content_row}>Branches Detail</div>
                                    </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                    <div className={style.divider}/>
                                    <LayoutGrid.Inner className={style.last_content}>
                                        <LayoutGrid.Cell cols='2'>
                                            <div className={style.second_content_row + ' ' + style.row_title}>Product Descriptions</div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='10'>
                                            <div className={style.second_content_row}>Product DetailProduct DetailProduct DetailProduct DetailProduct DetailProduct DetailProduct DetailProduct DetailProduct DetailProduct DetailProduct DetailProduct DetailProduct DetailProduct DetailProduct DetailProduct DetailProduct DetailProduct DetailProduct DetailProduct DetailProduct Detail</div>
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
                                    <button className={style.button_back}>Back</button>
                                </div>
                            </Card>
                        </LayoutGrid.Cell>
                    </LayoutGrid.Inner>
                </LayoutGrid>
            </div>
        )
    }
}

export default connect('','')(ItemProductView);
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