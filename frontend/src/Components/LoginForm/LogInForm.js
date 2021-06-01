import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';
import './../../Pages/SignUpLogIn/SignUpLogIn.css';

function LogIn(props) {
  const [isPasswordShown, setPassword] = useState(false);

  function togglePasswordVisibility() {
    setPassword(!isPasswordShown);
  }

  console.log(isPasswordShown);

  return (
      <form id="signUpForm">
        <input
          className="form-control signUpInput"
          type="text"
          name="email"
          placeholder="Email"
          onChange={props.handleChange}
        />
        <br />
        <input
          className="form-control signUpInput"
          type={ isPasswordShown ? "text" : "password"}
          name="password"
          onChange={props.handleChange}
          placeholder="Password"
        />
        <i className="fa fa-eye login-password-icon" onClick={togglePasswordVisibility} />
        <br />
        <input
          className="btn signUpSubmit"
          type="button"
          value="Log In"
          onClick={props.submitForm}
        />
      </form>
  );
}

export default LogIn;
