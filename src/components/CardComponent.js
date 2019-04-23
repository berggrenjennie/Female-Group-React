// CSS and Material Design Imports
import Card from '@material-ui/core/Card';
import style from '../styles/Card.module.css'
import '../icons/weather.css';

// Router and core functionality from react.

// Existing component imports.


// The Card Component is a multi-use component. It will be used as the login,
// the registration, the logout, the edit "My Account" functionality, 
// and the weather. It is similar to how the Card Component in uppgift 1, 2, 3.

import React, { Component } from 'react'

export default class CardComponent extends Component {
    render() {
        return (
            <Card className={style["card"]} style={{ backgroundColor: '#000' }}>
                <div>
                    <p>hello from card component. what is the weather today?</p>
                </div>
            </Card>


        )
    }
}
