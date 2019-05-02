import React, { Component } from 'react'
import Select from 'react-select';
import withHttp from './../services/withHttp';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const cityList=[{value:"14256",label:"Azadshahr.IR"}];

class SearchCityWeatherComponent extends Component {
  state = {
    selectedOption: null,
  }

  componentDidMount(){

      this.props.getLocation()
      .then(response =>
              // console.log(response.data)
        this.setState({
          locationData:response.data
        })
      );


}

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }


  render() {
    if(this.state.locationData){
      this.state.locationData.map(function(item) {
           cityList.push({value:item.city.id.$numberLong,label:item.city.name+"."+item.city.country});
                    });
   }

  // console.log("cityList",cityList)

    const { selectedOption } = this.state;

    return (
      <div>

      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={cityList?cityList:null}
        autofocus
        className=""
      />

      </div>
    );
  }
}

export default withHttp(SearchCityWeatherComponent);
