// CSS and Material Design Imports

// Router and core functionality from react.

// Existing component imports.


// The main functionality of our app. This is where the weather/date is displayed.
// See "Screen 2 - The Weather" and "Screen 2 - The Weather (City)" in the
// technical documentation. Routing will link to the Dashboard screen.
// Grabs user info directly from local storage.

import React, { Component } from 'react'

// CSS and Material Design Imports
import '../icons/weather.css';
import style from '../styles/Dashboard.module.css';
import LocationOn from '@material-ui/icons/LocationOn';

import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


// Use HOC withHttp for weather fetch.
import withHttp from './../services/withHttp';
/* Interweave is a phenomenal library that is safe to toconvert a string text to HTML and
insert it to the DOM. We use it when we chang the icon.*/
import {Markup} from 'interweave';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#dfddda',
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
        showDiv: false
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


    toggleDiv = () => {
      this.setState(state => ({ showDiv: !state.showDiv }));
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

/* A method that uses to determine the day. */
  getDateName(date){
      var options = { weekday: 'long', month: 'long', day: 'numeric' };

      let day=new Date(date);
      let dayName = day.toLocaleDateString("en-US", options)
      
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

      <div className={style.card}>

        {/*Show username.*/}
        <div className={style.center}>
          <p className={style.golduser}>Hello, Jennie!</p>
        </div>

        {list?
        <div className={style.weather_display}>
          {/*Show weather icon.*/}
          <div className="icon" className={style.weather_icon}>
              < Markup content={this.getIconDiv(list[0].weather[0].icon)}/>
          </div>
          <div className={style.flex_container}>
            {/*Show Current Day.*/}
            <div className={style.silver}>{this.getDateName(list[0].dt_txt)}
              {/* <div>{list[0].dt_txt}</div> */}
            </div>
            <div>
              {/*Show Current tempretur and it's unit.*/}
              <p className={style.silver}>{list? list[0].main.temp+" "+tempUnit:null}</p>
            </div>
          </div>
        </div>
        :null}

        {/*Show Location.*/}
        <div className={style.centerCity} onClick={this.toggleDiv}>
          <p className={style.silvergold}><LocationOn />{weatherData.city? weatherData.city.name:null}</p>
        </div>
        {/*Show seach fild.*/}
        {this.state.showDiv && 
        <div className={style.center}>
          <MuiThemeProvider theme={theme}>
            {/* <form >
                <TextField label="Enter City" variant="outlined" type="text" placeholder="Search" value={this.state.searchLocaction} onChange={this.handlesearchLocaction}/>
            </form> */}
            <div className={style.center}>
              <Grid container alignItems="flex-end">
                <Grid item>
                  <form >
                    <TextField
                    margin="normal"
                    style={{ background: "linear-gradient(to bottom, rgba(233, 233, 233, 0.37) 0%,rgba(144, 144, 145, 0.089) 100%)" }}
                    label="Enter City" 
                    variant="outlined" 
                    type="text" 
                    placeholder="Search" 
                    value={this.state.searchLocaction} 
                    onChange={this.handlesearchLocaction} />
                  </form >
                </Grid>
              </Grid>
            </div>
            </MuiThemeProvider>
            <div>
              {this.state.cityId?
                  console.log("this.state.cityId",this.state.cityId)
                :null}
            </div>
            </div>
          }
        

          {/*Show three days.*/}
          {list?
        <div className={style.flex_three}>
          {/*Show First Day and it's tempretur.*/}
          
          <div className={style.silver}>{this.getDateName(list[5].dt_txt)}
            <div className={style.silver}>{list[5].main.temp+" "+tempUnit}</div>
          </div>
          {/*Show Second Day and it's tempretur.*/}
          <div className={style.silver}>{this.getDateName(list[15].dt_txt)}
            <div className={style.silver}>{list[15].main.temp+" "+tempUnit}</div>
          </div>
          {/*Show Third Day and it's tempretur.*/}
          <div className={style.silver}>{this.getDateName(list[25].dt_txt)}
            <div className={style.silver}>{list[25].main.temp+" "+tempUnit}</div>
          </div>
        </div>
        :null}
      </div>
    )
  }
}


export default withHttp(DashboardComponent);