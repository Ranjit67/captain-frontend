import React, {useState,useRef} from "react";
import 'bootstrap/dist/css/bootstrap.css'; 
import "./Playsong.css";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles, createStyles, withStyles, Theme } from "@material-ui/core/styles";


import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles((theme:Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }),
)(LinearProgress);

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const Playsong=(props)=>{

  const classes = useStyles();

    const style={
        background: "url("+props.songData.poster+")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    }

  
    const seek=(data)=>{
        console.log(data);
    }

    const [duretion,setDuration]=useState();
    const [per,setPer]=useState();
    const audi= useRef();
console.log(props.songData);

return(
  <div className="play-content">

    <div className="backer-to-playlist" onClick={props.clicker}>
    <ArrowBackIcon fontSize="large" />
      </div>
      <div className="ima-ge-cont">    
                                           {/* it cont flex for the adjust image div */}
 <div className="ima-ge" style={style}>
        </div>

        </div>

         
                                           {/* it cont flex for the adjust image div */}
    <div className="aud-io">
<AudioPlayer
    autoPlay
    src={props.songData.song}
    // src={props.songData.songlink}
    // onPlay={e => console.log("onPlay")}
    // layout="stacked"
    // customAdditionalControls={[]}
    // other props here
   />    
    </div>  

    </div>

)

}
export default Playsong;
