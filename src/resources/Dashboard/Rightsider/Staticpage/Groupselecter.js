import React from "react";
import Staticselecter from "./Staticselecter";
const Groupselecter=(props)=>{
    return(  <div>
     
        <div className="langu-ge">    
<Staticselecter
header="Language"
langs={props.statelist.langs}
clack={props.clack}
style="350px"
catagory="langs"
idtaker={props.statelist.l_id}
/>
</div>

<div className="mo-d">
<Staticselecter
header="Moods"
langs={props.statelist.mood}
clack={props.clack}
style="210px"
catagory="mood"
idtaker={props.statelist.m_id}
/>
  </div>

  <div>
<Staticselecter
header="Song Type"
langs={props.statelist.songType}
clack={props.clack}
style="70px"
catagory="songType"
idtaker={props.statelist.s_id}
/>
  </div>
  </div>

    )
}
export default Groupselecter;