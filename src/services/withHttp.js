// HOC that contains function(s) for fetching the weather.
// Renders the wrapped component with the data and props.

import React, { Component } from 'react';
import axios from 'axios';

export default function withHttp (WrappedComponent, selectData) {
  return class extends Component {

    constructor(props) {
      super(props)
      this.state={
        tempUnit:'',
        locations:[]
      }

    }

    getWeather(units, id) {
      console.log("units:",units);
      console.log("id:",id);
      console.log("https://api.openweathermap.org/data/2.5/forecast?id=" + id + "&appid=128a9b3170fb955577e4ba89b87b5ed9&units=" + units);
      return (
           // axios.get("https://api.openweathermap.org/data/2.5/forecast?id=89824&appid=128a9b3170fb955577e4ba89b87b5ed9&units=metric")
         axios.get("https://api.openweathermap.org/data/2.5/forecast?id=" + id + "&appid=128a9b3170fb955577e4ba89b87b5ed9&units=" + units)
      )
    }

    getLocation() {
      return (
        axios.get("http://localhost:3000/history.city.list.min.json")
      )
    }

    getIcon() {
      return (
        // axios.get("http://localhost:3000/icons.list.json?id="+iconId)
        axios.get("http://localhost:3000/icons.list.json")
      )
    }

    render() {
    /*we pass through WrappedComponent a method fetchUsers and userList as props*/
      return (
        <WrappedComponent
          getWeather={this.getWeather}
          getLocation={this.getLocation}
          getIcon={this.getIcon}
          {...this.props}
        />
        )
      }
    };
  }
