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
            EntityId: '',
            Name: '',
            AuthorizationLevel: 1
        },
        oldData:{
            Name: '',
            AuthorizationLevel: 1  
        },
        loadDataOnce: true,
        isNeedtoUpload: false,
        formData: []
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
            formData: dataForm,
            isNeedtoUpload: true
        });
    }

    handleSubmit(){
        event.preventDefault();
		this.setState({submitted: true,responseCheck: true});
        if(this.state.user.Name != this.state.oldData.Name){
            this.setState({isNeedtoUpload: true});
        }
        if(this.state.user.AuthorizationLevel != this.state.oldData.AuthorizationLevel){
            this.setState({isNeedtoUpload: true});
        }
        if(this.state.isNeedtoUpload){
            const currentData= this.state.user;
            this.setState({
                user:{
                    ...currentData,
                    EntityId: this.props.ownProps.id
                }
            });
            if(this.state.formData.length!=0){
                this.props.uploadPicture(this.state.user,this.state.formData);
            }
            this.props.updateProfile(this.state.user,this.successCallback.bind(this),this.failCallback);
        }
        else{
        }
    }


    successCallback = () => {
        this.setState({success: true});
    }

    failCallback = () => {
        this.setState({fail: true});
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

    loadProfileData(){
        if(this.state.loadDataOnce){
            if(this.props.dataReducer.accountData[0]){
                this.setState({
                    user:{
                        EntityId: this.props.ownProps.id,
                        Name: this.props.dataReducer.accountData[0].name,
                        AuthorizationLevel: this.props.dataReducer.accountData[0].authorization_level
                    },
                    oldData:{
                        Name: this.props.dataReducer.accountData[0].name,
                        AuthorizationLevel: this.props.dataReducer.accountData[0].authorization_level
                    },
                    loadDataOnce: false
                })
            }
        }
    }

    currentIndex(data){
        if(data == 1){
            return 0;
        }
        else if(data == 100){
            return 1;
        }
        else if(data == 300){
            return 2;
        }
        else if(data == 400){
            return 3;
        }
        else if(data == 410){
            return 4;
        }
        else if(data == 420){
            return 5;
        }
        else if(data == 430){
            return 6;
        }
        else if(data == 440){
            return 7;
        }
        else if(data == 450){
            return 8;
        }
        else if(data == 490){
            return 9;
        }
        else{
            return 10;
        }
    }

    checkingResponse(){
        if(this.state.success){
            alert("Success Change");
            route(`/staff/management/view/profile/${this.props.ownProps.id}`);
            window.location.reload();
        }
        else if(this.state.fail){
            alert("Failed Update Profile");
        }
    }

    render({dataReducer,ownProps},{user}){
        this.loadProfileData();
        this.checkingResponse();
        const ROOT_URL = 'http://localhost:3000/';
        return(
            <div>
                <div>
                    <LayoutGrid>
                        <LayoutGrid.Inner>
                            <LayoutGrid.Cell cols='1'/>
                            <LayoutGrid.Cell cols='10'>
                                <Card className={style.content_body}>
                                    <a className={style.page_title}>Update Profile</a>
                                    <div style={`text-align: center;margin-bottom: 40px;`}>
                                        <label for='image'>
                                            <img src={`${ROOT_URL}accounts/userprofile?EntityId=${ownProps.id}`} className={style.imageHolder} id="userprofile"/>
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
                                            <select selectedIndex={this.currentIndex(user.AuthorizationLevel)} onChange={this.optionHandle.bind(this)}>
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
                                            <button type="submit" className={style.add_button}>Update</button>
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