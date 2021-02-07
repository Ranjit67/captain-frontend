import React, { Component } from 'react'
import Fbox from "../Favourite/Fbox/Fbox";
import axios from 'axios';
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

export default class Like extends Component {
    state = {
        lik:[]
    }
    componentDidMount(){
        const coot = cookies.get("SnG");
        axios.post("https://songplayapi.herokuapp.com/getalllike", {}, {
            headers: {
              'Authorization': "Bearer "+coot
            }
          }).then(response=>{
              if(response.status === 200){
                //   console.log(response.data)
                  this.setState({lik:response.data})
              } else {
                  console.log(response)
              }
          })
          .catch(err=>console.log(err))

    }
    render() {
        return (
            <div className="favourite">
            
{this.state.lik && this.state.lik.map(( e, index )=>{
    return <Fbox
    key={index}
    playlistId={e._id}
    />
})}
        
        

        </div>
        )
    }
}
