// Imports basic React funtionality. Imports Material UI's default typeface, which
// we can change later to suit our app.
// Router and core functionality from react.
import { BrowserRouter, Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import React, { Component } from 'react'
// Existing component imports.
import NavbarComponent from './components/NavbarComponent';
import DashboardScreen from './screens/DashboardScreen';
import LoginScreen from './screens/LoginScreen';
import './index.css';
import 'typeface-roboto';
// Renders Navbar Component, which is the main entry point to the app.
class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <NavbarComponent/>
          <Route path='/' exact component={LoginScreen} />
          <Route path='/login' component={LoginScreen} /> 
          <Route path='/dashboard' component={DashboardScreen} />  
        </BrowserRouter>
      </div>
    );
  }
}

export default App;