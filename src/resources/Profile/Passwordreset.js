
import React, { Component } from 'react'
import Input from "../../component/Inputfield/Input"; 
import { withRouter } from "react-router-dom";
import axios from "axios"
import Cookies from 'universal-cookie';

const cookies = new Cookies();

 class Passwordreset extends Component {
    state = {
        password:"",
        newPassword:"",
        confurmPassword:"",
        match_c_nd_np:false,
        incorrectPassword:false
    }
    handelField = (e)=>{
        this.setState({match_c_nd_np:false})
        this.setState({incorrectPassword:false})
        this.setState({[e.target.name]:e.target.value})
    }
    submitHandler = async ()=>{
        const { newPassword, confurmPassword, password } = this.state;
        if(newPassword === confurmPassword){
            const coot = cookies.get("SnG")
            axios.put("https://songplayapi.herokuapp.com/passwordupdate", {
                password: password,
                newpassword: newPassword
            }, {
                headers: {
                  'Authorization': "Bearer "+coot
                }
              })
              .then(response=>{
                  
                if(response.data.message){
                    this.setState({password:""})
                    this.setState({newPassword:""})
                    this.setState({confurmPassword:""})
                    cookies.remove("SnG")
        this.props.history.push("/");
                } else if(response.data.error) {
                    
                    this.setState({incorrectPassword:true})
                }
              })
              .catch(err=>console.log(err))
            
        } else {
            this.setState({match_c_nd_np:true})
        }
    }
    render() {
        return (
            <div className="row frame">
            <div className="col-10 offset-2">
            <h3 className="userName">{this.props.name}</h3>
            </div>
        
        
            <div className="col-3 offset-2 mt-4">
            <h5>Change Password :</h5>
            </div>
                <div className="col-3 mt-4">
                <Input 
                type="password"
                val={this.state.password}
                name="password"
                change = {this.handelField}
                 placeholderer="Current Password"
                 inputClass="sugnupc"
                />
                </div>

                <div className="col-4 mt-4">
                    {this.state.incorrectPassword &&
                    <p className="incorrect-message">Password is incorrect.</p>
                    }
               </div>

                <div className="col-3 offset-5 mt-3">
                <Input 
                type="password"
                val={this.state.newPassword}
                name="newPassword"
                change = {this.handelField}
                 placeholderer="New Password"
                 inputClass="sugnupc"
                />
            </div>
                <div className="col-4 mt-3">
                <Input 
                type="password"
                val={this.state.confurmPassword}
                name="confurmPassword"
                change = {this.handelField}
                 placeholderer=" Confirm Password"
                 inputClass="sugnupc"
                />
                {this.state.match_c_nd_np && 
                <p className="pass_reset_match">*Not match</p>
                }
                
                </div>
        
                <div className="col-1 offset-10 mt-4 p-2">
                <button className="sig" onClick={this.submitHandler}>Submit</button>
                </div>
            
        </div>
        
        )
    }
}

export default withRouter( Passwordreset );
