import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
 class Logout extends Component {
    constructor(props){
        super(props)
        cookies.remove("SnG")
        cookies.remove("Im")
        this.props.history.push("/");
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
export default withRouter(Logout); 
