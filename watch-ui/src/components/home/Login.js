import React, { Component } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { Button, Form, Grid, Segment, Message } from "semantic-ui-react";
import AuthContext from "../context/AuthContext";
import { bookApi } from "../misc/BookApi";
import { handleLogError } from "../misc/Helpers";
import Logincss from "../../css/Login.css";
import { HiUser } from 'react-icons/hi';

class Login extends Component {
  static contextType = AuthContext;

  state = {
    username: "",
    password: "",
    isLoggedIn: false,
    isError: false,
  };

  componentDidMount() {
    const Auth = this.context;
    const isLoggedIn = Auth.userIsAuthenticated();
    this.setState({ isLoggedIn });
  }

  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = this.state;
    if (!(username && password)) {
      this.setState({ isError: true });
      return;
    }

    bookApi
      .authenticate(username, password)
      .then((response) => {
        const { id, name, role } = response.data;
        const authdata = window.btoa(username + ":" + password);
        const user = { id, name, role, authdata };

        const Auth = this.context;
        Auth.userLogin(user);

        this.setState({
          username: "",
          password: "",
          isLoggedIn: true,
          isError: false,
        });
      })
      .catch((error) => {
        handleLogError(error);
        this.setState({ isError: true });
      });
  };

  render() {
    const { isLoggedIn, isError } = this.state;
    if (isLoggedIn) {
      return <Navigate to={"/"} />;
    } else {
      return (
        <>
          <div className="login-form">
            <Form onSubmit={this.handleSubmit}>
              <p className="text-center heading">Watch World</p>
              <h2 className="pull-left">Welcome Back</h2>
              <p className="pull-left">Sign in with your UserName.</p>
              <Form.Input
                autoFocus
                name="username"
                 icon="user"
                iconPosition="left"
                placeholder="Enter Your Username"
                onChange={this.handleInputChange}
              />
              <Form.Input
                name="password"
                 icon="lock"
                iconPosition="left"
                placeholder="Enter Your Password"
                type="password"
                onChange={this.handleInputChange}
              />
              <Button color="green" fluid size="large">
                Login
              </Button>
              <p className="signuplink">
              {`Don't have already an account? `}
              <a href="/signup" color="teal" as={NavLink} to="/signup">
                Sign Up
              </a>
            </p>
            </Form>
            
            {isError && (
              <Message negative>
                The username or password provided are incorrect!
              </Message>
            )}
          </div>
        </>
      );
    }
  }
}

export default Login;
