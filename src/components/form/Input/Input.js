import React from "react";
import classes from "./Input.css";
import DatePicker from "react-datepicker";
import moment from 'moment';

const Input = props => {
  let inputElem = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElem = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    case "date":
      inputElem = (
        <DatePicker
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.selectedDate}
          dateFormat="MM/DD/YYYY"
          maxDate={moment()}
          isClearable={true}
          onChange={props.changed}

        />
      );
      break;


    case "textArea":
      inputElem = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    default:
      inputElem = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.Label}</label>
      {inputElem}
    </div>
  );
};

export default Input;
