import React from 'react';
import { useState } from 'react';
import './../../Pages/SignUpLogIn/SignUpLogIn.css';

function Signup(props) {
  const [isPasswordShown, setPassword] = useState(false);

  function togglePasswordVisibility() {
    setPassword(!isPasswordShown);
  }

  return (
    <form id="signUpForm" autoComplete="off">
      <input
        className="form-control signUpInput"
        type="text"
        name="email"
        placeholder="Email"
        onChange={props.handleChange}
      />
      <br />
      <div className="form-control signUpInput input-icon-container">
        <input
          className="password-input"
          type={isPasswordShown ? 'text' : 'password'}
          name="password"
          onChange={props.handleChange}
          placeholder="Password"
        />
        <i
          className="fa fa-eye password-icon"
          onClick={togglePasswordVisibility}
        />
      </div>
      <br />
      <input
        className="form-control signUpInput"
        type={isPasswordShown ? 'text' : 'password'}
        name="repassword"
        onChange={props.handleChange}
        placeholder="Re-enter Password"
      />
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
