// HOC that deals with local storage.
// Renders the wrapped component with the local storage data.


import React from 'react';



const withStorage = (WrappedComponent) => {
  class HOC extends React.Component {
    
  
    checkStatus() {
        localStorage.getItem('user')
    }
  
    
    login = (key, data) => {
        localStorage.setItem(key, data);
        console.log("test", data);
    }
    
    logout = () => {
        localStorage.clear();
    }
    
    render() {
      return (
        <WrappedComponent
          checkStatus={this.checkStatus}
          login={this.login}
          logout={this.logout}
          {...this.props}
        />
      );
    }
  }
    
  return HOC; 
}

export default withStorage;