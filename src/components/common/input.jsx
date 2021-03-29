import React from "react";
// the spread operator rest extracts other properties in the props object
const Input = ({ name, label, errors, ...rest }) => {
  return (
    <div className="from-group">
      <label htmlFor={name}>{label}</label>
      {/* rest sets the attribute to the itself as type={type} */}
      <input {...rest} name={name} id={name} className="form-control" />

      {errors && <div className="alert alert-danger">{errors}</div>}
    </div>
  );
};

export default Input;
