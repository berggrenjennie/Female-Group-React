import React, { Component } from 'react'
import UserComponent from '../components/UserComponent';

export default class ErrorScreen extends Component {




    render() {
          // Render children if there's no error
          if (this.props.errorMessage) {
            return( 
                <div>User credentials do not exist. Please register.</div>
            )
        }  else {
            return null;
        }
}
}



