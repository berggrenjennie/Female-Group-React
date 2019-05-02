import React, { Component } from 'react'
import Select from 'react-select';
import withHttp from './../services/withHttp';


class SearchCityComponent extends Component {
  constructor(props) {
   super(props);
      this.state = {
        inputValue: '',
        searchApiUrl: props.searchApiUrl,
        limit: props.limit,
        selectedOption: this.props.defaultValue
      };

   this.getOptions = _.debounce(this.getOptions.bind(this), 500);
   //this.getOptions = this.getOptions.bind(this);
   this.handleChange = this.handleChange.bind(this);
   this.noOptionsMessage = this.noOptionsMessage.bind(this);
   this.handleInputChange = this.handleInputChange.bind(this);
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

handleChange(selectedOption) {
  this.setState({
    selectedOption: selectedOption
  });
  if (this.props.actionOnSelectedOption) {
    // this is for update action on selectedOption
    this.props.actionOnSelectedOption(selectedOption.value);
  }
}

handleInputChange(inputValue) {
  this.setState({ inputValue });
  return inputValue;
}

async getOptions(inputValue, callback) {
  console.log('in getOptions'); // never print
  if (!inputValue) {
    return callback([]);
  }
  const response = await fetch(
    `${this.state.searchApiUrl}?search=${inputValue}&limit=${
      this.state.limit
    }`
  );
  const json = await response.json();
  console.log('results', json.results); // never print
  return callback(json.results);
}

noOptionsMessage(props) {
  if (this.state.inputValue === '') {
    return (
      <Typography {...props.innerProps} align="center" variant="title">
        {i18n.get('app.commons.label.search')}
      </Typography>
    );
  }
  return (
    <Typography {...props.innerProps} align="center" variant="title">
      {i18n.get('app.commons.errors.emptySearchResult')}
    </Typography>
  );
}

getOptionValue = option => {
  return option.value || option.id;
};

getOptionLabel = option => {
  return option.label || option.name;
};

render() {
  const { defaultOptions, placeholder } = this.props;
  return (
    <AsyncSelect
      cacheOptions
      value={this.state.selectedOption}
      noOptionsMessage={this.noOptionsMessage}
      getOptionValue={this.getOptionValue}
      getOptionLabel={this.getOptionLabel}
      defaultOptions={defaultOptions}
      loadOptions={this.getOptions}
      placeholder={placeholder}
      onChange={this.handleChange}
    />
  );
}
}
export default withHttp(SearchCityComponent);
