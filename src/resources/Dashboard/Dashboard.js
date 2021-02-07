import React, {Component} from "react";
import "./Dashboard.css";
import axios from "axios";
import Left from "./Leftsider/Left";

import Right from "./Rightsider/Right";
import "styled-components";
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

class Dashboard extends Component{
  state = {
    profilePic:""
  }

componentDidMount(){
  const coot = cookies.get("SnG");
  
  axios.post("https://songplayapi.herokuapp.com/userdetails",{},{
    headers: {
      'Authorization': "Bearer "+coot
    }
  }).then(response=>{
    
    if(response.data.profile){
      this.setState({profilePic: response.data.profile})
      cookies.set("Im", response.data.profile, { maxAge:24*60*60 })
    } else {
     const image = "https://images.askmen.com/1080x540/2019/10/17-061431-how_to_become_a_male_model.jpg";
      this.setState({profilePic:image})
    }

  })
  .catch(err=>console.log(err))
}
   
  render(){
    // const {songType,moode,language}=this.state;
    //   if(language&&moode&&songType){
    //     alert("set in Dashboard.js in 34 result are: "+language +" "+moode+ " "+songType);
        
      // }

    return(
<div className="row">
   <Left 
   profileimage={this.state.profilePic}
   />
   <Right 
   />

   
    </div>
    );
}}
export default React.memo(Dashboard);