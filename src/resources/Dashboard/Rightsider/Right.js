import React, {Component} from "react"
import Input from "../../../component/Inputfield/Input.js";

import Language from "../../../Db/Language";
import Mood from "../../../Db/Mood";
import Songtype from "../../../Db/Songtype";
import Songlist from "./Songlist/Songlist";
import Groupselecter from "./Staticpage/Groupselecter";
import axios from "axios";
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();
class Right extends Component{
    state={
        mood:Mood.moods,
        songType:Songtype.type,
        langs:Language.lan,

      //   singlesongType:"",
      //  singlemoode:"",
      //   singlelanguage:"",

sonngList:[],

      songcont:true,
      m_id:"",
      s_id:"",
      l_id:""
      };

     
    clicker=(id,catagory)=>{
        

        var temp=[...catagory];
        var count=0;
        var bol=true;
        var tempnum;
        var i;
       if(catagory==="mood"){
         if(id<5){
           this.setState({singlemoode:this.state.mood[id].c_d});
           this.setState({m_id:id})
          //  temp=[...this.state.mood[id]];
          //  alert(temp)
         } else{
          var temp=[...this.state.mood];
         }
        
       }else{
           if(catagory==="songType"){
            if(id<5){
              this.setState({singlesongType:this.state.songType[id].c_d});
            
             this.setState({s_id:id});
            } else{
              var temp=[...this.state.songType]; 
            }
            
           } else{
            if(catagory==="langs"){
              if(id<5){
                this.setState({singlelanguage:this.state.langs[id].c_d});
                
                this.setState({l_id:id});
              } else{
                var temp=[...this.state.langs]; 
              }
            }
           }
       }
        var end=temp.length;
        
        if(id===5){
    
    for(i=0;i<=end/2;i++){
      tempnum=temp[i];
      console.log("tempnum "+tempnum);
      if(temp[id+count]&&bol){
        temp[i]=temp[id+count];
        temp[id+count]=tempnum;
        count++;
       
      } else{
        count=1;
        bol=false;
        if(temp[id+count]<=end-1/2){
          temp[i]=temp[id+count];
        } else{
          break;
        }
      }
     
    }
    if(catagory==="mood"){
        this.setState({mood:temp});
       }else{
           if(catagory==="songType"){
            this.setState({songType:temp});
           } else{
            if(catagory==="langs"){
                this.setState({langs:temp});
            }
           }
       }
   
   
        }
      }
      backHandler = async ()=>{
        const kooc = cookies.get("SnG");
        await axios.delete("https://songplayapi.herokuapp.com/interest-delete", {
          headers: {
            Authorization: "Bearer "+kooc
          }
        }).then(response=>{
          console.log(response);
          if(response.status===200){
            this.setState({
              songcont:true,
              l_id:"",
              m_id:"",
              s_id:""
            })
          }
        })
        .catch(err=>console.log(err))
        
      }
      componentDidUpdate(prevProps, prevState){
        // console.log(prevState);
        
        if(this.state.songcont){
          if((this.state.l_id===0 || this.state.l_id) && (this.state.m_id===0 ||this.state.m_id) && (this.state.s_id===0 ||this.state.s_id)){
          //   alert("you are selected. " +this.state.singlelanguage+" "+this.state.singlemoode+" "+this.state.singlesongType );
          //  alert("featch- [src-resources-Dashboard-Rightsider-Right.js]  in line 110")
          const l=Language.lan[this.state.l_id].c_d;
          const m = Mood.moods[this.state.m_id].c_d;
          const s = Songtype.type[this.state.s_id].c_d;
          const coo = cookies.get("SnG");
            axios.post("https://songplayapi.herokuapp.com/interest",{
              mood:m,
    language:l,
   songType:s
            },{
              headers: {
                'Authorization': "Bearer "+coo
              }
            }).then(response=>{
              // console.log(response)
            if(response.status === 200){
               this.setState({songcont:false})
            }
            })
            .catch(err=>console.log(err))
            
          }
          
        }

      }
      componentDidMount(){
        const coot = cookies.get("SnG");
        axios.post("https://songplayapi.herokuapp.com/interstgetsong",{},{
          headers: {
            'Authorization': "Bearer "+coot
          }
        }).then(response=>{
          // console.log(response);
          if(response.status === 200){
            
            this.setState({songcont:false})
          }
        })
        .catch(err=>console.log(err))
      }

    render(){
   
   
        return(
            <div className="col-9 right">

          <div className="row">
              <div className="serch mt-3 mb-3 col-4 offset-7">
              <Input
                 placeholderer="Search..."
                 inputClass="dashboardSearch"
              />
                  </div>
                  </div>
                  <div className="lms p-4">
                  {this.state.songcont?
                  
   
      <Groupselecter 
             statelist={this.state}
             clack={this.clicker}
            />
            :
            <Songlist
            backtrack={this.backHandler}
            // songsData = {this.state.sonngList}
            // language={this.state.singlelanguage}
            // mood={this.state.singlemoode}
            // songType={this.state.singlesongType}
            />

                }
                </div>
               






               
               

    
  
  
              

          </div>
        )
    }
}
export default Right;