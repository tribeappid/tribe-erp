import { h, Component } from 'preact';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/LayoutGrid/style.css';
import style from './style';

export default class AddInvoice extends Component{
    state={
        btn_top: {
            clicked: false
        },
        btn_bot: {
            clicked: false
        }
    }

    showDetailTop(){
        this.setState({
            btn_top:{
                clicked: ( this.state.btn_top.clicked ? false : true )
            }
        })
    }

    showDetailBot(){
        this.setState({
            btn_bot:{
                clicked: ( this.state.btn_bot.clicked ? false : true )
            }
        })
    }

    render({},{}){
        return(
            <LayoutGrid>
                <LayoutGrid.Inner>
                    <LayoutGrid.Cell cols='1' />
                    <LayoutGrid.Cell cols='10'>
                        <Card className={style.invoice_add_title}>
                            <Card.Primary className={style.invoice_add_title_content}>
                                <LayoutGrid className={style.zero}>
                                    <LayoutGrid.Inner>
                                        <LayoutGrid.Cell cols='8'>
                                            <Card.Title className={style.invoice_add_title_content_title}>New Invoices</Card.Title>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell className={style.invoice_add_title_content_btn}>
                                            <button>Save and Continue</button>
                                            <button>></button>
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                </LayoutGrid>
                            </Card.Primary>
                            <Card.Primary className={style.zero}>
                                <button onClick={this.showDetailTop.bind(this)} className={style.invoice_add_open_content_detail_btn}>Business Address and Contact Details, Title, Summary, and Logo</button>
                            </Card.Primary>
                            <Card.Primary className={ this.state.btn_top.clicked ? style.invoice_add_open_btn_detail : style.invoice_add_close_btn_detail }>
                                <LayoutGrid className={style.zero}>
                                    <LayoutGrid.Inner className={style.invoice_add_first_content}>
                                        <LayoutGrid.Cell desktopCols='6'>
                                            <button>Image Button</button>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell className={style.invoice_add_first_content_detail} desktopCols='6'>
                                            <div className={style.invoice_add_first_content_input_group}>
                                                <div><input type="text"/></div>
                                                <div><input type="text"/></div>
                                            </div>
                                            <div className={style.invoice_add_first_content_detail_group}>
                                                <div>Tribe App</div>
                                                <div>Indonesia</div>
                                                <div>Edit Your Business Address and Contact Details</div>
                                            </div>
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                </LayoutGrid>
                            </Card.Primary>
                            <Card.Primary className={style.invoice_add_second_content} >
                                <LayoutGrid className={style.zero}>
                                    <LayoutGrid.Inner>
                                        <LayoutGrid.Cell cols='6'>
                                           <button>Image</button>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell className={style.invoice_add_second_content_input_group} cols='6'>
                                            <a>Invoice Number </a><input type='text' />
                                            <br/>
                                            <a>P.O./S.O. Number </a><input type='text' />
                                            <br/>
                                            <a>Invoice Date </a><input type='text' />
                                            <br/>
                                            <a>Payment Due </a><input type='text' />
                                            <br/>
                                            <div align='right'>
                                                <div className={style.invoice_add_second_content_hint}>On Receipt</div>
                                            </div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='12'>
                                            <div>CONTENT</div>
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                </LayoutGrid>
                            </Card.Primary>
                            <Card.Primary className={style.zero}>
                                <button onClick={this.showDetailBot.bind(this)} className={style.invoice_add_open_content_detail_btn}>Footer</button>
                            </Card.Primary>
                            <Card.Primary className={ this.state.btn_bot.clicked ? style.invoice_add_open_btn_detail : style.invoice_add_close_btn_detail }>
                                <LayoutGrid className={style.zero}>
                                    <LayoutGrid.Inner>
                                        <LayoutGrid.Cell cols='12'>
                                            <textarea className={style.invoice_add_third_content_footer} placeholder='Enter a footer for this invoice (e.g. tax information, thank you note)'></textarea>
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                </LayoutGrid>
                            </Card.Primary>
                        </Card> 
                    </LayoutGrid.Cell>
                </LayoutGrid.Inner>
            </LayoutGrid>
        )
    }
}