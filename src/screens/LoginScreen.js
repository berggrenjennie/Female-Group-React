// CSS and Material Design Imports

// Router and core functionality from react.

// Existing component imports.


// This is mostly for routing. Imports User Component.

import React, { Component, Fragment } from 'react'
import UserComponent from '../components/UserComponent';
import AccountComponent from '../components/AccountComponent';

export default class LoginScreen extends Component {

    render() {
        return (
          <Fragment>
            <UserComponent history={this.props.history}/>
            <AccountComponent/>
          </Fragment>
        )
    }
}
