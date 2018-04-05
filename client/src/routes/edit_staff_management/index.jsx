import {h, Component} from 'preact';
import { getAccountData, getPicture, updateProfile, uploadPicture } from '../../actions';
import { connect } from 'preact-redux';
import style from './style';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import Card from 'preact-material-components/Card';
import Icon from 'preact-material-components/Icon';
import 'preact-material-components/Card/style';
import 'preact-material-components/LayoutGrid/style';
import 'preact-material-components/Icon/style';
import { route } from 'preact-router';

class EditStaff extends Component{
    componentDidMount(){
        this.props.getAccountData(this.props.ownProps.id);
    }

    state={
        user:{
            Name: '',
            AuthorizationLevel: 1
        }
    }

    backStaffManageView(){
        this.setState({
            back_btn:{
                clicked: true
            }
        });
        if(this.state.back_btn.clicked){
            route(`/staff/management/view/profile/${this.props.ownProps.id}`);
        }
    }

    handleFileSelect(evt) {
        var files = evt.target.files; // FileList object
        var dataForm = new FormData();
        dataForm.append("image", files[0]);
        let target = this.state.image;
        var reader = new FileReader();
    
        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                const fileAsBase64 = reader.result.substr(reader.result.indexOf(",")+1);                
                document.getElementById('userprofile').src = e.target.result;
                //target.push(fileAsBase64);
            };
        })(files[0]);
    
        // Read in the image file as a data URL.
        reader.readAsDataURL(files[0]);

        const data= this.state.imageData;
        this.setState({
            imagePicked: true,
            imageData:{
                ...data
            },
            formData: dataForm
        });
    }

    handleSubmit(){
        event.preventDefault();
		this.setState({submitted: true,responseCheck: true});
		if(this.state.user.AuthenticationString && this.state.user.Password && this.state.user.Name){
			if(this.validateEmail(this.state.user.AuthenticationString)){
                this.loading();
                this.props.register(this.state.user);
            }
        }
    }

    optionHandle(){
        const newUser = this.state.user;
        this.setState({
            user:{
                ...newUser,
                AuthorizationLevel: ( event.target.selectedIndex == 0 ? 1 : ( 
                    event.target.selectedIndex == 1 ? 100 : (
                        event.target.selectedIndex == 2 ? 300 : (
                            event.target.selectedIndex == 3 ? 400 : (
                                event.target.selectedIndex == 4 ? 410 : (
                                    event.target.selectedIndex == 5 ? 420 : (
                                        event.target.selectedIndex == 6 ? 430 : (
                                            event.target.selectedIndex == 7 ? 440 : (
                                                event.target.selectedIndex == 8 ? 450 : (
                                                    event.target.selectedIndex == 9 ? 490 : 500 )
                                                )
                                            ) 
                                        ) 
                                    ) 
                                )
                            )
                        )
                    )
                )
            }
        })
    }

    handleInput(term){
		const target = term.__preactattr_.name;
        const newUser = this.state.user;
		this.setState({
			user:{
				...newUser,
				[target]: term.value
			}
        });
    }

    render({dataReducer},{user}){
        console.log(dataReducer);
        return(
            <div>
                <div>
                    <LayoutGrid>
                        <LayoutGrid.Inner>
                            <LayoutGrid.Cell cols='1'/>
                            <LayoutGrid.Cell cols='10'>
                                <Card className={style.content_body}>
                                    <a className={style.page_title}>Add Staff</a>
                                    <div style={`text-align: center;margin-bottom: 40px;`}>
                                        <label for='image'>
                                            {//<Icon style={ this.state.imagePicked ? (`font-size:0px;`) : (`font-size: 150px; padding: 5px;`) }>account_circle</Icon>
                                            }
                                            <img src={'../../images/profile.png'} className={style.imageHolder} id="userprofile"/>
                                            <input style={`display: none;`} onChange={this.handleFileSelect.bind(this)} type="file" id="image" name="image"/><br/>
                                            <span className={style.open_folder}>Upload</span>
                                        </label>
                                    </div>
                                    <form onSubmit={this.handleSubmit.bind(this)}>
                                        <div className={style.input_group}>
                                            <label>Name</label>
                                            <input type="text" name="Name" value={user.Name} onChange={ event => this.handleInput(event.target)} />
                                        </div>
                                        <div className={style.input_group}>
                                            <label>Role</label><br/>
                                            <select selectedIndex={2} onChange={this.optionHandle.bind(this)}>
                                                <option>Public User</option>
                                                <option>Guest</option>
                                                <option>User Auth</option>
                                                <option>Sales Auth</option>
                                                <option>Inventory Auth</option>
                                                <option>Finance Auth</option>
                                                <option>Manager Auth</option>
                                                <option>Enterprise Admin Auth</option>
                                                <option>Enterprise Sys Admin Auth</option>
                                                <option>Admin Auth</option>
                                                <option>Sys Admin Auth</option>
                                            </select>
                                        </div>
                                        <div>
                                            <button onClick={this.backStaffManageView.bind(this)} className={style.back_button}>Back</button>
                                            <button type="submit" className={style.add_button}>Add</button>
                                        </div>
                                    </form>
                                </Card>
                            </LayoutGrid.Cell>
                            <LayoutGrid.Cell cols='1'/>
                        </LayoutGrid.Inner>
                    </LayoutGrid>
                </div>
            </div>
        )
    }
}

function mapStateToProps(dataReducer, ownProps){
    return { dataReducer, ownProps };
}

export default connect(mapStateToProps,{ getAccountData, getPicture, uploadPicture, updateProfile })(EditStaff);