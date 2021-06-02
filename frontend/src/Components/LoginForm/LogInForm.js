import React from 'react';
import './../../Pages/SignUpLogIn/SignUpLogIn.css';

function LogIn(props) {
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
          type="password"
          name="password"
          onChange={props.handleChange}
          placeholder="Password"
        />
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
