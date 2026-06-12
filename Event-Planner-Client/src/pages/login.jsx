import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = ({setUser}) => {
  const navigate = useNavigate()
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const loginFunc = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", loginForm)
      setUser(res.data.user);
      navigate("/home")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
    <div className="flex justify-center">
      <form id="container" onSubmit={loginFunc} className="mt-20">
        <h2>Please Log-in</h2>

        <input
          type="email"
          placeholder="Email"
          value={loginForm.email}
          onChange={(e) => {
            setLoginForm({ ...loginForm, email: e.target.value });
          }}
          className="mt-3"
        />

        <div className="flex justify-center gap-2 mt-2">
          <input
            type="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={(e) => {
              setLoginForm({ ...loginForm, password: e.target.value });
            }}
            className="password-input"
          />

          <button id="form-button" onClick={loginFunc}>
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </form>
    </div>
    </>
  );
};
