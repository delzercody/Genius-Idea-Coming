import '../stylesheets/login.css'
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import NavBar from './NavBar'
import { useEffect, useState } from 'react';

function Login({updateUser, user }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate()

  
  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username : username, password : password}),
    }).then((r) => {
      // console.log(r)
      if (r.ok) {
        r.json().then((r) => updateUser(r))
        .then(navigate("/"));
      } else {
        r.json().then((err) => setErrors(err));
          window.alert("Invalid username or password")
      }
    });
  }

  return (
    <>
      <NavBar />
      <div className='login-body'>
        <div>
        <form 
        className='login-form'
        onSubmit={handleSubmit}>
          <div id="username-input">
            <label>Username</label>
            <input
              type = "text"
              name = "username"
              value = {username}
              onChange = {(e) => setUsername(e.target.value)}
            />
            </div>
            <div id="password-input">
            <label>Password</label>
            <input
              type = "password"
              name = "password"
              value = {password}
              onChange = {(e) => setPassword(e.target.value)}
            />
            </div>
            <div id="submit-button">
              <button type="submit" value="Log In" className="button">
                Login
              </button>
            </div>
        </form>
        </div>
      </div>
    </>
  );
}
export default Login
