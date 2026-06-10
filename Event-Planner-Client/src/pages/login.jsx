import React, { useState } from "react";
import axios from "axios";

export const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  return (
    <>
      <form id="container">
        <h2>Please Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={loginForm.email}
          onChange={(e) => {
            setLoginForm({ ...loginForm, email: e.target.value });
          }}
        />

        <div>
          <input
            type="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={(e) => {
              setLoginForm({ ...loginForm, password: e.target.value });
            }}
          />

          <button>
            
          </button>
        </div>
      </form>
    </>
  );
};
