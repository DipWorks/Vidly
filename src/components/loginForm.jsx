import React from "react";
// it's a javascript library for validation
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  state = {
    // when building form the value of controlled elements cannot be
    //undefined or null in which case an errror is returned
    //so they either need to be set to empty string or some value from the server
    data: { username: "", password: "" },

    errors: {},
  };

  // defining a schema for validation
  //it does not have to be a part of the state because it's not supposed to change
  schema = {
    // we can define the friendly names by using label
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { username, password } = this.state.data;
      await auth.login(username, password);

      const { state } = this.props.location;
      // redirect the user to homepage
      // we need to do complete reload of the application to call the
      // componentDidMount method of app.js
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    // we only wanna use window.location when the user is trynna login
    // so that the application does a full reload and saves the current user
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {/* call render input function */}
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {/* call render button function */}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
