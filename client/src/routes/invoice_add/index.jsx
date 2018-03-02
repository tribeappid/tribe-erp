import { h, Component } from 'preact';
import { route } from 'preact-router';
import { LayoutGrid, Card } from 'preact-material-components';
import 'preact-material-components/style.css';
import style from './style';

export default class AddInvoice extends Component{
    state={
        btn: {
            clicked: false
        }
    }

    goToHome(){
        this.setState({clicked: true});
        if(this.state.clicked){
            route('/');
        }
    }

    showDetail(){
        this.setState({
            btn:{
                clicked: ( this.state.btn.clicked ? false : true )
            }
        })
    }

    render({},{}){
        return(
            <LayoutGrid>
                <LayoutGrid.Inner>
                    <LayoutGrid.Cell cols='1' />
                    <LayoutGrid.Cell cols='10'>
                        <Card className={style.title}>
                            <Card.Primary className={style.top_sec}>
                                <LayoutGrid className={style.zero}>
                                    <LayoutGrid.Inner>
                                        <LayoutGrid.Cell cols='8'>
                                            <Card.Title className={style.top_title}>New Invoices</Card.Title>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell className={style.tombol}>
                                            <button>Save and Continue</button>
                                            <button>></button>
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                </LayoutGrid>
                            </Card.Primary>
                            <Card.Primary className={style.btn_sec}>
                                <button onClick={this.showDetail.bind(this)} className={style.top_dropdown_btn}>Business Address and Contact Details, Title, Summary, and Logo</button>
                            </Card.Primary>
                            <Card.Primary className={ this.state.btn.clicked ? style.btn_detail : style.btn_detail_hidden }>
                                <LayoutGrid className={style.zero}>
                                    <LayoutGrid.Inner>
                                        <LayoutGrid.Cell>
                                            HelloWorld
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                </LayoutGrid>
                            </Card.Primary>
                            <Card.Primary className={style.sub_detail} >
                                <LayoutGrid>
                                    <LayoutGrid.Inner>
                                        <LayoutGrid.Cell cols='4'>
                                           DETAIL HEREEEE
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                </LayoutGrid>
                            </Card.Primary>
                            <Card.Primary className={style.zero}>
                                <LayoutGrid className={style.group_of_input}>
                                    <LayoutGrid.Inner>
                                        <LayoutGrid.Cell cols='4'>
                                            <input className={style.input_th_sec} type="text" />
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='2'>
                                            <input className={style.input_th_sec} type="text" />
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='4'>
                                            <div>
                                                <input className={style.input_date+' '+style.border_right} type="date" />
                                                <input className={style.input_date+' '+style.border_left} type="date" />
                                            </div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='2'>
                                            <input className={style.input_th_sec} type="text" />
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                </LayoutGrid>
                            </Card.Primary>
                            {/*
                            <Card.Primary>
                                <Tabs>
                                    <Tabs.Tab onClick={e => {console.log(e)}} active>Tab Pertama</Tabs.Tab>
                                    <Tabs.Tab onClick={e => {console.log(e)}}>Tab Kedua</Tabs.Tab>
                                    <Tabs.Tab onClick={e => {console.log(e)}}>Tab Ketiga</Tabs.Tab>
                                    <Tabs.Tab onClick={e => {console.log(e)}}>Tab Keempat</Tabs.Tab>
                                </Tabs>
                            </Card.Primary>*/
                            }
                        </Card> 
                    </LayoutGrid.Cell>
                </LayoutGrid.Inner>
            </LayoutGrid>
        )
    }
}