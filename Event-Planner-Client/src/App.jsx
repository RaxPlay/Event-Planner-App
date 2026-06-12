import React, { useEffect, useState } from "react";
import "./styles/index.css"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { NavBar } from "./components/nav-bar";
import { Home } from "./pages/home";
import { Events } from "./pages/events";

axios.defaults.withCredentials = true;

export const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const getUser = async() => {
      try {
        const fetchedUser = await axios.get("api/auth/me");
        setUser(fetchedUser.data);
      } catch (error) {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }
    getUser();
  },[])

  if(isLoading){
    return <div className="text-center">Loading</div>
    //Will change this later for a gif
  }

  return (
    <Router>
      <NavBar user={user} setUser={setUser}></NavBar>

      <Routes>
        <Route path="/home" element={<Home user={user}/>}/>
        <Route path="/login" element={<Login setUser={setUser}/>}/>
        <Route path="/sign-up" element={<Signup setUser={setUser}/>}/>
        <Route path="/saved-events" element={<Events user={user}/>}></Route>
        <Route path="/*" element={<Navigate to="/home"/>}/>
      </Routes>
    </Router>
  );
};
