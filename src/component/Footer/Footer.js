import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component{
    render(){
        return(
            // className='col-4 offset-5'
                <div> 
<p className="acc">Don't have account? </p> <button className="butos" onClick={this.props.click}>{this.props.buttonName}</button> 
</div>
              
        )
    }
} 

export default Footer;