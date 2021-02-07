import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from "react-router-dom";
import "./Playsong.css";
import Leftsider from "../Dashboard/Leftsider/Left"
import AudioPlayer from 'react-h5-audio-player'; 

// import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from "axios";
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

export default function Playsong() {
    const [ songData, setSongData ] = useState()
    const { listId } = useParams();
const history = useHistory()

    const bactToDashboard = ()=>{
        history.push("/dashboard")
    }
    useEffect( () => {
        const coot = cookies.get("SnG");
         axios.post("https://songplayapi.herokuapp.com/playlister/api/"+listId,{},{
            headers: {
              'Authorization': "Bearer "+coot
            }
          }).then(response=>{
            setSongData(response.data[0])
            
        })
        .catch(err=>console.log(err))
        historyPlace();
        
        
    }, [])

    const historyPlace = ()=>{
        const coot = cookies.get("SnG")
         axios.post("https://songplayapi.herokuapp.com/insert-history",{
            "playlistId": listId
        },{
            headers: {
              'Authorization': "Bearer "+coot
            }
          }) .then(response=>{
              if(response.status===200){
                  console.log(response.data);
                // this.props.history.push("/dashboard/playlist/"+id)
              }
          })
          .catch(err=>console.log(err))
    }

const profiler = cookies.get("Im");  
    let style;
    style = (songData)?{
        background: "url("+songData.poster+")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    } : null;
    return (
        <div className="u">
            <Leftsider
            profileimage={profiler}
            />
              
           <div className="playside">
               {/* backdrop */}
               <div className="backer-to-playlist" onClick={bactToDashboard} >
    <ArrowBackIcon fontSize="large" />
      </div>
               {songData ? <div className="im-ger" style={style}>
                   {/* <h1>{listId} </h1> */}
                   </div>: <CircularProgress />}


                   {songData ? <div className="au-dioFor-play"><AudioPlayer
    autoPlay
    src={songData.song}
    // src={props.songData.songlink}
    // onPlay={e => console.log("onPlay")}
    // layout="stacked"
    // customAdditionalControls={[]}
    // other props here
   /> </div>:  null}
               </div>
        </div>
    )
}
