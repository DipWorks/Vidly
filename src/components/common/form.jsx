import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  // validate proprety method validate only one input not the entire form based on change
  // the argument of the function i.e. input is destructured
  validateProperty = ({ name, value }) => {
    // using computed properties to set the object name dynamically
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  // a basic validate method
  validate = () => {
    // Joi has abort Early true by default
    const options = {
      abortEarly: false,
    };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    // if there's no errors return null
    if (!error) return null;

    // otherwise need to map the result to an object
    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  // we need to create a reference to access the document objects in react
  //username = React.createRef();
  //handle submit method
  handleSubmit = (e) => {
    // this function prevents the full page reload which is the
    // default behaviour of the html forms
    e.preventDefault();

    const errors = this.validate();
    // Errors property cannot be null cuase we are trying to read it
    // through our input component so it should always be set to an object
    // it will be set to the errors object or an empty object based whether
    //errors is truthy or falsy
    this.setState({ errors: errors || {} });

    // if there are errors we don't need to call the server
    if (errors) return;

    // We should never access document object directly in react
    // the whole point of react is to put a level of abstraction
    // over document model so the application would be
    // easier ot maintain and easier to unit test
    // so we can access the document object using hte referece prorerty
    //const username = this.username.current.value;
    // but there's better way of accessing form elements
    //and we should keep the use of ref elements minimum as a rule of thumb

    this.doSubmit();
  };

  //handlechange to update the state
  // currentTarget property of the event(e) object is picked by object
  //destructuring and renamed to input
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    // otherweise clear the errors field
    else delete errors[input.name];
    const data = { ...this.state.data };
    // setting the value dynamically with e.currentTarget
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  renderInput = (name, label, type = "text") => {
    // usign object destructuring
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        errors={errors[name]}
      />
    );
  };

  // this function renders the dropdown list
  renderSelect = (name, label, options) => {
    // usign object destructuring
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        errors={errors[name]}
      />
    );
  };
}

export default Form;
