// CSS and Material Design Imports
import style from '../styles/User.module.css';
import '../icons/weather.css';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';

// Core functionality from react and axios.
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";

// HOC imports.
import withStorage from './../services/withStorage';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1d1e20'
    }
  }
});

//validates registration form
function validateForm(name, username, password, temperature) {
  return {
    name: name.length < 2,
    username: username === '',
    password: password.length < 6,
    temperature: temperature === ''
  };
}

// This component handles the bulk of the user's experience through our app, including
// logging in, registering for the first time. User information is sent to Softhouse's API,
// saved in localStorage, which is retrieved on a as-needed basis.
class UserComponent extends Component {
  static propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object,
    getUser: PropTypes.func,
    getUsers: PropTypes.func,
    addUser: PropTypes.func,
    login: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      showRegister: false,

      name: '',
      username: '',
      password: '',
      temperature: 'C',

      //validation
      touched: {
        name: false,
        username: false,
        password: false,
        temperature: false
      },

      //used to compare userinformation.username & usernameLogin etc.
      usernameLogin: '',
      passwordLogin: '',

      //softhouse user data
      userData: [],

      //errormessage
      error: false
    };
  }

  //updates the showRegister state and toggles the registration form
  showForm = () => {
    this.setState({ showRegister: !this.state.showRegister });
  };

  //updates a field's state to true if it was touched
  handleBlur = field => event => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  // One function to handle all the input field data changes, where 'name' is field changed
  // and event is the incoming data change to that field. This function then sets the appropriate state.
  handleInputChange = name => event => {
    const state = {};
    state[name] = event.target.value;
    this.setState(state);
  };

  //registers the user by updating the userInformation
  onRegistration = event => {
    event.preventDefault();
    this.props.login(this.state.username);

    const newUser = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.password,
      address: {
        street: 'mock street 12',
        suite: 'mock',
        city: 'Stockholm',
        zipcode: this.state.temperature,
        geo: {
          lat: 0,
          lng: 0
        }
      }
    };

    // Posts user information on user registration, and posts it to Softhouse's API using axios' options.
    // Then redirects the user to dashboard.
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    };

    axios
      .post('http://api.softhouse.rocks/users/', newUser, axiosConfig)
      .then(response => {
        this.props.addUser(response.data);
        this.props.history.push('/dashboard');
      });
  };

  // Getting user data from Softhouse API though withStorage HOC and sets userData. 
  // Logged in user is redirected to the dashboard.
  componentDidMount() {
    const user = this.props.getUser();
    if (user !== null) {
      this.props.history.push('/dashboard');
      return;
    }
    this.props
      .getUsers()
      .then(response => this.setState({ userData: response.data }));
  }

  //checks if user is registered by comparing username & password to API, updates error, sets localStorage to username (withStorage)

  // If the user successfully logs in, their information is saved in localStorage.
  // A successful login redirects the user to the dashboard.
  loginUser = event => {
    event.preventDefault();
    const user = this.state.userData.reduce((prev, user) => {
      return user.username === this.state.usernameLogin &&
        user.email === this.state.passwordLogin
        ? user
        : prev;
    }, undefined);
    if (user === undefined) {
      this.setState({ error: true });
      return;
    }
    this.props.login(user.username);
    this.props.addUser(user);
    this.props.history.push('/dashboard');
  };

  render() {
    //sends user's inputs from registration to validation
    const errors = validateForm(
      this.state.name,
      this.state.username,
      this.state.password,
      this.state.temperature
    );

    //disable button if errors keys (name, username, password etc.) includes an error
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    //if an error is catched in a field update that field's state after its touched
    const shouldMarkError = field => {
      const checkError = errors[field];
      const shouldShowError = this.state.touched[field];
      return checkError ? shouldShowError : false;
    };

    return (
      <div>
        <div className="icon center thunder-storm">
          <div className="cloud"></div>
          <div className="cloud"></div>
          <div className="lightning">
            <div className="bolt"></div>
            <div className="bolt"></div>
          </div>
        </div>
        <div className={style.card}>
          <div>

            {this.state.error && <span className={style.texterror}>User credentials invalid.</span>}
            {!this.state.error && <span className={style.textlogin}>Please login.</span>}

            <form onSubmit={this.loginUser}>
              <div className={style.center}>
                <MuiThemeProvider theme={theme}>
                  <div className={style.center}>
                    <TextField
                      margin='normal'
                      label='Username'
                      variant='outlined'
                      type='text'
                      value={this.state.usernameLogin}
                      onChange={this.handleInputChange('usernameLogin')}
                    />
                  </div>
                  <div className={style.center}>
                    <TextField
                      margin='normal'
                      label='Password'
                      variant='outlined'
                      type='text'
                      value={this.state.passwordLogin}
                      onChange={this.handleInputChange('passwordLogin')}
                    />
                  </div>
                </MuiThemeProvider>
                <div />
              </div>

              <br />
              <button className={style.btn}>Login</button>
            </form>
            <br />
            <hr />
            <div onClick={this.showForm} className={style.textlogin}>
              Don't have an account? Click here!
          </div>

          </div>

          {this.state.showRegister ? (
            <div>
              <form onSubmit={this.onRegistration}>

                <div className={style.center}>
                  <MuiThemeProvider theme={theme}>

                    <div className={style.center}>
                      <TextField
                        required
                        className={shouldMarkError('name') ? 'error' : ''}
                        margin='normal'
                        label='Name'
                        variant='outlined'
                        type='text'
                        value={this.state.name}
                        onChange={this.handleInputChange('name')}
                        onBlur={this.handleBlur('name')}
                      />
                    </div>

                    <div className={style.center}>
                      <TextField
                        required
                        className={shouldMarkError('username') ? 'error' : ''}
                        margin='normal'
                        label='Username'
                        variant='outlined'
                        type='text'
                        value={this.state.username}
                        onChange={this.handleInputChange('username')}
                        onBlur={this.handleBlur('username')}
                      />
                    </div>

                    <div className={style.center}>
                      <TextField
                        required
                        className={shouldMarkError('password') ? 'error' : ''}
                        type='password'
                        margin='normal'
                        label='Password'
                        variant='outlined'
                        value={this.state.password}
                        onChange={this.handleInputChange('password')}
                        onBlur={this.handleBlur('password')}
                      />
                    </div>

                  </MuiThemeProvider>
                  <div />
                </div>
                <br />

                <Select
                  native
                  value={this.state.temperature}
                  onChange={this.handleInputChange('temperature')}
                >
                 
                  <option value='C'>Celcius</option>
                  <option value='F'>Fahrenheit</option>
                </Select>
                <br />
                <br />

                <button className={style.btn} disabled={isDisabled}>
                  Register
              </button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
export default withStorage(UserComponent);
