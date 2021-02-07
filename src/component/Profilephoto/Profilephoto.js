import React from "react";
import "./Profilephoto.css";

const Profilephoto = (props)=>{
    return(
        <div className={props.hDivClass}>
         {props.profilePhoto &&                    //if have a photo the only image comes
<img className={props.cName} 
src={props.profilePhoto}
 alt="The photo is not supported." /> 
}
            </div>
    )
}
export default Profilephoto;