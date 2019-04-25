// CSS and Material Design Imports
import Card from '@material-ui/core/Card';
import style from '../styles/Card.module.css'
import '../icons/weather.css';

// Router and core functionality from react.
import React, { Component } from 'react'
import { userInfo } from 'os';

// Existing component imports.

// The Card Component is a multi-use component. It will be used as the login,
// the registration, the logout, the edit "My Account" functionality, 
// and the weather. It is similar to how the Card Component in uppgift 1, 2, 3.



//false means no errors aka entirely valid; true means a field is invalid.
function validate(name, username, password) {
    // true means invalid, so our conditions got reversed
    return {
      name: name.length === 0,
      username: username.length === 0,
      password: password.length === 0

    };
  }

export default class CardComponent extends Component {

    


    constructor(props) {
        super(props);
        this.state = {
            showRegister: false, 
            
            name: "",
            username: "",
            password: "",

            touched: {
                name: false,
                username: false,
                password: false,
              }
        };
    }

    //updates the showRegister state and shows the registration form 
    showForm = () => {
        this.setState({ showRegister: true })
    }


    handleNameChange = evt => {
        this.setState({ name: evt.target.value });
      };
      handleUsernameChange = evt => {
        this.setState({ username: evt.target.value });
      };
      handlePasswordChange = evt => {
        this.setState({ password: evt.target.value });
      };


    handleBlur = (field) => (evt) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
      };






    render() {   
        
        const errors = validate(this.state.name, this.state.username, this.state.password);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        const shouldMarkError = field => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
      
            return hasError ? shouldShow : false;
        };


        
        return (
            <Card className={style["card"]} style={{ backgroundColor: '#000' }}>
                <div>
                    <form>
                        <input type="text" className="form-control" placeholder="username"/>
                        <input type="text" className="form-control" placeholder="password"/>
                    </form>
                    <button>Login</button>
                    <br/><br/>
                    <button onClick={this.showForm} style={{ backgroundColor: this.state.showRegister ? "#0066cc" : "#808080" }}>Don't have an account? Click here!</button>
                    <br/><br/>
                </div>

                {this.state.showRegister ? 
                    <div>
                        <form>
                            <input className={shouldMarkError("name") ? "error" : ""} 
                            type="text" placeholder="name" 
                            value={this.state.name}  
                            onChange={this.handleNameChange}
                            onBlur={this.handleBlur('name')}/>
                            <input className={shouldMarkError("username") ? "error" : ""} 
                            type="text" placeholder="username" 
                            value={this.state.username} 
                            onChange={this.handleUsernameChange}
                            onBlur={this.handleBlur('username')} 
                            />
                            <input className={shouldMarkError("password") ? "error" : ""} 
                            type="text" 
                            placeholder="password" 
                            value={this.state.password} 
                            onChange={this.handlePasswordChange}
                            onBlur={this.handleBlur('password')}/>
                            <input type="text" className="form-control" placeholder="location"/>                        
                        </form>
                        <select>
                            <option value="" selected disabled hidden>temperature</option>
                            <option value="C">Celcius</option>
                            <option value="F">Fahrenheit</option>
                        </select>
                        <br/>
                        <button disabled={isDisabled}>Register</button> 
                    </div> :null
                } 
            </Card>
        )
    }
}

