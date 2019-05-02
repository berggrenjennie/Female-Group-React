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

import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
// CSS and Material Design Imports
import '../icons/weather.css';
import style from '../styles/Dashboard.module.css';

// import Select from 'react-select';

import Typography from '@material-ui/core/Typography';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';



// Use HOC withHttp for weather fetch.
import withHttp from './../services/withHttp';
/* Interweave is a phenomenal library that is safe to toconvert a string text to HTML and
insert it to the DOM. We use it when we chang the icon.*/
import {Markup} from 'interweave';
import SearchCityWeatherComponent from '../components/SearchCityWeatherComponent';
// import DashboardScreen from './../screens/DashboardScreen';
// import DashboardComponent from './../components/DashboardComponent';


import Select from 'react-select';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#9e9e9e',
    }
  }
})


class DashboardComponent extends Component {
  

  // static propTypes = {
  //   getWeather: PropTypes.func.isRequired// The function getWeather is required .
  // }


  constructor(props) {
    super(props);
      this.state ={
        searchLocaction: '',
        locationData:[],
        cityId:0,
        iconData:[],
        iconDiv:"",
        weatherData: [],
        isLoading: true,
        errors: null,
        tempUnit:"C",
        };
      this.handlesearchLocaction = this.handlesearchLocaction.bind(this);
    }

  /*A method that calls the function (getWeather()) and (getLocation()) which they are props received from withHttp component. */

    componentDidMount(){
      this.props.getWeather('metric',this.difindCityId(this.state.CityId))
        .then(response =>
              // console.log(response.data)
          this.setState({
            weatherData:response.data,
            isLoading: true
          })
        )
       .catch(error => this.setState({ error, isLoading: false }));

        this.props.getLocation()
        .then(response =>
                // console.log(response.data)
          this.setState({
            locationData:response.data
          })
        );

        this.props.getIcon()
        .then(response =>
                 // console.log("icon:",response.data)
          this.setState({
            iconData:response.data
          })
         );
       }


/* A method that makes filter to locationData array (which have the data of all cities). In this filter we make compare
between the searchCityInput(this consists of the name of the city and the country) and evry city's name in the arrary and
return the cityId which will use sedan to get weatherData from API */
  searchCity(searchCityInput){
    const cityId = this.state.locationData.filter(function(item){
      if(item.city.name===searchCityInput.slice(0,searchCityInput.indexOf(".")) &&
        item.city.country===searchCityInput.slice(searchCityInput.indexOf(".")+1,searchCityInput.length).toUpperCase())
          {
            return item;
          }
      })

      if(cityId.length > 0){

        this.setState({cityId:Number(cityId[0].city.id.$numberLong)},
        () => {
          this.props.getWeather('metric',this.state.cityId)
            .then(response => {
              this.setState({
                weatherData:response.data,
                isLoading: true
              })
            })
            .catch(error => this.setState({ error, isLoading: false }));
         }
      );
    }
  }

/* A method that controls and changes the value of the seach field in the form by using setState */
  handlesearchLocaction(event) {
    let searchCityInput= event.target.value;

    this.setState({searchLocaction:searchCityInput});
    this.searchCity(searchCityInput);
  }
    /*A method that calls the function (getWeather()) and (getLocation()) which they are props received from withHttp component. */
  componentDidMount(){
    this.props.getWeather()
      .then(response =>
            // console.log(response.data)
        this.setState({
          weatherData:response.data,
          isLoading: true
        })
      )
       .catch(error => this.setState({ error, isLoading: false }));
      
    this.props.getLocation()
    .then(response =>
            // console.log(response.data)
      this.setState({
        locationData:response.data
      })
    );
 
   }


  }

difindCityId(id){
  let city_Id=0;
  if(id)
  {
    return city_Id=id;
  }
    return city_Id=2673730;
}

  /* A method that uses to determine the icon which shows the weather condition .*/
  getIconDiv(icon_Id){
      const icon_ID = this.state.iconData.filter(function(icon){
      if(icon.id===icon_Id)
          {
            return icon.iconDiv;
          }
          return null;
      })

      let iconDiv=icon_ID[0].iconDiv;
        return iconDiv;
    }

/* A method that uses to determine the name of the day.*/
  getDateName(date){
      let day=new Date(date);
      let weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      let dayName=  weekday[day.getDay()];
      return dayName;
  }

  render(){

    const {
        list
          } = this.state.weatherData;

    const {
        tempUnit,
        weatherData
          } = this.state;

    return (

      <div>
        <MuiThemeProvider theme={theme}>
        <div className={style["card"]}>
        {/*Show username.*/}
        <Typography variant="h5" color="primary" align="center" gutterBottom>
          Hello, Jennie!
        </Typography>

        {list?
        <div className="flex_Container">
          {/*Show Current Day.*/}
          <div>{this.getDateName(list[0].dt_txt)}
            <div>{list[0].dt_txt}</div>
          </div>



  
          {/*Show weather icon.*/}
            <div className="icon whatevs">
              < Markup content={this.getIconDiv(list[0].weather[0].icon)}/>
          </div>
          {/*Show Current Day.*/}
          <div className={style["date_container"]}>
            <div>{list? this.getDateName(list[0].dt_txt):null}
             <div>{list? list[0].dt_txt:null}</div>
            </div>
            <div>
              {/*Show Current tempretur and it's unit.*/}
              <p>{list? list[0].main.temp+" "+tempUnit:null}</p>
            </div>
          </div>
        </div>
        :null}

        {/*Show Current tempretur and it's unit.*/}
        <p>{list? list[0].main.temp+" "+tempUnit:null}</p>


        {/*Show Location.*/}
        <p>{weatherData.city? "City : "+weatherData.city.name:null}</p>

        <div>
        {/*Show seach fild.*/}
          <form >
              <input type="text" placeholder="search" value={this.state.searchLocaction} onChange={this.handlesearchLocaction}/>
          </form>
           < SearchCityWeatherComponent/>
          <div>
            {this.state.cityId?

                console.log("this.state.cityId",this.state.cityId)

               :null}

          </div>
        </div>

          {/*Show three days.*/}
          {list?
        <div className="flex_Container">
          {/*Show First Day and it's tempretur.*/}
          <div>{this.getDateName(list[5].dt_txt)}
            <div>{list[5].main.temp+" "+tempUnit}</div>
          </div>
          {/*Show Second Day and it's tempretur.*/}
          <div>{this.getDateName(list[15].dt_txt)}
            <div>{list[15].main.temp+" "+tempUnit}</div>
          </div>
          {/*Show Third Day and it's tempretur.*/}
          <div>{this.getDateName(list[25].dt_txt)}
            <div>{list[25].main.temp+" "+tempUnit}</div>
          </div>
        </div>
        :null}
      </div>
      </MuiThemeProvider>
      </div>
    )
  }
}


export default withHttp(DashboardComponent);
