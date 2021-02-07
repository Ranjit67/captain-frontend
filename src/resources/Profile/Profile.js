import React, {Component} from "react";
import Passwordreset from "./Passwordreset"
import Profilephoto from "../../component/Profilephoto/Profilephoto";
import { withRouter } from "react-router-dom";
import "./Profile.css"
import axios from "axios";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

class Profile extends Component{
    state={
        model_bol:false,
        over:false,
        nameValue:"",
        control:false,
        profilePic:"",
        profileEdit:"",
        name:""
    }

    style={
        color: "blue"
    }

    controler= async()=>{
        const coot = cookies.get("SnG");
        if(this.state.control){
            // alert("In line number 19 to fetch (resource/Profile)");
           await axios.patch("https://songplayapi.herokuapp.com/patchname",{name:this.state.nameValue},{
                headers: {
                    'Authorization': "Bearer "+coot
                  }
            }).then(response=>{
                if(response.status === 200){
                    // this.props.history.push("/profile")
                    this.setState({name:this.state.nameValue})
                } else {
                    console.log("somthing went wrong");
                }
            })
            .catch(err=>console.log(err))
        }
this.setState({control:!(this.state.control)});
}

modelHandler = ()=>{
this.setState((prev)=>{
    return {model_bol:!prev.model_bol}
})
}
profileSubmit = async()=>{
    const coot = cookies.get("SnG");
    await axios.patch("https://songplayapi.herokuapp.com/patchprofile",{
        profile:this.state.profileEdit
    },{
        headers: {
            'Authorization': "Bearer "+coot
          }
    })
    .then(response=>{
        if(response.status ===200){
            console.log(response.data);
            this.setState({profilePic:this.state.profileEdit})
            this.setState({model_bol:false})
            this.setState({profileEdit:""})
        } else {
            console.log("somthing went wrong");
        }
    })
    .catch(err=>console.log(err))
}
//ad0kvwc6
//cloudenary
profileUplod = async(e)=>{
    const files=e.target.files[0];
    // imageBol = files.name.match(/.jpg|.jpeg|.png|.gif/gi)
    // if(!imageBol) return this.setState({imageMessage:"You should to uplod image file."})
    // this.setState({imageMessage:""})
 
    const data=new FormData()
    data.append("file",files)
    data.append('upload_preset','ad0kvwc6')
    data.append("cloude_name","dnrnwqpel")
    this.setState({over:true});
    await fetch("https://api.cloudinary.com/v1_1/dnrnwqpel/image/upload",
   { method:"POST",
 body:data
 }
    )
    .then(res=>res.json())
    .then(data=>{
        this.setState({over:false});
     console.log(data.secure_url);  
     this.setState({profileEdit:data.secure_url})
 })
     .catch(err=>console.log(err))
}
//cloudinary end

componentDidMount(){
    const coot = cookies.get("SnG");
  
    axios.post("https://songplayapi.herokuapp.com/userdetails",{},{
      headers: {
        'Authorization': "Bearer "+coot
      }
    }).then(response=>{
      
      if(response.data.profile){
        this.setState({profilePic:response.data.profile})
      } else {
       const image = "https://images.askmen.com/1080x540/2019/10/17-061431-how_to_become_a_male_model.jpg";
        this.setState({profilePic:image})
      }
      this.setState({name:response.data.name})
      this.setState({nameValue:response.data.name})
    })
    .catch(err=>console.log(err))
}
logoutHandler = () =>{
    this.props.history.push("/logout")
}
    render(){
    return(
<div className="profile-m">

    <div className="log_d">
        
<button className="logout" onClick={this.logoutHandler}>Logout</button> 
</div>

<div className="nameAndPicture">
<Profilephoto 
profilePhoto={this.state.profilePic}
cName="profiler"
/>
<h1 className="photoEdit" onClick={this.modelHandler}>
<CameraAltIcon style={{ fontSize: 40,
color: "#e84393"
}} />
</h1>
</div>



<div className="nameAndPicture">
<h5 className="PersonName mt-4"> {this.state.control? 
<input className="nameChanger" type="text" value={this.state.nameValue} onChange={(e)=>{
this.setState({nameValue:e.target.value})
}} />
 :this.state.nameValue }
<svg onClick={this.controler}style= {(this.state.control)?this.style:null} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-square ml-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg> </h5>
</div>

<Passwordreset
name={this.state.name}
/>

{/* model */}
{this.state.model_bol &&
<div className="model_1" >

<div className="items_1">
    {this.state.profileEdit &&
<Profilephoto 
profilePhoto={this.state.profileEdit}
cName="profiler"
/>}
    <div className="field_profile"> 
<h6 className="title_p">Profile picture: </h6>
<input className="profile_input" type="file" name="profile" onChange={this.profileUplod} /> </div>

<div className="sub_cont">
<button className="p_cancel" onClick={this.modelHandler}>Cancel</button>
<button className="P_submit" onClick={this.profileSubmit}>Submit</button>

</div>
</div>
{/* shdow animation */}
{this.state.over &&
<div className="shadow">
<div className="part_1"></div>
<div className="part_2"></div>
</div>}            {/* shdow animation end */}

    </div>    
}
 {/* model end */}
    </div>
    )
}
}
export default withRouter(Profile);