import React, { Component } from 'react'
import axios from "axios";
import { withRouter } from "react-router-dom";
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

 class Fbox extends Component {
state = {
    songName:"",
    posterURL:""
}

componentDidMount(){
    const coot = cookies.get("SnG");
    const id = this.props.playlistId;
axios.post("https://songplayapi.herokuapp.com/playlister/api/"+id, {}, {
    headers: {
      'Authorization': "Bearer "+coot
    }
  }).then(response=>{
      if(response.status ===200){
        // console.log(response.data)
        this.setState({songName:response.data[0].songname})
        this.setState({posterURL:response.data[0].poster})
      }
      
  })
  .catch(err=>console.log(err))
}

playlistHandler = ()=>{
    this.props.history.push("/dashboard/playlist/"+this.props.playlistId)
}
    render() {
        // console.log(this.props.playlistId)
       const style={
            height:"100%",
            width:"100%"
        }

        return this.state.songName &&
        (
            <div className="fav-box" onClick={this.playlistHandler}> 
<div className="fav-image" > 
<img src={this.state.posterURL} style={style} alt="The image is not supported." />
</div> 
                <h3 className="fev-title">{this.state.songName}</h3>
</div>
        )
    }
}

export default withRouter(Fbox);