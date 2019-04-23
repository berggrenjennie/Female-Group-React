// Imports basic React funtionality. Imports Material UI's default typeface, which
// we can change later to suit our app.

import React, { Component } from 'react';
import NavbarComponent from './components/NavbarComponent';

import './index.css';
import 'typeface-roboto';

// Renders Navbar Component, which is the main entry point to the app.
class App extends Component {
  
  render() {
    return (
      <div>
          <NavbarComponent />   
      </div>
    )};
}

export default App;