import _ from "lodash";

const Input = ({ name, label, errors, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input name={name} id={name} className="form-control" {...rest}></input>

      {_.has(errors, name) && (
        <div className="alert alert-danger" role="alert">
          {errors[name]}
        </div>
      )}
    </div>
  );
};

export default Input;
