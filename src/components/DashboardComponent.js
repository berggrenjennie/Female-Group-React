// Core imports/Existing component imports.
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";

// CSS and Material Design Imports
import '../icons/weather.css';
import style from '../styles/Dashboard.module.css';
import LocationOn from '@material-ui/icons/LocationOn';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// Use HOC imports: withHttp for weather fetch, withStorage for user information.
import withHttp from './../services/withHttp';
import withStorage from '../services/withStorage';

/* Interweave is a phenomenal library that is safe to to convert a string text to HTML and
insert it into the DOM. We use it when we change the icon.*/
import { Markup } from 'interweave';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff'
    }
  }
});

class DashboardComponent extends Component {
  static propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object,
    getUser: PropTypes.func,
    getIcon: PropTypes.func,
    getWeather: PropTypes.func,
    getLocation: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      searchLocaction: '',
      locationData: [],
      cityId: 0,
      iconData: [],
      iconDiv: '',
      weatherData: [],
      cities: [],
      isLoading: true,
      errors: null,
      showDiv: false,
      user: {
        name: '',
        address: {
          zipcode: 'C'
        }
      }
    };
  }

  /*A method that calls the function (getWeather()) and (getLocation()) which they are props received from withHttp component. */
  componentDidMount() {

    // Title for UX/Accessability 
    document.title = `The Weather - Dashboard`;

    // If a user who is not logged in tries to access the dashboard, they are redirected
    // to the login page.
    const user = this.props.getUser();
    if (user === null) {
      this.props.history.push('/');
      return;
    }

    // This section sets the user, displays degrees depending on C/F and defaults city
    // to Stockholm (city id from API). It then sets the weather to the response received from API.
    // Note: Dashboard only cares about the user's name and the C/F (stored in zipcode).
    this.setState({ user: user });
    this.props
      .getWeather(user.address.zipcode, 2673730)
      .then(response =>
        this.setState({
          weatherData: response.data,
          isLoading: true
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));

    // Gets the location using function from withHttp and sets it as locationData state.
    this.props.getLocation().then(response =>
      this.setState({
        locationData: response.data
      })
    );

    // Gets the weather icon using function from withHttp and sets it as iconData state.
    this.props.getIcon().then(response =>
      this.setState({
        iconData: response.data
      })
    );
  }

  // This shows/hides the city search bar when a user clicks on the city.
  toggleDiv = () => {
    this.setState(state => ({ showDiv: !state.showDiv }));
  };

  // Filters locationData and compares searchCityInput (city, country), returns the city (or cities), and
  // sets the city as a state.
  searchCity(searchCityInput) {
    if (searchCityInput.length === 0) {
      return;
    }

    const cities = this.state.locationData.filter(function (item) {
      if (item.city.name.toUpperCase() === searchCityInput.toUpperCase()) {
        return true;
      }
      return false;
    });

    if (cities.length === 1) {
      return this.setCity(cities[0]);
    }
    this.setState({ cities: [...cities] });
  }

  // Sets the cityId as a state, fetches the weather (with the help of withHttp) based on cityId and C/F (zipcode), and
  // sets those states.
  setCity = city => {
    this.setState({ cityId: city.city.id.$numberLong }, () => {
      this.props
        .getWeather(this.state.user.address.zipcode, this.state.cityId)
        .then(response => {
          this.setState({
            cities: [],
            weatherData: response.data,
            isLoading: true,
            showDiv: !this.state.showDiv,
            searchLocaction: ''
          });
        })
        .catch(error => this.setState({ error, isLoading: false }));
    });
  };

  // Controls and changes the value of the search field in the form by using setState.
  handleSearchLocation = event => {
    let searchCityInput = event.target.value;
    this.setState({ searchLocaction: searchCityInput });
    this.searchCity(searchCityInput);
  };

  // Determines the icon which shows the weather condition.
  getIconDiv(icon_Id) {
    const icon = this.state.iconData.reduce((prev, icon) =>
      icon.id === icon_Id ? icon.iconDiv : prev, undefined
    );

    if (icon === undefined) {
      return '';
    }

    return icon.id !== undefined ? icon.iconDiv : icon;
  }

  // Formats the date according to the set options.
  getDateName(date) {
    var options = { weekday: 'long', month: 'long', day: 'numeric' };
    let day = new Date(date);
    let dayName = day.toLocaleDateString('en-US', options);
    return dayName;
  }

  // Multiple cities can come up depending on which city a user searches for (i.e. London has multiple intances).
  // This sets the city the user clicks on.
  onCityClick = city => e => {
    e.preventDefault();
    this.setCity(city);
  };

  render() {
    const { list } = this.state.weatherData;

    const { weatherData, user, cities } = this.state;
    const tempUnit = user.address.zipcode.toUpperCase();

    return (
      <div className={style.card} role="main">
      <h1 className={style.visuallyhidden}>The Weather - Dashboard</h1>
        <div className={style.center}>
          <p className={style.golduser}>Hello, {user.name}!</p>
        </div>

        {list ? (
          <div className={style.weather_display}>
            <div className={`icon ${style.weather_icon}`}>
              <Markup content={this.getIconDiv(list[0].weather[0].icon)} />
            </div>
            <div className={style.flex_container}>
              <div className={style.silver}>
                {this.getDateName(list[0].dt_txt)}
              </div>
              <div>
                <p className={style.silver}>
                  {list ? Math.round(list[0].main.temp) + ' ' + tempUnit : null}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <div className={style.centerCity} onClick={this.toggleDiv}>
          <p className={style.silvergold}>
            <LocationOn />
            {weatherData.city ? weatherData.city.name : null}
          </p>
        </div>
        {this.state.showDiv && (
          <div className={style.center}>
            <MuiThemeProvider theme={theme}>
              <div className={style.center}>
                <Grid container alignItems='flex-end'>
                  <Grid item>
                    <form>
                      <TextField
                        margin='normal'
                        style={{
                          background:
                            '#717171'
                        }}
                        label='Enter City'
                        variant='outlined'
                        type='text'
                        placeholder='Search'
                        value={this.state.searchLocaction}
                        onChange={this.handleSearchLocation}
                      />
                      {cities.map(city => {
                        return (
                          <li key={city.city.id.$numberLong}
                            className={style.silvergoldlist}>
                            <a
                              href='/'
                              key={city.city.id.$numberLong}
                              onClick={this.onCityClick(city)}
                            >
                              {city.city.name}, {city.city.country}
                            </a>
                          </li>
                        );
                      })}
                    </form>
                  </Grid>
                </Grid>
              </div>
            </MuiThemeProvider>
            <div />
          </div>
        )}

        {list ? (
          <div className={style.flex_three}>
            <div>
              <div className={`icon ${style.weather_icon}`}>
                <Markup content={this.getIconDiv(list[5].weather[0].icon)} />
              </div>
              <div className={style.silver}>
                {this.getDateName(list[5].dt_txt)}
                <div className={style.silver}>
                  {Math.round(list[5].main.temp) + ' ' + tempUnit}
                </div>
              </div>
            </div>

            <div>
              <div className={`icon ${style.weather_icon}`}>
                <Markup content={this.getIconDiv(list[15].weather[0].icon)} />
              </div>
              <div className={style.silver}>
                {this.getDateName(list[15].dt_txt)}
                <div className={style.silver}>
                  {Math.round(list[15].main.temp) + ' ' + tempUnit}
                </div>
              </div>
            </div>

            <div>
              <div className={`icon ${style.weather_icon}`}>
                <Markup content={this.getIconDiv(list[25].weather[0].icon)} />
              </div>
              <div className={style.silver}>
                {this.getDateName(list[25].dt_txt)}
                <div className={style.silver}>
                  {Math.round(list[25].main.temp) + ' ' + tempUnit}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(withStorage(withHttp(DashboardComponent)));
