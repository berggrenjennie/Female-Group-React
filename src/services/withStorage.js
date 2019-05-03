// HOC that deals with local storage.
// Renders the wrapped component with the local storage data.

import React from 'react';
import axios from 'axios';

const withStorage = (WrappedComponent) => {
  class HOC extends React.Component {

    //checks if user exists in localStorage
    checkStatus() {
      localStorage.getItem('user')
    }

    //sets localStorage to key = user & data = uservalue in UserComponent
    login = (key, data) => {
      localStorage.setItem(key, data);
    }

    //clears user from localStorage
    logout = () => {
      localStorage.clear();
    }

    //get users from Softhouse API
    getUser() {
      return (
        axios.get('http://api.softhouse.rocks/users/')
      )
    }

    getUserId(id) { console.log('http://api.softhouse.rocks/users?_id=' + id)
      return (
        axios.get('http://api.softhouse.rocks/users/' + id)
      )
    }

    render() {
      return (
        <WrappedComponent
          checkStatus={this.checkStatus}
          login={this.login}
          logout={this.logout}
          getUser={this.getUser}
          getUserId={this.getUserId}
          {...this.props}
        />
      );
    }
  }

  return HOC;
}

export default withStorage;
