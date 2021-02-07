import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Songlist.css";
import Box from "../../../../component/Boxcreater/Box";
import Playsong from "./Playsong";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from "axios";
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

class Songlist extends Component{
    // Songlists.songdetails
    state={
        song_c:[],
        id_s:""
    }

    idfinder = async (id)=>{
       
                this.props.history.push("/dashboard/playlist/"+id)
      
        
    }


    // backToPlaylist= ()=>{
    //     this.setState({id_s:""})
    // }
feacher = async ()=>{
    const coot = cookies.get("SnG");
   await axios.post("https://songplayapi.herokuapp.com/interstgetsong",{},{
      headers: {
        'Authorization': "Bearer "+coot
      }
    }).then(response=>{
      // console.log(response);
      if(response.status === 200){
        // console.log(response.data);
        this.setState({song_c:response.data.data})
        
      }
    })
    .catch(err=>console.log(err))
}
    componentDidMount(){
       this.feacher();
    }

    mouseoverHandler = (id)=>{
      // console.log("mouse over "+id);
      let t = this.state.song_c;
       t[id] ={...t[id],ov:id}
       this.setState({song_c:t})
    }
    mouseouterHandler = (id)=>{
      // console.log("mouse out "+id);
      let t = this.state.song_c;
       t[id] ={...t[id],ov:""}
       this.setState({song_c:t})
    }
    render(){
        // console.log(this.state.song_c);

        return(<div>
            {(!this.state.id_s || !this.state.id_s===0) && <div className="backdropPlayBox" onClick={this.props.backtrack}>
            <ArrowBackIcon fontSize="large" />
                </div>} {/*for back to the root page */}
            {(this.state.id_s || this.state.id_s===0)?

            <Playsong 
            // songData={this.state.song_c[this.state.id_s]}
            songData = {this.state.song_c[this.state.id_s]}
            // clicker= {this.backToPlaylist}
            />
        :
        
        //  this.state.song_c
        this.state.song_c.map((e,index)=>{
            
            return(<div className="songC"  key={index}>
               {e.song && <Box 
             clas="song"
             
           item={e.songname}
            dexcon={index}
            image={e.poster}
            ov ={e.ov}
            mouseoverHandler = {()=>this.mouseoverHandler(index)}
            mouseouterHandler = {()=>this.mouseouterHandler(index)}
             click={()=>this.idfinder(e._id)}
             ider={e._id}
            />}</div>
            );
        })
      
        }



        </div>)
    }
}


export default withRouter(Songlist);





// import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
// import "./Songlist.css";
// import Box from "../../../../component/Boxcreater/Box";
// import axios from "axios";
// import Cookies from 'universal-cookie';
 
// const cookies = new Cookies();

//  class Songlist extends Component {
//     state={
//         song_c:[],
//         id_s:""
//     }

//     idfinder=(id)=>{
//         this.props.history.push("/dashboard/playlist/"+id)
//     }

//     feacher = async ()=>{
//         const coot = cookies.get("SnG");
//        await axios.post("https://songplayapi.herokuapp.com/interstgetsong",{},{
//           headers: {
//             'Authorization': "Bearer "+coot
//           }
//         }).then(response=>{
//           // console.log(response);
//           if(response.status === 200){
//             console.log(response.data);
//             this.setState({song_c:response.data.data})
            
//           }
//         })
//         .catch(err=>console.log(err))
//     }

//     componentDidMount(){
//         this.feacher();
//      }
     
//     render() {
//         return (
//             <div>
//                    {this.state.song_c.map((e,index)=>{
//             // console.log(e.songname);
//             // console.log(e.poster);
//             return(<div className="songC">
//                {e.song && <Box 
//              clas="song"
//              key={index}
//            item={e.songname}
//             dexcon={index}
//             image={e.poster}
//              click={()=>this.idfinder(e._id)}
//             />}</div>
//             );
//         })}
//             </div>
//         )
//     }
// }

// export default withRouter(Songlist);



