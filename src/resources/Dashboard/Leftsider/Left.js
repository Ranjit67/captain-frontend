import React from "react";
import { useHistory } from "react-router-dom";
import Profilephoto from "../../../component/Profilephoto/Profilephoto";
import "./Left.css";

const Left=({profileimage})=>{
  const history = useHistory();

  const profileRouter = ()=>{
history.push("/profile");
  }
  const logoutRouter = ()=>{
    history.push("/logout");
  }

  const previous = ()=>{
    history.push("/favourite");
  }
  const likeHandler = ()=>{
    history.push("/dashboard/playlist/like");
  }
  const homeHandler = ()=>{
    history.push("/dashboard");
  }
    return(  <div className="col-3 home">
    <div onClick={profileRouter}>
    <Profilephoto 
    profilePhoto={profileimage}            // it comes from dashboard
    cName="generet"
    /></div>
 
    <div className="h">
<p className="l" onClick={homeHandler}>Home </p>
</div>

<div className="cont">
{/* <p className="f">Favourites</p> */}
<p className="l" onClick={likeHandler}>Like </p>
<p className="p" onClick={previous}>Previously viwe</p>
<p className="lo" onClick={logoutRouter}>Logout</p>
</div>

  </div>  

    )
}
export default Left;