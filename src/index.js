// Imports basic Reaact functionality, as well as index.css as the global css file.

import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';

// React-Axe variables. Used to test app for accessability. 
// Uncomment the following code to test our app.

// var React = require('react');
// var ReactDOM = require('react-dom');

// if (process.env.NODE_ENV !== 'production') {
//     var axe = require('react-axe');
//     axe(React, ReactDOM, 1000);
//   }

ReactDOM.render(<App />, document.getElementById('root'));

