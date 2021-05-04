import "./SignUpLogIn.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link, Route } from "react-router-dom";
import { useState } from "react";
import logo from '../../assets/square.jpg';
import Signup from './SignUp';

function LoginSignUp() {
    const [up, setUP] = useState({
            email: "",
            password: "",
            reEnterPass: ""
        })
    const [loginCred, setLoginCred] = useState({
        email: "",
        password: ""
    })

    //assigns username and password values to "up" variable
    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "password") {
            setUP(
                { email: up["email"], password: value, reEnterPass: up["reEnterPass"] }
            )
        }
        else if (name === "repassword") {
            setUP(
                { email: up["email"], password: up["password"], reEnterPass: value }
            )
        }
        else {
            setUP(
                { email: value, password: up["password"], reEnterPass: up["reEnterPass"] }
            )
        }

    }

    //check if inputs are valid
    function submitForm() {
        //if not all criteria is filled out, then alert
        if (up.email === "" || up.password === "" || up.reEnterPass === "") {
            alert("Please enter all information.")
        }
        //else if passwords don't match, then alert 
        else if (up.password !== up.reEnterPass) {
            alert("Passwords do not match. Please re-enter passwords.");
        }
        console.log(up);
        //else then no errors and add to database and redirect user to dashbaord
    }

    return (
        <body id="signUpLogin">
            <Container fluid>
                <Row style={{ textAlign: "center" }} className="align-items-center">
                    <Col id="vr">
                        <img id="logo" src={logo} alt="logo" />
                    </Col>
                    <Col>
                        <div className="nav-buttons">
                            <Link id="loginLink" to="/login"><button className="lsButton">Login</button></Link>
                            <Link id="signUpBtn" to="/signup"><button className="lsButton">Sign Up</button></Link>
                        </div>
                        <Route path="/signup">
                            <Signup handleChange={handleChange} submitForm={submitForm}></Signup>
                        </Route>
                        <Route path="/login">TEST2</Route>
                    </Col>
                </Row>
            </Container>
        </body>
    )
}

export default LoginSignUp;
