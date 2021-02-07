
import React, { Component } from 'react'
import "./Favourite.css";
import Fbox from "./Fbox/Fbox"
import axios from 'axios';
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

export default class Favourite extends Component {
   state={
       his:[]
   }
    getdata = async ()=>{
        const coot = cookies.get("SnG");
        await axios.post("https://songplayapi.herokuapp.com/get-history", {}, {
            headers: {
              'Authorization': "Bearer "+coot
            }
          })
          .then(response=>{
              if(response.status === 200){
                //   console.log(response.data[0].history);
                  this.setState({his:response.data[0].history})
              }
          })
          .catch(err=>console.log(err))
    }
    componentDidMount(){
        this.getdata()
    }
    render() {
        return (
            <div className="favourite">
            
{this.state.his && this.state.his.map(( e, index )=>{
    return <Fbox
    key={index}
    playlistId={e.playlistId}
    />
})}
        
        

        </div>
        )
    }
}

