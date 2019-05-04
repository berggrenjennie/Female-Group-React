import React, { Component, Fragment } from 'react'
import axios from 'axios';
import withStorage from './../services/withStorage';

class AccountComponent extends Component {
  constructor(props){
    super(props);
      this.state={

          userInformation:[{
            id:53,
            name:"Jennie",
            username:"jenber",
            password:"123444",
            location:"Växjö",
            temperature:"Celcius",
            userStatus: "Online"
          }],
          editUserinformation:[],
          userData:[],
          editname:"",
          editusername:"",
          editpassword:"",
          editlocation:"",
          edittemperature:"",
          showeditinfo:false
        };

            this.handleeditname = this.handleeditname.bind(this);
            this.handleeditusername = this.handleeditusername.bind(this);
            this.handleeditpassword = this.handleeditpassword.bind(this);
            this.handleeditlocation = this.handleeditlocation.bind(this);
            this.handleedittemperature = this.handleedittemperature.bind(this);
            this.editAccount = this.editAccount.bind(this);
  }

  handleeditname(event) {
    this.setState({editname: event.target.value});
  }
  handleeditusername(event) {
    this.setState({editusername: event.target.value});
  }
  handleeditpassword(event) {
    this.setState({editpassword: event.target.value});
  }
  handleeditlocation(event) {
    this.setState({editlocation: event.target.value});
  }
  handleedittemperature(event) {
    this.setState({edittemperature: event.target.value});
  }

  //getting user data from Softhouse API though HOC
  componentDidMount(){
      this.props.getUserId(this.state.userInformation[0].id)
      .then(response =>
          this.setState({ userData: response.data })
      );
  }


  editUserInformation(id){

    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    };

    const editUser = {
        name: this.state.editnamename ,
        username: this.state.editusername,
        email: this.state.editpassword,
        address: {
            street: 'mock street 12',
            suite: this.state.userInformation[0].userStatus,
            city: this.state.editlocation,
            zipcode: this.state.edittemperature,
            geo: {
                lat: 0,
                lng: 0
            }
        }
    }

    axios.put('http://api.softhouse.rocks/users/'+id, editUser)
    .then(function (response) {
        console.log("Success:", response.data);
    }.bind(this))
    .catch(function (error) {
        console.log("Error:", error.response);
    });
  }

  editAccount = (event) => {
     if( this.state.editname && this.state.editusername && this.state.editpassword && this.state.editlocation && this.state.edittemperature){
     this.setState({
       editUserinformation:[{
         id:this.state.userInformation[0].id,
         name:this.state.editname,
         username:this.state.editusername,
         password:this.state.editpassword,
         location:this.state.editlocation,
         temperature:this.state.edittemperature,
         userStatus:this.state.userInformation[0].userStatus
        }],
        showeditinfo:true
       })

        this.editUserInformation(this.state.userInformation[0].id)
       }
     event.preventDefault();
}
    render() {
        const {
          userInformation,
          editUserinformation,
          showeditinfo
          }= this.state;
        return (
          <Fragment>
              <div>My Account</div>
              <br/>
              {editUserinformation.length>0 && showeditinfo &&
              <div style={{ color: "#ffffff" }}>
                <div>Name: {editUserinformation[0].name} </div>
                <div>Username: {editUserinformation[0].username} </div>
                <div>Password: {editUserinformation[0].password} </div>
                <div>Location: {editUserinformation[0].location} </div>
                <div>Temperature: {editUserinformation[0].temperature} </div>
                <div>userStatus: {editUserinformation[0].userStatus} </div>
               </div>
             }
             {!showeditinfo &&
                 <div style={{ color: "#ffffff" }}>
                   <div>Name: {userInformation[0].name} </div>
                   <div>Username: {userInformation[0].username} </div>
                   <div>Password: {userInformation[0].password} </div>
                   <div>Location: {userInformation[0].location} </div>
                   <div>Temperature: {userInformation[0].temperature} </div>
                   <div>userStatus: {userInformation[0].userStatus} </div>
                  </div>
              }
              <Fragment>
                <button>Edit</button>

                <form onSubmit={this.editAccount}>

                  <label>Name:</label>
                  <input type="text" placeholder={userInformation[0].name} editname={this.state.value} onChange={this.handleeditname} />
                  <br/>

                  <label>Username</label>
                  <input type="text" placeholder={userInformation[0].username} editusername={this.state.value} onChange={this.handleeditusername}/><br/>

                  <label>Password</label>
                  <input type="text" placeholder={userInformation[0].password} editpassword={this.state.value} onChange={this.handleeditpassword}/><br/>

                  <label>Location</label>
                  <input type="text" placeholder={userInformation[0].location} editlocation={this.state.value} onChange={this.handleeditlocation}/><br/>

                  <select edittemperature={this.state.value} onChange={this.handleedittemperature}>
                      <option  value="">Temperature</option>
                      <option  value="C">Celcius</option>
                      <option value="F">Fahrenheit</option>
                  </select><br/>

                  <input type="submit" value="Confirm changes" />

                </form>

                {/* {console.log("edit userinfo", this.state.editUserinformation)} */}
              </Fragment>

          </Fragment>

        )
    }
}
export default withStorage(AccountComponent);
