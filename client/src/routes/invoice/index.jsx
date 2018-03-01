import { Component, h } from 'preact';
import { LayoutGrid, Card, TextField, Tabs } from 'preact-material-components';
import 'preact-material-components/style.css';
import style from './style.css';
import Home from '../home';

export default class Invoice extends Component{

    render({}, {}){
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
                                            <Card.Title className={style.top_title}>Invoices</Card.Title>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell className={style.tombol}>
                                            <button >Create an Invoice</button>
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                </LayoutGrid>
                            </Card.Primary>
                            <Card.Primary className={style.sub_detail} >
                                <LayoutGrid>
                                    <LayoutGrid.Inner>
                                        <LayoutGrid.Cell cols='4'>
                                            <div><a className={style.sd_word_grey}>OVERDUE</a></div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='4'>
                                            <div><a className={style.sd_word_grey}>COMING DUE WITHIN 30 DAYS</a></div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='4'>
                                            <div><a className={style.sd_word_grey}>AVERAGE TIME TO GET PAID</a></div>
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                    <LayoutGrid.Inner className={style.distance}>
                                        <LayoutGrid.Cell cols='4'>
                                            <div><a className={style.sd_word_detail}>Rp0.00</a> <a className={style.sd_word_grey}>IDR</a></div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='4'>
                                            <div><a className={style.sd_word_detail}>Rp0.00</a> <a className={style.sd_word_grey}>IDR</a></div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='4'>
                                            <div><a className={style.sd_word_detail}>0</a> <a className={style.sd_word_grey}>DAYS</a></div>
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                    <LayoutGrid.Inner className={style.distance_farther}>
                                        <LayoutGrid.Cell cols='12'>
                                            <div><a className={style.sd_word_time}>Last updated: 22 minutes ago.</a> <a className={style.sd_word_link} href="#">Refresh</a></div>
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
        );
    }
}