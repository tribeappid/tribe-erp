import { h, Component } from 'preact';

export default class LoadingScreen extends Component{
    render({},{}){
        return(
            <div>
                <div id="loadingScreen" hidden={true} style={`width: 100%;height:100%;position:fixed;opacity:0.7;background:#000;z-index:99;text-align:center;`}>
                    <div style={`margin-top:20%;`}/>
                    <img style={`width:190px;position:relative;z-index:100;`} src="/images/rolling.gif"/>
                </div>
            </div>
        )
    }
}