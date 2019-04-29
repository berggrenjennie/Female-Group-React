// CSS and Material Design Imports

// Router and core functionality from react.

// Existing component imports.


// The main functionality of our app. This is where the weather/date is displayed.
// See "Screen 2 - The Weather" and "Screen 2 - The Weather (City)" in the
// technical documentation. Routing will link to the Dashboard screen.
// Grabs user info directly from local storage.

import React, { Component } from 'react'
import PropTypes from 'prop-types';

// CSS and Material Design Imports
import '../icons/weather.css';
import style from '../styles/Dashboard.module.css';
import Typography from '@material-ui/core/Typography';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// Use HOC withHttp for weather fetch.
import withHttp from './../services/withHttp';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#9e9e9e',
    }
  }
})

class DashboardComponent extends Component {
  

  static propTypes = {
    getWeather: PropTypes.func.isRequired// The function getWeather is required .
  }


  constructor(props) {
    super(props);
      this.state ={
        searchLocaction: '',
        locationData:[],
        cityId:'',
        weatherData: [],
        isLoading: true,
        errors: null,
        showThreeDays: false,
        tempUnit:"C",
        };
      this.handlesearchLocaction = this.handlesearchLocaction.bind(this);
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

      if(cityId.length!="0")
        this.setState({cityId: cityId[0].city.id.$numberLong});
  }



/* A method that controls and changes the value of the seach field in the form by using setState */
  handlesearchLocaction(event) {
    let searchCityInput= event.target.value;
    this.setState({searchLocaction:searchCityInput})
    this.searchCity(searchCityInput)
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


/* A method to change the state (showThreeDays) from false till true or vice versa by using setState.*/
  toggleThreeDays = (e) => {
    this.setState({
      showThreeDays: !this.state.showThreeDays
    })
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


        <div>
         
          {/*Show weather icon.*/}
            <div className="icon whatevs">
              {list? list[0].weather[0].main:null}
              <br/>
              {list? list[0].weather[0].description:null}
              <br/>
              {list?list[0].weather[0].icon:null}
              <br/>
              <div className="sun">
                <div className="rays"></div>
              </div>
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

        {/*Show Location.*/}
        <p>{weatherData.city? "City : "+weatherData.city.name:null}</p>


        <div>
        {/*Show seach fild.*/}
          <form >
              <input type="text" placeholder="search" value={this.state.searchLocaction} onChange={this.handlesearchLocaction}/>
          </form>
          <div>
            {this.state.cityId?
              console.log("cityId:",this.state.cityId)
            :null}
          </div>
        </div>
      </div>

        {/*Show Wind Speed,Humidity and sunrise or sunset for the current day.*/}
        <div className={style["threeday"]}>
        {!this.state.showThreeDays?
        <div className="flex_Container">
          <div>Wind Speed
            <div>{list? list[0].wind.speed:null}</div>
          </div>
          <div>Humidity
            <div>{list? list[0].main.humidity+" % ":null}</div>
          </div>
          <div>sun.rise/sun.set</div>
        </div>
        :null}


        {this.state.showThreeDays?
        <div className="flex_Container">
          {/*Show First Day and it's tempretur.*/}
          <div>{list? this.getDateName(list[5].dt_txt):null}
            <div>{list? list[5].dt_txt:null}</div>
            <div>{list? "Temperature : "+list[5].main.temp+" "+tempUnit:null}</div>
          </div>
          {/*Show Second Day and it's tempretur.*/}
          <div>{list? this.getDateName(list[15].dt_txt):null}
            <div>{list? list[15].dt_txt:null}</div>
            <div>{list? "Temperature : "+list[15].main.temp+" "+tempUnit:null}</div>
          </div>
          {/*Show Third Day and it's tempretur.*/}
          <div>{list? this.getDateName(list[25].dt_txt):null}
            <div>{list? list[25].dt_txt:null}</div>
            <div>{list? "Temperature : "+list[25].main.temp+" "+tempUnit:null}</div>
          </div>
        </div>
        :null}
          <button type="button" onClick={this.toggleThreeDays}>Show three days!</button>
      </div>
      </MuiThemeProvider>
      </div>
    )
  }
}

export default withHttp(DashboardComponent);
