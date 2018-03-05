import { h, Component } from 'preact';
import { route } from 'preact-router';
import { LayoutGrid, Card } from 'preact-material-components';
import 'preact-material-components/style.css';
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
                                    <LayoutGrid.Inner>
                                        <LayoutGrid.Cell desktopCols='6'>
                                            <button>Image Button</button>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell desktopCols='6'>
                                            <div><input type="text"/></div>
                                            <div><input type="text"/></div>
                                            <div><a>Text here</a></div>
                                            <div><a>Text here</a></div>
                                            <div><a>Text here</a></div>
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
                                        <LayoutGrid.Cell>
                                            HelloWorld
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