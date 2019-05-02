// CSS and Material Design Imports

// Router and core functionality from react.

// Existing component imports.


// This is mostly for routing. Imports User Component.

import React, { Component } from 'react'
import UserComponent from '../components/UserComponent';

export default class LoginScreen extends Component {

    render() {
        return (
            <UserComponent history={this.props.history}/>
        )
    }
}
