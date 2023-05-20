import React, { Component } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { Button, Form, Grid, Segment, Message } from "semantic-ui-react";
import AuthContext from "../context/AuthContext";
import { bookApi } from "../misc/BookApi";
import { handleLogError } from "../misc/Helpers";

class Signup extends Component {
  static contextType = AuthContext;

  state = {
    username: "",
    password: "",
    name: "",
    email: "",
    isLoggedIn: false,
    isError: false,
    errorMessage: "",
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

    const { username, password, name, email } = this.state;
    if (!(username && password && name && email)) {
      this.setState({
        isError: true,
        errorMessage: "Please, inform all fields!",
      });
      return;
    }

    const user = { username, password, name, email };
    bookApi
      .signup(user)
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
          errorMessage: "",
        });
      })
      .catch((error) => {
        handleLogError(error);
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          let errorMessage = "Invalid fields";
          if (errorData.status === 409) {
            errorMessage = errorData.message;
          } else if (errorData.status === 400) {
            errorMessage = errorData.errors[0].defaultMessage;
          }
          this.setState({
            isError: true,
            errorMessage,
          });
        }
      });
  };

  render() {
    const { isLoggedIn, isError, errorMessage } = this.state;
    if (isLoggedIn) {
      return <Navigate to="/" />;
    } else {
      return (
        <>
          <div className="login-form">
            <Form size="" onSubmit={this.handleSubmit}>
              <p className="text-center heading">Watch World</p>
              <h2 className="pull-left">Welcome To Watch World</h2>
              <p className="pull-left">Sign Up Now</p>
              <Form.Input
                autoFocus
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleInputChange}
              />
              <Form.Input
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={this.handleInputChange}
              />
              <Form.Input
                name="name"
                icon="address card"
                iconPosition="left"
                placeholder="Name"
                onChange={this.handleInputChange}
              />
              <Form.Input
                name="email"
                icon="at"
                iconPosition="left"
                placeholder="Email"
                onChange={this.handleInputChange}
              />
              <Button color="green" fluid size="large">
                Signup
              </Button>
            </Form>
            <p className="signuplink">
              {`Already have an account? `}
              <a href="/login" color="teal" as={NavLink} to="/login">
                Login
              </a>
            </p>
            {isError && <Message negative>{errorMessage}</Message>}
          </div>
        </>
      );
    }
  }
}

export default Signup;
