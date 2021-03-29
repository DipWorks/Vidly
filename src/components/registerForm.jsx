import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },

    errors: {},
  };

  schema = {
    // we can define the friendly names by using label
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    // call the server for registration
    try {
      const { headers } = await userService.register(this.state.data);
      // call the auth service to store the token
      auth.loginWithJwt(headers["x-auth-token"]);
      // redirect the user to homepage
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {/* call render input function */}
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {/* call render button function */}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
