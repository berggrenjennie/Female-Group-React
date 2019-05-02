import Card from '@material-ui/core/Card';
import style from '../styles/Card.module.css';
import '../icons/weather.css';

import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { userInfo } from 'os';

import withStorage from './../services/withStorage';
import DashboardScreen from './../screens/DashboardScreen';
import ErrorScreen from './../screens/ErrorScreen';
import DashboardComponent from './DashboardComponent';

//validates registration form 
function validateForm(name, username, password, location, temperature) {
    
    return {
      name: name.length < 2,
      username: username === "",
      password: password.length < 6,
      location: location.length === 0,
      temperature: temperature === ""
    };
}

class UserComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showRegister: false, 
    
            name: "",
            username: "",
            password: "",
            location: "",
            temperature: "",

            touched: {
                name: false,
                username: false,
                password: false,
                location: false,
                temperature: false,
            },

            userInformation: [],
            
            userStatus: "offline",

            usernameLogin: "",
            passwordLogin: "",

            userData: [],

            error: false,
        };

    }

    //updates the showRegister state and shows the registration form 
    showForm = () => {
        this.setState({ showRegister: true })
    };

    //updates the name state to the value the user inputed in the registration form
    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    };

    //updates the username state to the value the user inputed in the registration form
    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    };
    
    //updates the password state to the value the user inputed in the registration form
    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    };

    //updates the location state to the value the user inputed in the registration form
    handleLocationChange = (event) => {
        this.setState({ location: event.target.value });
    };
    
    //updates the temperature state to the value the user inputed in the registration form
    handleTemperatureChange = (event) => {
        this.setState({ temperature: event.target.value });
    };

    //updates a field's state to true if it was touched
    handleBlur = (field) => (event) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true }
        });
    };

    //registers the user by updating the userInformation and the userStatus state 
    onRegistration = (event) => {
        event.preventDefault();

        const registerUser = this.state.userInformation.concat([{
            name: this.state.name, 
            username: this.state.username, 
            password: this.state.password, 
            location: this.state.location, 
            temperature: this.state.temperature
        }]);    
        this.setState({ userInformation: registerUser });
        this.setState({ userStatus: "online" });
        localStorage.setItem("user", this.state.username);

        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
      
        const newUser = {
            name: this.state.name ,
            username: this.state.username,
            email: this.state.password,
            address: {
                street: 'mock street 12',
                suite: 'mock suite',
                city: this.state.location,
                zipcode: this.state.temperature,
                geo: {
                    lat: 0,
                    lng: 0
                }
            }
        }
      
        axios.post('http://api.softhouse.rocks/users/', newUser, axiosConfig)
        .then(function (response) {
            console.log("Success:", response.data);
        })
        .catch(function (error) {
            console.log("Error:", error.response);
        });
        this.props.history.push('/dashboard'); 
    }

    //updates the usernameLogin state to the value the user inputed in the login form
    handleUsernameLoginChange = (event) => {
        this.setState({ usernameLogin: event.target.value });    
    }

    //updates the passwordLogin state to the value the user inputed in the login form
    handlePasswordLoginChange = (event) => {
        this.setState({ passwordLogin: event.target.value });
    }

    //getting user data from Softhouse API though HOC
    componentDidMount(){ 
        this.props.getUser()
        .then(response =>
            this.setState({ userData: response.data })
        ); 
    }

    //checks if user is registered by comparing username & password to API, updates error, userStatus and sets localStorage to username (withStorage)
    loginUser = (event) => {   
        this.state.userData.filter(user => (user.username === this.state.usernameLogin && user.email === this.state.passwordLogin) ?
            (this.props.login('user', user.username),
            this.setState({ userStatus: "online" }),
            this.setState({ showRegister: false }),
            this.props.history.push('/dashboard')) 
            : 
            (this.setState({ error: true }))
        );
        event.preventDefault();
    }

    //updates the userStatus state and clears username from localStorage if checkStatus is true (withStorage)
    logoutUser = (event) => {
        if (this.props.checkStatus) {
            this.setState({userStatus: "offline"});
            this.props.logout();
        }
    }

    render() {           

        //sends user's inputs from registration to validation 
        const errors = validateForm(this.state.name, this.state.username, this.state.password, this.state.location, this.state.temperature);

        //disable button if errors keys (name, username, password etc.) includes an error
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        //if an error is catched in a field update that field's state after its touched
        const shouldMarkError = (field) => {
            const checkError = errors[field];   
            const shouldShowError = this.state.touched[field]; 
            return checkError ? shouldShowError : false;    
        };

        return (
            <Card className={style["card"]} style={{ backgroundColor: '#000' }}>
                <div>
                    <form onSubmit={this.loginUser}>
                        <input type="text" placeholder="username" 
                        value={this.state.usernameLogin}
                        onChange={this.handleUsernameLoginChange}/>
                        
                        <input type="text" placeholder="password" 
                        value={this.state.passwordLogin}
                        onChange={this.handlePasswordLoginChange}/><br/>
                        <ErrorScreen errorMessage={this.state.error}/>
                        <button>Login</button>
                    </form>

                    <button onClick={this.logoutUser}>Logout</button><br/><br/>
                    <button onClick={this.showForm} style={{ backgroundColor: this.state.showRegister ? "#0066cc" : "#808080" }}>Don't have an account? Click here!</button><br/><br/>
                </div>
            
                {this.state.showRegister ? 
                    <div>
                        <form onSubmit={this.onRegistration}>
                            <input className={shouldMarkError("name") ? "error" : ""} 
                            type="text" placeholder="name" 
                            value={this.state.name}  
                            onChange={this.handleNameChange}
                            onBlur={this.handleBlur('name')}/>

                            <input className={shouldMarkError("username") ? "error" : ""} 
                            type="text" placeholder="username" 
                            value={this.state.username} 
                            onChange={this.handleUsernameChange}
                            onBlur={this.handleBlur('username')}/>
        
                            <input className={shouldMarkError("password") ? "error" : ""} 
                            type="text" placeholder="password" 
                            value={this.state.password} 
                            onChange={this.handlePasswordChange}
                            onBlur={this.handleBlur('password')}/>
                           
                            <input className={shouldMarkError("location") ? "error" : ""} 
                            type="text" placeholder="location" 
                            value={this.state.location} onChange={this.handleLocationChange}
                            onBlur={this.handleBlur('location')}/><br/>
                        
                            <select value={this.state.temperature} onChange={this.handleTemperatureChange}>
                                <option value="">temperature</option>
                                <option value="C">Celcius</option>
                                <option value="F">Fahrenheit</option>
                            </select><br/>
    
                            <button disabled={isDisabled}>Register</button> 
                            <p>{this.state.userStatus}</p>
                        </form>
                    </div> :null
                } 
            </Card>
        )
    } 
}
export default withStorage(UserComponent);