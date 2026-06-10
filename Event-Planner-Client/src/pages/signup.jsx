import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = ({ setUser }) => {
  const navigate = useNavigate();
  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    event_count: 0,
    password: "",
  });

  const signupFunc = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/signup", signupForm);
      setUser(res.data.user);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <form id="container" onSubmit={signupFunc}>
          <h2>Please Sign-up</h2>

          <input
            type="text"
            placeholder="User Name"
            value={signupForm.username}
            onChange={(e) => {
              setSignupForm({ ...signupForm, username: e.target.value });
            }}
            className="mt-3"
          />

          <div className="mt-2">
            <input
              type="email"
              placeholder="Email"
              value={signupForm.email}
              onChange={(e) => {
                setSignupForm({ ...signupForm, email: e.target.value });
              }}
            />
          </div>

          <div className="flex justify-center gap-1 mt-2">
            <input
              type="password"
              placeholder="Password"
              value={signupForm.password}
              onChange={(e) => {
                setSignupForm({ ...signupForm, password: e.target.value });
              }}
              className="password-input"
            />

            <button id="form-button" onClick={signupFunc}>
              <i className="fa-solid fa-arrow-up"></i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
