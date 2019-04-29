// CSS and Material Design Imports

// Router and core functionality from react.

// Existing component imports.
import CardComponent from '../components/CardComponent';

// The main functionality for our users including login/logout/edit/register
// with the use of Card Component. Handles user login/registration. Uses HOC
// withStorage to handle local storage.


import React, { Component } from 'react'

export default class UserComponent extends Component {


    constructor(props) {
        super(props);
    }



    render() {



        return (
<div>
            <div>{this.props.user.name}</div>
        <p>{this.props.statuz}</p>

</div>
        )
    
}




           
    
}

