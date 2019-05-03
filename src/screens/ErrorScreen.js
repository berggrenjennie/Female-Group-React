import React, { Component } from 'react'
import UserComponent from '../components/UserComponent';

export default class ErrorScreen extends Component {

    render() {
          // Render errormessage if there is an error
          if (this.props.errorMessage) {
            return( 
                <div>
                    <p>User credentials do not exist. Please register.</p>
                </div>
            )
        }  else {
            return null;
        }
}
}
