// CSS and Material Design Imports
import '../icons/weather.css';
import style from '../styles/Dashboard.module.css';

// Router and core functionality from react.
import React, { Component } from 'react'

// Existing component imports.


// The main functionality of our app. This is where the weather/date is displayed.
// See "Screen 2 - The Weather" and "Screen 2 - The Weather (City)" in the 
// technical documentation. Routing will link to the Dashboard screen.
// Grabs user info directly from local storage. 
// Use HOC withHttp for weather fetch.

export default class DashboardComponent extends Component {
  render() {
    return (
        <div>
            <p>Hello and welcome! This is the start of our awesome weather app!</p>
            <div className="icon whatevs">
            <div className="sun">
                <div className="rays"></div>
            </div>
            </div>
      </div>
    )
  }
}
