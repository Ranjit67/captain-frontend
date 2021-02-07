import React, {Component} from "react";
import {withRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'; 
import "./Signup.css";
import Input from "../../component/Inputfield/Input"; 
import Submit from "../../component/Submit/Submit";
import axios from "axios";
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

let c=["sugnupc"]; //conform password
let emaer=["sugnupc"]; //email
class Signup extends Component{
        state={
                name:"",
                email:"",
                password:"",
                cpassword:"",
                cpasswordbol:false,
                passwordbol:false,
                passawordMessage:false,
                emailbol:false,
                namebol:false,
                subMessage:""
        }
       

        inputChanger = (e)=>{
               this.setState({[e.target.name]:e.target.value})
               this.setState({subMessage:""})  
               if(e.target.name === "name"){
                       if(e.target.value.length>1){
                        this.setState({namebol:true})
                       } else {
                        this.setState({namebol:false})  
                       }
               }
                if(e.target.name==="password"){
                        this.setState({cpassword:""}) 
                        this.setState({cpasswordbol:false}) 
                        if(e.target.value.length>7){
                             this.setState({passwordbol:true})
                             this.setState({passawordMessage:false}) 
                             
                        } else{
                                this.setState({passawordMessage:true})
                                this.setState({passwordbol:false}) 
                        }
                }//password end
                if(e.target.name==="email"){
                let cheak = e.target.value.includes(".com") && e.target.value.includes("@");
                // console.log(cheak);
                        if(cheak){
                                emaer=["sugnupc","mmail"];
                                this.setState({emailbol:true}) 
                        }
                        else {
                                emaer=["sugnupc"];
                                this.setState({emailbol:false}) 
                        }
                
                } //email end
        }

       cset = (e)=>{
        this.setState({cpassword:e.target.value})
        this.setState({subMessage:""})  
        // let temp = this.state.cpassword+e.target.value;
        // console.log(e.target.value);
        if(e.target.value.length>1){
                if(this.state.password===e.target.value){
            
                        c=["sugnupc","msignup"];
                        this.setState({cpasswordbol:true})
                   } else{
                           c=["sugnupc","nmsignup"]; 
                           this.setState({cpasswordbol:false}) 
                   }
        }
        
       }


       submitHandler = async ()=>{
        if(this.state.cpasswordbol && this.state.passwordbol && this.state.emailbol && this.state.namebol){
                const { name, email, password } = this.state;
                await axios.post("https://songplayapi.herokuapp.com/signup",{
                        email,
                        password,
                        name
                    })
                    .then(data=>{
                            console.log(data)
                            
                            if(data.status===200){
                                cookies.set("SnG",data.data.token,{maxAge:24*60*60})
                              
                        
                        this.props.history.push("/dashboard");
                            } else { if(data.status===422){
                                this.setState({subMessage:"This email is already registered."})  
                            }else{
                                console.log("Somthing went wrong.");
                                    this.setState({subMessage:"Somthing went wrong."})
                            }
                                      
                            }
                            
                        })
                    .catch(err=>console.log(err))
        }else{ if(!this.state.namebol){
                this.setState({subMessage:"you have to fill the Name field *."})
        } else{
                if(!this.state.emailbol){
                         this.setState({subMessage:"Mail id is incorrect."})
                } else {
                        if(!this.state.passwordbol){  
                                this.setState({subMessage:"Password need at least 8 charecter."})  
                        }else {
                                if(!this.state.cpasswordbol){
                                        this.setState({subMessage:"Conferm password is not match."})  
                                }
                        }
                }
        }
                
        }
       }
       redirectToSignin = ()=>{
               this.props.history.push("/")
       }
render(){
        
        
    return(<div className="signin-root">
            {/* col-4 offset-4 */}
        <div className="signs">
        <div className="mt-5">
        <Input
        placeholderer="Name"
        inputClass="sugnupc"
        type="text"
        change={this.inputChanger}
        val={this.state.name}
        name="name"
        />
        </div>
        <div className="m-4">
        <Input
        placeholderer="Email"
        type="text"
        inputClass={emaer.join(" ")}
        val={this.state.email}
        name="email"
        change={this.inputChanger}
        /></div>
        <div className="m-4">
        <Input
        placeholderer="Password"
        type="password"
        inputClass="sugnupc"
        name="password"
        val={this.state.password}
        change={this.inputChanger}
        />
        {this.state.passawordMessage && 
        <p className="pass-message">Password most have to more than 7 charecter.</p>
        }
        
</div>
<div className="m-4">
        <Input
        placeholderer="Confirm Password"
        inputClass={c.join(" ")}
        type="password"
        name="cpassword"
        val={this.state.cpassword}
        change={this.cset}
        />
</div>

<Submit className="buto"
butoName="Signup"
click={this.submitHandler}
/>
{this.state.subMessage && <h6 className="sub-message">{this.state.subMessage}</h6>}

            </div>

        <div className="signup-fot">
<p className="param">Already have an account?</p> <button className="sig" onClick={this.redirectToSignin}>Signin</button>
</div>

        </div>
    
   
    );
}
}
export default withRouter(Signup);