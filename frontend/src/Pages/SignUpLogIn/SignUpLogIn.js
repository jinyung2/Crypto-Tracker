import './SignUpLogIn.css';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import {
  Redirect,
  Route,
  useRouteMatch,
  useHistory,
  NavLink,
} from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import Signup from '../../Components/SignUpForm/SignUp';
import LogIn from '../../Components/LoginForm/LogInForm';
import logo from './../../assets/crypto-logo-white.png';
import AuthContext from '../../store/AuthContext';
import axios from 'axios';
import { auth } from '../../Api/Auth';

function LoginSignUp() {
  const ctx = useContext(AuthContext);
  const match = useRouteMatch();
  const hist = useHistory();
  const [up, setUP] = useState({
    email: '',
    password: '',
    reEnterPass: '',
  });
  const [loginCred, setLoginCred] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  //assigns username and password values to "up" variable
  function handleSignUpChange(event) {
    const { name, value } = event.target;
    if (name === 'password') {
      setUP({
        email: up['email'],
        password: value,
        reEnterPass: up['reEnterPass'],
      });
    } else if (name === 'repassword') {
      setUP({
        email: up['email'],
        password: up['password'],
        reEnterPass: value,
      });
    } else {
      setUP({
        email: value,
        password: up['password'],
        reEnterPass: up['reEnterPass'],
      });
    }
  }

  //check if inputs are valid
  function submitSignUpForm() {
    //if not all criteria is filled out, then alert
    if (
      !validateEmail(up.email) ||
      up.password === '' ||
      up.reEnterPass === ''
    ) {
      setError('Sign up credentials are invalid. Please try again.');
    }
    //else if passwords don't match, then alert
    else if (up.password !== up.reEnterPass) {
      setError('Passwords do not match. Please re-enter passwords.');
    } else {
      clearError();
    auth.signup(up.email, up.password, up.reEnterPass)
        .then((res) => {
          console.log(res);
          ctx.login(res.data.token, up.email, Date.now() + 600000);
          hist.push('/dashboard');
        })
        .catch((err) => {
          setError('Sign up credentials are invalid. Please try again.');
        });
    }
    //else then no errors and add to database and redirect user to dashbaord
  }

  function handleLogInChange(event) {
    const { name, value } = event.target;
    if (name === 'email') {
      setLoginCred({
        email: value,
        password: loginCred.password,
      });
    } else if (name === 'password') {
      setLoginCred({
        email: loginCred.email,
        password: value,
      });
    }
  }

  function handleLogInForm() {
    // Set password validation to be >= 6 characters
    if (!validateEmail(loginCred.email) || loginCred.password.length < 6) {
      setError('Log In Credentials are invalid. Please try again.');
    } else {
      clearError();
      auth.signin(loginCred.email, loginCred.password)
        .then((res) => {
          ctx.login(res.data.token, loginCred.email, Date.now() + 600000);
          hist.push('/dashboard');
        })
        .catch((err) => {
          setError('Log In Credentials are invalid. Please try again.');
        });
    }
  }

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function clearError() {
    setError('');
  }

  return (
    <Container fluid className="main-container">
      <Row md
        style={{ textAlign: 'center', width: '100%' }}
        className="align-items-center justify-content-center"
      >
        <Col lg>
          <img id="logo" src={logo} alt="logo" />
        </Col>
        <div className="divider-line"></div>
        <Col lg>
          <div className="login-signup">
            <div className="nav-buttons">
              <NavLink id="loginLink" to="/auth/login" className="lsButton" activeClassName="active-link" onClick={clearError}>
                  Login
              </NavLink>
              <NavLink id="signUpBtn" to="/auth/signup" className="lsButton" activeClassName="active-link" onClick={clearError}>
                  Sign Up
              </NavLink>
            </div>
            <Route path={`${match.url}/signup`}>
              <Signup
                handleChange={handleSignUpChange}
                submitForm={submitSignUpForm}
                clearError={clearError}
              ></Signup>
            </Route>
            <Route path={`${match.url}/login`}>
              <LogIn
                handleChange={handleLogInChange}
                submitForm={handleLogInForm}
                clearError={clearError}
              ></LogIn>
            </Route>
            <Route path="/auth">
              <Redirect to={`${match.url}/signup`} />
            </Route>
            {error ? (
              <Alert style={{ margin: '5px 20%' }} variant="danger">
                {error}
              </Alert>
            ) : null}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginSignUp;
