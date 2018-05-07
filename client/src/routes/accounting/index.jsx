import { h, Component } from 'preact';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/LayoutGrid/style.css';
import style from './style.css';
import _ from 'lodash';

export default class Accounting extends Component{
    state={
        data:[
            {
                nama: 'data1',
                detail: 'data2',
                role: 'data3',
                date: 'data4'
            },
            {
                nama: 'data1',
                detail: 'data2',
                role: 'data3',
                date: 'data4'
            }
        ],
        tempData:{
            nama: '',
            detail: '',
            role: '',
            date: ''
        },
        clearData:{
            nama: '',
            detail: '',
            role: '',
            date: ''
        }
    }

    oneRowData(){
        var dataRow = 0;
        return _.map(this.state.data, data => {
            return(
                <tr className={ dataRow%2==0 ? style.even : style.odd }>
                    <td>{data.nama}</td>
                    <td>{data.detail}</td>
                    <td>{data.role}</td>
                    <td>{data.date}</td>
                    <td><button name={dataRow} onClick={this.handleEvent}>edit</button></td>
                    <div style={`height: 0px;visibility: hidden;width: 0px; opacity: 0px`}>{dataRow++}</div>
                </tr>
            );
        })
    }

    handleEvent(event){
        console.log(event);
    }

    addData(){
        if(this.state.tempData){
            var temp = this.state.data;
            var temp2 = this.state.clearData;
            temp.push(this.state.tempData);
            this.setState({
                data:[
                    ...temp
                ]
            })
            this.setState({
                tempData: temp2
            })
        }
    }

    handleInput(term){
		const target = term.__preactattr_.name;
		const newUser = this.state.tempData;
		this.setState({
			tempData:{
				...newUser,
				[target]: term.value
			}
        });
	}

    render({},{ count }){
        return(
            <div>
                <LayoutGrid style={`margin: 0px;padding:0px;`}>
                    <LayoutGrid.Inner>
                        <LayoutGrid.Cell cols='1'/>
                        <LayoutGrid.Cell cols='10'>
                        <table>
                                <tbody>
                                    <tr className={style.title_row}>
                                        <th>Date</th>
                                        <th>Username</th>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th></th>
                                    </tr>
                                    {this.oneRowData()}
                                    <tr className={style.add_row}>
                                        <td><input name="nama" onChange={ event => this.handleInput(event.target)} value={this.state.tempData.nama}/></td>
                                        <td><input name="detail" onChange={ event => this.handleInput(event.target)} value={this.state.tempData.detail}/></td>
                                        <td><input name="role" onChange={ event => this.handleInput(event.target)} value={this.state.tempData.role}/></td>
                                        <td><input name="date" onChange={ event => this.handleInput(event.target)} value={this.state.tempData.date}/></td>
                                        <td><button onClick={this.addData.bind(this)}>Save</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </LayoutGrid.Cell>
                        <LayoutGrid.Cell cols='1'/>
                    </LayoutGrid.Inner>
                </LayoutGrid>
            </div>
        )
    }
}