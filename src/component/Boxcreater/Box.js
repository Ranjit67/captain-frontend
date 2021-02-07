import React, { useState, useEffect } from "react";
import "./Box.css";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios from "axios";
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

const Box=(props)=>{
    const [like, setlike] = useState(false)

    var style={};
    if(props.dexcon===props.idtake){
        style={
            
            backgroundColor:"rgba(0,0,255,0.3)"
           
        }
    }
if(props.clas==="song"){
    style={
        background: "url("+props.image+")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    }
}

     const likeHandlerForTrue = ()=>{
        setlike(true);
        // console.log("hit false")
        const coot = cookies.get("SnG");
        axios.post("https://songplayapi.herokuapp.com/insert-like",{
            playlistId: props.ider
        },{
            headers: {
              'Authorization': "Bearer "+coot
            }
          })
          .then(response=>{
              if(response.data.data){
                  console.log("Successfully inserted");
                  
              } else if(response.data.get) {
                console.log("Already have that one.");
              }
          })
          .catch(err=>console.log(err))
     }


     const likeHandlerForFalse = ()=>{
        setlike(false);
        // console.log("hit false")
        const coot = cookies.get("SnG");
        axios.patch("https://songplayapi.herokuapp.com/likeremover", {
            playlistId: props.ider
        },{
            headers: {
              'Authorization': "Bearer "+coot
            }
          }).then(response=>{
              if(response.data.data){
               
                  console.log("Successfully remove");
              } else if(response.data.NotFound){
                  console.log("Data is not found.");
              }
          })
          .catch(err=>console.log(err))
     }

const both = ()=>{
    if(like){
        likeHandlerForFalse()
    } else {
        likeHandlerForTrue()
    }
    // setlike(prev=>!prev);
}

useEffect(() => {
    if(props.clas === "song"){
        const coot = cookies.get("SnG");
        
        axios.post("https://songplayapi.herokuapp.com/find-user-like-or-not", {
            playlistId: props.ider
        }, {
            headers: {
              'Authorization': "Bearer "+coot
            }
          })
          .then(response=>{
              if(response.data.data){
                setlike(true);
                //   console.log("data is found");
              } else if(response.data.NotFound){
                // console.log("data is not found");
              }
          })
          .catch(err=>console.log(err))
    }
    
}, [])
    return( <div className="box-outer">
<div className={props.clas}  style={style} onClick={props.click}
>
    
    
    {/* song name cont */}
{props.clas === "song" ?
    <div className="name-contener">
<p>{props.item}</p>




    </div>
    :
    <p>{props.item}</p> }
    
    </div>
    {/* like maniculation */}
    {like && 
        <FavoriteIcon className="big-heart" />  }  
        {/* end of like */}

    {/* like maniculation */}
    {props.clas === "song" && <div className="like-bottom"
    onMouseOver={props.mouseoverHandler}
    onMouseOut={props.mouseouterHandler}
    onClick={both}
    >
        {/* when like is false */}
        {(props.ov && !like) &&
<FavoriteBorderIcon className="emghty-heart" 
onMouseOver={props.mouseoverHandler}
onMouseOut={props.mouseouterHandler}
onClick={likeHandlerForTrue}
/> }
{/* when like is true */}
{(props.ov && like) &&
<FavoriteIcon className="emghty-heart-tree" 
onMouseOver={props.mouseoverHandler}
onMouseOut={props.mouseouterHandler}
onClick={likeHandlerForFalse}
/> }
</div>}
{/* end of like */}

    </div>
  
    )
}
export default Box;