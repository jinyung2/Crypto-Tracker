import React from 'react';
import { useState } from "react";
import './../../Pages/SignUpLogIn/SignUpLogIn.css';

function Signup(props) {
  const [isPasswordShown, setPassword] = useState(false);

  function togglePasswordVisibility() {
    setPassword(!isPasswordShown);
  }

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
      <br />
      <input
        className="form-control signUpInput"
        type={ isPasswordShown ? "text" : "password"}
        name="repassword"
        onChange={props.handleChange}
        placeholder="Re-enter Password"
      />
      <i className="fa fa-eye signup-password-icon" onClick={togglePasswordVisibility} />
      <br />
      <input
        className="btn signUpSubmit"
        type="button"
        value="Sign Up"
        onClick={props.submitForm}
      />
    </form>
  );
}

export default Signup;
