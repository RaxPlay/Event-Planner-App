import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = ({setUser}) => {
  const navigate = useNavigate()
  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    event_count: 0,
    password: "",
  });

  const signupFunc = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/signup", signupForm)
      setUser(res.data.user);
      navigate("/home")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <form id="container" onSubmit={signupFunc}>
        <h2>Please signup</h2>

        <input
          type="text"
          placeholder="User Name"
          value={signupForm.username}
          onChange={(e) => {
            setSignupForm({ ...signupForm, username: e.target.value });
          }}
        />

        <div>
          <input
            type="email"
            placeholder="Email"
            value={signupForm.email}
            onChange={(e) => {
              setSignupForm({ ...signupForm, email: e.target.value });
            }}
          />
        </div>
        
        <div>
          <input
            type="password"
            placeholder="Password"
            value={signupForm.password}
            onChange={(e) => {
              setSignupForm({ ...signupForm, password: e.target.value });
            }}
          />

          <button id="submitButton" onClick={signupFunc}>
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </form>
    </>
  );
}
