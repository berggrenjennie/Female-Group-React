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

    getWeather() {
      // const {
      //   tempUnit
      // }=this.props.tempUnit;
      return (
        axios.get("https://api.openweathermap.org/data/2.5/forecast?id=14256&appid=128a9b3170fb955577e4ba89b87b5ed9&units=metric")
      )
    }

    getLocation() {
      return (
        axios.get("http://localhost:3000/history.city.list.min.json")
      )
    }

    render() {
    /*we pass through WrappedComponent a method fetchUsers and userList as props*/
      return (
        <WrappedComponent
          getWeather={this.getWeather}
          getLocation={this.getLocation}
          {...this.props}
        />
        )
      }
    };
  }
