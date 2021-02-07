import React, { Component } from 'react'
import "./Upload.css";
import axios from "axios";




export default class Upload extends Component {
    constructor(){
        super()
        this.state={
            language:"",
            mood:"",
            songName:"",
            songType:"",
            poster:"",
            songLink:"",
            albumName:"",
            over:false,
            toast:false,
            error:false
        }
    }



    submitHandler = async ()=>{
        const {mood, language, songName, songType, poster, songLink, albumName }= this.state;

        console.log(this.state);
         await axios.post("https://songplayapi.herokuapp.com/playlistadded",{
            mood:mood,
            language:language,
            songtype:songType,
            album:albumName,
            song:songLink,
            poster:poster,
            songname:songName
         
        })
        .then(response=>{
            if(response.status === 200){
               return this.setState({toast:true,
                    language:"",
                    mood:"",
                    songName:"",
                    songType:"",
                    poster:"",
                    songLink:"",
                    albumName:"",
                })
            } else {
                this.setState({error:true})
            }
      
        })

        .catch(err=>console.log(err))
    }
    tostHandler = ()=>{
        this.setState({toast:false})
    }

    errorHandler = ()=>{
        this.setState({error:false})
    }
    posterUpload = async(e)=>{
        const files=e.target.files[0];
        // imageBol = files.name.match(/.jpg|.jpeg|.png|.gif/gi)
        // if(!imageBol) return this.setState({imageMessage:"You should to uplod image file."})
        // this.setState({imageMessage:""})
        
    
        const data=new FormData()
        data.append("file",files)
        data.append('upload_preset','s7z4yhwv')
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
        //  console.log(data.secure_url);  
         this.setState({poster:data.secure_url})
     })
         .catch(err=>console.log(err))
    }


    songUpload = async e =>{
        const files=e.target.files[0];
        // imageBol = files.name.match(/.jpg|.jpeg|.png|.gif/gi)
        // if(!imageBol) return this.setState({imageMessage:"You should to uplod image file."})
        // this.setState({imageMessage:""})
        
    
        const data=new FormData()
        data.append("file",files)
        data.append('upload_preset','lwwkg4jw')
        data.append("cloude_name","dnrnwqpel")
        this.setState({over:true});
        await fetch("https://api.cloudinary.com/v1_1/dnrnwqpel/video/upload",
       { method:"POST",
     body:data
     }
        )
        .then(res=>res.json())
        .then(data=>{
         this.setState({over:false}); 
        //  console.log(data.secure_url);  
         this.setState({songLink:data.secure_url})
     })
         .catch(err=>console.log(err))
     }


    render() {
 
       return (
            <div className="upload">
                <h1 className="songe-header">Song Upload</h1>
                <div className="field-cont"> 
                <h3>Song name : </h3>
                <input type="text" vlaue={this.state.songName} onChange={(e)=>{
                    this.setState({songName:e.target.value})
                }} />
                </div>

                <div className="field-cont"> 
                <h3>Album name : </h3>
                <input type="text" vlaue={this.state.albumName} onChange={(e)=>{
                    this.setState({albumName:e.target.value})
                }} />
                </div>


                <div className="field-cont"> 
                <h3 for="language">Language : </h3>
  <select name="language" id="language" value={this.state.language} onChange={(e)=>{
this.setState({language: e.target.value});
  }}>
      <option value="">-:Select:-</option>
    <option value="English">English</option>
    <option value="Hindi">Hindi</option>
    <option value="Panjabi">Panjabi</option>
    <option value="French">French</option>
    <option value="Tamil">Tamil</option>
    <option value="Bengali">Bengali</option>
    <option value="Marathi">Marathi</option>
    <option value="Spanish">Spanish</option>
  </select>
                </div>

                <div className="field-cont"> 
                <h3 for="mood">Mood : </h3>
  <select name="mood" id="mood" value={this.state.mood} onChange={(e)=>{
this.setState({mood:e.target.value})
  }}>
      <option value="">-:Select:-</option>
    <option value="Happy">Happy</option>
    <option value="Sad">Sad</option>
    <option value="Romantic">Romantic</option>
    <option value="Party">Party</option>
   
  </select>
                </div>

                <div className="field-cont"> 
                <h3 for="songType">Song Type : </h3>
  <select name="songType" id="songType" value={this.state.songType} onChange={(e)=>{
this.setState({songType: e.target.value});
  }}>
      <option value="">-:Select:-</option>
    <option value="Warkout">Workout</option>
    <option value="EDM">EDM</option>
    <option value="Hip-Hop">Hip-Hop</option>
    <option value="Jazz">Jazz</option>
    <option value="Soul">Soul</option>
   
  </select>
                </div>

                <div className="field-cont"> 
                <h3>Poster : </h3>
                <input type="file" onChange={this.posterUpload} />
                </div>

                <div className="field-cont"> 
                <h3>Uploade Song : </h3>
                <input type="file" onChange={this.songUpload} />
                </div>

                <button onClick={this.submitHandler}>Submit</button>
                

                {this.state.over && <div className="over">
                    </div>}

                    {this.state.toast && <div className="over">
                        <h1 className="thank-message">Thank you</h1>
                    <button onClick={this.tostHandler}>Done</button>
                    </div>}

                    {this.state.error && <div className="over">
                        <h1 className="wrong-message">Somthing want wrong.</h1>
                    <button onClick={this.errorHandler}>Done</button>
                    </div>}
                
            </div>
        )
    }
}




