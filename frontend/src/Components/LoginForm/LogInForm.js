import React from 'react';
import { useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import './../../Pages/SignUpLogIn/SignUpLogIn.css';

function LogIn(props) {
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
          className={isPasswordShown ? "fa fa-eye-slash password-icon" : "fa fa-eye password-icon"}
          onClick={togglePasswordVisibility}
        />
      </div>
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
