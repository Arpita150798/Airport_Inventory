import React, { Component } from 'react'
import { SignInModel } from '../Utils/SignInModel';
import { API_ENDPOINTS } from '../Utils/ApiEndPoints';
import ConnectToApi from '../Utils/ConnectToApi';

class LoginForm  extends Component{

    constructor(props) {
        super(props);
        this.state = {
             email: '',
             password: '',
             userDetails: new SignInModel(),
             
        }
    }
    handleFormChange = (event) => {
        const data = {
            [event.target.name]: event.target.value
        };
        this.setState(data);
    }
    resetForm = (event) => {
        this.setState({
            email: '',
            password: '',
            userDetails: {}
        }); 
    }
    login =  (event) => {
        event.preventDefault();
        if(this.state.email !== null && this.state.password !== null){
           this.state.userDetails.email = this.state.email;
         this.state.userDetails.password = this.state.password;
        this.setState( {
                userDetails: this.state.userDetails                            
          })
            console.log("Before Sending",this.state.userDetails);
           new ConnectToApi().postData(API_ENDPOINTS.login, this.state.userDetails).then(response => {
               // alert(response.data.firstName);
                if(response.data.firstName != null){
                    window.location = '/dashboard/' + response.data.firstName;
                }
                else{
                    this.setState({
                        email:'',
                        password:''
                    })
                    alert("Invalid credentials.Please Try Again!!");
                }
            }).catch(error => {
                alert('Hii from Catch');
                console.log(error);
            });
        }
    };
    render() {
        return (
            
            <div className="homePageBackground">
                    <h1 className='center-content '>
                    <b>Airport Fuel Inventory System</b>
                    </h1>
                <div className="form-content">
                    <form onSubmit={this.login}>
                        <div className="form-group">
                            <label htmlFor="name">Email<span className="requiredAstrick">*</span>:</label>
                            <input type="email" className="form-control"  name="email" placeholder="Enter your email" 
                            required value={this.state.email} onChange={this.handleFormChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Password<span className="requiredAstrick">*</span>:</label>
                            <input type="password" className="form-control" name="password" placeholder="Enter your pasword" 
                            required value={this.state.password} onChange={this.handleFormChange} />
                        </div>
                        <div className="right-content">
                            <button type="submit" className="btn btn-primary">Sign in</button>
                            <button type="button" className="btn btn-light" onClick={this.resetForm}>Reset</button>
                        </div>
                    </form>
                </div>
            
                
            </div>
        )
    }
}

export default LoginForm
