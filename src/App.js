import React from 'react';

import {BrowserRouter,Route, Switch} from "react-router-dom";
import Dashboard from "./resources/Dashboard/Dashboard"
import Login from "./resources/Login/Login"
import Signup from "./resources/Signup/Signup"
import Profile from "./resources/Profile/Profile"
import Upload from "./resources/Upload/Upload";
import Favourite from "./resources/Favourite/Favourite";
import Like from "./resources/Like/Like";
import Playlist from "./resources/Playsong/Playsong";
import Protected from "./resources/protect/Protected";
import Protectfree from "./resources/protect/Protectfree";
import Logout from "./resources/Logout/Logout";
import Error from "./resources/Error/Error";
import './App.css';

function App() {
  return (
    <BrowserRouter>
   <Switch>

    <Protectfree exact path="/" component={Login} />
       <Protectfree exact path="/signup" component={Signup} />

             <Protected exact path="/dashboard" component={Dashboard} />
             <Protected exact path="/profile" component={Profile} />
             <Route exact path="/uploded/verson" component={Upload} />
             <Protected exact path="/favourite" component={Favourite} />
             <Protected exact path="/dashboard/playlist/like" component={Like} />
             <Protected path="/dashboard/playlist/:listId" component={Playlist} />
             
             <Protected exact path="/logout" component={Logout} />

              <Route component={Error} />
             </Switch>
    </BrowserRouter>
  );
}

export default App;
