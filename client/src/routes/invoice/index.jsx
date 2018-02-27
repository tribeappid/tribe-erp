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
                            <Card.Primary>
                                <LayoutGrid className={style.zero}>
                                    <LayoutGrid.Inner>
                                        <LayoutGrid.Cell cols='8'>
                                            <Card.Title align='left'>Invoice</Card.Title>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell className={style.tombol}>
                                            <button>Add</button>
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                </LayoutGrid>
                            </Card.Primary>
                            <Card.Primary className={style.sub_detail} >
                                <LayoutGrid>
                                    <LayoutGrid.Inner>
                                        <LayoutGrid.Cell cols='4'>
                                            <div>Content 1</div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='4'>
                                            <div>Content 2</div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='4'>
                                            <div>Content 3</div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='4'>
                                            <div>Content 1</div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='4'>
                                            <div>Content 2</div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='4'>
                                            <div>Content 3</div>
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='12'>
                                            <div>Content Content</div>
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                </LayoutGrid>
                            </Card.Primary>
                            <Card.Primary>
                                <LayoutGrid>
                                    <LayoutGrid.Inner>
                                        <LayoutGrid.Cell cols='4'>
                                            <input type="text" />
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='2'>
                                            <input type="text" />
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='4'>
                                            <input type="text" />
                                        </LayoutGrid.Cell>
                                        <LayoutGrid.Cell cols='2'>
                                            <input type="text" />
                                        </LayoutGrid.Cell>
                                    </LayoutGrid.Inner>
                                </LayoutGrid>
                            </Card.Primary>
                            <Card.Primary>
                                <Tabs>
                                    <Tabs.Tab onClick={e => {console.log(e)}} active>Tab Pertama</Tabs.Tab>
                                    <Tabs.Tab onClick={e => {console.log(e)}}>Tab Kedua</Tabs.Tab>
                                    <Tabs.Tab onClick={e => {console.log(e)}}>Tab Ketiga</Tabs.Tab>
                                    <Tabs.Tab onClick={e => {console.log(e)}}>Tab Keempat</Tabs.Tab>
                                </Tabs>
                            </Card.Primary>
                            <Card.Primary>
                            </Card.Primary>
                        </Card> 
                    </LayoutGrid.Cell>
                </LayoutGrid.Inner>
            </LayoutGrid>
        );
    }
}