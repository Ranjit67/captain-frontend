import React, {Component} from "react";
import "./Staticselecter.css";
import Box from "../../../../component/Boxcreater/Box";

class Staticselecter extends Component{
render(){
    return(<div> 

    <p>{this.props.header}</p>

        <div className="langcont">
        
        <div className="fals">
    {this.props.langs.map((e,index)=>{
     return (<div  key={index}>
     <Box 
     clas="lan"
      item={e.c_d}
      key={index}
      dexcon={index}
      click={()=>{this.props.clack(index,this.props.catagory)}}
      idtake={this.props.idtaker}
      /> </div>);
    })}
       

        </div>

          </div>
         
         {(this.props.langs.length>5)&&
          <div className="empty" style={{bottom:this.props.style}}></div>
         }
         
        
          
      
      </div>

    )
}
}
export default Staticselecter;