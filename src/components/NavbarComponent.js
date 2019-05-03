// CSS and Material Design Imports
// import style from '../style/Navbar.module.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

// Router and core functionality from react.
import { BrowserRouter as Router, Link } from "react-router-dom";
import React, { Component } from 'react'

// Existing component imports.
import DashboardScreen from '../screens/DashboardScreen';
import LoginScreen from '../screens/LoginScreen';

// stuff for the new weather app

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const styles = {
    menuButton: {
        marginLeft: 650, //change this number to maximize the icon left

    },
};

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#212121',
      }
    }
  })

class NavbarComponent extends Component {

    state = {
        anchorEl: null,
    };

    handleChange = event => {
        this.setState({ auth: event.target.checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <Router>
                <MuiThemeProvider theme={theme}>
                    <AppBar position="static" color="primary" style={{ background: "linear-gradient(to bottom, rgba(54, 56, 58, 0.062) 0%,rgba(55, 57, 58, 0.315) 100%)" }}>
                        <Toolbar >
                            <div>
                                <IconButton
                                    className={classes.menuButton}
                                    aria-owns={open ? 'menu-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose} ><Link to="/myaccount" style={{ textDecoration: 'none' }}>
                                        My Account
                                </Link></MenuItem>
                                    <MenuItem onClick={this.handleClose} ><Link to="/dashboard" style={{ textDecoration: 'none' }}>
                                        The Weather
                                </Link></MenuItem>
                                    <MenuItem onClick={this.handleClose} ><Link to="/login" style={{ textDecoration: 'none' }}>
                                        Logout
                                </Link></MenuItem>
                                </Menu>
                            </div>
                        </Toolbar>
                    </AppBar>
                </MuiThemeProvider>
            </Router>

        )
    }
}

export default withStyles(styles)(NavbarComponent);