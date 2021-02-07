import React, {Component} from "react";
import "./Input.css";

class Input extends Component{
    render(){
        return(<div className="inp">
<input 
className={this.props.inputClass} 
type={this.props.type} 
placeholder={this.props.placeholderer}
onChange={this.props.change}
value={this.props.val}
name={this.props.name}
/>
        </div>);
    }
}
export default Input;