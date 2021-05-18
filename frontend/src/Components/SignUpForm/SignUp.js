import React from "react";
import { Link } from "react-router-dom";
import "./../../Pages/SignUpLogIn/SignUpLogIn.css";

function Signup(props) {
  return (
    <div>
      <div className="nav-buttons">
        <Link id="loginLink" to="/auth/login">
          <button className="lsButton" onClick={props.clearError}>
            Login
          </button>
        </Link>
        <Link id="signUpBtn" to="/auth/signup">
          <button
            style={{ backgroundColor: "#979797" }}
            className="lsButton"
            onClick={props.clearError}
          >
            Sign Up
          </button>
        </Link>
      </div>
      <form id="signUpForm">
        <input
          className="form-control form-control-lg signUpInput"
          type="text"
          name="email"
          placeholder="Email"
          onChange={props.handleChange}
        />
        <br />
        <input
          className="form-control form-control-lg signUpInput"
          type="password"
          name="password"
          onChange={props.handleChange}
          placeholder="Password"
        />
        <br />
        <input
          className="form-control form-control-lg signUpInput"
          type="password"
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
    </div>
  );
}

export default Signup;
