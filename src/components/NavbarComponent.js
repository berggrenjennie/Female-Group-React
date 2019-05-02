// This is our Navbar. It'll be fairly simple, but will handle all of our routing.

// CSS and Material Design Imports
import style from '../styles/Navbar.module.css';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

// Router and core functionality from react.
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from "react-router-dom";
import React, { Component } from 'react'


// Existing component imports.
import DashboardScreen from '../screens/DashboardScreen';
import LoginScreen from '../screens/LoginScreen';

// Handles all functionality for the Navbar and routing, including Navlinks,
// Switch, Routes, and Redirect from /user to /login.

export default class NavbarComponent extends Component {
    render() {
        return (
            
                <AppBar position="static" color="default">
                    <Toolbar>
                
                <NavLink to="/login" activeClassName={style["active"]}>
                            <div className={style["navbuttons"]}>
                                <Button color="primary" size="large" >Login</Button>
                            </div>
                        </NavLink>
                        <NavLink to="/dashboard" activeClassName={style["active"]}>
                            <div className={style["navbuttons"]}>
                                <Button color="primary" size="large" >Dashboard</Button>
                            </div>
                        </NavLink>
                    </Toolbar>
                </AppBar>
            
        )
    }
}