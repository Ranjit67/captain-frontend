
import React,{Component} from "react";
import "./Submit.css";

class Submit extends Component{
    render(){
return(
    <div>
        <button className="buto" onClick={this.props.click}>{this.props.butoName}</button>
        </div>
)
}
}export default Submit;