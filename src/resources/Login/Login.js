import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css'; 
import "./Login.css";
import {withRouter } from "react-router-dom";
import Input from "../../component/Inputfield/Input"; 
import Footer from "../../component/Footer/Footer";
import Submit from "../../component/Submit/Submit";
import axios from "axios";
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

class Login extends Component{
    state={
        wrongMessage:"",
        email:"",
        password:""
    }
    inputHandler = (e)=>{
        this.setState({wrongMessage:""})
        this.setState({[e.target.name]:e.target.value})
    }
    submitHandler = async ()=>{
        // console.log(this.state);
        const {email, password } = this.state;
        await axios.post("https://songplayapi.herokuapp.com/signin", {
            email,
    password
        })
        .then(response=>{
            console.log(response.status);
            if(response.status===200){
                cookies.set("SnG",response.data.token,{maxAge:24*60*60})
                this.props.history.push("/dashboard")
            }
            
        })
        
        .catch(err=>console.log(err))
        this.setState({wrongMessage:"Email and Password is incorrect."})
    }
    redirectToSignup = ()=>{
        this.props.history.push("/signup")
    }
    render(){
        return(<div className="login-root">
            {/* <div className="row"> */}
            {/* col-4 offset-4 p-3 */}
<div className="login">

<div className="inco">
   {this.state.wrongMessage && 
   <h6 className="login-message">{this.state.wrongMessage}</h6>
   } 
    <div className="m-5">
<Input
placeholderer="Email"
inputClass="loginc"
type="text"
name="email"
val={this.state.email}
change={this.inputHandler}
/>
</div>
<div className="m-5">
<Input
placeholderer="Password"
inputClass="loginc"
name="password"
type="password"
val={this.state.password}
change={this.inputHandler}
/>
</div>

</div>

<Submit
butoName="Signin"
click={this.submitHandler}
/>
</div> 
{/* login class end */}

<Footer
buttonName="Signup"
click={this.redirectToSignup}
/>

{/* </div> */}


</div>
        );
    }
}
export default withRouter(Login);